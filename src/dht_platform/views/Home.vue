<template>
  <ul>
    <li v-for="(item, index) in menus2" :key="index">
      <div class="one">
        {{ item.text }}
      </div>
      <div v-if="item.children && item.children.length > 0">
        <tree-ul :node="item.children"></tree-ul>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "test",
  components: {
    treeUl: () => {
      return import("./tree/tree.vue");
    }
  },
  data() {
    return {
      menus2: [
        {
          text: "水果1",
          children: [
            {
              text: "香蕉2",
              children: [
                {
                  text: "芒果3",
                  children: [
                    {
                      text: "李子4",
                      children: [
                        {
                          text: "葡萄5"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: "苹果1",
          children: [
            {
              text: "木瓜2",
              children: [
                {
                  text: "芒果3"
                }
              ]
            }
          ]
        },
        {
          text: "橘子1",
          children: [
            {
              text: "百香2",
              children: [
                {
                  text: "芒果3"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
ul {
  padding: 2px;
  display: flex;
  flex-flow: column;
  > li {
    margin-bottom: 1px;
    display: flex;
    flex-flow: column;
    .one {
      width: 50px;
      background: #167698;
      display: inline-block;
    }
  }
}
</style>
