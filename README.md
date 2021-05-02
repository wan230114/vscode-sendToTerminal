# `Terminal Run` 使用文档

---
## 使用示例

![](https://img-blog.csdnimg.cn/20200327210021294.gif)

(示例中，设置了用户快捷键 `ctrl+enter` 作为命令 `terminal.sendSelectedToTerminal` 的启动。)  

---
## 工具简介
**鸣谢：**
- 首先特别鸣谢开源的原始开发者及其贡献项目([pancho111203 / vscode-ipython](https://github.com/pancho111203/vscode-ipython))；原作链接：[ipython for VSCode - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)
- 因编辑端与终端交互需要，特此修改插件以便个性化使用。

**功能简介：**
- 将活动窗口的文本发送到`terminal`运行。

**个性化修改：**
- 设置可选：在`terminal`运行代码后，是否设置直接返回聚焦于文档的编辑窗口。
- 设置可选：运行时在`terminal`初始化中是否自动加载进入到编辑文件所在文件夹去运行（可方便读取不同级文件夹文件）。
- 设置可选：发送前可以选择是否自动保存，此选项配合`terminal`语法`load`的使用。
- 设置可选：发送后是否让光标自动切换到下一行，方便更为快捷 `文件`-->`终端` 的交互。

**后续改进计划**
- [ ] 增加类似于Jupyter的Cell功能，一次性将一个Cell以`{commands}`形式发送至终端。
  - [ ] 开发 `{ \n commands \n }` 块读取形式，新增一条命令，自动发送该块。
  - [ ] 开发 `#%% \n commands \n #%%` 类似Jupyter Cell形式（难度较高，暂无时间弄~）
- [x] 增加光标自动跳过注释行的功能，比如下一列是注释，运行后可设置直接跳过。
- [ ] 增加自动判断shell的基本循环语句块，如`do/then/...`

---

## 使用方法

当前它包括一个命令：
- `terminal.sendSelectedToTerminal`: 将选定的行或光标所在的行发送到打开的terminal实例（如果没有打开，则发送新的行）


---

## 更新日志Changelogs

### v0.0.3 (2021-02-09)

**功能优化**
> - [x] 自动跳过注释行和空行。

### v0.0.2 (2021-02-08)

**修复BUG**
> - [x] 修复更新 vscode `January 2021 (version 1.53)` 后无法正常使用的BUG。

**功能优化**
> - [x] 选中状态下，不自动跳转下一行。


### v0.0.1 (2020-12-13)

**第一次新版本发布**
> - [x] 设置可选：在`terminal`运行代码后，是否设置直接返回聚焦于文档的编辑窗口。
> - [x] 设置可选：运行时在`terminal`初始化中是否自动加载进入到编辑文件所在文件夹去运行（可方便读取不同级文件夹文件）。
> - [x] 设置可选：发送前可以选择是否自动保存，此选项配合`terminal`语法`load`的使用。
> - [x] 设置可选：发送后是否让光标自动切换到下一行，方便更为快捷 `文件`-->`终端` 的交互。

<br>

---

# `Terminal Run` documentation

---
## Usage example

![](https://img-blog.csdnimg.cn/20200327210021294.gif)

(In the example, the user shortcut key `ctrl+enter` is set as the start of the command `terminal.sendSelectedToTerminal`.)

---
## Tool Introduction
**Thanks:**
- First of all, special thanks to the original open source developers and their contributions ([pancho111203 / vscode-ipython](https://github.com/pancho111203/vscode-ipython)); original link: [ipython for VSCode-Visual Studio Marketplace] (https://marketplace.visualstudio.com/items?itemName=pancho111203.vscode-ipython)
- Due to the interaction between the editor and the terminal, the plugin is hereby modified for personalized use.

**Function introduction:**
- Send the text of the active window to `terminal` to run.

**Personalized modification:**
- Optional setting: After running the code in `terminal`, whether to set to return directly to the editing window focused on the document.
- Optional setting: whether to automatically load into the folder where the edited file is located during the initialization of `terminal` during runtime (it is convenient to read files in different levels of folders).
- Optional settings: you can choose whether to save automatically before sending. This option is used in conjunction with the `terminal` syntax `load`.
- Optional setting: whether to make the cursor automatically switch to the next line after sending, which is convenient and quicker to interact with `File`-->`Terminal`.

**Follow-up improvement plan**
- [ ] Added cell function similar to Jupyter, sending a cell to the terminal in the form of `{commands}` at a time.
  - [ ] Developed `{ \n commands \n }` block reading form, added a new command, and automatically sent the block.
  - [ ] Develop `#%% \n commands \n #%%` Cell format (the difficulty is high, there is no time to get it~)
- [x] Add the function that the cursor automatically skips the comment line. For example, the next column is a comment, and it can be set to skip directly after running.
- [ ] Add basic loop statement block that automatically judges shell, such as `do/then/...`

---

## Instructions

Currently it includes a command:
- `terminal.sendSelectedToTerminal`: Send the selected line or the line where the cursor is located to the opened terminal instance (if it is not open, send a new line)


---

## Changelogs

### v0.0.3 (2021-02-09)

**Function optimization**
> - [x] Automatically skip comment lines and blank lines.

### v0.0.2 (2021-02-08)

**Fix BUG**
> - [x] Fix the bug that vscode cannot be used normally after updating vscode `January 2021 (version 1.53)`.

**Function optimization**
> - [x] When selected, do not automatically jump to the next line.


### v0.0.1 (2020-12-13)

**First new version released**
> - [x] Setting is optional: After running the code in `terminal`, whether to set to return to the editing window focused on the document.
> - [x] Optional setting: Whether to automatically load into the folder where the edited file is located during the initialization of `terminal` during runtime (it is convenient to read files in different levels of folders).
> - [x] Setting is optional: you can choose whether to save automatically before sending. This option is used in conjunction with the `terminal` syntax `load`.
> - [x] Setting is optional: whether to let the cursor automatically switch to the next line after sending, which is convenient and quicker to interact with `File`-->`Terminal`.
