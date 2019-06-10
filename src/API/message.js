import request from './request'

/**
 * [getMessageList 查询消息]
 **/
export function getMessageList(arg) {
  return request({
    url: `/findMessage`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteMessage 删除消息]
 * @params  String  消息ID
 **/
export function deleteMessage(arg) {
  return request({
    url: `/deleteMessage`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [addMessage 发布消息]
 * @params  Object  发布消息参数
 **/
export function addMessage(info) {
  return request({
    url: `/saveMessage`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}


const API = {
  getMessageList,
  deleteMessage,
  addMessage
}
export default API
