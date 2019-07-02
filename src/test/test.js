let ceshi = {
  ce: "",
  ds: null,
  dfs: undefined,
  dfas: 123,
  dfasa: NaN,
  fdsa: "fdsafsa",
  fds: "undefined",
  fdsafd: {}
};
//过滤空数据包含NaN，undefined，null
const filterdata = json => {
  let newJson = {};
  let reg = RegExp(/NaN|undefined|null/);
  for (let li in json) {
    if (json[li] && !reg.test(json[li])) {
      newJson[li] = json[li];
    }
  }
  return newJson;
};
console.log(filterdata(ceshi));
