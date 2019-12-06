<template>
  <section class="album_info">
    <header>
      <span class="title">相册：{{ album.name }}</span>
      <span class="return_page">
        <router-link to="/enjoyLife/album">返回相册</router-link>
      </span>
    </header>
    <ul class="content">
      <template v-for="(item, index) in day_list">
        <li :key="index">
          <div class="header-img">
            <span>{{ item.time }}</span>
          </div>
          <div class="img-list">
            <template v-for="(img, imgi) in item.img_list">
              <div class="img" :key="imgi">
                <images :preview="true" class="img-li" :src="img.url"></images>
                <div class="footer">
                  <span>{{ img.source }}</span>
                  <div v-if="$store.state.is_blogger" class="button-img">
                    <span @click="set_first_picture(img.url)">设置首图</span>
                    <span @click="del_img(img.id, index, imgi)">删除</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </li>
      </template>
    </ul>
    <footer @click="load_many" class="footer">
      <span>加载更多</span>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      album: {},
      time_list: [],
      day_list: [],
      page: 1,
      is_load: true
    };
  },
  components: {
    images: () => import("../../../components/img.vue")
  },
  created() {
    const query = this.$route.query;
    if (!query) {
      this.$router.go(-1);
      return false;
    }
    this.album = query;
    this.photo_list();
  },
  methods: {
    photo_list(page = 1, limit = 15) {
      this.axios
        .ajax({
          loading: true,
          url: this.$api.static().aliyun.list,
          data: {
            page: page,
            limit: limit,
            album_id: this.album.id
          }
        })
        .then(e => {
          if (e.data.length > 0) {
            this.page = page + 1;
            let day_list = this.day_list;
            // 先得到时间分组数据
            let time_list = this.time_list;
            e.data.forEach(val => {
              const time = val.created_at.substring(0, 10);
              if (!time_list.includes(time)) {
                time_list.push(time);
              }
            });
            // 根据时间分类得到分组
            time_list.forEach(val => {
              if (day_list.length > 0) {
                day_list.forEach(li => {
                  // 判断数组中是有新分组，没有新分组才增加数据
                  if (val !== li.time) {
                    day_list.push({
                      time: val,
                      img_list: []
                    });
                  }
                });
              } else {
                day_list.push({
                  time: val,
                  img_list: []
                });
              }
            });
            //根据时间分类循环
            time_list.forEach((val, index) => {
              e.data.forEach(li => {
                const time = li.created_at.substring(0, 10);
                if (val === time) {
                  day_list[index].img_list.push(li);
                }
              });
            });
            console.log(this.day_list);
          } else {
            this.is_load = false;
          }
        })
        .catch(() => {});
    },
    load_many() {
      if (this.is_load) {
        this.photo_list(this.page);
      }
    },
    // 设置相册首图
    set_first_picture(url) {
      this.axios
        .ajax({
          url: this.$api.dht().album.modify,
          loading: true,
          method: "post",
          data: {
            id: this.album.id,
            url: url,
            privacy: "0"
          },
          success: "设置成功，回到相册首页查看"
        })
        .then(() => {})
        .catch(() => {});
    },
    del_img(id, index, imgi) {
      this.axios
        .ajax({
          url: this.$api.static().aliyun.del,
          loading: true,
          data: {
            id: id
          },
          success: "删除成功"
        })
        .then(() => {
          this.day_list[index].img_list.splice(imgi, 1);
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="scss">
.album_info {
  width: 80%;
  min-width: 1000px;
  min-height: 500px;
  background: #ffffff;
  margin: 20px 0 20px 0;
  padding: 12px;
  > header {
    padding: 8px;
    border-bottom: #a7ebd2 1px solid;
    display: flex;
    align-items: flex-end;
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #555555;
    }
    .return_page {
      margin-left: 15px;
      padding: 3px 10px;
      background: #409eff;
      font-size: 12px;
      > a {
        color: #ffffff;
      }
    }
  }
  .content {
    display: flex;
    flex-flow: column;
    > li {
      padding: 5px;
      border-bottom: #f1f1f1 1px solid;
      margin: 5px 5px 0 0;
      .header-img {
        padding: 10px;
        > span {
          color: #1094f1;
          font-size: 18px;
        }
      }
      .img-list {
        display: flex;
        flex-flow: row wrap;
        .img {
          padding: 7px;
          border: #f1f1f1 1px solid;
          .img-li {
            width: 150px;
            height: 155px;
          }
          .footer {
            position: relative;
            line-height: 25px;
            text-align: center;
            font-size: 12px;
            color: #555555;
            &:hover {
              .button-img {
                display: block;
              }
            }
            .button-img {
              display: none;
              width: 100%;
              top: 0;
              position: absolute;
              background: #5fc8ff;
              color: #ffffff;
              > span {
                padding: 5px;
                &:hover {
                  color: #222222;
                }
              }
            }
          }
        }
      }
    }
  }
  .footer {
    cursor: pointer;
    width: 100%;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
  }
}
</style>
