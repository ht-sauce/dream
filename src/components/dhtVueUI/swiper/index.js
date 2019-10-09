import side from "./side/side.vue";
import sideItem from "./side/item.vue";

export default {
  install(vue) {
    vue.component(side.name, side);
    vue.component(sideItem.name, sideItem);
  },
  side,
  sideItem
};
