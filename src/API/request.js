import axios from "axios";
import { Message, MessageBox } from "element-ui";
import $AjaxUrl from './severurl'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ?
  'http://tc.ccpph.com.cn/Psms' : $AjaxUrl,
  // baseURL:  'http://10.0.60.101:8080/Psms', //  'http://10.0.18.111:8080/Psms', // 'http://10.0.18.111:8080/Psms', //  "http://172.16.0.15:8080/Psms", //  'http://10.0.18.111:8080/psms', //  // process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if(sessionStorage.getItem("token")) {
      config.headers["token"] = sessionStorage.getItem("token");
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */

    const res = response.data;
    if (res.code == 200) {
      return response.data;
    } else if (res.code == 900) {
      // Message({
      //   message: res.massege || "失败",
      //   type: "error",
      //   duration: 5 * 1000
      // });
      return response.data;
    } else if (!res.code) {
      return response.data;
    } else {
      var errorMsg = "抱歉，出错啦~~~";

      if (res.code === 500) {
        errorMsg = "服务器内部错误，请联系管理人员";
      }

      if (res.code === 10001) {
        errorMsg = "警告 ：一级菜单不能超过三个 ！";
      }

      if (res.code === 10002) {
        errorMsg = "警告 ：二级菜单不能超过五个 ！";
      }

      Message({
        message: errorMsg,
        type: "error",
        duration: 5 * 1000
      });

      if (res.code === 10003) {
        // 非法的token;  Token 过期了
        MessageBox.confirm(
          "长时间未登录，你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          sessionStorage.removeItem("token");
          location.reload();
        });
      }

      // if (res.code === 401) {
      //   console.log("请求没有权限:" + res.msg);
      //   errorMsg = "没有权限";
      // }
      return Promise.reject("error");
    }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject("重新登录");
  }
);

export default service;
