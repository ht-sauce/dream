<template>
  <div id="nosqlModel">
    <router-view />
    <livetd-cat></livetd-cat>
  </div>
</template>
<script>
export default {
  name: "nosqlModel",
  components: {
    livetdCat: () => import("./components/cat/cat.vue")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "@/nosqlModel/common/style/let.scss";
.app {
  font-family: "Microsoft YaHei UI", serif;
  font-size: $size-main;
  color: $font_main;
}
</style>
