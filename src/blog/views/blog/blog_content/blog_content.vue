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
      <section v-html="info.content"></section>
    </article>
    <div class="author">
      <user-mianbane :author="info"></user-mianbane>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    userMianbane: () => import("@/blog/views/components/user_mianbane.vue")
  },
  data() {
    return {
      info: {}
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
    details(id) {
      this.axios
        .ajax({
          url: this.$api.blog().article.details,
          loading: true,
          data: {
            id: id
          }
        })
        .then(e => {
          console.log(e.data);
          e.data.classify = this.blogIconTaps(e.data.classify);
          e.data.cover = this.static_p(e.data.cover);
          e.data.portrait = this.static_p(e.data.portrait);
          this.info = e.data;
        })
        .catch();
    }
  }
};
</script>
<style>
img,
pre {
  max-width: 100%;
}
</style>
<style scoped lang="scss">
.blog_content {
  min-width: 1000px;
  width: 70vw;
  min-height: 500px;
  background: #ffffff;
  margin-top: 20px;
  display: flex;
  .article {
    width: 71%;
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
      /deep/ p {
        max-width: 100%;
        line-height: 30px;
      }
    }
  }
  .author {
    width: 29%;
    min-width: 300px;
  }
}
</style>
