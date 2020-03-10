<template>
  <div class="test">
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: {
        file: null,
        data: [],
        LENGTH: 0
      },
      ceshi: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  created() {
    const ceshi2 = this.ceshi
      .map(val => {
        const form = val * 2;
        console.log(form);
        return form;
      })
      .map(val2 => val2 * 2);
    console.log(ceshi2);
  },
  components: {},
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      // 切片数量
      this.LENGTH = Math.ceil(file.size / 1024 / 1024);
      this.container.file = file;
    },
    // 生成切片文件
    createFileChunk(file, length = this.LENGTH) {
      const fileChunkList = [];
      const chunSize = Math.ceil(file.size / length);
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, +chunSize) });
        cur = cur + chunSize;
      }
      return fileChunkList;
    },
    // 上传切片文件
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
        })
        .map(async ({ formData }) =>
          this.request({
            url: "",
            data: formData
          })
        );
      await Promise.all(requestList);
    },
    async handleUpload() {
      if (!this.constructor.file) return false;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: this.container.file.name + "-" + index
      }));
      await this.uploadChunks();
    },
    //上传文件ajax封装
    // eslint-disable-next-line no-unused-vars
    request({ url, method = "post", data, headers = {}, requestList }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.test {
}
</style>
