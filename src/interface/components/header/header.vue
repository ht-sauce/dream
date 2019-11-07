<template>
  <header class="platform-head">
    <div class="center">
      <div>
        <herader-user :noshow="$store.state.core"></herader-user>
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
export default {
  components: {
    heraderUser: () =>
      import("@/components/project/header_user/header-user.vue")
  },
  data() {
    return {
      menu: [{ title: "项目", icon: "el-icon-notebook-2", url: "/project" }]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
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
  box-shadow: #2fd8e9 0 0 3px;
  background: #c2e9dc;
  .center {
    min-width: 960px;
    width: 70vw;
    height: 100%;
    display: flex;
    align-items: center;
    .menu {
      margin-left: 30px;
      display: flex;
      > li {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #6f6f6f;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: black;
        }
        .menu-icon {
          font-size: 24px;
          margin-right: 2.5px;
        }
        .title {
          line-height: 18px;
        }
      }
    }
  }
}
</style>
