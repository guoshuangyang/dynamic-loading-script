# dynamic-loading-script

动态加载脚本，并根据脚本的加载情况，执行回调函数。
+ 如果脚本已经加载，直接执行回调函数，避免重复加载
+ 如果脚本未加载，先加载脚本，再执行回调函数
+ 在[乾坤微应用](https://qiankun.umijs.org/zh/guide)中可用

### 注意事项
+ 异步加载js - 如果js已经加载过，则直接返回 如果cdn不是直接返回js类方法，而是采用jsonp的方式, 请务必传入jsonpCallbackName参数

## 安装

``` bash
npm install dynamic-loading-script --save
```

``` bash
yarn add dynamic-loading-script --save
```

## 使用

### 参数

| 参数                   | 类型            | 说明                                                         | 默认值 | 必填 |
| ---------------------- | --------------- | ------------------------------------------------------------ | ------ | ---- |
| Url                    | String          | 脚本的url地址                                                | 无     | 是   |
| opts                   | Object          | 配置项                                                       | 无     | 是   |
| opts.variableName      | String          | 脚本中的变量名，如果脚本中有变量名，可以通过该参数获取到该变量 | 无     | 是   |
| opts.callback          | Function        | 脚本加载完成后的回调函数, 此属性存在时                       | 无     | 否   |
| opts.jsonpCallbackName | String          | 脚本的jsonp方法名                                            | 无     | 否   |
| opts.timeout           | number | 是否在超时之后移除script标签                                 | false  | 否   |


**使用jsonp的形式参见[jsonp示例](./example/index.js)**


``` javascript
// 引入改js后，可以直接获取js库变量（类）的例子,
import dynamicLoadScript from 'dynamic-loading-script'

dynamicLoadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', {
    variableName: 'axios',
    callback:(axios) => {
        console.log('axios loaded', axios)
        console.log('axios', window.axios)
    }
})
```


``` javascript

import dynamicLoadScript from "dynamic-loading-script";
dynamicLoadScript( "https://cdn.bootcdn.net/ajax/libs/echarts/5.0.2/echarts.min.js",
  {
    variableName: "echarts",
  }
).then((echarts) => {
  console.log(echarts);
});

```



### 注意

+ $已经为window已存在的变量，故动态加载jquery不会成功
