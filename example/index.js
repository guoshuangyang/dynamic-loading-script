import dynamicLoadScript from "../dist/index.mjs";

dynamicLoadScript(
  "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=E4805d16520de693a3fe707cdc962045&callback=init",
  {
    variableName: "BMapGL",
    jsonpCallbackName: "init",
  }
).then((BMapGL) => {
  console.log(window.BMapGL, BMapGL);
  var map = new BMapGL.Map("app"); // 创建Map实例
  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12); // 初始化地图,设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
});
