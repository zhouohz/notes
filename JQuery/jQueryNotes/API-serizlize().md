## .serialize()

`Description:` Encode a set of form elements as a string for submission(提交).

This method does not accept any arguments.

The `.serialize()` method creates a text string in standard URL-encoded notation(符号, 注释). It can act on a jQuery object that has selected individual(个体) form controls(表单控件), such as `<input>`, `<textarea>`, and `<select>`: `$( "input, textarea, select" ).serialize()`;

It is typically(通常) easier, however, to select the `<form>` itself for serialization.

```javascript
$( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  console.log( $( this ).serialize() );
});
```

In this case, jQuery serializes the "successful controls" within the form. Only form elements are examined(检查) for inputs they contain, in all other cases the input elements to be serialized should be part(部分) of the set(集合) passed(传递) to the `.serialize()` method. Selecting both the form and its children in a set will cause(导致) duplicates(重复) in the serialized string.

Note: Only "successful controls" are serialized to the string. No submit button value is serialized since(因为) the form was not submitted using a button. For a form element's value to be included in the serialized string, the element must have a `name` attribute. Values from checkboxes and radio buttons (input of type "radio" or "checkbox") are included only if they are checked. Data from file select elements is not serialized.

### Example

Serialize a form to a query string that could be sent to a server in an Ajax request.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>serialize demo</title>
  <style>
  body, select {
    font-size: 12px;
  }
  form {
    margin: 5px;
  }
  p {
    color: red;
    margin: 5px;
    font-size: 14px;
  }
  b {
    color: blue;
  }
  </style>
  <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
</head>
<body>
 
<form>
  <select name="single">
    <option>Single</option>
    <option>Single2</option>
  </select>
 
  <br>
  <select name="multiple" multiple="multiple">
    <option selected="selected">Multiple</option>
    <option>Multiple2</option>
    <option selected="selected">Multiple3</option>
  </select>
 
  <br>
  <input type="checkbox" name="check" value="check1" id="ch1">
  <label for="ch1">check1</label>
  <input type="checkbox" name="check" value="check2" checked="checked" id="ch2">
  <label for="ch2">check2</label>
 
  <br>
  <input type="radio" name="radio" value="radio1" checked="checked" id="r1">
  <label for="r1">radio1</label>
  <input type="radio" name="radio" value="radio2" id="r2">
  <label for="r2">radio2</label>
</form>
 
<p><tt id="results"></tt></p>
 
<script>
  function showValues() {
    var str = $( "form" ).serialize();
    $( "#results" ).text( str );
  }
  $( "input[type='checkbox'], input[type='radio']" ).on( "click", showValues );
  $( "select" ).on( "change", showValues );
  showValues();
</script>
 
</body>
</html>
```

**result:** 'single=Single&multiple=Multiple&multiple=Multiple3&check=check2&radio=radio1'

### Summary

1. $(任意个表单控件 或 表单自身).serialize(). 通常直接序列化整个表单.
2. 被序列化的表单必须有值和 `name` 属性, 且能被成功提交
3. 序列化了表单自身就不能再添加它的子控件, 否则序列会有重复项
4. 不会将提交按钮的值添加到序列中
5. 单选和复选表单只会序列被选中的值
6. file 表单选择的文件不会被序列化
7. 键值对之间通过 `&` 符连接. 在发送 Ajax 请求的时候很好用. 不用自己拼接查询字符串.