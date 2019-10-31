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
        create: `${prefix}/noauth/createUser`, //创建用户
        login: `${prefix}/noauth/login`, //用户登录
        logout: `${prefix}/logout`
      }
    };
  }
};
