import request from './request'

export function homepage() {
  return request.post('/findPartyschoolUserNowDate')
}
export function daoQi() {
  return request.post('/findPartyschoolUserEndDate')
}
export function history(arg) {
  return request.post('/findStudents',arg)
}
export function dangXiao(arg) {
  return request.post('/findPartyschoolUser',arg)
}
