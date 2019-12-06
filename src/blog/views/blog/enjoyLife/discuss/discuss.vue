<template>
  <div class="discuss-info">
    <div class="tag">
      <span>发布时间：{{ item.created_at }}</span>
    </div>
    <div class="say-something">{{ item.content }}</div>
    <div class="img-list">
      <template v-for="(img, imgi) in item.img_list">
        <images :key="imgi" :preview="true" class="u-img" :src="img"></images>
      </template>
    </div>
    <div class="operation">
      <span
        class="el-icon-delete"
        v-if="$store.state.is_blogger"
        @click="dynamic_del(item.id, index)"
        >删除</span
      >
    </div>
    <div>
      <dht-discuss
        @reply="
          e => {
            reply(e, item);
          }
        "
        ref="discuss"
        @delete="del_discuss"
        :discuss="item.discuss"
      ></dht-discuss>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        discuss: []
      }
    };
  },
  components: {
    dhtDiscuss: () => import("@/blog/views/components/discuss.vue"),
    // 图片组件
    images: () => import("../../../components/img.vue")
  },
  beforeCreate() {},
  created() {
    const id = this.$route.query.discuss;
    if (!id) {
      this.$router.go(-1);
    }
    this.discuss_info(id);
  },
  methods: {
    discuss_info(id) {
      this.axios
        .ajax({
          url: this.$api.blog().discuss.info,
          loading: true,
          data: {
            id: id
          }
        })
        .then(e => {
          if (e.data) {
            e.data.discuss = [];
            e.data.img_list = e.data.img_list ? e.data.img_list.split(",") : [];
            this.item = e.data;
            this.discuss_list();
          } else {
            this.$message({
              message: "评论已删除",
              type: "info"
            });
            this.$router.go(-1);
          }
        })
        .catch();
    },
    // 评论组件返回数据
    reply(e, item) {
      let data;
      if (!e.node) {
        // 主评论
        data = {
          content: e.reply, //评论内容
          is_trunk: "1", // 是否主评论
          key: item.id, //关联id
          type: "2", //评论类型，当前属于文章评论
          who: this.$store.state.ip.cip, //谁发的，记录ip地址
          reply: "", // 发给谁记录ip地址
          location: this.$store.state.ip.cname //发送人所在地区
        };
      } else {
        // 回复评论
        data = {
          trunk_key: e.parentData.id, //归属于哪项评论下面
          content: e.reply,
          is_trunk: "0",
          key: item.id,
          type: "2",
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
          this.discuss_list();
        })
        .catch();
    },
    // 删除评论
    del_discuss(e) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .ajax({
              url: this.$api.blog().discuss.del,
              data: {
                id: e.node.id
              }
            })
            .then(() => {
              this.discuss_list();
            })
            .catch();
        })
        .catch();
    },
    // 评论列表数据
    discuss_list() {
      this.axios
        .ajax({
          url: this.$api.blog().discuss.list,
          data: {
            id: this.item.id, //文章的id
            type: 2 //代表动态评论列表
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

          this.item.discuss = new_data.map(val => {
            no_reply.map(li => {
              if (val.id == li.trunk_key) {
                val.children.push(li);
              }
            });
            return val;
          });
        })
        .catch();
    }
  }
};
</script>

<style scoped lang="scss">
// 图片展示
.img-list {
  display: flex;
  flex-flow: row wrap;
  .u-img {
    width: 100px;
    height: 100px;
    margin-right: 3px;
    margin-top: 3px;
    font-size: 30px;
    color: #1abc9c;
    border: #1abc9c 1px solid;
  }
}
.discuss-info {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
  min-width: 1000px;
  padding: 15px;
  display: flex;
  flex-flow: column;
  background: #ffffff;
  box-shadow: #cccccc 0 0 3px;
  > div {
    margin-bottom: 7px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .tag {
    color: #cccccc;
    font-size: 12px;
  }
  .say-something {
    line-height: 25px;
    margin-top: 5px;
    text-indent: 20px;
  }
  .operation {
    border-top: #f1f1f1 1px solid;
    padding-top: 8px;
    color: #087e43;
    font-size: 13px;
    display: flex;
    justify-content: flex-end;
    > span {
      cursor: pointer;
      margin-right: 15px;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
