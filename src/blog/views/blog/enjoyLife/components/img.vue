<template>
  <div class="img-opertion">
    <span v-if="!preview" class="el-icon-delete"></span>
    <span
      v-else
      class="el-icon-picture"
      @click="is_preview = !is_preview"
    ></span>
    <img :src="src" />
    <div v-if="is_preview" @click="is_preview = !is_preview" class="preview">
      <img :src="src" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_preview: false
    };
  }
};
</script>
<style scoped lang="scss">
.img-opertion {
  position: relative;
  > img {
    width: 100%;
    height: 100%;
  }
  > span {
    width: 100%;
    height: 100%;
    display: inline-block;
    position: absolute;
    color: #7f7f7f;
    font-size: 20px;
    &:hover {
      color: #ff7932;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .preview {
    z-index: 2000;
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
