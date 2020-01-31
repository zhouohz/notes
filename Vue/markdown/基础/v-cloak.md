## v-cloak

问题: 在 Vue 实例完全接管视图之前, 模板代码可能会显示在页面中, 等 Vue 解析完成后, 页面闪烁渲染正式的视图

用法: 

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>

<div id="demo" v-cloak>
  {{message}}
</div>

<script>
  setTimeout(function() {
    new Vue({
      el: '#demo',
      data: {
        message: 'hello world'
      }
    })
  }, 1000)
</script>
```