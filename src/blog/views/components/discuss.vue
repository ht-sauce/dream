<template>
  <div class="discuss-sum">
    <el-dialog
      class="dialo-check"
      title="请输入验证码"
      :visible.sync="dialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="dialog_close"
    >
      <div class="dialo-verify">
        <div class="captcha">
          <img :src="captcha" alt="验证码" />
          <el-button @click="create_captcha">刷新</el-button>
        </div>
        <el-input v-model.number="verify" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="check_captcha">发表</el-button>
      </span>
    </el-dialog>
    <div class="self">
      <img
        v-if="userInfo.portrait"
        :src="$api.static().visit + userInfo.portrait"
        alt=""
      />
      <img v-else :src="require('@/assets/img/icon/dogHead.jpg')" alt="" />
      <div style="margin-right: 10px;">
        <div>{{ ip_info.cip }}</div>
        <div>{{ ip_info.cname }}</div>
      </div>
      <el-input
        maxlength="800"
        autosize
        type="textarea"
        v-model="replyMain"
      ></el-input>
      <el-button
        class="reply-buttom"
        type="primary"
        @click="reply_msg(null, null)"
        >评论</el-button
      >
    </div>
    <dht-tree @open="is_open" v-if="discuss.length > 0" :data="discuss">
      <template v-slot="{ node, location, parentData }">
        <div class="discuss">
          <div class="head-portrait">
            <img v-if="node.img" :src="node.img" alt="" />
            <img
              v-else
              :src="require('@/assets/img/icon/dogHead.jpg')"
              alt=""
            />
          </div>
          <div class="content">
            <div class="name">
              <span>{{ node.who }}</span>
              <span>{{ node.location }}</span>
              <span v-if="node.reply">@{{ node.reply }}</span>
            </div>
            <div class="comment">
              {{ node.content }}
            </div>
            <div class="time">
              <span>{{ node.created_at }}</span>
            </div>
            <div class="operation">
              <div class="term">
                <div></div>
                <div>
                  <span
                    class="el-icon-chat-line-round"
                    @click="
                      () => {
                        if (reply_history !== node) {
                          reply_history.isReply = false;
                          node.isReply = !node.isReply;
                          reply_history = node;
                        } else {
                          node.isReply = !node.isReply;
                        }
                      }
                    "
                    >回复</span
                  >
                  <span
                    v-if="
                      $store.state.user_info &&
                        $store.state.user_info.account ===
                          $store.state.blogger.account
                    "
                    class="el-icon-delete"
                    @click="del_discuss(node, location, parentData)"
                    >删除</span
                  >
                </div>
              </div>
              <div v-if="node.isReply" class="reply">
                <el-input
                  maxlength="800"
                  type="textarea"
                  autosize
                  v-model="reply"
                ></el-input>
                <el-button
                  class="reply-buttom"
                  type="primary"
                  @click="reply_msg(node, location, parentData)"
                  >评论</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </dht-tree>
  </div>
</template>

<script>
export default {
  props: {
    discuss: Array
  },
  data() {
    return {
      captcha:
        this.$api.baseURL +
        this.$api.static().verify.captcha +
        "?k=" +
        Math.random(),
      dialogVisible: false,
      ip_info: this.$store.state.ip,
      userInfo: this.$store.state.user_info ? this.$store.state.user_info : {},
      // 记录上一次打开的回复节点
      reply_history: {},
      replyMain: "",
      verify: "",
      reply: "", //单条回复内容
      node: null,
      location: null,
      parentData: null
    };
  },
  computed: {},
  beforeCreate() {},
  created() {},
  methods: {
    dialog_close() {
      this.node = null;
      this.location = null;
      this.parentData = null;
    },
    create_captcha() {
      this.captcha =
        this.$api.baseURL +
        this.$api.static().verify.captcha +
        "?k=" +
        Math.random();
    },
    // 删除节点数据
    del_discuss(node, location, parentData) {
      this.$emit("delete", {
        node: node,
        location: location,
        parentData: parentData
      });
    },
    // 回复函数
    reply_msg(node, location, parentData) {
      if (!node) {
        if (!this.replyMain) {
          this.$message("未输入评论内容");
          return false;
        }
      } else {
        if (!this.reply) {
          this.$message("未输入评论内容");
          return false;
        }
      }
      this.dialogVisible = true;
      this.node = node;
      this.location = location;
      this.parentData = parentData;
    },
    // 最后确认提交
    check_captcha() {
      if (!this.verify) {
        this.$message("未输入验证码");
        return false;
      }
      this.create_captcha();
      if (this.node) {
        this.$emit("reply", {
          reply: this.reply,
          node: this.node,
          location: this.location,
          parentData: this.parentData,
          verify: this.verify
        });
      } else {
        // 主回复评论
        this.$emit("reply", {
          reply: this.replyMain,
          location: this.location,
          verify: this.verify
        });
      }
      this.dialogVisible = false;
    },
    // 打开关闭监听
    is_open(e) {
      this.$emit("open", e);
    },
    //清理回复的消息
    clear_msg() {
      if (this.node) {
        this.node.isReply = !this.node.isReply;
      }
      this.reply = "";
      this.replyMain = "";
    }
  }
};
</script>

<style scoped lang="scss">
.discuss-sum {
  .dialo-verify {
    .captcha {
      display: flex;
      align-items: center;
      margin: 5px;
      > img {
        margin-right: 10px;
      }
    }
  }
  .self {
    padding: 15px;
    background: #f1f1f1;
    display: flex;
    align-items: center;
    > img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .reply-buttom {
      margin-left: 15px;
    }
  }
  .discuss {
    width: 100%;
    display: flex;
    padding: 10px;
    .head-portrait {
      width: 30px;
      > img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
    }
    .content {
      width: 100%;
      padding-left: 15px;
      padding-bottom: 10px;
      border-bottom: #8adfff 1px solid;
      .name {
        font-size: 14px;
        color: #636363;
        padding-bottom: 10px;
        > span {
          margin-right: 7px;
        }
      }
      .content {
        font-size: 14px;
        line-height: 20px;
      }
      .time {
        font-size: 12px;
        color: #cccccc;
        padding: 7px 0;
      }
      .operation {
        padding-top: 7px;
        color: #a2a2a2;
        font-size: 13px;
        &:hover {
          color: #409eff;
        }
        .term {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          > div > span {
            margin-left: 20px;
          }
        }
        .reply {
          padding-top: 10px;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          .reply-buttom {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
