//获取命令行参数
const projectName = process.argv[3];
console.log("当前打包项目名称：" + projectName);

//页面配置参数，注意项目名称保持一致，页面结构保持一致
const multiPageConfig = {
  //index是特殊的项目，不做多余操作，仅仅用于项目分发
  //举例，如判断电脑端和移动端，做首页项目入口
  index: {
    name: "海天酱油"
  },
  dht_blog: {
    name: "海天酱油博客"
  },
  dht_platform: {
    name: "海天酱油后台系统"
  }
};
//生成统一的页面配置结构
const multiPage = function() {
  let page = {};
  for (let item in multiPageConfig) {
    page[item] = {
      entry: `src/${item}/main.js`,
      template: `src/${item}/index.html`,
      filename: `${item}.html`,
      title: multiPageConfig[item].name,
      favicon: `src/${item}/assets/${item}.ico`
    };
  }
  return page;
};
const page = multiPage();
//vue下配置文件参数
const vueConfig = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
  outputDir: "dist", //打包目录
  pages: projectName ? page[projectName] : page
};
console.log(page);
module.exports = vueConfig;
