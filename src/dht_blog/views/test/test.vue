<template>
  <div class="test">
    <dht-tree :data="data">
      <div slot-scope="{ node }">{{ node.label }}</div>
    </dht-tree>
  </div>
</template>

<script>
export default {
  name: "test-toast",
  props: {},
  data() {
    return {
      data: [
        {
          id: 1,
          label: "第1个",
          children: [
            {
              id: 1,
              label: "二级第1个",
              children: [
                {
                  id: 1,
                  label: "三级1第1个",
                  children: [
                    { id: 1, label: "4", children: [] },
                    { id: 2, label: "4", children: [] },
                    { id: 3, label: "4", children: [] },
                    { id: 4, label: "4", children: [] },
                    { id: 5, label: "4", children: [] }
                  ]
                },
                { id: 2, label: "三级2第2个", children: [] },
                { id: 3, label: "三级3第3个", children: [] },
                { id: 4, label: "三级4第4个", children: [] },
                { id: 5, label: "三级5第5个", children: [] }
              ]
            },
            { id: 2, label: "二级第2个", children: [] },
            { id: 3, label: "二级第3个", children: [] },
            { id: 4, label: "二级第4个", children: [] },
            { id: 5, label: "二级第5个", children: [] }
          ]
        },
        { id: 2, label: "第2个", children: [] },
        { id: 3, label: "第3个", children: [] },
        { id: 4, label: "第4个", children: [] },
        { id: 5, label: "第5个", children: [] }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.test {
}
</style>
