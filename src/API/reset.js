import request from './request'
export function postPassword(arg) {
  return request.post('/updatePassWord', arg)
}
