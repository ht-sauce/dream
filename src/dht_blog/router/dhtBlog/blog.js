let router = [
  {
    path: "/index",
    component: () => import("@/dht_blog/views/blog/home/home.vue"),
    meta: {
      title: "海天酱油的博客首页"
    }
  },
  {
    path: "/onself",
    component: () => import("@/dht_blog/views/blog/onself/onself.vue"),
    meta: {
      title: "戴海天"
    }
  },
  {
    path: "/blogList",
    component: () => import("@/dht_blog/views/blog/blogList/blogList.vue"),
    meta: {
      title: "酱油博客"
    }
  },
  {
    path: "/enjoyLife",
    component: () => import("@/dht_blog/views/blog/enjoyLife/enjoyLife.vue"),
    meta: {
      title: "酱油人生"
    }
  }
];
export default router;
