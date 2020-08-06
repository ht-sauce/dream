<template>
  <div class="album">
    <!--图片上传弹窗-->
    <el-dialog
      class="dialo-img"
      :title="form.title"
      :visible.sync="dialogVisible"
      :width="form.width"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="dialog_close"
    >
      <template v-if="form.type === 1">
        <div class="upload-img-list">
          <div class="operation">
            <span style="margin-right: 10px;">当前上传图片的分类：</span>
            <el-autocomplete
              style="width: 300px;margin-right: 25px;"
              v-model="select_album_type"
              :fetch-suggestions="querySearch"
              value-key="name"
              placeholder="请选择相册分类"
              @select="selecl_album"
              clearable
            ></el-autocomplete>
            <el-input
              style="width: 250px;margin-right: 15px;"
              placeholder="图片备注"
              v-model="source"
              clearable
            ></el-input>
            <el-button type="success" @click="clear_success_img">清空已成功上传</el-button>
            <el-button type="danger" @click="upload_img_list = []">清空</el-button>
          </div>
          <div style="width: 100%; height: 57px;"></div>
          <ul class="file-list">
            <li class="upload-button">
              <input type="file" multiple="multiple" @change="temporary_file_upload" />
              <span class="icon el-icon-plus"></span>
              <span>上传图片</span>
            </li>
            <template v-for="(item, index) in upload_img_list">
              <li class="file-li" :key="index">
                <img :src="item.url" alt="" />
                <div class="upload_success" v-if="item.upload">上传成功</div>
                <div
                  class="file-del"
                  v-show="!item.upload"
                  @click="upload_img_list.splice(index, 1)"
                >
                  <span class="el-icon-delete-solid"></span>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="upload_file_list">上传图片</el-button>
        </span>
      </template>
      <template v-if="form.type === 2 || form.type === 3">
        <el-form
          class="albumForm"
          :model="album"
          :rules="album_rules"
          ref="albumForm"
          label-width="100px"
        >
          <el-form-item label="相册名称" prop="name">
            <el-input v-model="album.name" clearable></el-input>
          </el-form-item>
          <el-form-item prop="privacy">
            <el-switch v-model="album.privacy" active-text="是隐私" inactive-text="不是隐私相册">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="dialogVisible = false">取消</el-button>
            <el-button v-if="form.type === 2" type="primary" @click="album_valdate"
              >创建相册</el-button
            >
            <el-button v-if="form.type === 3" type="primary" @click="album_valdate"
              >修改相册</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
    <!--操作按钮区域-->
    <div v-if="$store.state.is_blogger" class="operation">
      <span class="upload-img" @click="add_photo_button">上传图片</span>
      <span class="add-album" @click="add_album">添加相册</span>
    </div>
    <!--展示区域-->
    <ul class="album-list">
      <template v-for="(item, index) in album_type">
        <li :key="index">
          <div class="photo">
            <img v-if="item.url" :src="item.url" alt />
            <img v-else src="../../../../../assets/img/icon/dogHead.jpg" alt />
            <div v-if="$store.state.is_blogger" class="album-li-button">
              <span class="el-icon-edit" @click="update_album(item)">修改</span>
              <span class="el-icon-delete" @click="delete_album(item.id)">删除</span>
            </div>
          </div>
          <div @click="jump_info(item)" class="album-name">
            <span>{{ item.name }}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      album: {
        name: '',
        privacy: false,
      },
      album_rules: {
        name: [{ required: true }],
      },
      form: {
        type: 1, //1图片上传，2，添加相册，3，修改相册
        title: '上传图片',
        width: '80%',
      },
      dialogVisible: false,
      upload_img_list: [], // 待上传的图片列表
      album_type: [], // 相册列表
      album_id: '', //选择得相册
      source: '', // 相册图片备注
      select_album_type: '', //已选择的图片分类
    }
  },
  beforeCreate() {},
  created() {
    this.album_list()
  },
  beforeMount() {},
  mounted() {},
  methods: {
    // 进入相册详情页面
    jump_info(e) {
      this.$router.push({
        path: '/enjoyLife/album/info',
        query: { id: e.id, name: e.name },
      })
    },
    // 清理已经成功上传的图片
    clear_success_img() {
      let clear = []
      this.upload_img_list.forEach((val, index) => {
        if (val.upload) {
          clear.push(index)
        }
      })
      clear.map(val => {
        this.upload_img_list.splice(val, 1)
      })
    },
    // 选择的相册
    selecl_album(e) {
      this.album_id = e
    },
    dialog_close() {
      this.select_album_type = ''
      this.upload_img_list = []
      this.dialogVisible = false
      this.album_id = ''
    },
    // 查询符合条件得相册
    querySearch(queryString, cb) {
      var album_type = this.album_type
      var results = queryString
        ? album_type.filter(e => {
            return e.name.indexOf(queryString) === 0
          })
        : album_type
      cb(results)
    },
    // 文件上传弹窗处理数据
    temporary_file_upload(e) {
      console.log(this.album_id)
      if (!this.album_id) {
        this.$message('请先选择相册')
        return false
      }
      let files = e.target.files
      const len = files.length
      if (!len || len < 1) {
        this.$message('请选择图片')
        return false
      }
      const type = ['image/jpeg', 'image/png', 'image/gif']
      // 提示信息
      const tips = msg => {
        this.$message({
          message: msg,
          type: 'warnging',
          duration: 2500,
        })
      }
      if (len > 30) {
        tips('上传超过30张')
        return false
      }
      // 获取最新的文件列表数据
      let files_name = []
      for (let j = 0; j < this.upload_img_list.length; j++) {
        files_name.push(this.upload_img_list[j].name)
      }
      for (let i = 0; i < len; i++) {
        // 数据拦截
        if (files[i].size / 1024 / 1024 > 5) {
          tips('文件大小超过5M')
          return false
        }
        if (len > 0 && !type.includes(files[i].type.toLocaleLowerCase())) {
          tips('文件不是jpg，png，gif')
          return false
        }
        // 数据处理
        let file_name = files[i].name
        // 拦截已存在的文件
        if (!files_name.includes(file_name)) {
          let formData = new FormData()
          formData.append('lifeUpload', files[i], file_name)
          this.upload_img_list.push({
            url: URL.createObjectURL(files[i]),
            file: formData,
            name: file_name,
            upload: false,
          })
        }
      }
      files_name = null
    },
    // 上传图片
    add_photo_button() {
      this.dialogVisible = true
      this.form = {
        type: 1, //1图片上传，2，添加相册，3，修改相册
        title: '上传图片',
        width: '80%',
      }
    },
    //添加相册
    add_album() {
      this.dialogVisible = true
      this.form = {
        type: 2, //1图片上传，2，添加相册，3，修改相册
        title: '添加相册',
        width: '40%',
      }
    },
    //修改相册
    update_album(row) {
      this.dialogVisible = true
      this.form = {
        type: 3, //1图片上传，2，添加相册，3，修改相册
        title: '修改相册',
        width: '40%',
      }
      row.privacy = row.privacy === '1'
      this.album = row
    },
    //删除相册
    delete_album(id) {
      this.$confirm('删除相册将会导致相册下面图片不可见', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.axios
          .ajax({
            url: this.$api.dht().album.del,
            data: {
              id: id,
            },
            loading: true,
          })
          .then(() => {
            this.album_list()
          })
          .catch()
      })
    },
    // 相册提交验证
    album_valdate() {
      this.$refs['albumForm'].validate(valid => {
        if (valid) {
          this.addAndUpdate()
        } else {
          return false
        }
      })
    },
    // 添加和修改ajax函数
    addAndUpdate() {
      let type = this.form.type
      let data = {
        name: this.album.name,
        privacy: this.album.privacy ? '1' : '0',
      }
      if (type === 3) {
        // 修改相册
        data.id = this.album.id // 修改增加相册id
      }
      this.axios
        .ajax({
          url: type === 2 ? this.$api.dht().album.add : this.$api.dht().album.modify,
          loading: true,
          method: type === 2 ? 'get' : 'post',
          data: data,
          success: type === 2 ? '添加成功' : '修改成功',
        })
        .then(() => {
          this.dialogVisible = false
          this.$refs['albumForm'].resetFields()
          this.album_list()
        })
        .catch()
    },
    // 相册列表
    album_list() {
      this.axios
        .ajax({
          url: this.$store.state.is_blogger
            ? this.$api.dht().album.list
            : this.$api.dht().album.noauth_list,
          loading: true,
        })
        .then(e => {
          this.album_type = e.data
        })
        .catch()
    },
    // 批量上传图片
    async upload_file_list() {
      /*url: URL.createObjectURL(files[i]),
            file: formData,
            name: file_name,
            upload: false*/
      const len = this.upload_img_list.length
      if (len < 1) {
        this.$message('请选择图片')
        return false
      }

      const url_data = {
        source: this.source ? this.source : '相册',
        route_name: 'dream/life/',
        album_id: this.album_id.id,
      }

      // 对uri地址进行数据拼接
      const new_url = obj => {
        if (obj) {
          let fields = ''
          for (let key in obj) {
            fields = fields + `&${key}=${obj[key]}`
          }
          return '?' + fields.substring(1, fields.length)
        } else {
          return ''
        }
      }
      let success_img = [] //上传成功的图片列表
      for (let i = 0; i < len; i++) {
        const upload = () => {
          return new Promise(suc => {
            this.axios
              .ajax({
                baseURL: '',
                loading: '上传图片中',
                url: this.$api.static().aliyun.single_img_upload + new_url(url_data),
                data: this.upload_img_list[i].file,
                method: 'post',
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(e => {
                this.upload_img_list[i].upload = true
                success_img.push(e.data)
                suc()
              })
              .catch(() => {
                suc()
              })
          })
        }
        await upload()
      }
      if (success_img.length < 1) return false
      this.axios
        .ajax({
          url: this.$api.blog().blog_dynamic.add,
          method: 'post',
          data: {
            content: this.album_id.name + '相册新增了图片',
            img: success_img.slice(0, 5).toString(),
            type: '3',
            privacy: this.album_id.privacy,
            crux: this.album_id.id,
          },
        })
        .then(() => {})
        .catch(() => {})
    },
  },
}
</script>

<style scoped lang="scss">
.album {
  width: 80%;
  min-width: 1000px;
  height: 500px;
  background: #ffffff;
  margin: 20px 0 20px 0;
  padding: 12px;
  .dialo-img {
    /deep/ .el-dialog {
      margin-top: 30px !important;
      min-width: 1000px;
      height: 89vh;
      min-height: 600px;
      .el-dialog__body {
        height: calc(100% - 54px - 62px);
        padding: 0 15px 15px 15px;
        overflow: auto;
      }
    }
    .upload-img-list {
      width: 100%;
      height: 100%;
      .operation {
        width: 96.4%;
        background: #ffffff;
        position: absolute;
        display: flex;
        align-items: center;
        border-bottom: #409eff 1px solid;
        border-top: #409eff 1px solid;
        color: black;
        z-index: 5;
      }
      .file-list {
        padding: 10px;
        display: flex;
        flex-flow: row wrap;
        flex-shrink: 0;
        .file-li,
        .upload-button {
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          width: 130px;
          height: 130px;
          background: #e2e2e2;
          margin: 0 10px 7px 0;
        }
        .file-li {
          > img {
            width: 100%;
            height: 100%;
          }
          position: relative;
          .upload_success {
            position: absolute;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
            background: rgba(8, 126, 67, 0.5);
            align-self: flex-end;
          }
          &:hover {
            .file-del {
              display: flex;
            }
          }
          .file-del {
            position: absolute;
            display: none;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
            > span {
              color: #ffffff;
              font-size: 50px;
            }
          }
        }
        .upload-button {
          position: relative;
          &:hover {
            border: #1abc9c 1px solid;
          }
          > input {
            display: inline-block;
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
          }
          > span {
            font-size: 14px;
            margin-bottom: 5px;
            color: #cccccc;
          }
          .icon {
            font-size: 50px;
          }
        }
      }
    }
    .albumForm {
      padding: 20px;
    }
  }
  .operation {
    padding: 12px;
    border-bottom: #cccccc 1px solid;
    .upload-img,
    .add-album {
      padding: 7px 15px 7px 15px;
      background: #1abc9c;
      color: #ffffff;
      margin-right: 15px;
      &:hover,
      &:active {
        background: #e29f69;
      }
    }
    .add-album {
      background: #409eff;
    }
  }
  .album-list {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    > li {
      padding: 8px;
      border: #ebebeb 1px solid;
      margin-right: 10px;
      margin-top: 10px;
      .photo {
        position: relative;
        width: 150px;
        height: 160px;
        background: #c7dfe2;
        &:hover {
          .album-li-button {
            display: flex;
          }
        }
        > img {
          width: 100%;
          height: 100%;
        }
        .album-li-button {
          z-index: 10;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          color: #ffffff;
          background: rgba(8, 126, 67, 0.5);
          display: none;
          justify-content: center;
          font-size: 12px;
          > span {
            margin: 0 5px;
            line-height: 30px;
            &:hover {
              color: #f56c6c;
            }
          }
        }
      }
      .album-name {
        cursor: pointer;
        width: 100%;
        height: 25px;
        background: rgba(255, 255, 255, 0.2);
        color: #111111;
        font-size: 16px;
        text-align: center;
        z-index: 10;
        line-height: 25px;
      }
    }
  }
}
</style>
