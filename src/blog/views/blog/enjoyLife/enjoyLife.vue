<template>
  <div id="enjoyLife" class="g-width">
    <div class="content">
      <template v-for="(item, index) in life">
        <ul :key="index" class="ul-life-list">
          <template v-for="(li, lifes) in item">
            <li :key="lifes" class="life-li">
              <div class="li-img">
                <dht-img :src="li.img"></dht-img>
              </div>
              <span v-show="li.title" class="li-title">{{ li.title }}</span>
              <span v-show="li.title || li.content" class="li-hr"></span>
              <dht-text
                v-show="li.content"
                :num="100"
                class="li-content"
                :text="li.content"
              ></dht-text>
            </li>
          </template>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "enjoyLife",
  data() {
    return {
      life: [
        [
          {
            img: require("../../../assets/images/home/b01.jpg"),
            title: "公司发大公司的",
            content: "hgfd和股份公司"
          },
          {
            img: require("../../../assets/images/home/text01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          }
        ],
        [
          {
            img: require("../../../assets/images/home/b01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          },
          {
            img: require("../../../assets/images/home/text01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          }
        ],
        [
          {
            img: require("../../../assets/images/home/b01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          },
          {
            img: require("../../../assets/images/home/text01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          }
        ],
        [
          {
            img: require("../../../assets/images/home/b01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          },
          {
            img: require("../../../assets/images/home/text01.jpg"),
            title: "给后台范德萨",
            content: "范德萨发撒"
          }
        ]
      ]
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/public.scss";
#enjoyLife {
  .content {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 50px;
    .ul-life-list {
      width: 24%;
      display: flex;
      flex-flow: column;
      .life-li {
        box-shadow: #c9c9c9 0 0 5px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: #ffffff;
        margin-bottom: 10px;
        display: flex;
        flex-flow: column;
        align-items: center;
        .li-img {
          width: 100%;
          max-height: 400px;
          overflow: hidden;
        }
        .li-title {
          width: 95%;
          color: $font_main_info;
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
        }
        .li-hr {
          width: 95%;
          border-bottom: $font_info 1px solid;
          margin: 10px;
        }
        .li-content {
          width: 95%;
          color: $font_main_info;
        }
      }
    }
  }
}
</style>
