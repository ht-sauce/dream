import cat from "./cat.vue";

cat.install = function(vue) {
  vue.component(cat.name, cat);
};

export default cat;
