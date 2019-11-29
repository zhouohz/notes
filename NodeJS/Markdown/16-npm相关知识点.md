## npm

node package manager

官网：https://www.npmjs.com/

npm 指令下载的包都是这个网站上面的，由其开发者放上去的，我们也可以自己写一个包放上去，由别人下载使用

安装node时，会自动安装上npm

查看npm的版本：npm --version

升级npm：npm install npm --global

## package.json文件说明

npm 下载的时候，会把需要的包以及这个包的所有依赖的包都下载下来，所以 node_modules 目录里面的文件是很多很乱的。这时就需要一个说明性的文件，在下载包的时候附上 `--save` 命令就可以将下载的包的信息保存在 一个叫 package.json 的文件中，这里面只会记录想要下载的包的信息，而它的依赖包不会记录

建议每个项目都要有一个 package.json 文件，称为包描述文件

这个文件可以手动创建，但不推荐。而是在根目录下使用 npm init 命令生成。该命令执行后会以问答的形式出现一些基础信息设置，不想填写的信息可以直接回车跳过其中比较关键的是main属性，它可以告诉使用者，这个项目应该执行哪个文件。安装第三方包时，会保存在 dependencies 属性中（补充 npm init -y 可以跳过设置向导生成package.json文件） 

这个文件还有一个特别有用的地方就是，当 node_modules 文件夹被破坏会删除时，可以通过 npm install 命令直接下载所有保存的包，而不用自己一个一个再去下载。所以，我们上传项目的时候，通常都是过滤掉 node_modules 目录的，clone 到本地后自行下载