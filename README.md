# Introduction
鸣谢：
- 特别感谢开源的原始开发者，我因个人写markdown文档需要，本插件修改个性化使用。原作链接：[IPython for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)

功能简介：
- 将活动窗口的文本发送到ipython运行，可以配合markdown快速书写文档及pythoncode。


当前版本：`0.5.3`，更新内容如下：
- 设置可选设置：运行后可以设置直接返回文档编辑窗口
- 设置可选设置：可直接将选择内容直接发送至ipython终端


# Usage

Currently it includes two commands:
- ipython.sendFileContentsToIPython
  Will send the complete file contents into the open ipython instance (or a new one if none is open)
- ipython.sendSelectedToIPython
  Will send the selected lines, or the one where the cursor is, to the open ipython instance (or a new one if none is open)


# Limitations

Only one ipython instance will work, can't have multiple at the same time.