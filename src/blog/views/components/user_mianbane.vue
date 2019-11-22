<template>
  <div class="user_mianbane">
    <div class="self">
      <dht-img
        v-if="onselfData"
        class="headPortrait"
        :src="onselfData.portrait"
      ></dht-img>
      <span>{{ onselfData.nickname }}</span>
    </div>
    <div v-if="!author" class="share">
      <div>创作：{{ onselfData.count }}</div>
      <router-link
        style="color: #409eff;"
        v-if="$store.state.user_info"
        to="/draft"
        >草稿箱</router-link
      >
    </div>
    <div class="census">
      <div>访问量：10</div>
      <div>访问人：3</div>
    </div>
    <div v-if="$store.state.user_info" class="writing">
      <div>
        <router-link class="writing-a" to="/richTextEditor?editor_type=add"
          >创作文章</router-link
        >
      </div>
      <div class="editor" v-if="author">
        <router-link
          class="writing-a"
          :to="'/richTextEditor?editor_type=update&id=' + author.id"
          >编辑</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //当前这篇文章的作者信息，包含访问量，访问人，昵称，头像等
    author: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  computed: {
    onselfData() {
      return !this.author ? this.$store.state.blogger : this.author;
    }
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
.user_mianbane {
  width: 100%;
  display: flex;
  flex-flow: column;
  background: #ffffff;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 20px;
  font-size: 16px;
  color: $font_main_info;
  > div {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: $border_main 1px solid;
  }
  .self {
    .headPortrait {
      width: 55px;
      height: 55px;
      margin-right: 20px;
      /deep/ .dht-showimg {
        border-radius: 50%;
      }
    }
  }
  .share {
    height: 30px;
    padding: 17px 0;
    justify-content: space-around;
  }
  .census {
    @extend .share;
  }
  .writing {
    @extend .share;
    .writing-a {
      color: #409eff;
      &:hover {
        color: #ff9112;
      }
    }
    .editor {
      color: #409eff;
      &:hover {
        color: #ff3c42;
      }
    }
  }
}
</style>
