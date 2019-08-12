import { CursorAcquisition } from "./selection";
import { delCss } from "./tool";
//文档片段处理
const domFragmentHandle = cloneRange => {
  let range = "";
  const { getRange } = CursorAcquisition();

  //特殊处理，总有失去焦点的时候需要
  range = cloneRange ? cloneRange : getRange;

  //获取需要操作的元素进行处理
  let domst = range.commonAncestorContainer;
  domst = domst.nodeType === 1 ? domst : domst.parentNode;

  //获取元素中的css属性getSelectionText
  let cssText = domst.style.cssText;

  let innerhtml = "";
  console.log("当前获取的节点", domst.nodeName);
  //处理节点名称，若果为指定的元素则返回空
  let nodeName = domst.nodeName;
  let nodelist = ["div"];

  if (nodelist.indexOf(nodeName.toLocaleLowerCase()) !== -1) {
    nodeName = "";
  }
  nodeName = nodeName.toLocaleLowerCase();

  //判断处理，如果父节点是最大的div则更换选取方式
  if (domst.id === "dht-editor-content") {
    let span = document.createElement("span");
    let elem = range.cloneContents();
    span.appendChild(elem);
    innerhtml = span.innerHTML;
  } else {
    //console.log(domst.childNodes);
    //dom元素处理,不要多余标签，将字符串抽离，但是注意保持文档结构，
    // 但是该操作会导致多行的文档缩进等无效
    let child = domst.childNodes;
    for (let i = 0; i < child.length; i++) {
      if (child[i].nodeName === "BR") {
        innerhtml += `<br>`;
      } else {
        let node = child[i];
        innerhtml += node.nodeValue ? node.nodeValue : node.innerText;
      }
    }
  }

  //最终返回需要的元素
  return {
    innerhtml,
    cssText,
    nodeName
  };
};
//独立选中区域文字
const getSelectionText = cloneRange => {
  let range = "";
  const { getRange } = CursorAcquisition();

  //特殊处理，总有失去焦点的时候需要
  range = cloneRange ? cloneRange : getRange;

  //获取元素中的css属性
  let cssText = "";

  let span = document.createElement("span");
  let elem = range.cloneContents();
  span.appendChild(elem);
  let innerhtml = span.innerHTML;

  //最终返回需要的元素
  return {
    innerhtml,
    cssText
  };
};
//最终执行函数
const execOperation = (name, value = null, cloneRange = null) => {
  let range = "";
  const { getRange } = CursorAcquisition();
  //特殊处理，总有失去焦点的时候需要
  range = cloneRange ? cloneRange : getRange;

  if (!range.toString()) {
    console.log("未选中任何元素");
    return false;
  }
  let bool = document.execCommand(name, false, value);

  range.detach();

  return bool;
};
//生成html字符串
//传入参数：
/*
 * 插入的节点名称，
 * style：del: 需要删除的css名称
 * css：最后应用的css
 * */
const combinationHtml = (style, range = "") => {
  const { innerhtml, cssText, nodeName } = domFragmentHandle(range);
  let delcss = style.del || "";
  let css = style.css || "";
  let node = style.node || "span";
  let url = style.url;

  //let html = style.html || `<${node} style="${oldCss}; ${css}">${innerhtml}</${node}>`
  //之前的css
  let oldCss = cssText ? delCss(cssText, delcss) : "";

  console.log("html处理得到", nodeName);
  //新老节点判断处理，特殊的节点需要使用老节点比如span无法和h2混合
  if (nodeName && node !== nodeName && node !== "a") {
    node = nodeName;
  }
  //定义需要插入的html元素
  let html = "";
  if (node === "a") {
    html = `<${node} href="${url}" style="${oldCss}; ${css}">${innerhtml}</${node}>`;
  } else {
    html = `<${node} style="${oldCss}; ${css}">${innerhtml}</${node}>`;
  }

  console.log(html);
  return html;
};
export { domFragmentHandle, execOperation, getSelectionText, combinationHtml };
