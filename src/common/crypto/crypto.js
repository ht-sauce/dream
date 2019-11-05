"use strict";
// 用户登录统一加密处理
const userLoginPassword = password => {
  if (!password) return password;
  const md5 = require("./md5");
  return md5.hexMD5(password).toUpperCase();
};
export { userLoginPassword };
