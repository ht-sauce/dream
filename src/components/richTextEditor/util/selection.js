//获取当前选区,选区处理
const CursorAcquisition = () => {
  let selection = window.getSelection();
  let getRange = selection.getRangeAt(0);

  return {
    selection,
    getRange
  };
};
// 恢复选区
const restoreSelection = range => {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};
//光标定位到最后
const placeCaretAtEnd = jsDom => {
  //来源：https://blog.csdn.net/gyq04551/article/details/80175326
  //传入光标要去的jsDom节点
  jsDom.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(jsDom);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(jsDom);
    textRange.collapse(false);
    textRange.select();
  }
};
export { CursorAcquisition, placeCaretAtEnd, restoreSelection };
