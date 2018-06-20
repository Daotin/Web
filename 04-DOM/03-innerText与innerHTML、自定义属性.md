> 大家好，这里是「 Daotin的梦呓 」从零开始学 Web 系列教程。此文首发于「 Daotin的梦呓 」公众号，欢迎大家订阅关注。在这里我会从 Web 前端零基础开始，一步步学习 Web 相关的知识点，期间也会分享一些好玩的项目。现在就让我们一起进入 Web 前端学习的冒险之旅吧！



# 一、兼容代码
## 1、封装 innerText 和 TextContent

```javascript
// 设置任意标签的文本内容为任意内容
        function setText(element, text) {
            (typeof element.TextContent === "undefined") ? (element.innerText = text) : (element.textContent = text);
        }

        // 获取任意标签的文本内容
        function getText(element) {
            return (typeof element.TextContent === "undefined" ? element.innerText : element.textContent);
        }

// 示例代码
        my$("btn").onclick = function () {
            setText(my$("dv"), "hahahhahha");
        };

        my$("btn").onclick = function () {
            console.log(getText(my$("dv")));
        };
```

> **1、设置成对标签中文本内容：**
>
> innerText 属性是 IE8 标准属性，chrome，fireFox，IE8都支持。
>
> textContent 是W3C标准属性，chrome，firefox支持，IE8不支持。
>
>
>**2、获取成对标签中文本内容：**
>
>在 IE8 下使用 textContent 获取成对标签中文本内容，返回值为 undefined。
>
>**那么说明，浏览器不支持的属性的类型都为 undefined.**
>
>通过判断元素有无 textContent 属性（没有则元素的 textContent 属性为 undefined）来决定用 innerText 还是 textContent。



## 2、innerText 和 innerHTML

```html
    <div id="dv">
        哈哈
        <p>p标签</p>
    </div>

    <script src="common.js"></script>
    <script>
        my$("dv").innerText = "div标签"; // 只显示文本
        my$("dv").innerHTML = "div标签"; // 只显示文本

        my$("dv").innerText = "<a href='#'>a标签</a>"; // 只显示文本
        my$("dv").innerHTML = "<a href='#'>a标签</a>"; // 带有a标签格式

        console.log(my$("dv").innerText); // 哈哈 p标签
        console.log(my$("dv").innerHTML); // 哈哈 <p>p标签</p>
    </script>
```

> **innerText 属性：**设置和获取只能得到文本内容。
>
> **innerHTML 属性：**不仅可以获得文本内容，还可以设置和获取 html 标签，让其显示或得到对应标签的格式。

---

# 二、自定义属性操作（设置，获取，移除）

```html
<p>p标签</p>
<script src="common.js"></script>
<script>
      var pObj = document.getElementsByTagName("p")[0];
      pObj.setAttribute("hello", "world"); // <p hello="world">p标签</p>
console.log(pObj.getAttribute("hello")); // world
</script>
```

> 1、标签中自定义的属性是不能通过`DOM对象.属性 ` 的方式获取的，因为这个属性在DOM里面不存在，强行获取只能是 undefined。
>
> 2、相应的，设置也是一样的，通过 `DOM对象.属性` 的方式设置自定义标签，结果设置的只是DOM对象的自定义属性，这个自定义属性不会在标签上显示出来。

> **获取**：通过`DOM对象 .getAttibute("自定义属性的名字")` 来获取自定义属性的值。
>
> **设置**：通过`DOM对象 .setAttibute("自定义属性的名字", "自定义属性的值")` 来设置自定义属性。
>
> **移除**：通过`DOM对象 .removeAttibute("自定义属性的名字")` 来设置自定义属性。
>
> PS：removeAttibute 也可以用来移除元素自带的属性，比如类 class 属性等。`removeAttribute("class")`


![这里写图片描述](https://img-blog.csdn.net/20180619161221573?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x2b252ZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

