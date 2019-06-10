import request from './request'

/**
 * [getColumnList 查询栏目信息]
 **/
export function getColumnList(arg) {
  return request({
    url: `/findColumn`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteColumn 删除栏目信息]
 * @params  String  栏目ID
 **/
export function deleteColumn(arg) {
  return request({
    url: `/deleteColumn`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [addColumn 创建栏目]
 * @params  Object  新增栏目信息参数
 **/
export function addColumn(info) {
  return request({
    url: `/saveColumn`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [updateColumn 修改栏目]
 *
 **/
export function updateColumn(info) {
  return request({
    url: `/updateColumn`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getColumnArticle 根据栏目id查询文章]
 *
 **/
export function getColumnArticle(info) {
  return request({
    url: `/findArticleByColumnId`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
/**
 * [getColumnTopArticle 根据栏目id查询置顶文章]
 *
 **/
export function getColumnTopArticle(info) {
  return request({
    url: `/findArticleByColumnIdMark`,
    method: 'post',
    data: info,
  })
}

/**
 * [getColumnVideo 根据视频或栏目信息查询视频]
 *
 **/
export function getColumnVideo(info) {
  return request({
    url: `/findVideoByColumn`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
/**
 * [getColumnTopVideo 根据视频或栏目信息查询置顶视频]
 *
 **/
export function getColumnTopVideo(info) {
  return request({
    url: `/findVideoByColumnMark`,
    method: 'post',
    data: info,
  })
}

/**
 * [getInColumnArticle 查询待导入的文章列表]
 *
 **/
export function getInColumnArticle(info) {
  return request({
    url: `/findArticleOutColumn`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getInColumnVideo 查询待导入的视频列表]
 *
 **/
export function getInColumnVideo(info) {
  return request({
    url: `/findVideoOutColumn`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [InColumnArticle 文章导入相应栏目]
 *
 **/
export function InColumnArticle(info) {
  return request({
    url: `/saveColumnArticle`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [InColumnVideo 视频导入相应栏目]
 *
 **/
export function InColumnVideo(info) {
  return request({
    url: `/saveColumnVideo`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [deleteColumnArticle 删除当前栏目内的文章]
 *
 **/
export function deleteColumnArticle(info) {
  return request({
    url: `/deleteByarticleId`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [deleteColumnVideo 删除当前栏目内的视频]
 *
 **/
export function deleteColumnVideo(info) {
  return request({
    url: `/deleteByVideoId`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/* 置顶/取消置顶 */
/**
 * [updateArticleMark 当前栏目内文章置顶]
 *
 **/
export function updateArticleMark(info) {
  return request({
    url: `/updateArticleMark`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
/**
 * [updateVideoMark 当前栏目内视频置顶]
 *
 **/
export function updateVideoMark(info) {
  return request({
    url: `/updateVideoMark`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/* 上/下移 */
/**
 * [updateArticleOrder 当前栏目内文章上下移]
 *
 **/
export function updateArticleOrder(info) {
  return request({
    url: `/updateArticleOrder`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
/**
 * [updateVideoOrder 当前栏目内视频上下移]
 *
 **/
export function updateVideoOrder(info) {
  return request({
    url: `/updateVideoOrder`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getTopColumnArticle 获取当前栏目内置顶的文章]
 *
 **/
export function getTopColumnArticle(info) {
  return request({
    url: `/findArticleBymark`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
/**
 * [getTopColumnVideo 获取当前栏目内置顶的视频]
 *
 **/
export function getTopColumnVideo(info) {
  return request({
    url: `/findVideoByMark`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}
const API = {
  getColumnList,
  deleteColumn,
  addColumn,
  updateColumn,
  getColumnArticle,
  getColumnVideo,
  getColumnTopArticle,
  getColumnTopVideo,
  InColumnArticle,
  InColumnVideo,
  getInColumnArticle,
  getInColumnVideo,
  deleteColumnArticle,
  deleteColumnVideo,
  updateArticleMark,
  updateVideoMark,
  updateArticleOrder,
  updateVideoOrder,
  getTopColumnArticle,
  getTopColumnVideo
}
export default API
