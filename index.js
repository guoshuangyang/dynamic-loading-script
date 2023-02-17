const dynamicLoadScript = (src, opts, backupSrc) =>
  new Promise((resolve, reject) => {
    if (!src) {
      throw new Error("src is required");
    }
    if (opts?.variableName && window[opts.variableName]) {
      if (opts?.callback) {
        opts.callback(window[opts.variableName]);
      }
      resolve(window[opts.variableName]);
      return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onerror = () => {
      if (backupSrc) {
        dynamicLoadScript(backupSrc, opts);
      } else {
        reject(new Error("load js error"));
      }
    };
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
    document.head.appendChild(script);
  });

export default dynamicLoadScript;
