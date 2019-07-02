import text from "./text.vue";

text.install = function(vue) {
  vue.component(text.name, text);
};

export default text;
