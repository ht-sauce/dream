<template>
  <div class="test">
    12312321
    <quill-editor ref="QuillEditor" class="quill-dht"></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  name: "test-toast",
  props: {},
  data() {
    return {
      list: []
    };
  },
  created() {
    this.dhtces();
  },
  mounted() {},
  methods: {
    dhtces() {}
  }
};
</script>

<style lang="scss">
.test {
  .quill-dht {
    width: 1000px;
  }
}
</style>
