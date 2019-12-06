<template>
  <div id="enjoyLife" class="g-width">
    <!--左侧功能列表-->
    <ul class="left">
      <template v-for="(item, index) in leftData">
        <li :key="index">
          <router-link :to="item.url">{{ item.name }}</router-link>
        </li>
      </template>
    </ul>
    <div class="right">
      <!--博主发表个人动态-->
      <div v-if="userInfo" class="release">
        <textarea
          ref="textarea"
          @blur="temporary_save_dynamic"
          v-model="content"
          maxlength="1100"
        ></textarea>
        <span class="word-number">{{ textNum }}</span>
        <div class="img-list">
          <template v-for="(item, index) in imgList">
            <images
              :key="index"
              @click.native="del_img(index, imgList)"
              class="u-img"
              :src="item"
            ></images>
          </template>
        </div>
        <div class="operation">
          <el-button type="warning" @click="upload_img">添加图片</el-button>
          <el-button type="primary" @click="release_dynamics">发表</el-button>
        </div>
      </div>
      <!--动态展示列表-->
      <ul class="dynamic">
        <template v-for="(item, index) in dynamic">
          <li :key="index">
            <div class="tag">
              <span>发布时间：{{ item.created_at }}</span>
            </div>
            <div class="say-something">{{ item.content }}</div>
            <div class="img-list">
              <template v-for="(img, imgi) in item.img_list">
                <images
                  :key="imgi"
                  :preview="true"
                  class="u-img"
                  :src="img"
                ></images>
              </template>
            </div>
            <div class="operation">
              <span>
                <router-link :to="'/discuss/info?discuss=' + item.id"
                  >全部</router-link
                >
              </span>
              <span
                class="el-icon-chat-line-round"
                @click="
                  () => {
                    item.is_discuss = !item.is_discuss;
                    discuss_item = item;
                    discuss_list();
                  }
                "
                >评论</span
              >
              <span
                v-if="$store.state.is_blogger"
                class="el-icon-delete"
                @click="dynamic_del(item.id, index)"
                >删除</span
              >
            </div>
            <div v-if="item.is_discuss">
              <dht-discuss
                @reply="
                  e => {
                    reply(e, item);
                    discuss_item = item;
                    discuss_list();
                  }
                "
                :ref="'discuss' + index"
                @delete="del_discuss"
                :discuss="item.discuss"
              ></dht-discuss>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import util from "@/common/tool/util.js";
const store = require("store");
export default {
  name: "enjoyLife",
  components: {
    dhtDiscuss: () => import("@/blog/views/components/discuss.vue"),
    // 图片组件
    images: () => import("../../components/img.vue")
  },
  data() {
    return {
      userInfo: this.$store.state.user_info,
      leftData: [
        { name: "生活动态", url: "/enjoyLife?page=3" },
        { name: "相册动态", url: "/enjoyLife/album" }
      ],
      content: "",
      discuss_item: {},
      imgList: [],
      dynamic: [] //生活动态列表
    };
  },
  computed: {
    textNum() {
      return 1100 - this.content.length;
    }
  },
  created() {
    const temporary_dynamic = store.get("temporary_dynamic");
    if (temporary_dynamic) {
      this.content = temporary_dynamic.content;
      this.imgList = temporary_dynamic.imgList;
    }
    this.dynamic_list();
  },
  mounted() {
    // 动态变化textarea高度
    this.$store.state.is_blogger && util.autoTextarea(this.$refs.textarea);
  },
  methods: {
    // 临时存储动态,防止刷新丢失
    temporary_save_dynamic(type = true) {
      if (type) {
        store.set("temporary_dynamic", {
          content: this.content,
          imgList: this.imgList
        });
      } else {
        this.content = "";
        this.imgList = "";
        store.set("temporary_dynamic", {
          content: "",
          imgList: []
        });
      }
    },
    //发表动态
    release_dynamics() {
      if (this.imgList.length > 5) {
        this.$notify({
          message: "图片不能超过5张",
          type: "info",
          title: "图片"
        });
        return false;
      }
      this.$confirm("确认发表评论", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .ajax({
              url: this.$api.blog().dynamic.add,
              loading: true,
              method: "post",
              data: {
                content: this.content,
                user_id: this.userInfo.userid,
                img_list: this.imgList.toString()
              }
            })
            .then(() => {
              this.temporary_save_dynamic(false);
              this.dynamic_list();
            })
            .catch();
        })
        .catch();
    },
    //删除当前图片
    del_img(index, rows) {
      rows.splice(index, 1);
    },
    // 上传图片
    upload_img() {
      this.axios
        .upload({
          url: this.$api.static().aliyun.single_img_upload,
          fdata: {
            //上传到阿里云个人动态中
            route_name: "dream/dynamic/",
            source: "个人动态配图",
            album_id: 1
          }
        })
        .then(e => {
          console.log("图片", e);
          this.imgList.push(e.data);
          // 临时存储图
          this.temporary_save_dynamic();
        })
        .catch();
    },
    // 动态列表
    dynamic_list(page = 1) {
      this.axios
        .ajax({
          url: this.$api.blog().dynamic.list,
          data: {
            page: page
          },
          loading: true
        })
        .then(e => {
          this.dynamic = e.data.map(val => {
            val.discuss = [];
            val.is_discuss = false;
            val.img_list = val.img_list ? val.img_list.split(",") : "";
            return val;
          });
        })
        .catch();
    },
    // 删除当前动态
    dynamic_del(id, index) {
      this.$confirm("此操作将永久删除该动态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .ajax({
              url: this.$api.blog().dynamic.del,
              data: {
                id: id
              },
              loading: true
            })
            .then(() => {
              this.dynamic.splice(index, 1);
            })
            .catch();
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
            id: this.discuss_item.id, //文章的id
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

          this.discuss_item.discuss = new_data.map(val => {
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
@import "@/assets/css/public.scss";
#enjoyLife {
  width: 80%;
  min-width: 1000px;
  display: flex;
  flex-flow: row;
  margin: 20px 0 30px 0;
  justify-content: space-between;
  .left {
    width: 200px;
    > li {
      padding: 20px;
      box-sizing: border-box;
      height: 40px;
      width: 100%;
      background: #ffffff;
      display: flex;
      align-items: center;
      color: #072539;
      border-bottom: #d2eaea 1px solid;
      > a {
        font-weight: bold;
      }
    }
    > li:hover {
      background: rgba(151, 228, 255, 0.1);
    }
  }
  .right {
    width: calc(100% - 225px);
    min-height: 80vh;
    // 图片展示
    .img-list {
      padding-left: 10px;
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
    .release {
      background: #ffffff;
      padding: 15px;
      border-bottom: #f1f1f1 1px solid;
      margin-bottom: 10px;
      > textarea {
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
          Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial,
          sans-serif;
        text-rendering: optimizeLegibility;
        width: 100%;
        color: $font_main;
        border: $border_main;
        outline: none;
        border-radius: 0;
        resize: none;
        overflow: hidden;
        background: #fbfbfb;
        font-size: 14px;
        padding: 10px;
        line-height: 25px;
        height: 140px;
        display: inline-block;
        // 纸页效果
        position: relative;
        border: 1px solid #efefef;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27),
          0 0 40px rgba(0, 0, 0, 0.06) inset;
      }
      .word-number {
        position: absolute;
        margin-top: 120px;
        margin-left: -40px;
      }
      .operation {
        margin-top: 5px;
        display: flex;
        justify-content: flex-end;
      }
    }
    .dynamic {
      > li {
        padding: 15px;
        display: flex;
        flex-flow: column;
        background: #ffffff;
        box-shadow: #cccccc 0 0 3px;
        margin-bottom: 10px;
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
    }
  }
}
</style>
