<template>
  <div class="test">
    <province-and-city
      v-model="testData"
      @change="pca_change"
    ></province-and-city>
    <el-button @click="set_test">设置值</el-button>
    <el-button @click="get_test">获取值</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testData: {
        province: "",
        city: "",
        area: ""
      }
    };
  },
  components: {
    ProvinceAndCity: () =>
      import("../components/province_and_city/province_and_city.vue")
  },
  methods: {
    set_test() {
      this.testData = {
        province: "内蒙古自治区",
        city: "呼伦贝尔市",
        area: "陈巴尔虎旗"
      };
    },
    get_test() {
      console.log(this.testData);
    },
    pca_change() {
      console.log(this.testData);
    }
  }
};
</script>

<style scoped lang="scss"></style>
