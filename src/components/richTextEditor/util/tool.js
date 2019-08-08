//去除字符串前后空格
function trim(str, isglobal) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (isglobal && isglobal.toLowerCase() === "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}
//css转json
function styleToObj(style) {
  if (!style || style == "") {
    return;
  }
  var Arr = style.split(";");
  Arr = Arr.filter(item => {
    return item != "";
  });
  let str = "";
  Arr.forEach(item => {
    let test = "";
    trim(item)
      .split(":")
      .forEach(item2 => {
        test += '"' + trim(item2) + '":';
      });
    str += test + ",";
  });
  str = str.replace(/:,/g, ",");
  str = str.substring(0, str.lastIndexOf(","));
  str = "{" + str + "}";
  return JSON.parse(str);
}
//json转css
function showJson(style) {
  let s = [];
  for (let i in style) {
    s.push(i + ":" + style[i]);
  }
  s = s.join(";");
  //console.log(s);
  return s;
}
//删除指定css,得到需要的css
function delCss(style, item) {
  let newcss = styleToObj(style);
  delete newcss[item];
  return showJson(newcss);
}

export { trim, delCss };
