<template>
  <div>
    <div class="ce2">
      <button v-dht-move>测试</button>
    </div>
  </div>
</template>

<script>
import style from './ceshi.moudle.scss'
export default {
  created() {
    console.log(style)
  },
}
</script>

<style scoped lang="scss">
.ceshi {
  width: 200px;
  height: 200px;
  background: red;
}
.dht {
  background: #0e9498;
  width: 200px;
  height: 200px;
}
.ce2 {
  width: 400px;
  height: 600px;
  margin-left: 200px;
  margin-top: 200px;
  border: #0e9498 1px solid;
  > button {
    position: absolute;
  }
}
</style>
