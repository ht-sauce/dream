<template>
  <div class="ceshi" @click="ceshi"></div>
</template>

<script>
export default {
  name: 'vt',
  inject: ['dhtSetList'],
  methods: {
    ceshi() {
      console.log(this.dhtSetList)
    },
  },
}
</script>

<style scoped>
.ceshi {
  width: 50px;
  height: 200px;
  background: red;
}
</style>
