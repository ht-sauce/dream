<template>
  <div class="test">
    <div>1232131</div>
    <button @click="ceshi_upload">测试上传</button>
    <div>1232131</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    ceshi_upload() {
      this.axios
        .upload({
          url: this.$api.static().aliyun.single_img_upload,
          fdata: {
            source: "测试"
          }
        })
        .then(e => {
          console.log("成功", e);
        })
        .catch(e => {
          console.log("错误", e);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.test {
  display: flex;
  flex-shrink: 0;
}
</style>
