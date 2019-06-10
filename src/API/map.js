import request from './request'

/**
 * [getMapList 查询映射信息]
 **/
export function getMapList(arg) {
  return request({
    url: `/findMapping`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteArticle 删除映射信息]
 * @params  String  映射ID
 **/
export function deleteMap(arg) {
  return request({
    url: `/deleteMapping`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [addMap 创建映射]
 * @params  Object  新增映射信息参数
 **/
export function addMap(info) {
  return request({
    url: `/saveMapping`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [updateMap 修改映射]
 *
 **/
export function updateMap(info) {
  return request({
    url: `/updateMapping`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [generateMapUrl 生成映射地址]
 *
 **/
export function generateMapUrl(arg) {
  return request({
    url: `/findShortUrl`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [getVideoMapUrl 根据视频id查询映射url]
 *
 **/
export function getVideoMapUrl(arg) {
  return request({
    url: `/findVideoMappingById`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}


const API = {
  getMapList,
  deleteMap,
  addMap,
  updateMap,
  generateMapUrl,
  getVideoMapUrl
}
export default API
