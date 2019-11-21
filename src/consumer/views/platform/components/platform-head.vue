<template>
  <header class="platform-head">
    <div class="center">
      <div class="logo">
        <router-link to="/">海天酱油用户平台中心</router-link>
      </div>
      <div class="platform-list">
        <template v-for="(item, index) in platformList">
          <a
            :key="index"
            v-if="item.type !== $store.state.core"
            :href="item.url"
          >
            <span>{{ item.name }}</span>
          </a>
        </template>
      </div>
      <div>
        <herader-user :ispower="false"></herader-user>
      </div>
    </div>
  </header>
</template>

<script>
import store from "store";
export default {
  data() {
    return {
      platformList: [],
      user_info: {}
    };
  },
  components: {
    heraderUser: () =>
      import("@/components/project/header_user/header-user.vue")
  },
  beforeCreate() {},
  created() {
    this.user_info = store.get("user_info").userInfo;
    this.power_list();
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 权限列表
    power_list() {
      this.axios
        .ajax({
          url: this.$api.consumer().power.items,
          data: {
            account: this.user_info.account
          }
        })
        .then(e => {
          console.log(e.data);
          this.platformList = e.data;
          store.set("power", e.data);
        })
        .catch();
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
      margin-right: 25px;
      > a {
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>
