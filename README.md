一、项目目录结构
````
assets 全局资源文件
common 公共板块
components 公共组件部分
    dhtVueUI 个人vue组件库
        style 为全局资源
        index.js 安装资源文件
        explain.xlsx 组件说明文档
        约定.text 组件开发约定
        其余为每个组件目录
            组件目录约定
                index.js或install.js为单个组件安装引入文件
    richTextEditor 富文本编辑器ui插件开发
blog 多页面项目之一（个人博客部分）
dht_platform 项目二（后台管理）
index 项目三（分发平台项目，起到项目路由分发控制浏览）
test 测试文件（暂无测试模块）
    子项目目录结构介绍
    assets 项目资源文件
    common 公共部分
    router 路由控制部分
    views 视图部分
    vuex vuex数据部分
    app.vue 主页面
    index.html
    main.js 项目入口
````
二、项目介绍
```$xslt
1、项目为多页面架构模式，具体不懂得看vue.config.js
    并且实现单个项目打包
2、个人博客系统开发
3、博客对应后台操作管理开发
4、个人组件库开发（参考elementUI源码，插件模式）
5、富文本编辑器开发中……
```
