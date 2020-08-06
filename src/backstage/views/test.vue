<template>
  <div>
    <rich-operate class="test">
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
      <rich-operate-itme>
        <div class="ceshi"></div>
      </rich-operate-itme>
    </rich-operate>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  components: {
    RichOperate: () => import('@/components/CustomCom/RichOperate/index'),
    RichOperateItme: () => import('@/components/CustomCom/RichOperate/item'),
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.test {
  margin-left: 500px;
  display: flex;
  width: 500px;
  flex-wrap: wrap;
  background: #fff;
}
.ceshi {
  width: 200px;
  height: 50px;
  margin: 5px;
  box-shadow: #1a87ff 0 0 5px;
}
</style>
