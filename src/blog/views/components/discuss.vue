<template>
  <div class="discuss-sum">
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
        v-model="reply"
      ></el-input>
      <el-button class="reply-buttom" type="primary" @click="reply_msg(node)"
        >评论</el-button
      >
    </div>
    <dht-tree @open="is_open" v-if="discuss.length > 0" :data="discuss">
      <template v-slot="{ node }">
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
              <span>{{ node.name }}</span>
            </div>
            <div class="comment">
              {{ node.content }}
            </div>
            <div class="operation">
              <div class="term">
                <div></div>
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
                  @click="reply_msg(node)"
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
    discuss: {
      type: Array,
      default() {
        return [
          {
            img:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574660609640&di=34eb4b3833b61b9c4ae49d0b86872e1e&imgtype=0&src=http%3A%2F%2Fpic.962.net%2Fup%2F2018-1%2F2018191570320420.jpg",
            name: "购房款",
            content: "法大大收费单",
            isReply: false,
            isShow: true,
            children: [
              {
                img: "",
                name: "",
                isReply: false,
                isShow: false,
                content: "法大大收费单",
                children: []
              }
            ]
          },
          {
            img: "",
            name: "",
            isReply: false,
            isShow: false,
            content: "法大大收费单",
            children: []
          }
        ];
      }
    }
  },
  data() {
    return {
      ip_info: this.$store.state.ip,
      userInfo: this.$store.state.user_info ? this.$store.state.user_info : {},
      // 记录上一次打开的回复节点
      reply_history: {},
      reply: "" //单条回复内容
    };
  },
  beforeCreate() {},
  created() {},
  methods: {
    // 回复函数
    reply_msg(node) {
      this.$emit("reply", { reply: this.reply, node: node });
    },
    is_open(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
.discuss-sum {
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
      }
      .content {
        font-size: 14px;
        line-height: 20px;
      }
      .operation {
        padding-top: 10px;
        color: #a2a2a2;
        font-size: 13px;
        &:hover {
          color: #409eff;
        }
        .term {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
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
