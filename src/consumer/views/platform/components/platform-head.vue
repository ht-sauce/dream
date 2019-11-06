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
        <el-popover
          placement="bottom"
          popper-class="user-popover"
          width="150"
          trigger="hover"
        >
          <div slot="reference" class="user-info">
            <img
              v-if="user_info.portrait"
              :alt="user_info.nickname"
              :src="user_info.portrait"
              class="portrait"
            />
            <span v-else class="el-icon-user-solid portrait"></span>
            <span>{{ user_info.nickname }}</span>
          </div>
          <div class="reference-content">
            <template v-for="(item, index) in user_power">
              <div
                :key="index"
                @click="item.event"
                class="reference-content-li"
              >
                <span
                  class="reference-content-li-icon"
                  :class="item.icon"
                ></span>
                <span>{{ item.title }}</span>
              </div>
            </template>
          </div>
        </el-popover>
      </div>
    </div>
  </header>
</template>

<script>
import control from "@/common/control_center/index";
import store from "store";
export default {
  data() {
    return {
      platformList: [],
      user_info: {},
      user_power: [
        {
          title: "退出",
          icon: "el-icon-s-unfold",
          event: () => {
            this.logout();
          }
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    this.user_info = store.get("user_info").userInfo;
    this.user_info.portrait =
      this.$api.static().visit + this.user_info.portrait;
    this.power_list();
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 退出登录
    logout() {
      control.logout();
    },
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
        })
        .catch();
    }
  }
};
</script>
<style>
.user-popover {
  width: 150px;
  padding: 5px 0;
  border-radius: 0;
}
</style>
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
    .user-info {
      font-size: 12px;
      display: flex;
      flex-flow: column;
      align-items: center;
      color: #8e8e8e;
      .portrait {
        font-size: 20px;
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
.reference-content {
  width: 150px;
  font-size: 12px;
  color: #8e8e8e;
  .reference-content-li {
    height: 20px;
    line-height: 20px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    &:hover {
      background: #e4e4e4;
    }
    .reference-content-li-icon {
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
