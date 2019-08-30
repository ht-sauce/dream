"use strict";
import directive from "./dhtDrag/directive";
import resizeDivWebkit from "./webkit/dhtZoomDivw";

export default {
  install(vue) {
    vue.use(resizeDivWebkit);
    vue.use(directive);
  },
  resizeDivWebkit,
  directive
};
