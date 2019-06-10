import request from './request'

/**
 * [getWeChatList 查询公众号列表信息]
 **/
export function getWeChatList(arg) {
  return request({
    url: `/findWechatAccount`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [deleteMenu 删除菜单]
 **/
export function deleteMenu(arg) {
  return request({
    url: `/deleteMenu`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}

/**
 * [addMenu 添加菜单]
 **/
export function addMenu(info) {
  return request({
    url: `/saveMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getMenuList 获取菜单List]
 **/
export function getMenuList(info) {
  return request({
    url: `/findWechatMenuByPartyschoolId`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getParentMenu 获取父级菜单options]
 **/
export function getParentMenu(info) {
  return request({
    url: `/findParentMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [getMenuUrl 获取菜单Url options]
 **/
export function getMenuUrl(info) {
  return request({
    url: `/findWechatMenuUrl`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [saveNewMenu 保存当前添加的菜单]
 **/
export function saveNewMenu(info) {
  return request({
    url: `/saveWechatMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [pushMenu 发布菜单]
 **/
export function pushMenu(info) {
  return request({
    url: `/pushMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [resetMenu 重置(删除)公众号的菜单]
 **/
export function resetMenu(info) {
  return request({
    url: `/deleteMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}

/**
 * [deleteMenuData 删除库里面的数据]
 **/
export function deleteMenuData(info) {
  return request({
    url: `/deleteWechatMenu`,
    method: 'post',
    data: info,
    // withCredentials: true
  })
}



const API = {
  getWeChatList,
  deleteMenu,
  addMenu,
  getMenuList,
  getParentMenu,
  getMenuUrl,
  saveNewMenu,
  pushMenu,
  resetMenu,
  deleteMenuData
}
export default API
