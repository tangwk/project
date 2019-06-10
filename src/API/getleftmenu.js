import request from './request'

/**
 * [getLeftMenuList 查询左侧菜单]
 **/
export function getLeftMenuList(arg) {
  return request({
    url: `/findUserMenu`,
    method: 'post',
    data: arg,
    // withCredentials: true
  })
}
