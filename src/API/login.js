import request from './request'

export function login(arg) {
  return request.post('/loginUser', arg)
}
