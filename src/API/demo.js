import request from './request.js'
import Qs from 'querystring'

/**
 * 个人中心模块接口
 **/

/**
  * [getSchoolNewsList 获取党校动态列表]
  * @params  Object  参数
  * 表单格式提交
**/

export function getSchoolNewsList(arg) {
  return request.post('/security/login', Qs.stringify(arg),
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
