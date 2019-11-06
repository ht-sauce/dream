<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import store from "store";
export default {
  name: "interface",
  data() {
    return {};
  },
  watch: {},
  beforeCreate() {},
  created() {
    // 将用户数据存入到vuex便于后续操作
    this.$store.commit("set_data", {
      user_info: store.get("user_info").userInfo
    });
  },
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss"></style>
