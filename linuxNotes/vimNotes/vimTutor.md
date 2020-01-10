## Lesson 1.1 moving the cursor

** To move the cursor, press the hjkl keys as indicated. **

按住不放可以连续移动

注意: 如果你忘记按了什么键或者按错了就按 <ESC> 回到 Normal mode

## Lesson 1.2 exiting vim

首先,按 <ESC> 确保你在 Normal mode 中

Type :q! <ENTER> 离开vim编辑器,DISCARDING 所有做了的更改

## Lesson 1.3 text editing - deletion

** Press x to delete the character under the cursor. **

删除光标覆盖的那个字符

## Lesson 1.4 text editing - insertion

** Press i to insert text. **

按 i 在光标覆盖字符的前面进入插入模式,完成之后 <ESC> 回到Normal mode

## Lesson 1.5 text editing - appending

** Press A to append text. **

将光标移到那行的任意一个字符上,按 A 就会在行尾进入插入模式

## Lesson 1.6 editing a file

** Use :wq to save a file and edit. **

保存并退出 vim

在终端中 vim 命令可以开始编辑文件

## Lesson 1 summary

1. h-left j-down k-up l-right
2. vim FILENAME <ENTER> 开启 vim 编辑
3. :q! 放弃更改退出, :wq 保存更改退出
4. x 删除一个字符
5. i 在光标前进入插入模式. A 在行尾进入插入模式
6. <ESC> 可以回到Normal mode,或者取消未完成的命令

## Lesson 2.1 deleting commands

** Type dw to delete a word. **

从光标处删到下一个单词开头

按d后屏幕下方会显示d,等待输入一个motion

## Lesson 2.2 more deletion commands

** Type d$ to delete to the end of the line. **

从光标处删到行尾.

## Lesson 2.3 on operators and motions

许多更改文本的命令都是由一个 operator 和一个 motion 组成的.

d 就是 delete operator

motion 就是 operator 将要操作的内容

常见的motions:

- w 光标到下一个单词头
- e 光标到当前单词尾
- $ 光标到行尾

如果单用motion,就会移动光标

## Lesson 2.4 using a count for a motion

** Typing a number before a motion repeats it that many times. **

数字 + motion 相当于按多次 motion.如 2w 3e 等等

o 移到行首

## Lesson 2.5 using a count to delete more

** Typing a number with an operator repeats it that many times. **

在 operator 与 motion 之间添加number 相当于连续操作多个motion的内容

## Lesson 2.6 operator on lines

** Type dd to delete a whole line. **

由于删除整行的操作常用使用,所以,vi的设计者将这个指令设计的非常简单

dd 删除整行

numberdd 删除多行(光标所在行及其下面紧邻的行)

## Lesson 2.7 the undo command

** Press u to undo the last commands, U to fix a whole line. **

u 撤销上一个执行的命令

U 还原这行所有的更改,回到最初的状态

CTRL-R 还原上一次撤销

## Lesson 2 summary

1. 删到下一个单词开头 dw
2. 删到行尾 d$
3. 删除整行 dd
4. 重复多次motion 2w
5. 更改命令的格式 operator [number] motion
6. 光标到行首 0
7. 撤销上一个行为 u
8. 撤销整行的更改 U
9. 撤销 u 或 U 命令 CTRL-R

## Lesson 3.1 the put command

** Type p to put previously deleted text after the cursor. **

vim 的删除会将内容保存在vim的寄存器中

按 p 会将内容粘贴光标的后面

如果删除的是一行(dd)则会将内容粘贴在光标的下一行

## Lesson 3.2 the replace command

** Type rx to replace the character at the cursor with x. **

将光标移到需要修改的字符上,按 r 然后输入将要更改的字符

按了r之后旧的字符不会消失,直接用新字符替换

## Lesson 3.3 the change operator

** To change until the end of a word, type ce. **

c 会删除motion的内容并进入插入模式

它相较于删除+插入的好处是,光标会在原位进入插入模式

## Lesson 3.4 more changes using c

** The change operator is used with the same motions as delete. **

c [number] motion

ce c$ 等等

## Lesson 3 summary

1. 按p可以粘贴上次被删除的内容,在光标的后面或者新起一行
2. r 可以替换一个字符
3. c 删除并插入
4. c [number] motion

## Lesson 4.1 cursor location and file status

** Type CTRL-G to show your location in the file and the file status. Type G to move to a line in the file. **

Hold down the Ctrl key and press g. We call this CTRL-G.

A message will appear at the bottom of the page with the filename and the position in the file. 

Press G to move you to the bottom of the file.

Type gg to move you to the start of the file.

Type the number of the line you were on and then G. This will return you to the line you were on when you first pressed CTRL-G

## Lesson 4.2 the search command

** Type / followed by a phrase to search for the phrase. **

In Normal mode type the / character. Notice that it and the cursor appear at the bottom of the screen as with the : command.

To search for the same phrase again, simply type n.

To search for the same phrase in the opposite direction, type N.

To searcg for a phrase in the backward direction, use ? instead of /.

To go back to where you came from press CTRL-O. Repeat to go backfurther. CTRL-I goes forward.

## Lesson 4.3 matching parentheses search

** Type % to find a matching ), ], or }. **

Place the cursor on any (, [, { in a line. Then type the % character. The cursor will move to the matching parentheses or bracket

Move the cursor to another (, ), [, ], {, } and see what % does

NOTE: This is very useful in debugging a program with unmatched parentheses!

## Lession 4.4 the substitute command

** Type :s/old/new/g to substitute 'new' for 'old'. **

Type :s/thee/the <ENTER> . Note that this command only changes the first occurrence of 'thee' in the line.

Type :s/thee/the/g <ENTER> .Adding the g flag means to substitute globally in the line, change all occurrences of 'thee' in the line.

To change every occurrence of a character string between two lines, type :#,#s/old/new/g where #,# are the line number of the range of lines where the substitution is to be done.

Type :%s/old/new/g to change every occurrence in the whole file.

Type :%s/old/new/gc to find every occurrence in the whole file, with a prompt whether to substitute or not.

## Lesson 4 summary

1. CTRL-G display your location in the file and the file status.
   G moves to the end of the file.
   number G moves to that line number.
   gg moves to the first line.
2. Typing / followed by a phrase searches FORWARD for the phrase.
   Typing ? followed by a phrase searches BACKWARD for the phrase.
   After a search type n to find the next occurrence in the same direction or N to search in the opposite direction.
   CTRL-O takes you back to older positions, CTRL-I to newer positions.
3. Typing % while the cursor is on a (, ), [, ], {, } goes to its match.
4. To substitute new for the first old in a line type :s/old/new
   To substitute new for all 'old's on a line type :s/old/new/g
   To substitute phrases between two line #'s type :#,#s/old/new/g
   To substitute all occurrences in the file type :%s/old/new/g
   To ask for confirmation each time add 'c' :%s/old/new/gc

## Lesson 5.1 how to execute an external command

** Type :! followed by an external command to execute that command. **

Type the familiar command : to set the cursor at the bottom of the screen. This allows you to enter a command-line command.

Now type the ! character. This allows you to execute any external shell command.

As an example type ls following the ! and then hit <ENTER>. This will show you a listing of your directory, just as if you were at the shell prompt

NOTE: It is possible to execute any external command this way, also with arguments.

NOTE: All : commands must be finished by hitting <ENTER>.

## Lesson 5.2 more on writing files

** To save the changes made to the text, type :w FILENAME **

Type :!ls <ENTER> to get a listing of your directory.

Choose a filename that does note exist yet, such as TEST.

Now type :w TEST

This saves the whole file (the vim Tutor) under the name TEST.To verify this ,type :!ls again to see your directory.

NOTE: If you were to exit vim and start it again with vim TEST, the file would be an exact copy of the tutor when you saved it.

Now remove the file by typing :!rm TEST

## Lesson 5.3 selecting text to write

** To save part of the file, type v motion :w FILENAME **

Move the cursor to this line.

Press v and move the cursor to the fifth item below. Notice that the text is highlighted.

Press the : character. At the bottom of the screen :'<,'> will appear.

Type w TEST, where TEST is a filename that does not exist yet. Verify that you see :'<,'>w TEST before you press <ENTER>.

Vim will write the selected lines to the file TEST. Use :!ls to see it. Do not remove it yet! We will use it in the next lesson.

NOTE: Pressing v starts visual selection. You can move the cursor around to make the selection bigger or smaller. Then you can use an operator to do something with the text. For example, d deletes the text.

## Lesson 5.4 retrieving and merging files

** To insert the contents of a file, type :r FILENAME **

将 FILENAME 中的内容读取到光标所在行的下方

注意: 它也能读取外部命令的输出内容,如 :r !ls 会将ls的输出读到光标下面

## Lesson 5 summary

1. :!command 执行一个外部命令.如 :!ls :!rm FILENAME 等等
2. :w FILENAME 将当前文件中的内容及改动写入到新的FILENAME文件中
3. v motion :w FILENAME 保存可视化选中的内容到FILENAME文件中
4. :r FILENAME 检索硬盘中的文件FILENAME,将其内容粘贴到光标下方
5. :r !ls 将ls命令的输入内容粘贴到光标下方

## Lesson 6.1 the open command

** Type o to open a line below the cursor and place you in Insert mode.**

To open up a line above the cursor, simple type a capital O, rather than a lowercase o. 

## Lesson 6.2 the append command

** Type a to insert text after the cursor.**

在光标的后面进入插入模式,配合 e 使用(移动到单词最后一个字符上)

NOTE: a, i and A all go to the same Insert mode, the only difference is where the character are inserted.

## Lesson 6.3 another way to replace

** Type a capital R to replace more than one character. **

R 会进入 Replace mode 

替换光标覆盖的字符之后,光标会自动向后移动继续替换,直到按下 <ESC>

替换模式跟插入模式相似,但是每一个新键入的字符会删除一个存在的字符

## Lesson 6.4 copy and paste text

** Use the y operator to copy text and p to paste it **

y 是 yank 的意思

按v进入 Visual mode 选择文本,按 y 进行复制,然后将光标移到想要粘贴的位置按p(会粘贴在光标的后面)

j$ 移到下一行的行尾.可以当个短语记一下

注意: 你也能将y当作一个operator,如 yw 能 yank 一个单词

## Lesson 6.5 set option

** set an option so a search or substitute ignores case **

搜索一个文本使用 /text <ENTER>

按n搜索下一个 N 搜索上一个

此时输入 :set ic 可以检索到 Text 以及 TEXT.(ic === ignore case)

输入 :set hls 可以高亮选中的内容(hlsearch), :set is 开启实时查找预览(incsearch)

不想忽略大小写就 :set no ic

清除高亮就 :set nohls

如果就本次搜索想要忽略大小写就 /text\c

## Lesson 6 summary

1. Type o to open a line BELOW the cursor and start Insert mode.
   Type O to open a line ABOVE the cursor
2. Type a to insert text after the cursor
   Type A to insert text after the end of the line.
3. The e command moves to the end of a word.
4. The y operator yanks(copies) text, p puts(pastes) it.
5. Typing a capital R enters Replace mode until <ESC> is pressed.
6. Typing :set xxx sets the option xxx. Some options are:
   ic ignorecase ignore upper/lower case when searching
   is incsearch show partial matches for a search phrase
   hls hlsearch highlight all matching phrase
   You can either use the long or the short option name.
7. Prepend 'no' to switch an option off. eg: :set noic

## Lesson 7.1 getting help

** Use the on-line help system **

Vim has a comprehensive on-line help system. To get started, try one of these three:

- press the <HELP> key
- press the <F1> key
- type :help <ENTER>

Read the text in the help window to find out how the help works.

Type CTRL-W CTRL-W to jump from one window to another.

Type :q <ENTER> to close the help window.

eg: :help w <ENTER> 

## Lesson 7.2 create a startup script

** Enable Vim features **

Vim 有许多特点相比较与vi,但是绝大多数默认不可以使用.想要使用更多的特性,你必须创建一个 'vimrc' 文件

:e! ~/.vimrc

阅读 vimrc 文件的示例

:r $VIMRUNTIME/vimrc_example.vim

获得更多的信息 :help vimrc-intro

## Lesson 7.3 completion

** Command line completion with CTRL-D and <TAB> **

Make sure vim is not in compatibal mode: :set nocp

Type the start of a command :e

Press CTRL-D and vim will show a list of commands that start with "e"

Type d<TAB> and vim will complete the command name to :edit

Now add a space and the start of an existing file name :edit FIL

Press <TAB>. Vim will complete the name(if it is unique)

## Lesson 7 summary

1. Type :help or press <F1> or <HTLP> to open a help window
2. Type :help cmd to find help on cmd
3. Type CTRL-W CTRL-W to jump to another window
4. Type :q to close the help window
5. Crease a vimrc startup script to keep your preferred setting.
6. When typing a : command, press CTRL-D to see possible completions. Press <TAB> to use one completion.

## :help user-manual 看更多设置
