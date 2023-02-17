/**
 * @description 异步加载js - 如果js已经加载过，则直接返回 如果cdn不是直接返回js类方法，而是采用jsonp的方式, 请不要传入 option.callback 参数, 避免业务代码中的callback执行时机不对
 * @description 使用示例下方有 采用jsonp的方式加载js请务必在jsonp的回调中执行业务代码
 * @param {string} src 外部js的src - 必填
 * @param {string} opts.variableName - js的全局变量名 - 必填
 * @param {Function} opts.callback - 非必填 会将js的全局变量传入
 * @param {string} backupSrc 外部备用js的src - 非必填
 * @returns {Promise}
 */
const dynamicLoadScript = (src, opts, backupSrc) =>
  new Promise((resolve, reject) => {
    if (!src) {
      throw new Error("src is required");
    }
    // 如果已经存在 variableName 对应的全局变量，则直接返回 - 这里的variableName是不是应该是callback
    if (opts?.variableName && window[opts.variableName]) {
      if (opts?.callback) {
        opts.callback(window[opts.variableName]);
      }
      resolve(window[opts.variableName]);
      return;
    }
    // 创建一个script标签
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    // 进行js加载错误的处理
    script.onerror = () => {
      // 如果存在备用js，则加载备用js
      if (backupSrc) {
        dynamicLoadScript(backupSrc, opts);
      } else {
        reject(new Error("load js error"));
      }
    };
    // 加载成功的时候，执行callback
    script.onload = () => {
      if (opts.variableName) {
        if (!window[opts.variableName]) {
          throw new Error(opts.variableName + "does not exist in Window");
        }
        // 不存在回调函数，直接返回
        if (!opts.callback) {
          resolve(window[opts.variableName]);
          return;
        }
        opts.callback(window[opts.variableName]);
        resolve(window[opts.variableName]);
      } else {
        // 不存在回调函数，直接返回
        if (!opts.callback) {
          resolve();
          return;
        } else {
          opts.callback(null);
          resolve();
        }
      }
    };
    // 将script标签插入到body中
    document.body.appendChild(script);
  });

export default dynamicLoadScript;
module.exports = dynamicLoadScript;
