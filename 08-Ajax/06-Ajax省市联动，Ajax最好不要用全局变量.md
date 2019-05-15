省市联动案例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <select name="" id="province">
        <option value="">请选择省份</option>
    </select>

    <select name="" id="city">
        <option value="">请选择市</option>
    </select>

    <select name="" id="area">
        <option value="">请选择区</option>
    </select>
</body>
<script>
    var province = document.querySelector("#province");
    var city = document.querySelector("#city");
    var area = document.querySelector("#area");

    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://api.yytianqi.com/citylist/id/2", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            var jsonList = json.list;
            var provinceHtml = "<option value=''>请选择省份</option>";


            jsonList.map(function (item) {
                var provinceId = item["city_id"];
                var provinceName = item["name"];
                provinceHtml += `<option value="${provinceId}">${provinceName}</option>`;
            });

            province.innerHTML = provinceHtml;

            // 当province的 select 里面value的值改变的时候
            var cityList = [];
            province.onchange = function () {
                var provinceId = this.value; // 省的id
                var province = jsonList.filter(function (item) {
                    return item["city_id"] == provinceId;
                })[0];
                cityList = province.list;

                var cityHtml = '<option value="">请选择市</option>';
                cityList.map(function (item) {
                    var cityId = item["city_id"];
                    var cityName = item["name"];
                    cityHtml += `<option value=${cityId}>${cityName}</option>`
                });
                city.innerHTML = cityHtml;
            };

            // 当city的select 里面value的值改变的时候
            city.onchange = function () {
                var cityId = this.value;

                var city = cityList.filter(function (item) {
                    return item["city_id"] == cityId;
                })[0];


                var areaList = city.list;
                // 判断是否为直辖市
                if (areaList) {
                    area.style.display = "inline-block";
                    var areaHtml = '<option value="">请选择区</option>';
                    areaList.map(function (item) {
                        var areaId = item["city_id"];
                        var areaName = item["name"];
                        areaHtml += `<option value="${areaId}">${areaName}</option>`;
                    });
                    area.innerHTML = areaHtml;
                } else {
                    area.style.display = "none";
                }
            };
        }
    };
</script>

</html>
```

![](./images/1.gif)



注意事项：

> Ajax最好不要用全局变量，因为Ajax请求需要时间，你获取到的可能是未更新的值。
>
> 如果非要使用的话，使用回调函数来执行这个变量。

```js
var global = "";

var xhr = new XMLHttpRequest();
xhr.open("get", "./data", true);
xhr.send();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        global = this.responseText;
        show(global);
    }
};

function show(data) {
    alert(data);
}
```



上面省市联动中，在获取地区的列表时，需要用到市的信息，所以我们将市的列表提升出来:

`var cityList = [];` 

由于这里 cityList 并不是在Ajax中获取的数据，所以没有这个考虑。但是上面的坑是一定要注意的。