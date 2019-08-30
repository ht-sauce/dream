<template>
  <div class="test">
    <div v-dht-drag>
      <!--<dht-zoom-divjs></dht-zoom-divjs>-->
    </div>
    <div v-dht-drag>
      <!--<dht-zoom-divjs></dht-zoom-divjs>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "test-toast",
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.test {
  display: flex;
  flex-flow: column;
  margin-left: 100px;
  > div {
    width: 100px;
    height: 100px;
    border: #1abc9c 1px solid;
  }
}
</style>
