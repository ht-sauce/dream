//过滤空数据对象
const filterNull = json => {
  let newJson = {};
  let reg = RegExp(/NaN|undefined|null/);
  for (let li in json) {
    if (json[li] && !reg.test(json[li])) {
      newJson[li] = json[li];
    }
  }
  return newJson;
};
//判断字段空值，空返回0
function isN(res) {
  let res2 = 0;
  //增加判断NaN，但是需要先做转换字符串处理
  if (res === "undefined" || !res || res === "null") {
    return res2;
  } else {
    let na = res.toString();
    res2 = na == "NaN" ? 0 : res;
    return res2;
  }
}
/*数组排序算法
 * 第一个参数：排序的数组
 *第二个参数：根据数组中的哪个字段排序
 * 第三个字段：是升序还是降序，true（升序），false（降序）
 * */
function arrySort(arry, fil, t) {
  //过滤空数组
  //对于 false,null,0,undefiend,NaN直接取!得到的都是true，因此这里只需要在判断空字符串""；
  let arryn = arry.filter(function(val) {
    return !(!val || val === "");
  });

  let condition = function(field, tr) {
    //第二个参数不传递情况下，默认从小到大排序
    if (tr == undefined) {
      tr = -1;
    } else {
      tr = tr ? 1 : -1;
    }
    return function(a, b) {
      a = a[field];
      b = b[field];

      if (a < b) {
        return tr * -1;
      }
      if (a > b) {
        return tr * 1;
      }
      return 0;
    };
  };
  return arryn.sort(condition(fil, t));
}
//时间戳转2018-03-29 12:00:00
function timeStampTurn(obj) {
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  var h = date.getHours() + ":";
  var M = date.getMinutes() + ":";
  var s = date.getSeconds();
  return (
    y +
    "-" +
    m.substring(m.length - 2, m.length) +
    "-" +
    d.substring(d.length - 2, d.length) +
    " " +
    h +
    M +
    s
  );
}
//时间new date()转2018-03-29 12:00:00
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };

  return [year, month, day, hour, minute, second].map(formatNumber).join("-");
};

//base64转图片下载
function downloadBase64(fileName, content) {
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = `${fileName}.jpg`;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  //aLink.click()
  aLink.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    })
  ); //兼容火狐
  function base64ToBlob(code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}

function autoTextarea(elem, extra, maxHeight) {
  extra = extra || 0;
  let isFirefox = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
    isOpera = !!window.opera && !!window.opera.toString().indexOf("Opera"),
    addEvent = function(type, callback) {
      elem.addEventListener
        ? elem.addEventListener(type, callback, false)
        : elem.attachEvent("on" + type, callback);
    },
    getStyle = elem.currentStyle
      ? function(name) {
          let val = elem.currentStyle[name];

          if (name === "height" && val.search(/px/i) !== 1) {
            let rect = elem.getBoundingClientRect();
            return (
              rect.bottom -
              rect.top -
              parseFloat(getStyle("paddingTop")) -
              parseFloat(getStyle("paddingBottom")) +
              "px"
            );
          }

          return val;
        }
      : function(name) {
          return getComputedStyle(elem, null)[name];
        },
    minHeight = parseFloat(getStyle("height"));

  elem.style.resize = "none";

  let change = function() {
    let scrollTop,
      height,
      padding = 0,
      style = elem.style;

    if (elem._length === elem.value.length) return;
    elem._length = elem.value.length;

    if (!isFirefox && !isOpera) {
      padding =
        parseInt(getStyle("paddingTop")) + parseInt(getStyle("paddingBottom"));
    }
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    elem.style.height = minHeight + "px";
    if (elem.scrollHeight > minHeight) {
      if (maxHeight && elem.scrollHeight > maxHeight) {
        height = maxHeight - padding;
        style.overflowY = "auto";
      } else {
        height = elem.scrollHeight - padding;
        style.overflowY = "hidden";
      }
      style.height = height + extra + "px";
      scrollTop += parseInt(style.height) - elem.currHeight;
      document.body.scrollTop = scrollTop;
      document.documentElement.scrollTop = scrollTop;
      elem.currHeight = parseInt(style.height);
    }
  };

  addEvent("propertychange", change);
  addEvent("input", change);
  addEvent("focus", change);
  change();
}
export default {
  filterNull,
  isN,
  arrySort,
  timeStampTurn,
  formatTime,
  downloadBase64,
  autoTextarea
};
