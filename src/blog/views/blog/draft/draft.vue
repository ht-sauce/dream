<template>
  <div class="draft">
    <div class="left">
      <h3>草稿箱</h3>
      <div class="hr"></div>
      <ul class="draft-list">
        <template v-for="(item, index) in list">
          <li :key="index">
            <h4>
              <router-link
                :to="'/richTextEditor?editor_type=update&id=' + item.id"
                >{{ item.title }}</router-link
              >
            </h4>
            <div class="synopsis">{{ item.synopsis }}</div>
            <div class="options">
              <span>{{ item.created_at }}</span>
              <span class="del" @click="del_article(index, list)">删除</span>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="right">
      <user-mianbane></user-mianbane>
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
      list: []
    };
  },
  beforeCreate() {},
  created() {
    this.draft();
  },
  methods: {
    draft() {
      this.axios
        .ajax({
          url: this.$api.blog().article.draft,
          data: {
            user_id: this.$store.state.user_info.userid
          },
          loading: true
        })
        .then(e => {
          console.log(e.data);
          this.list = e.data;
        })
        .catch();
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
.draft {
  min-width: 1000px;
  width: 70vw;
  min-height: 80vh;
  background: #ffffff;
  margin-top: 20px;
  display: flex;
  .left {
    width: 71%;
    padding: 20px;
    display: flex;
    flex-flow: column;
    h3 {
      margin: 0;
    }
    .hr {
      width: 100%;
      border-top: #c9c9c9 1px solid;
      margin: 15px 0;
    }
    .draft-list {
      padding-left: 15px;
      h4 {
        margin: 0;
        font-size: 20px;
      }
      > li {
        margin: 10px 0;
        border-bottom: #eaeaea 1px solid;
        .synopsis {
          margin: 7px 0;
          line-height: 25px;
          font-size: 14px;
          min-height: 30px;
          padding-left: 10px;
        }
        .options {
          padding-left: 10px;
          margin-bottom: 7px;
          color: #cccccc;
          > span {
            margin-right: 20px;
            font-size: 14px;
          }
          .del {
            color: #ff0e3f;
          }
        }
      }
    }
  }
  .right {
    width: 29%;
    min-width: 300px;
  }
}
</style>
