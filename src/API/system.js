import request from './request'
export function xuanRang(arg) {
  return request.post('/findUser ', arg)
}
export function xuanRang1(arg) {
  return request.post('/findUserByUserId ', arg)
}
export function deal(arg) {
  return request.post('/findRole ', arg)
}
export function roleNew(arg) {
  return request.post('/saveRole ', arg)
}
export function Jurisdiction(arg) {
  return request.post('/findAuthority ', arg)
}
export function postAddDepar(arg) {
  return request.post('/saveRole ', arg)
}
export function AddDepar(arg) {
  return request.post('/findRole', arg)
}
export function postDelete(arg) {
  return request.post('/deleteRole ', arg)
}
export function saveUser(arg) {
  return request.post('/saveUser ', arg)
}
export function postDelete1(arg) {
  return request.post('/deleteUser ', arg)
}
export function modify(arg) {
  return request.post('/updateUser ', arg)
}
export function searchID(arg) {
  return request.post('/findRoleByUserId', arg)
}
export function baocunID(arg) {
  return request.post('/findAuthorityByRoleId', arg)
}
export function baocun(arg) {
  return request.post('/updateRole', arg)
}
export function jiaoYang(arg) {
  return request.post('/checkUserId', arg)
}
export function findMenu(arg) {
  return request.post('/findMenu', arg)
}
export function resetPassWord(arg) {
  return request.post('/resetPassWord', arg)
}
