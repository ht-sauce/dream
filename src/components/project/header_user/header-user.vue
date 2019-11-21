<template>
  <el-popover
    placement="bottom"
    popper-class="user-popover"
    width="150"
    trigger="hover"
  >
    <div slot="reference" class="user-info">
      <img
        v-if="user.portrait"
        :alt="user.nickname"
        :src="user.portrait"
        class="portrait"
      />
      <span v-else class="el-icon-user-solid portrait"></span>
      <span>{{ user.nickname }}</span>
    </div>
    <div class="reference-content">
      <template v-for="(item, index) in powers">
        <div
          :key="index"
          v-if="item.type !== noshow"
          @click="item.event"
          class="reference-content-li"
        >
          <span class="reference-content-li-icon" :class="item.icon"></span>
          <span>{{ item.title }}</span>
        </div>
      </template>
      <div @click="logout" class="reference-content-li">
        <span class="reference-content-li-icon el-icon-s-unfold"></span>
        <span>{{ user.nickname ? "退出" : "登录" }}</span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import control from "@/common/control_center/index";
import store from "store";
export default {
  props: {
    power: {
      type: Array,
      default() {
        return [];
      }
    },
    noshow: String,
    ispower: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      user: {},
      powers: this.power
    };
  },
  created() {
    const user = store.get("user_info");
    let user_info;
    if (!user) {
      return false;
    }
    user_info = user.userInfo;
    user_info.portrait = this.$api.static().visit + user_info.portrait;
    this.user = user_info;

    if (this.ispower) {
      let items = store.get("power").map(val => {
        val.title = val.name;
        val.event = () => {
          window.location.href = val.url;
        };
        return val;
      });
      this.powers = this.powers.concat(items);
    }
  },
  methods: {
    // 退出登录
    logout() {
      control.logout();
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
.user-info {
  height: 100%;
  font-size: 12px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
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
.reference-content {
  width: 150px;
  font-size: 12px;
  color: #8e8e8e;
  .reference-content-li {
    height: 30px;
    line-height: 30px;
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
