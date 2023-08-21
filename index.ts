type Options = {
  variableName: string, // 类似jQuery的$，百度地图的BMap
  timeout?: boolean | number, // 超时时间, 默认不设置超时, 如果超时则不执行回调函数，并取消脚本加载
  callback?: (param: any) => void, // 加载完成后的回调函数
  jsonpCallbackName?: string // jsonp的回调函数名
}
export default function (url: string, option: Options): Promise<any> {
  return new Promise((resolve, reject) => {
    const { variableName, timeout, callback, jsonpCallbackName } = option
    let timer: number;
    let script: HTMLScriptElement;
    // 判断是否是数组
    if (typeof url === 'string') {
      if (!variableName) {
        reject(new Error('variableName不能为空'))
        return;
      }
      if (window[variableName]) {
        callback && callback(window[variableName])
        resolve(window[variableName])
        return;
      }
      if (jsonpCallbackName) {
        window[jsonpCallbackName] = () => {
          resolve(window[variableName])
          delete window[jsonpCallbackName]
          timer && clearTimeout(timer)
          callback && callback(window[variableName])
        }
      }
      if (timeout !== false) {
        timer = window.setTimeout(() => {
          if (!window[variableName]) {
            // 取消加载
            script.onload = null
            script.onerror = null
            document.body.removeChild(script)
            reject(new Error('加载超时'))
          }
        }, (timeout as number) || 10000)
      }
      script = document.createElement('script')
      script.src = url
      script.type = 'text/javascript'
      script.onload = () => {
        if (jsonpCallbackName) return
        timer && clearTimeout(timer)
        callback && callback(window[variableName])
        resolve(window[variableName])
      }
      script.onerror = () => {
        timer && clearTimeout(timer)
        reject(new Error('加载失败'))
      }
      document.head.appendChild(script)
    } else {
      throw new Error('url类型不正确')
    }
  })
}