import service from "./progress";
import directive from "./mask/directive";

export default {
  install(vue) {
    vue.use(directive);
    vue.prototype.$dhtLoading = service;
  },
  service,
  directive
};
