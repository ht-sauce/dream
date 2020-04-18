<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="colse">取 消</el-button>
      <el-button type="primary" @click="queding">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    confirm() {
      this.dialogVisible = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    colse() {
      this.dialogVisible = false;
      this.resolve(111);
    },
    queding() {
      this.dialogVisible = false;
      this.reject(true);
    }
  }
};
</script>

<style scoped lang="scss"></style>
