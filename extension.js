let vscode = require('vscode');
const helpers = require('./helpers');


const pythonTerminalName = 'Terminal';

let pythonTerminal = null;
let textQueue = [];
let waitsQueue = [];
let currentFilename = null;
let isrunning = false;
let noruntimes = 10;


function removePythonTerminal() {
    pythonTerminal = null;
    currentFilename = null;
    textQueue = [];
    waitsQueue = [];
}

function updateFilename(filename, runInCurrentDirectory) {
    currentFilename = filename;
    if (runInCurrentDirectory) {
        sendQueuedText(`cd $(dirname ${filename})`)
    }
    sendQueuedText('\n')
}

function sendQueuedText(text, waitTime = 50) {
    textQueue.push(text);
    waitsQueue.push(waitTime);
}

function judgeCMD(CMD) {
    // 多行判断缩进, 并且末尾是否存在/n，有缩进且无/n返回true
    let A = CMD.split('\n')
    if (RegExp(/\n$/g).test(CMD)) {  // 判断末尾换行符
        istop = RegExp(/^\s+/g).test(A[A.length - 2])
    } else {
        // 单行统一false
        istop = (A.length > 1) ? RegExp(/^\s+/g).test(A[A.length - 1]) : false
    }
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
// function queueLoop() {
//     // runtimes += 1
//     // vscode.window.showInformationMessage(runtimes+'|' + textQueue.length + 'textQueue:' + textQueue);
//     // if (pythonTerminal !== null) {
//     //     vscode.window.showInformationMessage('pythonTerminal._queuedRequests:' + pythonTerminal._queuedRequests.length);
//     // }
//     if (textQueue.length > 0 && pythonTerminal !== null && pythonTerminal._queuedRequests.length === 0) {
//         isrunning = true;
//         const text = textQueue.shift();
//         const waitTime = waitsQueue.shift();
//         pythonTerminal.sendText(text);
//         setTimeout(queueLoop, waitTime);
//     } else {
//         if (isrunning) {
//             if (textQueue.length === 0 && pythonTerminal !== null && pythonTerminal._queuedRequests.length === 0) {
//                 // vscode.window.showInformationMessage('满足条件, 发送换行符中');
//                 // pythonTerminal.sendText('\n');
//                 // vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
//                 isrunning = false;
//             };
//         } else {
//             noruntimes -= 1;
//             if (noruntimes < 0) {
//                 return
//             };
//         };
//         setTimeout(queueLoop, 200);
//     }
// }

function activate(context) {
    vscode.window.onDidCloseTerminal(function (event) {
        if (event._name === pythonTerminalName) {
            removePythonTerminal();
        }
    });

    let sendSelectedToTerminal = vscode.commands.registerCommand('terminal.sendSelectedToTerminal', function () {
        const configuration = vscode.workspace.getConfiguration("terminal");
        pythonTerminal = vscode.window.activeTerminal;

        const editor = vscode.window.activeTextEditor;
        const filename = editor.document.fileName;
        if (filename !== currentFilename) {
            updateFilename(filename, configuration.get('runInCurrentDirectory'));
        }
        // get selection & get snippet
        const selection = (editor !== undefined) ? editor.selection : undefined;
        const isSelection = (editor === undefined || selection === undefined || selection.isEmpty) ? false : true
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
        // 发送前保存文件
        if (isSave) {
            let doc = vscode.window.activeTextEditor.document
            doc.save()
        };
        // 开始输入
        if (isSelection) {  // 选中发送模式下
            pythonTerminal.sendText(command_text);
            if (judgeCMD(command_text)) {
                pythonTerminal.sendText('\n');
            };
        } else {  // 非选中发送模式下, 直接发送command
            const POS = (startLine > 0) ? (startLine - 1) : startLine;
            const charactersOnLine = vscode.window.activeTextEditor.document.lineAt(POS).text.length;
            const range = new vscode.Range(new vscode.Position(POS, 0), new vscode.Position(POS, charactersOnLine));
            let command_text = vscode.window.activeTextEditor.document.getText(range);
            pythonTerminal.sendText(command_text);
        };

        // pythonTerminal.sendText('\n');
        pythonTerminal.show(configuration.get("focusActiveEditorGroup"));  //defalt: true
        // 进行发送信息后进行移动光标到下一行
        if (isMoveCursor && !isSelection ) {
            const linesDownToMoveCursor = (endLine == startLine) ? 1 : 0
            if (is_command_text_end == false) {  //判断非/n结尾时
                vscode.commands.executeCommand('cursorMove', { to: 'down', value: linesDownToMoveCursor });
            };
            vscode.commands.executeCommand('cursorMove', { to: 'wrappedLineFirstNonWhitespaceCharacter'});  //光标归位于行首
        }
        // queueLoop();
    });

    // let sendCellContentsToTerminal = vscode.commands.registerCommand('terminal.sendCellContentsToTerminal', function () {
    //     const configuration = vscode.workspace.getConfiguration("terminal");
    //     if (pythonTerminal === null) {
    //         createPythonTerminal();
    //     }
    //     const editor = vscode.window.activeTextEditor;
    //     const filename = editor.document.fileName;
    //     if (filename !== currentFilename) {
    //         updateFilename(filename, configuration.get('runInCurrentDirectory'));
    //     }
    //     sendQueuedText(`\n#%load ${filename}\n`, 500);
    //     sendQueuedText('\n');
    //     sendQueuedText('\n');
    //     pythonTerminal.show(configuration.get("focusActiveEditorGroup"));
    //     queueLoop();
    // });

    context.subscriptions.push(sendSelectedToTerminal);
    // context.subscriptions.push(sendCellContentsToTerminal);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;