import vue from "vue";
import codevue from "./code.vue";

const code = vue.extend(codevue);

let component = new code().$mount();

export default component.$el;
