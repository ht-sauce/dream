<template>
  <p class="dhtText" @copy="iscopy" :class="{ dhtTextNowrap: !nowrap }">
    {{ text | textNums(num) }}
  </p>
</template>

<script>
export default {
  name: "dhtText",
  props: {
    text: String,
    //是否换行
    nowrap: {
      type: Boolean,
      default: true
    },
    //是否支持拷贝
    copy: {
      type: Boolean,
      default: true
    },
    num: Number
  },
  data() {
    return {
      nums: this.num
    };
  },
  filters: {
    //字数空值显示
    textNums(val, num) {
      if (val && num > 0) {
        return num > 0 ? val.substring(0, num) + " ..." : val;
      } else {
        return val;
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    //是否禁止拷贝
    iscopy(e) {
      e.returnValue = this.copy;
    }
  }
};
</script>
