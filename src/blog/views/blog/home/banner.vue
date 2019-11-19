<template>
  <ul id="banner">
    <template v-for="(item, index) in imgList">
      <li :key="index">
        <div class="backli" :style="item.backimg">
          <span>{{ item.name }}</span>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      imgList: [
        {
          backimg: {
            background: `url(${require("../../../assets/images/home/b01.jpg")}) no-repeat center/100% 100%`
          },
          name: "首页"
        },
        {
          backimg: {
            background: `url(${require("../../../assets/images/home/b02.jpg")}) no-repeat center/100% 100%`
          },
          name: "闷骚自述"
        },
        {
          backimg: {
            background: `url(${require("../../../assets/images/home/b03.jpg")}) no-repeat center/100% 100%`
          },
          name: "学海无涯"
        },
        {
          backimg: {
            background: `url(${require("../../../assets/images/home/b04.jpg")}) no-repeat center/100% 100%`
          },
          name: "人生旅途"
        },
        {
          backimg: {
            background: `url(${require("../../../assets/images/home/b05.jpg")}) no-repeat center/100% 100%`
          },
          name: "交流进步"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
#banner {
  display: flex;
  flex-flow: row;
  > li {
    width: 20.2vw;
    height: 28vw;
    overflow: hidden;
    .backli {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        color: #ffffff;
        font-size: 16px;
        padding: 5px 0;
        text-align: center;
        width: 80%;
        font-weight: 700;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
      }
    }
  }
  .backli:hover {
    transform: scale(1.05);
    transition: 0.5s transform;
    > span {
      display: block;
      transition: 0.5s margin-top, 0.5s opacity;
      opacity: 1;
      margin-top: -50px;
    }
  }
}
</style>
