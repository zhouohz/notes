# CSS reset

不同浏览器内置的标签的默认样式不同，为了消除这个差异性，在布局之前要清除标签的默认样式。

如京东的CSS Reset代码

```css
*{margin:0;padding:0}
em,i{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
button{cursor:pointer}
a{color:#666;text-decoration:none}
a:hover{color:#c81623}
button,input{font-family:Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif}
body{-webkit-font-smoothing:antialiased;background-color:#fff;font:12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;color:#666}
.hide,.none{display:none}
.clearfix:after{visibility:hidden;clear:both;display:block;content:".";height:0}
.clearfix{*zoom:1}
```

注释：

1. img的border:0是为了照顾低版本浏览器
2. "\5B8B\4F53" 指的是宋体，写成Unicode编码是为了避免浏览器解析CSS代码的时候出现乱码，避免使用中文
3. -webkit-font-smoothing:antialiased该属性是CSS3新增的，可以防止字体出现锯齿