let vscode = require('vscode');
const helpers = require('./helpers');


const pythonTerminalName = 'IPython';

let pythonTerminal = null;
let textQueue = [];
let waitsQueue = [];
let currentFilename = null;
let isrunning = false;
let noruntimes = 10;

function createPythonTerminal() {
    textQueue = [];
    waitsQueue = [];
    pythonTerminal = vscode.window.createTerminal(pythonTerminalName);
    sendQueuedText('ipython', 1000);
}


function removePythonTerminal() {
    pythonTerminal = null;
    currentFilename = null;
    textQueue = [];
    waitsQueue = [];
}

function updateFilename(filename, runInCurrentDirectory) {
    currentFilename = filename;
    sendQueuedText(`__file__ = r'${filename}'`)
    sendQueuedText('import sys')
    sendQueuedText('import os')
    if (runInCurrentDirectory) {
        sendQueuedText(`os.chdir(os.path.dirname(r'${filename}'))`)
    }
    sendQueuedText('sys.path.append(os.path.dirname(__file__))', 2000)
    sendQueuedText('\n')
}

function sendQueuedText(text, waitTime = 50) {
    textQueue.push(text);
    waitsQueue.push(waitTime);
}

function judgeCMD(CMD) {
    // 单行统一false
    // 多行判断缩进, 并且末尾是否存在/n，有缩进且无/n返回true
    let A = CMD.split('\n')
    console.log(CMD)
    console.log(A)
    if (A.length > 1) {
        text = A[A.length - 1]
        console.log(text)
        istop = RegExp(/^\s+/g).test(text)
    } else {
        istop = false
    }
    console.log(istop)
    return istop
}
// test:
// 单行统一false
// judgeCMD('   abcadf')    // false
// judgeCMD('   abcadf\n')    // false
// 多行判断缩进并且末尾是否存在/n
// judgeCMD('abc\n    adf')    // true
// judgeCMD('abc\n    adf\n')    // false


// let runtimes = 0
function queueLoop() {
    // runtimes += 1
    // vscode.window.showInformationMessage(runtimes+'|' + textQueue.length + 'textQueue:' + textQueue);
    // if (pythonTerminal !== null) {
    //     vscode.window.showInformationMessage('pythonTerminal._queuedRequests:' + pythonTerminal._queuedRequests.length);
    // }
    if (textQueue.length > 0 && pythonTerminal !== null && pythonTerminal._queuedRequests.length === 0) {
        isrunning = true;
        const text = textQueue.shift();
        const waitTime = waitsQueue.shift();
        pythonTerminal.sendText(text);
        setTimeout(queueLoop, waitTime);
    } else {
        if (isrunning) {
            if (textQueue.length === 0 && pythonTerminal !== null && pythonTerminal._queuedRequests.length === 0) {
                // vscode.window.showInformationMessage('满足条件, 发送换行符中');
                // pythonTerminal.sendText('\n');
                // vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
                isrunning = false;
            };
        } else {
            noruntimes -= 1;
            if (noruntimes < 0) {
                return
            };
        };
        setTimeout(queueLoop, 200);
    }
}

function activate(context) {
    vscode.window.onDidCloseTerminal(function (event) {
        if (event._name === pythonTerminalName) {
            removePythonTerminal();
        }
    });

    let sendSelectedToIPython = vscode.commands.registerCommand('ipython.sendSelectedToIPython', function () {
        const configuration = vscode.workspace.getConfiguration("ipython");
        if (pythonTerminal === null) {
            createPythonTerminal();
        }
        const editor = vscode.window.activeTextEditor;
        const filename = editor.document.fileName;
        if (filename !== currentFilename) {
            updateFilename(filename, configuration.get('runInCurrentDirectory'));
        }
        // get selection & get snippet
        const selection = (editor !== undefined) ? editor.selection : undefined;
        const isSelection = (editor === undefined || selection === undefined || selection.isEmpty) ? false : true
        const isAutoInputLine = configuration.get("isAutoInputLine");
        const isSave = configuration.get("isSave");
        const isMoveCursor = configuration.get("isMoveCursor");
        // 获取选中字符串
        const selectedText = editor.document.getText(selection);
        const command_text = selectedText.toString();
        const is_command_text_end = RegExp(/\n$/g).test(command_text)
        // 获取起止位置信息, 计算start, end
        let startLine, endLine;
        if (editor.selection.isEmpty) {  //判断是否为光标状态，而非选中任何内容
            startLine = editor.selection.active.line + 1
            endLine = startLine;
        } else {
            startLine = editor.selection.start.line + 1;
            // 看最后一个字符是否是\n
            endLine = is_command_text_end ? editor.selection.end.line : editor.selection.end.line + 1;
        };
        // 非选中状态下，或选中状态下AutoInputLine开启
        if (isSelection === false || isAutoInputLine) {  //defalt: true
            command = `\n%load -r ${startLine}-${endLine} ${filename}\n`;
        };
        // 发送前保存文件
        if (isSave) {
            let doc = vscode.window.activeTextEditor.document
            doc.save()
        };
        // 开始输入
        if (isSelection) {  // 选中发送模式下
            // isAutoInputLine功能开启  //sendQueuedText(isAutoInputLine ?command:command_text, 500);
            if (isAutoInputLine) {
                sendQueuedText(command, 300);
                sendQueuedText('\n');
                if (judgeCMD(command_text)) {   // 选中的末尾没有\n，且有缩进
                    console.log('发送缩进处理换行中');
                    sendQueuedText('\n', 300);
                };
                if (is_command_text_end) {  // 选中的末尾有\n
                    sendQueuedText('\n');
                };
            } else {
                sendQueuedText(command_text, 300);
            };
        } else {  // 非选中发送模式下, 直接发送command
            const POS = (startLine > 0) ? (startLine - 1) : startLine;
            const charactersOnLine = vscode.window.activeTextEditor.document.lineAt(POS).text.length;
            const range = new vscode.Range(new vscode.Position(POS, 0), new vscode.Position(POS, charactersOnLine));
            let command_text = vscode.window.activeTextEditor.document.getText(range);
            sendQueuedText(command_text, 300);
        };
        // sendQueuedText('\n');
        pythonTerminal.show(configuration.get("focusActiveEditorGroup"));  //defalt: true
        // 进行发送信息后进行移动光标到下一行
        if (isMoveCursor) {
            const linesDownToMoveCursor = (endLine == startLine) ? 1 : 0
            if (is_command_text_end == false) {  //判断非/n结尾时
                vscode.commands.executeCommand('cursorMove', { to: 'down', value: linesDownToMoveCursor });
            };
            vscode.commands.executeCommand('cursorMove', { to: 'wrappedLineFirstNonWhitespaceCharacter' });
        }
        queueLoop();
    });

    let sendFileContentsToIPython = vscode.commands.registerCommand('ipython.sendFileContentsToIPython', function () {
        const configuration = vscode.workspace.getConfiguration("ipython");
        if (pythonTerminal === null) {
            createPythonTerminal();
        }
        const editor = vscode.window.activeTextEditor;
        const filename = editor.document.fileName;
        if (filename !== currentFilename) {
            updateFilename(filename, configuration.get('runInCurrentDirectory'));
        }
        sendQueuedText(`\n%load ${filename}\n`, 500);
        sendQueuedText('\n');
        sendQueuedText('\n');
        pythonTerminal.show(configuration.get("focusActiveEditorGroup"));
        queueLoop();
    });

    context.subscriptions.push(sendSelectedToIPython);
    context.subscriptions.push(sendFileContentsToIPython);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;