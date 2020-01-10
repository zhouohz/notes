## Template inheritance

**standard syntax**

```html
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

**original syntax**

```html
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

Template inheritance allows you to build a basic templating "skeleton(骨架)" that contains common parts of your site. Example:

```html
<!--layout.art-->
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{block 'title'}}My Site{{/block}}</title>

  {{block 'head'}}
  <link rel="stylesheet" href="main.css">
  {{/block}}
</head>
<body>
  {{block 'content'}}{{/block}}
</body>
</html>
```

```html
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
<link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

After rendering index.art, layout skeleton will be automatically applied.

## Summary

语法: 

1. `{{ block 'xxx' }} 默认内容 {{ /block }}` 相当于在模板中"挖个坑", 由继承者在这个坑里添加自定义内容
2. `{{ extend '相对路径' }}` 继承路径指向的模板
3. `{{ block 'xxx' }} 自定义内容 {{ /block }}` 继承者在坑里添加自定义内容
