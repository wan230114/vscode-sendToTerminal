# `Ipython Run` 使用文档

---
## 使用示例

![](https://img-blog.csdnimg.cn/20200327210021294.gif)

(示例中，设置了用户快捷键 `ctrl+enter` 作为命令 `ipython.sendSelectedToIPython` 的启动。)  

---
## 工具简介
**鸣谢：**
- 首先特别鸣谢开源的原始开发者及其贡献项目([pancho111203 / vscode-ipython](https://github.com/pancho111203/vscode-ipython))；原作链接：[IPython for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)
- 因写关于 Python 代码的 markdown 文档需要，特此修改插件以便个性化使用。

**功能简介：**
- 将活动窗口的文本发送到`ipython`运行，可以配合markdown快速书写python文档。

**个性化修改：**
- 设置可选：在`ipython`运行代码后，是否设置直接返回聚焦于文档的编辑窗口。
- 设置可选：运行时在`ipython`初始化中是否自动加载进入到编辑文件所在文件夹去运行（可方便读取不同级文件夹文件）。
- 设置可选：是否通过使用`ipython`的命令`%load -r`直接将选择内容相关发送至`ipython`终端，否则仅发送选择文本内容。
- 设置可选：发送前可以选择是否自动保存，此选项配合`ipython`语法`load`的使用。
- 设置可选：发送后是否让光标自动切换到下一行，方便更为快捷 `文件`-->`终端` 的交互。


---

## 使用方法

当前它包括两个命令：
- `ipython.sendFileContentsToIPython`: 会将完整的文件内容发送到打开的ipython实例中（如果没有打开，则发送一个新的实例）
- `ipython.sendSelectedToIPython`: 将选定的行或光标所在的行发送到打开的ipython实例（如果没有打开，则发送新的行）

限制：
- 只有一个ipython实例可以工作，不能同时有多个。因此特别需要注意，在切换文件使用时，对于环境变量的控制。


---

## 更新日志Changelogs

---

### v0.6.1 (2020-08-30)

**BUG修复**
- [x] 更新功能选项的说明及README文档。
- [x] 修复`ipython`命令`# %load`后，会多进行一行换行的BUG。

---

### v0.6.0 (2020-08-30)

**功能新增**

- [x] 增加可选选项，发送前可以选择自动保存，以配合ipython语法`load`的使用。
- [x] 增加可选选项，发送后光标自动切换到下一行，方便更为快捷的交互。

---

### v0.5.7 -- v0.5.9

**界面及描述优化**
- [x] 使用方法的动画制作
- [x] 更新文字语言描述
- [x] 更新及美化图标

---
### v0.5.6 (2020-03-30)

**BUG 修复**

- [x] 修复了有关末尾输入`\n`时终端无法自动执行的问题。


---
### v0.5.5 (2020-03-27)

**BUG 修复**

- [x] 修复输入ipython后因加载超时不运行的问题。

---
### v0.5.4 (2020-03-27)

**功能新增**
- [x] 设置可选设置：是否使用ipython从文件读取行的命令`%load -r`直接将选择内容相关直接发送至ipython终端，否则直接发送选择内容。

---
### v0.5.3 (2020-03-27)

**功能新增**
- [x] 设置可选设置：运行后可以设置直接返回文档编辑窗口
- [x] 设置可选设置：可直接将选择内容直接发送至ipython终端


<br>

---

# `Ipython Run` documentation

---
## Usage example

![](https://img-blog.csdnimg.cn/20200327210021294.gif)

(In the example, the user shortcut key `ctrl+enter` is set as the start of the command `ipython.sendSelectedToIPython`.)

---
## Tool Introduction

**Thanks:**
- First of all, special thanks to the original open source developers and their contributions ([pancho111203 / vscode-ipython](https://github.com/pancho111203/vscode-ipython)); original link: [IPython for VSCode-Visual Studio Marketplace] (https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)
- Due to the need to write markdown documents about Python code, the plugin is hereby modified for personalized use.

**Function introduction:**
- Send the text of the active window to `ipython` to run, and you can quickly write python documents with markdown.

**Personalized modification:**
- Optional setting: whether to set to directly return to the editing window focused on the document after running the code in `ipython`.
- Optional setting: whether to automatically load into the folder where the edited file is located during the initialization of `ipython` during runtime to run (it is convenient to read files in different folders).
- Optional setting: Whether to directly send the selected content to the terminal of `ipython` by using the command `%load -r` of `ipython`, otherwise only the selected text content will be sent.
- Optional setting: You can choose whether to save automatically before sending. This option is used with the `ipython` syntax `load`.
- Optional setting: Whether to make the cursor automatically switch to the next line after sending, which is convenient and quicker to interact with `File`-->`Terminal`.


---

## Instructions

Currently it includes two commands:
- `ipython.sendFileContentsToIPython`: will send the complete file content to the opened ipython instance (if not opened, send a new instance)
- `ipython.sendSelectedToIPython`: Send the selected line or the line where the cursor is located to the opened ipython instance (if it is not open, then send a new line)

Limit:
- Only one ipython instance can work, not multiple instances at the same time. Therefore, special attention should be paid to the control of environment variables when switching files.


---

## Changelogs

---

### v0.6.1 (2020-08-30)

**BUG fix**
- [x] Update the description of the function options and the README document.
- [x] Fix the bug that after the `ipython` command `# %load`, there will be one more line wrap.

---

### v0.6.0 (2020-08-30)

**New features**

- [x] Add optional options, you can choose to automatically save before sending to match the use of ipython syntax `load`.
- [x] Add optional options, the cursor will automatically switch to the next line after sending, which is convenient and faster for interaction.

---
### v0.5.7 - v0.5.9

**Interface and description optimization**
- [x] How to use animation
- [x] Update text language description
- [x] Update and beautify icons

---

### v0.5.6 (2020-03-30)

**BUG fix**

- [x] Fixed the problem that the terminal cannot be executed automatically when `\n` is entered at the end.


---

### v0.5.5 (2020-03-27)

**BUG fix**

- [x] Fix the problem that ipython does not run due to loading timeout after inputting ipython.

---

### v0.5.4 (2020-03-27)

**New features**
- [x] Set optional settings: whether to use the command `%load -r` to read lines from the file using ipython to directly send the selected content directly to the ipython terminal, otherwise directly send the selected content.

---

### v0.5.3 (2020-03-27)

**New features**
- [x] Set optional settings: After running, you can set and directly return to the document editing window
- [x] Set optional settings: you can send the selected content directly to the ipython terminal