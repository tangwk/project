import request from './request'
export function JH_news(arg) {
  return request.post('/findPartyschoolUser', arg)
}
export function postAddDepar(arg) {
  return request.post('/savePartyschoolUser', arg)
}

export function postDelete(arg) {
  return request.post('/deletePartyschoolUser', arg)
}
export function postAddDepar1(arg) {
  return request.post('/findPartyschoolUser', arg)
}
export function amendPartySchool(arg) {
  return request.post('/updatePartyschoolUser', arg)
}
export function power(arg) {
  return request.post('/findAuthorization', arg)
}
export function treeData(arg) {
  return request.post('/findColumn', arg)
}
export function Jurisdiction(arg) {
  return request.post('/findAuthorizationInfo', arg)
}
export function shouQuan(arg) {
  return request.post('/savePartyschoolAuthorization', arg)
}
// export function xiuGai(arg) {
//   return request.post('/updatePartyschoolAuthorization', arg)
// }
export function postFilterRank(arg) {
  return request.post('/findAddressInfo', arg)
}
export function aaa(arg) {
  return request.post('/findSysCode', arg)
}
export function jiaoYang(arg) {
  return request.post('/checkUserId', arg)
}
