<template>
  <ul class="left_blog">
    <template v-for="(item, index) in list">
      <li :key="index">
        <div class="top">
          <router-link :to="'/blog_content?article_id=' + item.id">
            <dht-img
              v-if="item.cover"
              class="blog_img"
              :src="item.cover"
            ></dht-img>
          </router-link>
          <div class="top-text">
            <h3>
              <router-link :to="'/blog_content?article_id=' + item.id">{{
                item.title
              }}</router-link>
            </h3>
            <dht-text
              :text="item.synopsis"
              :num="250"
              class="blog_p"
            ></dht-text>
          </div>
        </div>
        <!--底部标签-->
        <ul class="bottom">
          <li>
            <dht-img
              class="icon_img"
              :src="require('../../assets/images/home/newsbg01.png')"
            ></dht-img>
            <span class="icon_text">{{ blogIconTaps(item.classify) }}</span>
          </li>
          <li>
            <dht-img
              class="icon_img"
              :src="require('../../assets/images/home/newsbg02.png')"
            ></dht-img>
            <span class="icon_text2">{{ item.created_at }}</span>
          </li>
          <li class="readText">
            <dht-img
              class="icon_img2"
              :src="require('../../assets/images/home/newsbg04.png')"
            ></dht-img>
            <span class="icon_text">( {{ item.visit }} )</span>
          </li>
          <li class="icon_text">
            <router-link
              class="icon_text"
              :to="'/blog_content?article_id=' + item.id"
              >阅读原文</router-link
            >
          </li>
          <li
            class="icon_text"
            v-if="
              $store.state.user_info &&
                $store.state.user_info.account === $store.state.blogger.account
            "
          >
            <span @click="del_article(index, list)">删除</span>
          </li>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "left_blog",
  props: {
    list: Array
  },
  data() {
    return {
      all_class: this.$store.state.all_class
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    blogIconTaps(val) {
      if (!val) {
        return val;
      }
      const tag = val.split(",");
      let nval = [];
      this.$store.state.all_class.map(v => {
        tag.map(t => {
          if (v.id === Number(t)) {
            nval.push(v.name);
          }
        });
      });
      let tags = "";
      nval.map(li => {
        tags = tags + " | " + li;
        return li;
      });
      return tags.substring(2, tags.length);
    },
    del_article(index, list) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .ajax({
              url: this.$api.blog().article.del,
              data: {
                id: list[index].id
              },
              loading: true
            })
            .then(() => {
              list.splice(index, 1);
            })
            .catch();
        })
        .catch();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
.left_blog {
  > li {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    height: 225px;
    background: #ffffff;
    display: flex;
    flex-flow: column;
    margin-bottom: 15px;
    .top {
      display: flex;
      flex-flow: row;
      .blog_img {
        flex-shrink: 0;
        width: 240px;
        height: 160px;
        /deep/ .dht-showimg {
          border-radius: 5px;
        }
      }
      .top-text {
        width: 100%;
        height: 160px;
        box-sizing: border-box;
        padding-left: 18px;
        > h3 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 10px;
          color: $font_main;
        }
        .blog_p {
          color: $font_main_info;
        }
      }
    }
    .bottom {
      width: 100%;
      height: calc(100% - 160px);
      display: flex;
      flex-flow: row;
      align-items: flex-end;
      font-size: 12px;
      color: $font_info;
      > li {
        display: flex;
        flex-flow: row;
        align-items: center;
        margin-right: 10px;
      }
      .icon_img {
        width: 0.9vw;
        height: 0.9vw;
      }
      .icon_img2 {
        width: 1.1vw;
        height: 0.9vw;
      }
      .icon_text {
        color: #096;
        margin-left: 5px;
      }
      .icon_text2 {
        margin-left: 5px;
      }
      .readText {
        margin-right: auto;
      }
      .readText2 {
        cursor: pointer;
      }
    }
  }
}
</style>
