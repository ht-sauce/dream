<template>
  <header class="platform-head">
    <div class="center">
      <div class="logo">
        <router-link to="/"><h1>海天酱油用户平台中心</h1></router-link>
      </div>
      <div class="platform-list">
        <template v-for="(item, index) in platformList">
          <a :key="index" :href="item.url">
            <h2>{{ item.name }}</h2>
          </a>
        </template>
      </div>
      <div>

      </div>
    </div>
  </header>
</template>

<script>
import control from "@/common/control_center/index";
export default {
  data() {
    return {
      platformList: []
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 退出登录
    logout() {
      control.logout();
    }
  }
};
</script>

<style scoped lang="scss">
.platform-head {
  width: 100vw;
  height: 65px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #ffffff 0 0 3px;
  .center {
    min-width: 960px;
    width: 70vw;
    height: 100%;
    display: flex;
    align-items: center;
    .logo > a {
      font-size: 20px;
    }
    .platform-list {
      margin-left: auto;
      display: flex;
      align-items: center;
      > a {
        font-size: 18px;
        margin-left: 20px;
      }
    }
  }
}
</style>
