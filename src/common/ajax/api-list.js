"use strict";

export default {
  baseURL: "/dream-admin",
  prefix() {
    return {
      consumer: "/consumer"
    };
  },
  consumer() {
    const prefix = this.prefix().consumer;
    return {
      user: {
        create: `/noauth${prefix}/createUser`, //创建用户
        login: `/noauth${prefix}/login`, //用户登录
        logout: `/noauth${prefix}/logout`,
        update: `${prefix}/update_user` //修改用户基本信息
      }
    };
  }
};
