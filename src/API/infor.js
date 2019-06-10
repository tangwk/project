import request from "./request.js";

/**
 * 信息监管模块
 **/

/**
 * [getSchoolList 党校详情及列表]
 **/
export function getSchoolList(arg) {
  return request.post("/findPartyschoolUser", arg);
}

/**
 * [findInfo 获取内容信息列表]
 **/
export function findInfo(arg) {
  return request.post("/findInfo", arg);
}

/**
 * [findNotice 查询通知公告接口-详情 type: 1-3]
 **/
export function findNotice(arg) {
  return request.post("/findNotice", arg);
}

/**
 * [findRegulation 查询规章制度-详情 type: 4]
 **/
export function findRegulation(arg) {
  return request.post("/findRegulation", arg);
}
/**
 * [findCourseware 获取课件资源-详情 type: 8]
 **/
export function findCourseware(arg) {
  return request.post("/findCoursewareResource", arg);
}

// ????
export function infor(arg) {
  return request.post("/findSysCode", arg);
}

/**
 * [getClassList 人员信息-班级列表]
 **/
export function getClassList(arg) {
  return request.post("/findClass", arg);
}

/**
 * [getStuList 人员信息-人员列表]
 **/
export function getStuList(arg) {
  return request.post("/findStudentsByClassId", arg);
}

/**
 * [findAllSchedule 课程信息-查询所有的日程列表]
 **/
export function findAllSchedule(arg) {
  return request.post("/findCourse", arg);
}
//信息监管--查询视频
export function findVideo(arg) {
  return request.post("/findVideo", arg);
}
//信息监管--查询课件
export function findArticle(arg) {
  return request.post("/findArticle", arg);
}
//生活服务主页查询
export function findCollege(arg) {
  return request.post("/findCollege", arg);
}
//生活服务地图照片查询
export function downloadImg(arg) {
  return request.post("/downloadImg", arg, {
    responseType: 'blob'
  });
}
//视频映射
export function findeRealUrl(arg) {
  return request.post("/findeRealUrl", arg);
}
export function findClassByStatus(arg) {
  return request.post("/findClassByStatus", arg);
}
//查看课件的名字
export function findCoursewareResById(arg) {
  return request.post("/findCoursewareResById", arg);
}
//下载课件的地址 ，并转化为blob形式的
export function downloadAttachment(arg) {
  return request.post("/downloadAttachment", arg, {
    responseType: 'blob'
  });
}
//省级的查询
export function findAddressInfo(arg) {
  return request.post('/findAddressInfo', arg)
}
//最新的党校查询
export function findPartyschoolUserByProvinceCode(arg) {
  return request.post('/findPartyschoolUserByProvinceCode', arg)
}
