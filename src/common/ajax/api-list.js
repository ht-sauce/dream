"use strict";

export default {
  baseURL: "/dream-admin",
  // 用户中心
  consumer() {
    const prefix = "/consumer";
    return {
      user: {
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
      visit: "http://127.0.0.1:7001", // 访问路径
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
      }
    };
  }
};
