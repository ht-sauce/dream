let router = [
  {
    path: "/index",
    component: () => import("@/dht_blog/views/blog/home/home.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油博客",
        keywords: "海天酱油博客",
        description: "海天酱油博客"
      }
    }
  },
  {
    path: "/onself",
    component: () => import("@/dht_blog/views/blog/onself/onself.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油自荐",
        keywords: "海天酱油自荐",
        description: "个人不要脸的自述"
      }
    }
  },
  {
    path: "/blogList",
    component: () => import("@/dht_blog/views/blog/blogList/blogList.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油的博客列表",
        keywords: "海天酱油的博客列表",
        description: "所有的博客都在这里"
      }
    }
  },
  {
    path: "/enjoyLife",
    component: () => import("@/dht_blog/views/blog/enjoyLife/enjoyLife.vue"),
    meta: {
      metaInfo: {
        title: "享受生活",
        keywords: "海天酱油的生活",
        description: "海天酱油的生活"
      }
    }
  },
  {
    path: "/forum",
    component: () => import("@/dht_blog/views/blog/forum/forum.vue"),
    meta: {
      metaInfo: {
        title: "生活讨论区",
        keywords: "海天酱油的论坛",
        description: "讨论聊天的地方"
      }
    }
  }
];
export default router;
