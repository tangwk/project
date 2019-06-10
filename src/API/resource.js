import request from './request'

/**
 * [getArticleList 查询文章信息]
 **/
export function getArticleList(arg) {
  return request({
    url: `/findArticle`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteArticle 删除文章]
 * @params  String  文章ID
 **/
// export function deleteArticle(arg) {
//   return request.post('/deleteArticle', {
//     params: arg
//   })
// }
export function deleteArticle(arg) {
  return request({
    url: `/deleteArticle`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [addArticle 发布文章]
 * @params  Object  新增文章信息参数
 **/
export function addArticle(artinfo) {
  return request({
    url: `/saveArticle`,
    method: 'post',
    data: artinfo,
    // withCredentials: true
  })
}

/**
 * [updateArticle 修改文章]
 *
 **/
export function updateArticle(artinfo) {
  return request({
    url: `/updateArticle`,
    method: 'post',
    data: artinfo,
    // withCredentials: true
  })
}

/**
 * [getVideoList 查询视频信息]
 **/
export function getVideoList(arg) {
  return request({
    url: `/findVideo`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteVideo 删除视频]
 * @params  String  视频ID
 **/
export function deleteVideo(arg) {
  return request({
    url: `/deleteVideo`,
    method: 'post',
    data: arg,
    // withCredentials: true  // 处理跨域
  })
}

/**
 * [addVideo 上传视频]
 * @params  Object  新增视频信息参数
 **/
export function addVideo(info) {
  return request({
    url: `/saveVideo`,
    method: 'post',
    data: info
  })
}

/**
 * [updateVideo 修改视频]
 *
 **/
export function updateVideo(info) {
  return request({
    url: `/updateVideo`,
    method: 'post',
    data: info
  })
}

/**
 * [typeList 视频分类list]
 * @params  Object
 **/
export function typeList(info) {
  return request({
    url: `/findSysCode`,
    method: 'post',
    data: info
  })
}

/**
 * [mapList 视频地址list]
 * @params  Object
 **/
export function mapList(info) {
  return request({
    url: `/findMapping`,
    method: 'post',
    data: info
  })
}

/**
 * [getVideos 查询视频详细信息]
 **/
export function getVideos(arg) {
  return request({
    url: `/findVideoMappingById`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}


const API = {
  getArticleList,
  addArticle,
  deleteArticle,
  updateArticle,
  getVideoList,
  deleteVideo,
  addVideo,
  updateVideo,
  typeList,
  mapList,
  getVideos,
}
export default API
