<template>
  <div class="blog_content">
    <article class="article">
      <h1>{{ info.title }}</h1>
      <div class="tag">
        <span>{{ info.created_at }}</span>
        <span class="classify">标签：{{ info.classify }}</span>
      </div>
      <img v-if="info.cover" :src="info.cover" alt="封面" />
      <hr />
      <div class="ql-snow">
        <section class="ql-editor" v-html="info.content"></section>
      </div>
      <!--评论组件-->
      <dht-discuss
        ref="discuss"
        @reply="reply"
        :discuss="discuss"
      ></dht-discuss>
    </article>
    <div class="author">
      <user-mianbane :author="info"></user-mianbane>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    dhtDiscuss: () => import("@/blog/views/components/discuss.vue"),
    userMianbane: () => import("@/blog/views/components/user_mianbane.vue")
  },
  data() {
    return {
      info: {},
      discuss: []
    };
  },
  beforeCreate() {},
  created() {
    const query = this.$route.query;
    this.details(query.article_id);
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 分类转换
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
    static_p(val) {
      return val ? this.$api.static().visit + val : null;
    },
    // id为1为个人介绍数据
    details() {
      this.axios
        .ajax({
          url: this.$api.blog().article.details,
          loading: true,
          data: {
            id: 1
          }
        })
        .then(e => {
          console.log(e.data);
          e.data.classify = this.blogIconTaps(e.data.classify);
          e.data.cover = this.static_p(e.data.cover);
          e.data.portrait = this.static_p(e.data.portrait);
          this.info = e.data;

          this.$store.commit("getMetaInfo", {
            title: e.data.title,
            keywords: e.data.title,
            description: e.data.synopsis
          });
          this.discuss_list();
        })
        .catch();
    },
    // 评论组件返回数据
    reply(e) {
      // console.log(e);
      let data;
      if (!e.node) {
        // 主评论
        data = {
          content: e.reply, //评论内容
          is_trunk: "1", // 是否主评论
          key: this.info.id, //关联id
          type: "1", //评论类型，当前属于文章评论
          who: this.$store.state.ip.cip, //谁发的，记录ip地址
          reply: "", // 发给谁记录ip地址
          location: this.$store.state.ip.cname //发送人所在地区
        };
      } else {
        // 回复评论
        data = {
          trunk_key: e.parentData.who, //归属于哪项评论下面
          content: e.reply,
          is_trunk: "0",
          key: this.info.id,
          type: "1",
          who: this.$store.state.ip.cip,
          reply: e.node.who,
          location: this.$store.state.ip.cname
        };
      }
      this.axios
        .ajax({
          url: this.$api.blog().discuss.add,
          data: data,
          method: "post",
          success: "评论成功",
          loading: true
        })
        .then(() => {
          this.$refs["discuss"].clear_msg();
          this.discuss_list();
        })
        .catch();
    },
    // 评论列表数据
    discuss_list() {
      // 递归处理数据
      // eslint-disable-next-line no-unused-vars
      let recursion = e => {
        if (e.length > 0) {
          for (let i = 0; i < e.length; i++) {
            e[i].isReply = false;
            e[i].isShow = true;
            e[i].children = e[i].children ? e[i].children : [];
            if (e[i].children.length > 0) {
              e[i].children = this.recursion(e[i].children);
            }
          }
          return e;
        } else {
          return [];
        }
      };
      this.axios
        .ajax({
          url: this.$api.blog().discuss.list,
          data: {
            id: this.info.id, //文章的id
            type: 1 //代表文章的评论列表
          }
        })
        .then(e => {
          // console.log(e.data);
          let new_data = [];
          let no_reply = [];
          e.data.map(val => {
            val.isReply = false;
            val.isShow = true;
            val.children = [];
            if (val.reply) {
              no_reply.push(val);
            } else {
              new_data.push(val);
            }
          });

          this.discuss = new_data.map(val => {
            no_reply.map(li => {
              if (val.who === li.trunk_key) {
                val.children.push(li);
              }
            });
            return val;
          });
          console.log(this.discuss);
        })
        .catch();
    }
  }
};
</script>
<style scoped lang="scss">
.blog_content {
  min-width: 1000px;
  width: 80vw;
  min-height: 90vh;
  background: #ffffff;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .article {
    width: 75%;
    padding: 20px;
    display: flex;
    flex-flow: column;
    > h1 {
      font-weight: bold;
      font-size: 26px;
    }
    .tag {
      font-size: 12px;
      color: #7a7a7a;
      margin-top: 7px;
      display: flex;
      align-items: center;
      .classify {
        color: #079d54;
      }
      > span {
        margin-right: 15px;
      }
    }
    > img {
      margin-top: 15px;
      width: 100%;
      object-fit: cover;
      max-height: 250px;
    }
    > hr {
      margin: 20px 0;
      width: 100%;
      height: 1px;
      background: #cccccc;
    }
    > section {
      width: 100%;
    }
  }
  .author {
    width: 25%;
    max-width: 300px;
    min-width: 250px;
  }
}
</style>
