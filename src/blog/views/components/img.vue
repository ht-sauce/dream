<template>
  <div class="img-opertion">
    <span v-if="!preview" class="el-icon-delete"></span>
    <span v-else class="el-icon-picture" @click="is_preview = !is_preview"></span>
    <img :src="src" alt />
    <div v-if="is_preview" class="preview">
      <img
        @dblclick="is_preview = !is_preview"
        :style="{ transform: 'rotate(' + rotate + 'deg)' }"
        :src="src"
        alt
      />
      <div class="operation">
        <span class="el-icon-close" @click="is_preview = !is_preview"></span>
        <span class="el-icon-refresh-right" @click="rotate = rotate + 90"></span>
        <span class="el-icon-refresh-left" @click="rotate = rotate - 90"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      is_preview: false,
      rotate: 0,
    }
  },
}
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 650px;
    }
    .operation {
      position: relative;
      margin-left: 100px;
      display: flex;
      flex-flow: column;
      > span {
        padding: 8px;
        font-size: 25px;
        background: #ffffff;
        color: #797979;
        &:hover {
          background: #1eb9ff;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
