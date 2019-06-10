import request from './request'

/**
 * [getTodoList 待审批资源查询]
 **/
export function getTodoList(arg) {
  return request({
    url: `/findAudit`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [agreeTodo 资源审批]
 **/
export function agreeTodo(arg) {
  return request({
    url: `/updateAudit`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [findTodoArticle 文章资源详情]
 **/
export function findTodoArticle(arg) {
  return request({
    url: `/findArticle`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [findTodoVideo 视频资源详情]
 **/
export function findTodoVideo(arg) {
  return request({
    url: `/findVideo`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [getRemind 待办条数]
 **/
export function getRemind(arg) {
  return request({
    url: `/findAuditCount`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}


const API = {
  getTodoList,
  agreeTodo,
  findTodoArticle,
  findTodoVideo,
  getRemind
}
export default API
