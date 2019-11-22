let router = [
  {
    path: "/index",
    component: () => import("@/blog/views/blog/home/home.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油博客",
        keywords: "海天酱油博客",
        description: "海天酱油博客"
      },
      auth: false
    }
  },
  {
    path: "/onself",
    component: () => import("@/blog/views/blog/onself/onself.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油自荐",
        keywords: "海天酱油自荐",
        description: "个人不要脸的自述"
      },
      auth: false
    }
  },
  {
    path: "/blogList",
    component: () => import("@/blog/views/blog/blogList/blogList.vue"),
    meta: {
      metaInfo: {
        title: "海天酱油的博客列表",
        keywords: "海天酱油的博客列表",
        description: "所有的博客都在这里"
      },
      auth: false
    }
  },
  {
    path: "/enjoyLife",
    component: () => import("@/blog/views/blog/enjoyLife/enjoyLife.vue"),
    meta: {
      metaInfo: {
        title: "享受生活",
        keywords: "海天酱油的生活",
        description: "海天酱油的生活"
      },
      auth: false
    }
  },
  {
    path: "/forum",
    component: () => import("@/blog/views/blog/forum/forum.vue"),
    meta: {
      metaInfo: {
        title: "生活讨论区",
        keywords: "海天酱油的论坛",
        description: "讨论聊天的地方"
      },
      auth: false
    }
  },
  {
    path: "/blog_content",
    component: () => import("@/blog/views/blog/blog_content/blog_content.vue"),
    meta: {
      metaInfo: {
        title: "博客内容",
        keywords: "博客内容",
        description: "博客内容"
      },
      auth: false
    }
  },
  {
    path: "/draft",
    component: () => import("@/blog/views/blog/draft/draft.vue"),
    meta: {
      metaInfo: {
        title: "草稿箱",
        keywords: "草稿箱",
        description: "草稿箱"
      },
      auth: true
    }
  }
];
export default router;
