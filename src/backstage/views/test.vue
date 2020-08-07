<template>
  <div>
    <div class="ceshi2" @click="dataAdd"></div>
    <rich-operate switch :index="5" class="test">
      <rich-operate-itme :value="shiyan">
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
    return {
      shiyan: 1,
    }
  },
  created() {},
  components: {
    RichOperate: () => import('@/components/CustomCom/RichOperate/index'),
    RichOperateItme: () => import('@/components/CustomCom/RichOperate/item'),
    // vt: () => import('./vt'),
  },
  methods: {
    ceshi() {},
    dataAdd() {
      this.shiyan++
    },
  },
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
.ceshi,
.ceshi2 {
  width: 200px;
  height: 50px;
  margin: 5px;
  box-shadow: #1a87ff 0 0 5px;
}
.ceshi2 {
  height: 100px;
}
</style>
