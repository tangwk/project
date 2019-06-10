// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import "babel-polyfill";
import echarts from 'echarts'
// import Highcharts from "highcharts";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import veeValidate from "vee-validate";

import "./js/validate.js";

import "./style/common.less";

import "../static/Ueditor/ueditor.config.js";
import "../static/Ueditor/ueditor.all.js";
import "../static/Ueditor/lang/zh-cn/zh-cn.js";
import "../static/Ueditor/ueditor.parse.min.js";
import "./permission.js"; // 验权
import Clipboard from 'clipboard'; //复制功能

Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.use(veeValidate);

Vue.use(Vuex);

Vue.config.productionTip = false;

// Vue.prototype.$http = axios
/* eslint-disable no-new */

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
});

