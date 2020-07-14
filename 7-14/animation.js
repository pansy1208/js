function getStyle(el, str) {
  var res;
  if (el.currentStyle) {
    res = el.currentStyle[str];
  } else {
    res = getComputedStyle(el, null)[str];
  }
  return res;
}

//callback 动画执行完毕进行其他操作
function ani(el, str, end, time, callback) {
  // var len = arguments.length;
  // if (len === 0) {
  //   throw new Error("args cannot length 0");
  // }
  // if (el.nodeType === 1) {
  //   throw new Error(`"Element:" is not element `);
  // }
  // if (typeof str !== "string") {
  //   throw new Error(`"cssStyle: of DataType must be string"`);
  // }
  // if (typeof end !== "number") {
  //   throw new Error(`"cssStyleValue: of DataType must be number"`);
  // }
  // if (typeof time !== "number") {
  //   throw new Error(`"cssStyle: of DataType must be string"`);
  // }
  var start = getStyle(el, str);
  start = parseFloat(start);
  var s = end - start;
  time = time * 1000;
  var timer = setInterval(function () {
    // time/16.7 fun执行的次数
    start += s / (time / 16.7);

    if (s > 0) {
      if (start >= end) {
        str === "opacity" || str === "zIndex"
          ? (el.style[str] = end)
          : (el.style[str] = end + "px");
        clearInterval(timer);
        if (callback) {
          callback();
        }
      }
    } else {
      if (start <= end) {
        str === "opacity" || str === "zIndex"
          ? (el.style[str] = end)
          : (el.style[str] = end + "px");
        clearInterval(timer);
        if (callback) {
          callback();
        }
      }
    }

    if (str == "opacity" || str == "zIndex") {
      el.style[str] = start;
    } else {
      el.style[str] = start + "px";
    }
  }, 16.7); //浏览器刷新时间是16.7ms
}
