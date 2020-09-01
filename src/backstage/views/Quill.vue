<template>
  <div>
    <quill-editor
      class="quill-dht"
      :options="editorOption"
      v-model="content"
      @blur="() => {}"
      @focus="() => {}"
      @ready="() => {}"
      @change="() => {}"
    ></quill-editor>
  </div>
</template>

<script>
// 富文本引入
import 'quill/dist/quill.snow.css'
import { quillEditor, Quill } from 'vue-quill-editor'
export default {
  name: 'Quill',
  components: {
    quillEditor,
  },
  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        placeholder: '开始创作……',
        debug: false,
        modules: {
          // 自定义菜单栏
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'], // custom button values
              //[{ header: 1 }, { header: 2 }],
              [{ header: [2, 3, 4, 5, 6, false] }],
              [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
              [{ direction: 'rtl' }], // text direction
              [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ align: [] }],
              ['link', 'image'],
              ['clean'], // remove formatting button
            ],
          },
        },
      },
    }
  },
  mounted() {
    console.log(quillEditor)
  },
}
</script>

<style lang="scss" scoped>
.quill-dht {
  width: 1000px;
  height: 1000px;
}
</style>
