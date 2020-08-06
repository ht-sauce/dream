<template>
  <div class="test">
    <el-button @click="ceshi">测试</el-button>
    <DialogConfirm ref="DialogConfirm" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  components: {
    DialogConfirm: () => import('@/backstage/components/dialog_confirm/dialogConfirm.vue'),
  },
  methods: {
    ceshi() {
      const Confirm = this.$refs['DialogConfirm']
      Confirm.confirm()
        .then(e => {
          console.log(e)
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>

<style scoped lang="scss">
.test {
}
</style>
