<template>
  <div id="blogList" class="g-width">
    <div class="left">
      <input
        @keyup.enter="blog_list(1, 10)"
        class="search"
        placeholder="根据文章标题检索……"
        v-model="keyword"
      />
      <left-blog :list="leftBlogData"></left-blog>
      <div class="load-many" @click="load_blog">加载更多</div>
    </div>
    <div class="right">
      <user-mianbane></user-mianbane>
      <right-blog title="点击排行" :list="rightBlogData"></right-blog>
    </div>
  </div>
</template>

<script>
export default {
  name: "blogList",
  data() {
    return {
      keyword: "",
      //左侧博客数据流
      leftBlogData: [],
      //右侧点击量排行
      rightBlogData: [],
      page: 1,
      is_load: true
    };
  },
  components: {
    userMianbane: () => import("@/blog/views/components/user_mianbane.vue"),
    leftBlog: () => {
      return import("@/blog/views/components/left_blog.vue");
    },
    rightBlog: () => {
      return import("@/blog/views/components/right_blog.vue");
    }
  },
  beforeCreate() {},
  created() {
    this.blog_list();
    this.blog_list_rank();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 博客列表
    blog_list(page = 1, limit = 10) {
      const data = {
        limit: limit,
        page: page,
        keyword: this.keyword
      };
      this.axios
        .ajax({
          url: this.$api.blog().article.list,
          data: data,
          loading: true
        })
        .then(e => {
          if (e.data.list.length > 0) {
            this.page = page + 1;
            if (page === 1) {
              this.leftBlogData = e.data.list;
            } else {
              const blog = e.data.list.map(val => {
                val.cover = val.cover
                  ? this.$api.static().visit + val.cover
                  : "";
                return val;
              });
              this.leftBlogData = this.leftBlogData.concat(blog);
            }
          } else {
            this.is_load = false;
          }
        })
        .catch();
    },
    blog_list_rank() {
      this.axios
        .ajax({
          url: this.$api.blog().article.click_rank
        })
        .then(e => {
          this.rightBlogData = e.data.map(val => {
            val.cover = val.cover ? this.$api.static().visit + val.cover : "";
            return val;
          });
        })
        .catch();
    },
    load_blog() {
      if (this.is_load) {
        this.blog_list(this.page);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
#blogList {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin: 20px 0 30px 0;
  .left {
    width: 69%;
    box-sizing: border-box;
    .search {
      border: none;
      outline: none;
      border-bottom: #278cff 1px solid;
      width: 100%;
      margin-bottom: 12px;
      padding-left: 20px;
      font-size: 14px;
      line-height: 30px;
      height: 30px;
    }
    .load-many {
      width: 100%;
      color: #555555;
      text-align: center;
      line-height: 40px;
      background: #a7ffd9;
    }
  }
  .right {
    width: 29%;
  }
}
</style>
