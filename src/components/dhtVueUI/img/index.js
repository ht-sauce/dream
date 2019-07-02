import img from "./img.vue";

img.install = function(vue) {
  vue.component(img.name, img);
};

export default img;
