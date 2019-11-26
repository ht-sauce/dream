"use strict";

export default {
  baseURL: "/dream-admin",
  // 用户中心
  consumer() {
    const prefix = "/consumer";
    return {
      user: {
        blogger: `/noauth${prefix}/blogger`,
        create: `/noauth${prefix}/createUser`, //创建用户
        login: `/noauth${prefix}/login`, //用户登录
        logout: `/noauth${prefix}/logout`,
        update: `${prefix}/update_user` //修改用户基本信息
      },
      power: {
        items: `${prefix}/item_list` // 项目列表
      }
    };
  },
  // 静态文件管理
  static() {
    const prefix = "/static";
    return {
      visit:
        process.env.NODE_ENV === "production"
          ? "https://www.dht.red"
          : "http://127.0.0.1:7001", // 访问路径
      // 上传单个静态图片
      upload_pictures: `${this.baseURL + prefix}/upload_pictures`
    };
  },
  interface() {
    const prefix = "/interface";
    return {
      // 项目列表的增删改查
      project: {
        list: `${prefix}/project_list`,
        info: `${prefix}/project_info`,
        add: `${prefix}/project_add`,
        modify: `${prefix}/project_modify`,
        delete: `${prefix}/project_delete`
      },
      // 项目模块下增删改查
      modular: {
        add: `${prefix}/project/modular/add`,
        list: `${prefix}/project/modular/list`,
        del: `${prefix}/project/modular/del`,
        modify: `${prefix}/project/modular/modify`
      },
      // 模块下api接口增删改查
      api: {
        add: `${prefix}/project/modular/api/add`,
        list: `${prefix}/project/modular/api/list`,
        del: `${prefix}/project/modular/api/del`,
        modify: `${prefix}/project/modular/api/modify`
      },
      // api接口的字段增删改查
      fields: {
        add: `${prefix}/project/modular/api/fields/add`,
        list: `${prefix}/project/modular/api/fields/list`,
        del: `${prefix}/project/modular/api/fields/del`,
        modify: `${prefix}/project/modular/api/fields/modify`
      }
    };
  },
  blog() {
    const prefix = "/blog";
    return {
      article: {
        draft: `${prefix}/article/draft`,
        add: `${prefix}/article/add`,
        // 文章修改，涉及到了文章发布，草稿状态改变，文章修改
        modify: `${prefix}/article/modify`,
        del: `${prefix}/article/del`,
        details: `/noauth${prefix}/article/details`,
        list: `/noauth${prefix}/article/list`, //最新文章列表
        // 文章分类
        classify: {
          list: `/noauth${prefix}/article/classify/list`
        }
      },
      discuss: {
        add: `/noauth${prefix}/discuss/add`,
        list: `/noauth${prefix}/discuss/list`,
        del: `${prefix}/discuss/del`
      }
    };
  }
};
