<template>
  <header class="platform-head">
    <div class="center">
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
      <ul class="menu">
        <template v-for="(item, index) in menu">
          <li :key="index">
            <span :class="item.icon" class="menu-icon"></span>
            <span @click="jump_page(item.url)" class="title">{{
              item.title
            }}</span>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import control from "@/common/control_center/index";
import store from "store";
export default {
  data() {
    return {
      user_info: {},
      user_power: [
        {
          title: "退出",
          icon: "el-icon-s-unfold",
          event: () => {
            this.logout();
          }
        }
      ],
      menu: [{ title: "项目", icon: "el-icon-notebook-2", url: "/project" }]
    };
  },
  beforeCreate() {},
  created() {
    this.user_info = store.get("user_info").userInfo;
    this.user_info.portrait =
      this.$api.static().visit + this.user_info.portrait;
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    // 退出登录
    logout() {
      control.logout();
    },
    jump_page(url) {
      url && this.$router.push({ path: url });
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: #ffffff 0 0 3px;
  background: rgba(255, 191, 45, 0.5);
  .center {
    min-width: 960px;
    width: 70vw;
    height: 100%;
    display: flex;
    align-items: center;
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
    .menu {
      margin-left: 30px;
      display: flex;
      > li {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #6f6f6f;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: black;
        }
        .menu-icon {
          font-size: 20px;
          margin-right: 2.5px;
          font-weight: bold;
        }
        .title {
          line-height: 18px;
          font-weight: bold;
        }
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
    cursor: pointer;
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
