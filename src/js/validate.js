import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 自定义规则
import Validator from './customValidate'

const config = {
  errorBagName: 'errors',
  delay: 0,
  locale: 'CN',
  messages: null,
  strict: true,
  events: 'input',
  inject: true,
  fieldsBagName: 'veefields'
}
// 载入
Vue.use(VeeValidate, config)
