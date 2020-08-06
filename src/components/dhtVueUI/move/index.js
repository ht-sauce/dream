import directive from './move'
// 可以让div随意移动的指令插件
export default {
  install(vue) {
    vue.use(directive)
  },
  directive,
}
