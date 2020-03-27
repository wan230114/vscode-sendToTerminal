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
    sendQueuedText('ipython', 3000);
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
                pythonTerminal.sendText('\n');
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
        const selection = editor !== undefined ? editor.selection : undefined;
        if (editor === undefined || selection === undefined || selection.isEmpty ||
            configuration.get("isAutoInputLine")) {  //defalt: true 
            let startLine, endLine;
            if (editor.selection.isEmpty) {
                startLine = editor.selection.active.line + 1
                endLine = startLine;
            } else {
                startLine = editor.selection.start.line + 1;
                endLine = editor.selection.end.line + 1;
            }
            const command = `\n%load -r ${startLine}-${endLine} ${filename}\n`;
            sendQueuedText(command, 500);
            sendQueuedText('\n');
        } else {
            const selectedText = editor.document.getText(selection);
            const command = selectedText.toString();
            sendQueuedText(command, 500);
        };
        pythonTerminal.show(configuration.get("focusActiveEditorGroup"));  //defalt: true
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