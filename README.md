使用示例：

![](https://img-blog.csdnimg.cn/20200327210021294.gif)


---

## 工具简介

鸣谢：
- 特别感谢开源的原始开发者，我仅因个人写markdown文档需要，本插件修改个性化使用。原作链接：[IPython for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)

个性化修改：
- 设置可选设置：运行时在ipython初始化中是否加载进入到编辑文件所在文件夹去运行（可方便读取同级文件夹文件）。
- 设置可选设置：在ipython运行代码后，是否设置直接返回聚焦于文档的编辑窗口。
- 设置可选设置：是否使用ipython从文件读取行的命令`%load -r`直接将选择内容相关直接发送至ipython终端，否则直接发送选择内容。

功能简介：
- 将活动窗口的文本发送到ipython运行，可以配合markdown快速书写文档及pythoncode。


## 使用方法

当前它包括两个命令：
- ipython.sendFileContentsToIPython  
  会将完整的文件内容发送到打开的ipython实例中（如果没有打开，则发送一个新的实例）
- ipython.sendSelectedToIPython  
  将选定的行或光标所在的行发送到打开的ipython实例（如果没有打开，则发送新的行，该命令默认绑定`ctrl+enter`）

限制：
- 只有一个ipython实例可以工作，不能同时有多个。

<br>

---

## Introduction
Acknowledgements:
- Special thanks to the original developers of open source. I personally need to modify this plugin for personally writing markdown documents.Original link: [IPython for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)

Personalized modification differences:
- Set optional settings: When running, load in ipython initialization and enter the folder where the edit file is located to run (you can easily read the folder file at the same level).
- Set optional settings: After running the code in ipython, whether to set to directly return to the editing window focusing on the document.
- Set optional setting: Whether to use ipython command `% load -r` to read the line from the file, directly send the selection to the ipython terminal, otherwise send the selection directly.

Function introduction:
- Send the text of the active window to ipython to run. It can cooperate with markdown to quickly write documents and pythoncode.

## Usage

Currently it includes two commands:
- ipython.sendFileContentsToIPython  
  Will send the complete file contents into the open ipython instance (or a new one if none is open)
- ipython.sendSelectedToIPython  
  Will send the selected lines, or the one where the cursor is, to the open ipython instance (or a new one if none is open; This command is bound to `ctrl + enter` by default)


Limitations: 
- Only one ipython instance will work, can't have multiple at the same time.