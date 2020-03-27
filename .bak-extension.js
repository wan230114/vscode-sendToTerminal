let vscode = require('vscode');
const helpers = require('./helpers');

const configuration = vscode.workspace.getConfiguration("ipython");
const pythonTerminalName = 'IPython';
let pythonTerminal = null;
let textQueue = [];
let waitsQueue = [];
let currentFilename = null;
let isruning = false;
let GoOut_start = false;

function createPythonTerminal() {
    textQueue = [];
    waitsQueue = [];
    pythonTerminal = vscode.window.createTerminal(pythonTerminalName);
    sendQueuedText('ipython', 50);
}


function removePythonTerminal() {
    pythonTerminal = null;
    currentFilename = null;
    textQueue = [];
    waitsQueue = [];
}

function focus() {
    if (configuration.get("focusActiveEditorGroup")) {
        // Using Commands
        // vscode.commands.executeCommand('newLine.insert');
        // vscode.commands.executeCommand('pythonIndent.newlineAndIndent');
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    };
};

function sendQueuedText(text, waitTime = 50, GoOut = false) {
    textQueue.push(text);
    waitsQueue.push(waitTime);
    vscode.window.showInformationMessage('isruning:' + isruning + '|text:' + text)
    if (isruning) {
        vscode.window.showInformationMessage('sending \\n ing.')
        sendQueuedText('\n', 2000);
        return;
    } else {
        if (GoOut_start && GoOut) {
            vscode.window.showInformationMessage('GoOut ing!'
                + '\n|text:' + text
                + '\n|waitTime:' + waitTime
                + '\n|GoOut:' + GoOut
                + '\n|isruning:' + isruning);
            setTimeout(focus, waitTime);
        };
    };
}

function queueLoop() {
    if (textQueue.length > 0) {
        isruning = true;
    } else {
        isruning = false;
    };
    if (textQueue.length > 0 && pythonTerminal !== null && pythonTerminal._queuedRequests.length === 0) {
        GoOut_start = true;
        const text = textQueue.shift();
        const waitTime = waitsQueue.shift();
        pythonTerminal.sendText(text);
        setTimeout(queueLoop, waitTime);
    } else {
        setTimeout(queueLoop, 50);
    };
}

function updateFilename(filename) {
    currentFilename = filename;
    sendQueuedText(`__file__ = r'${filename}'`)
    sendQueuedText('import sys')
    sendQueuedText('import os')
    sendQueuedText(`os.chdir(os.path.dirname(r'${filename}'))`)
    sendQueuedText('sys.path.append(os.path.dirname(__file__))')
}


function activate(context) {
    vscode.window.onDidCloseTerminal(function (event) {
        if (event._name === pythonTerminalName) {
            removePythonTerminal();
        }
    });

    queueLoop();

    let sendSelectedToIPython = vscode.commands.registerCommand('ipython.sendSelectedToIPython', function () {
        if (pythonTerminal === null) {
            createPythonTerminal();
        }
        const editor = vscode.window.activeTextEditor;
        const filename = editor.document.fileName;
        if (filename !== currentFilename) {
            updateFilename(filename);
        }

        // get selection & get snippet
        const selection = editor !== undefined ? editor.selection : undefined;
        if (editor === undefined || selection === undefined || selection.isEmpty) {
            let startLine, endLine;
            if (editor.selection.isEmpty) {
                startLine = editor.selection.active.line + 1
                endLine = startLine;
            } else {
                startLine = editor.selection.start.line + 1;
                endLine = editor.selection.end.line + 1;
            }
            const command = `%load -r ${startLine}-${endLine} ${filename}`;
            sendQueuedText(command);
        } else {
            const selectedText = editor.document.getText(selection);
            sendQueuedText(selectedText.toString());
        };
        if (GoOut_start) {
            sendQueuedText('\n', 256, true);
        }
        pythonTerminal.show();
    });

    let sendFileContentsToIPython = vscode.commands.registerCommand('ipython.sendFileContentsToIPython', function () {
        if (pythonTerminal === null) {
            createPythonTerminal();
        }

        const editor = vscode.window.activeTextEditor;
        const filename = editor.document.fileName;
        if (filename !== currentFilename) {
            updateFilename(filename);
        }

        sendQueuedText(`%load ${filename}`, 100);
        if (GoOut_start) {
            sendQueuedText('\n', 256, true);
        }
        pythonTerminal.show();
    });

    context.subscriptions.push(sendSelectedToIPython);
    context.subscriptions.push(sendFileContentsToIPython);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;