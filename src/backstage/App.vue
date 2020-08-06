<template>
  <div id="template">
    <router-view />
    <dht-cat />
  </div>
</template>
<script>
import store from 'store'
export default {
  name: 'backstage',
  data() {
    return {}
  },
  components: {},
  watch: {},
  beforeCreate() {},
  created() {
    const user = store.get('user_info')
    // 将用户数据存入到vuex便于后续操作
    this.$store.commit('set_data', {
      user_info: user ? user.userInfo : null,
    })
  },
  beforeMount() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
@import '@/assets/css/public.scss';
#template {
  font: 14px 'Microsoft YaHei UI' sans-serif;
  color: $font_main;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
