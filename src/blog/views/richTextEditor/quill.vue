<template>
  <div class="quill">
    <header>
      <div class="header">
        <div class="operation">
          <div class="left">
            <span class="bolg"><router-link to="/">酱油博客</router-link></span>
            <span @click="$router.go(-1)">返回上一页</span>
            <span
              v-show="editor_type === 'add'"
              @click="article_modify('1', true)"
              >{{ draft_tips }}</span
            >
          </div>
          <span @click="release">发布</span>
          <el-popover placement="bottom" trigger="manual" v-model="visible">
            <div class="cover-img">
              <div
                v-show="!cover"
                @click="$refs.upload.click()"
                class="upload-cover"
              >
                点击添加封面图片
              </div>
              <div v-show="cover" class="cover-picture">
                <img alt="封面图" :src="cover_url" />
                <span
                  @click="
                    () => {
                      (cover_url = ''), (cover = '');
                    }
                  "
                  class="del-img el-icon-delete"
                ></span>
              </div>
            </div>
            <span
              slot="reference"
              class="el-icon-picture"
              :style="{ color: cover ? '#409eff' : '#a2a2a2' }"
              @click="
                () => {
                  (upload_type = 2), (visible = !visible);
                }
              "
              >添加封面图</span
            >
          </el-popover>
        </div>
        <herader-user :noshow="$store.state.core"></herader-user>
      </div>
    </header>
    <div class="editor">
      <textarea
        class="article-title"
        placeholder="请输入文章标题……"
        v-model="title"
        maxlength="40"
        rows="1"
        ref="textarea"
        @change="save_article"
      >
      </textarea>
      <div class="classify">
        <span>分类：</span>
        <el-checkbox-group
          @change="save_article"
          v-model="classify"
          size="small"
        >
          <el-checkbox-button
            v-for="item in all_class"
            :label="item.id"
            :key="item.id"
            >{{ item.name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <quill-editor
        ref="QuillEditor"
        class="quill-dht"
        :options="editorOption"
        v-model="content"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <!--不可见功能-->
    <div class="invisible">
      <el-upload
        :headers="headers"
        :action="uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <div ref="upload"></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import util from "@/common/tool/util.js";
import { antiShake } from "@/common/tool/antiShakingAndThrottling.js";
const store = require("store");
import { quillEditor, Quill } from "vue-quill-editor";
// 支持图片缩放
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
// 拖拽上传图片
import { ImageExtend } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);

export default {
  components: {
    quillEditor,
    heraderUser: () =>
      import("@/components/project/header_user/header-user.vue")
  },
  data() {
    const user_info = store.get("user_info");
    const uploadImg = this.$api.static().upload_pictures + "?source=文章";
    return {
      editor_type: "add", //编辑器类型，add代表添加文章，update代表文章修改
      headers: { Authorization: user_info.sign },
      uploadImg: uploadImg,
      editorOption: {
        theme: "snow",
        placeholder: "开始创作……",
        debug: false,
        modules: {
          // 自定义菜单栏
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],
              ["link", "image"],
              ["clean"] // remove formatting button
            ],
            handlers: {
              image: value => {
                if (value) {
                  this.upload_type = 1;
                  this.$refs.upload.click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          },
          // 开启图片拖拽上传，以及自定义大小
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            }
          },
          ImageExtend: {
            // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: "img", // 图片参数名
            size: 1, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: uploadImg,
            response: res => {
              return this.$api.static().visit + res.data;
            },
            headers: xhr => {
              xhr.setRequestHeader("Authorization", user_info.sign);
            },
            sizeError: () => {
              this.$notify({
                title: "上传失败",
                type: "error",
                message: "图片大小超过1M"
              });
            },
            // 可选参数 上传失败触发的事件
            error: e => {
              console.log(e);
              this.$notify({
                title: "上传失败",
                type: "error",
                message: "图片大小超过1M"
              });
            }
          }
        }
      },
      //富文本内容
      id: "",
      content: "", // 文章内容
      title: "", // 文章标题
      classify: [], // 文章选中的分类
      cover: "", //封面图显示的
      cover_url: "", // 封面图上传的图片
      all_class: [],
      synopsis: "", //文章简介
      // 图片上传类型，1文章图片上传，2封面图上传
      upload_type: 1,
      draft: "", //当前文章是否处于草稿状态
      visible: false,
      draft_tips: "存储为草稿" //存储草稿内容修改，用以提示存储成功
    };
  },
  beforeCreate() {},
  created() {
    const query = this.$route.query;
    //编辑器初始化工作
    const editor_type = query.editor_type;
    const id = query.id;
    if (!editor_type) {
      this.$message({
        message: "编辑器缺少必要参数",
        type: "error",
        duration: 3000
      });
      this.$router.push({ path: "/" });
    } else {
      this.editor_type = editor_type;
      // 当不同类型下，编辑器需要做不同的初始化操作
      if (editor_type === "add") {
        console.log("创作新文章");
        // 创作状态下需要判断页面是否存在缓存，如果存在缓存则取缓存数据，调用详情接口
        const storeid = store.get("article_id");
        if (storeid) {
          this.id = storeid;
          this.details();
        }
      }
      if (editor_type === "update") {
        console.log("修饰文章");
        this.id = id;
        this.details();
      }
    }
  },
  destroyed() {
    // 离开页面需要清理数据
    store.remove("article_id");
  },
  mounted() {
    // textarea高度自适应
    util.autoTextarea(this.$refs.textarea);
    // 获取所有分类
    this.classify_list_all();
  },
  methods: {
    // 焦点离开
    onEditorBlur() {},
    // 获取焦点
    onEditorFocus() {},
    // 准备富文本编辑器
    onEditorReady() {},
    // 内容改变事件
    // 引入防抖函数避免重复的调用接口数据
    onEditorChange(e) {
      this.synopsis = e.text ? e.text.substring(0, 300) : ""; //存储文章的简介
      this.save_article();
    },
    // 保存文章
    save_article: antiShake(
      function() {
        if (this.id) {
          this.article_modify(this.draft ? this.draft : "1", false);
        } else {
          this.create()
            .then(() => {
              this.article_modify("1", false);
            })
            .catch();
        }
      },
      5000,
      false
    ),
    // 图片上传成功
    handleAvatarSuccess(res) {
      console.log(res.data);
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (res.code === 0) {
        // 文章图片上传
        if (this.upload_type === 1) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(
            length,
            "image",
            this.$api.static().visit + res.data
          );
          // 调整光标到最后
          quill.setSelection(length + 1);
        }
        // 封面图片上传
        if (this.upload_type === 2) {
          this.cover_url = this.$api.static().visit + res.data;
          this.cover = res.data;
          // 触发下文章保存
          this.onEditorChange();
        }
      } else {
        // 提示信息，需引入Message
        this.$message.error("图片插入失败");
      }
    },
    // 图片上传前置限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    },
    // 文章所有分类列表
    classify_list_all() {
      this.axios
        .ajax({
          url: this.$api.blog().article.classify.list
        })
        .then(e => {
          this.all_class = e.data;
          this.$store.commit("set_data", {
            all_class: e.data
          });
        })
        .catch();
    },
    // 创作一篇新文章
    create() {
      return new Promise((suc, err) => {
        this.axios
          .ajax({
            url: this.$api.blog().article.add,
            data: {
              title: this.title ? this.title : "无标题",
              user_id: this.$store.state.user_info.userid
            },
            method: "post",
            loading: true
          })
          .then(e => {
            // 当前文章的id必须有
            this.id = e.data;
            // 存入缓存
            store.set("article_id", e.data);
            suc(e.data);
          })
          .catch(() => {
            err();
          });
      });
    },
    // 修改文章状态，包含发布等操作，注意当draft为0的时候代表文章不再是草稿，必须发布，否则引起逻辑错误
    article_modify(draft = "1", loading = true) {
      let data = {
        id: this.id,
        title: this.title ? this.title : "无标题",
        draft: draft,
        content: this.content,
        cover: this.cover,
        classify: this.classify.toString(),
        synopsis: this.synopsis,
        user_id: this.$store.state.user_info.userid
      };
      this.draft_tips = "存储草稿中……";
      return new Promise((suc, err) => {
        this.axios
          .ajax({
            url: this.$api.blog().article.modify,
            data: data,
            method: "post",
            loading: loading
          })
          .then(() => {
            this.draft_tips = "存储草稿成功";
            setTimeout(() => {
              this.draft_tips = "存储草稿";
            }, 500);
            suc();
          })
          .catch(() => {
            this.draft_tips = "存储草稿失败";
            setTimeout(() => {
              this.draft_tips = "存储草稿";
            }, 500);
            err();
          });
      });
    },
    details() {
      this.axios
        .ajax({
          url: this.$api.blog().article.details,
          loading: true,
          data: {
            id: this.id
          }
        })
        .then(e => {
          this.id = e.data.id;
          this.draft = e.data.draft;
          this.content = e.data.content;
          this.title = e.data.title;
          this.cover = e.data.cover;
          this.cover_url = e.data.cover
            ? this.$api.static().visit + e.data.cover
            : "";
          if (e.data.classify) {
            this.classify = e.data.classify.split(",").map(val => {
              val = Number(val);
              return val;
            });
          }
        })
        .catch();
    },
    // 发布文章
    release() {
      this.article_modify("0", true)
        .then(() => {
          // 发布成功
          this.$router.push({ path: "/" });
        })
        .catch();
    }
  }
};
</script>

<style scoped lang="scss">
.quill {
  display: flex;
  flex-flow: column;
  align-items: center;
  header {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 50px;
    border-bottom: #d7d7d7 1px solid;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: #ffffff;
    .header {
      height: 50px;
      width: 1000px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .operation {
        line-height: 50px;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: #409eff;
        width: 950px;
        .left {
          margin-right: auto;
          > span {
            margin-right: 25px;
            cursor: pointer;
          }
          .bolg {
            color: #2a2a2a;
            font-size: 22px;
          }
        }
        > span {
          margin-right: 20px;
        }
      }
    }
  }
  .editor {
    width: 1000px;
    margin-top: 65px;
    .article-title {
      margin-bottom: 20px;
      color: #262626;
      padding: 0;
      font-size: 24px;
      font-weight: 600;
      border: none;
      width: 100%;
      resize: none;
      outline: none;
      overflow: hidden;
      font-family: "Microsoft YaHei UI";
      letter-spacing: 3px;
      margin-top: 45px;
    }
    .classify {
      display: flex;
      align-items: center;
      > span {
        font-size: 14px;
        color: #cccccc;
      }
      margin-bottom: 15px;
    }
    .quill-dht {
      height: calc(100vh - 208px);
      /deep/ .ql-toolbar.ql-snow {
        position: fixed;
        z-index: 1;
        width: 1000px;
        top: 50px;
        background: #ffffff;
        border-top: none;
      }
      /deep/ .ql-container {
        font-size: 14px;
        .ql-editor {
          // overflow: hidden;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
.cover-img {
  width: 100%;
  .upload-cover,
  .cover-picture {
    cursor: pointer;
    width: 270px;
    height: 170px;
    background: #e2e2e2;
    text-align: center;
    line-height: 170px;
    color: #a2a2a2;
  }
  .cover-picture {
    > img {
      width: 100%;
      height: 100%;
    }
    .del-img {
      display: inline-block;
      color: #a8a8a8;
      padding: 5px;
      background: black;
      position: absolute;
      margin-left: -25px;
      &:hover {
        color: #ff374b;
      }
    }
  }
}
</style>
