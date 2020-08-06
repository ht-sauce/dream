<template>
  <ul class="blog_dynamic">
    <template v-for="(item, index) in list">
      <li :key="index">
        <div class="left">
          <div class="tag">
            <span v-if="item.type === '1'">发布文章</span>
            <span v-if="item.type === '2'">发表了动态</span>
            <span v-if="item.type === '3'">上传了新图片</span>
            <span>{{ item.created_at }}</span>
          </div>
          <span class="content">
            <template v-if="item.type === '1'">
              <span class="article">{{ item.content }}</span>
            </template>
            <template v-if="item.type === '2'">
              <span>{{ item.content }}</span>
            </template>
            <template v-if="item.type === '3'">
              <span class="photo">{{ item.content }}</span>
              <div class="photo-list">
                <template v-for="imgs in arrarys(item.img)">
                  <images :key="imgs" :preview="true" :src="imgs" class="photo-li"></images>
                </template>
              </div>
            </template>
          </span>
        </div>
        <div class="right">
          <router-link v-if="item.type === '1'" :to="'/blog_content?article_id=' + item.crux"
            >前往详情</router-link
          >
          <router-link v-if="item.type === '2'" :to="'/discuss/info?discuss=' + item.crux"
            >前往详情</router-link
          >
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array, //动态列表
  },
  components: {
    images: () => import('../../components/img.vue'),
  },
  methods: {
    // 数组化
    arrarys(e) {
      return e.split(',')
    },
  },
}
</script>

<style scoped lang="scss">
.blog_dynamic {
  width: 100%;
  > li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #ffffff;
    margin-bottom: 5px;
    .left {
      display: flex;
      flex-flow: column;
      > span {
        padding: 5px;
      }
      .tag {
        font-size: 12px;
        color: #cccccc;
        > span {
          margin-right: 8px;
        }
      }
      .content {
        font-size: 14px;
        line-height: 22px;
        color: #5e5e5e;
        .article,
        .photo {
          font-size: 16px;
          font-weight: bold;
          color: #ffaf3a;
        }
        .photo {
          color: #00cdeb;
        }
        .photo-list {
          display: flex;
          .photo-li {
            width: 150px;
            height: 150px;
            margin: 10px 10px 0 0;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      > a {
        color: #1abc9c;
        font-size: 13px;
      }
    }
  }
}
</style>
