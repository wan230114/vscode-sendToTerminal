# Introduction

>感谢原始开发者，我仅修改个性化使用。<br/>
>因学习需要，需要让运行的代码能在脚本当前文件夹运行。<br/><br/>
>原始参考链接：<br/>
>IPython for VSCode - Visual Studio Marketplace<br/>
>https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython

Run in the same directory as the file.


## Usage

Currently it includes two commands:
- ipython.sendFileContentsToIPython
  Will send the complete file contents into the open ipython instance (or a new one if none is open)
- ipython.sendSelectedToIPython
  Will send the selected lines, or the one where the cursor is, to the open ipython instance (or a new one if none is open)


## Limitations

Only one ipython instance will work, can't have multiple at the same time.