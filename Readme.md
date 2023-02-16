# dynamic-load-script

动态加载脚本，并根据脚本的加载情况，执行回调函数。
+ 如果脚本已经加载，直接执行回调函数，避免重复加载
+ 如果脚本未加载，先加载脚本，再执行回调函数

## 安装

``` bash
npm install dynamic-load-script --save
```

``` bash
yarn add dynamic-load-script --save
```

## 使用

### 参数

| 参数              | 类型     | 说明                                                                 | 默认值 | 必填 |
| ----------------- | -------- | -------------------------------------------------------------------- | ------ | ---- |
| src               | String   | 脚本的url地址                                                        | 无     | 是   |
| opts              | Object   | 配置项                                                               | 无     | 是   |
| opts.variableName | String   | 脚本中的变量名，如果脚本中有变量名，可以通过该参数获取到该变量       | 无     | 否   |
| opts.callback     | Function | 脚本加载完成后的回调函数, 此属性存在时，`variableName`属性也必须存在 | 无     | 否   |
| backupSrc         | String   | 脚本的备用url地址                                                    | 无     | 否   |



``` javascript
// 引入改js后，可以直接获取js库变量（类）的例子
import dynamicLoadScript from 'dynamic-load-script'

dynamicLoadScript('https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.min.js', {
    variableName: '$',
    callback:($) => {
        console.log('jquery loaded', $)
    }
})
```

``` javascript
// 引入改js后 通过回调函数（JSONP）获取js库变量（类）的例子
// 下方是引入百度地图的例子
import asyncLoadScript from 'dynamic-load-script'

window.init = () => {
  // 业务代码在此处执行
  console.log("百度地图初始化成功", window.BMapGL);
};
dynamicLoadScript(
  "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=你的ak&callback=init",
  {
    variableName: "BMapGL",
  }
);
```



