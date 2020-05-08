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
    path: "/enjoyLife/album",
    component: () => import("@/blog/views/blog/enjoyLife/album/album.vue"),
    meta: {
      metaInfo: {
        title: "不要脸的相册",
        keywords: "戴海天的相册",
        description: "戴海天的相册"
      },
      auth: false
    }
  },
  {
    path: "/enjoyLife/album/info",
    component: () => import("@/blog/views/blog/enjoyLife/album/album_info.vue"),
    meta: {
      metaInfo: {
        title: "不要脸的相册",
        keywords: "戴海天的相册",
        description: "戴海天的相册"
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
  },
  {
    path: "/discuss/info",
    component: () => import("@/blog/views/blog/enjoyLife/discuss/discuss.vue"),
    meta: {
      metaInfo: {
        title: "说说",
        keywords: "说说",
        description: "说说"
      },
      auth: false
    }
  },
  {
    path: "/tool",
    component: () => import("@/blog/views/blog/tool/tool.vue"),
    meta: {
      metaInfo: {
        title: "工具",
        keywords: "工具",
        description: "工具"
      },
      auth: false
    }
  },
  {
    path: "/tool/api_test",
    component: () => import("@/blog/views/blog/tool/api_test.vue"),
    meta: {
      metaInfo: {
        title: "api测试工具",
        keywords: "api测试工具",
        description: "api测试工具"
      },
      auth: false
    }
  }
];
export default router;
