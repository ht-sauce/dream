"use strict";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import { Notification, Loading } from "element-ui";
import apiList from "./api-list"; //接口列表数据
const store = require("store");
import control from "@/common/control_center/index";
// axios全局导入设置
Vue.use(VueAxios, axios);
Vue.prototype.$api = apiList; //将接口列表数据绑定到vue全局

axios.defaults.baseURL = apiList.baseURL;

//自定义消息提示函数信息
let customMsg = {
  //成功信息提示
  sucIfno(info) {
    Notification({
      title: "答对了！",
      type: "success",
      message: info
    });
  },
  //错误信息提示
  errIfno(info) {
    Notification({
      title: "答错了呢",
      type: "error",
      message: info
    });
  }
};
// axios函数封装
const ajax = ({
  url = "",
  loading = false, //加载拦截
  data = {},
  headers = { "Content-Type": "application/json;charset=UTF-8" }, //头部信息处理
  method = "get",
  success = false, //成功信息提示
  error = true, //错误信息提示
  timeout = 1000
}) => {
  // 数据过滤，过滤字段中空数据等
  const filter = record => {
    for (let key in record) {
      !record[key] && delete record[key];
    }
    return record;
  };
  //接口全局加载提示
  let loadingInstance = "";
  if (loading !== false) {
    loadingInstance = Loading.service({
      lock: true,
      text: loading !== true ? loading : "努力加载中……",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.5)"
    });
  }
  // 授权函数封装
  const authorize = herders => {
    const user_info = store.get("user_info");
    if (user_info && user_info.sign) {
      herders.Authorization = user_info.sign;
      return herders;
    } else {
      return herders;
    }
  };
  return new Promise((suc, err) => {
    // 预处理数据部分
    method = method.toLocaleLowerCase(); //转化为小写
    headers = authorize(headers);
    axios({
      url: url,
      headers: headers,
      method: method,
      [method === "post" ? "data" : "params"]: filter(data),
      timeout: timeout
    })
      .then(response => {
        loadingInstance && loadingInstance.close();
        // 刷新口令以及接口判断是否退出登录
        if (!control.refresh_sign_or_out(response)) {
          customMsg.errIfno("数据异常，退出登录");
          err(response);
        }

        const res = response.data;
        //自定义成功失败处理，code值代表后端接口数据处理成功或者失败
        // 后端返回格式
        /*data = {
          code: 0, // 0成功，1失败
          msg: "", // 错误信息
          data: "" // 数据
        };*/
        if (res && res.code === 0) {
          success !== false &&
            customMsg.sucIfno(success === true ? "信息处理成功" : success);

          suc(res);
        } else {
          error !== false &&
            customMsg.errIfno(res.msg ? res.msg : "信息处理失败");

          err(res);
        }
      })
      .catch(e => {
        console.log(e);
        loadingInstance && loadingInstance.close();
        error !== false ? customMsg.errIfno("接口异常") : false;
        //catch代表网络异常部分和后端返回结果无关
        err(e);
      });
  });
};

//暴露的ajax函数，进一步封装节流和防抖
let shakeTime = "";
axios.ajax = options => {
  //参数预处理
  let shake = options.shake || false; //不等于false直接传true或者防抖时间
  //防抖函数处理
  if (shake === false) {
    //不进行防抖处理
    return new Promise((suc, err) => {
      ajax(options)
        .then(e => {
          suc(e);
        })
        .catch(e => {
          err(e);
        });
    });
  } else {
    //进行防抖处理
    return new Promise((suc, err) => {
      shakeTime && clearTimeout(shakeTime);
      let callNow = !shakeTime;
      if (callNow) {
        ajax(options)
          .then(e => {
            suc(e);
          })
          .catch(e => {
            err(e);
          });
      }
      shakeTime = setTimeout(
        () => {
          shakeTime = null;
        }, //见注解
        shake === true ? 700 : shake
      );
    });
  }
};

export default axios;
