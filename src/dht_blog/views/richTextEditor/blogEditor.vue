<template>
  <div id="blogEditor">
    <dht-rich-editor></dht-rich-editor>
  </div>
</template>

<script>
export default {
  name: "blogEditor",
  data() {
    return {};
  },
  components: {
    dhtRichEditor: () => {
      return import("@/components/richTextEditor/editor.vue");
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {}
};
</script>

<style scoped lang="scss">
#blogEditor {
  display: flex;
  justify-content: center;
}
</style>
