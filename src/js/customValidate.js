import { Validator } from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN'

// VeeValidate语言包切换,放自定义提示前
Validator.localize(CN)

// 自定义提示
const dictionary = {
  CN: {
    messages: {
      password: function (field) {
        return field + '必须是8-16位非纯数字'
      },
      user: function (field) {
        return  '必须是不小于4位的数字加字母的组合'
      },
      telephone: function (field) {
        return  '请输入手机的正确格式'
      },
      confirmPassword: function () {
        return '两次输入密码不一致'
      },
      email: function () {
        return '请输入正确的邮箱格式'
      },
      url: function () {
        return '请输入正确格式的视频地址'
      },
      menuName: function (field) {
        return '一级菜单最多4个汉字'
      },
      menuName2: function (field) {
        return '二级菜单最多7个汉字'
      },
      required: function (field) {
        return '请输入' + field
      }
    },
    attributes: {
      userEmail: '邮箱',
      password: '密码',
      userId: '姓名',
      telephone: '手机号',
      oldPassword: '原密码',
      newPassword: '新密码',
      surePassword: '密码',
      partyName:'党校名称',
      partyName1:'角色名称',
      party:'党校名称',
      typeSelected:"类型",
      account:"账号",
      initPwd:"密码",
      value:"角色权限",
      times:"创建时间",
      linkPhone:"角色名称",
      area:"省市县",
      role:"角色",
      selectedType:"类型",
      artTitle: '标题',
      authorName: '作者姓名',
      artTime: '发布时间',
      artContent: '内容',
      vidName: '视频名称',
      videoUrl: '视频地址',
      vidTime: '上传时间',
      vidContent: '视频描述',
      relUrl: '真实地址',
      mapUrl: '映射地址',
      mapName: '映射名称',
      sectionName: '栏目名称',
      msgName: '消息标题',
      menuNameA: '菜单名称',
      menuTypeA: '菜单类型',
      menuUrlA: '菜单功能',
      rolename:"姓名"
    }
  }
}

Validator.localize(dictionary)

// 自定义规则
Validator.extend('telephone', {
  getMessage: field => field + '必须是11位数字',
  validate: value => {
    return value.length === 11 && /^1[34578]\d{9}$/.test(value)
  }
})

// 姓名
Validator.extend('userName', {
  getMessage: field => field + '必须是中文汉字',
  validate: value => {
    return /^[\u4e00-\u9fa5]+$/.test(value)
  }
})

// 密码
Validator.extend('password', {
  getMessage: field => field + '必须是8-16位非纯数字',
  validate: value => {
    return /^(?![0-9]*$)[a-zA-Z0-9_]{8,16}$/.test(value)
  }
})
//用户名
Validator.extend('user', {
  getMessage: field => field + '必须是最少四位非纯数字',
  validate: value => {
    return /^(?![0-9]*$)[a-zA-Z0-9_]{4,16}$/.test(value)
  }
})
// 用户名/邮箱
Validator.extend('userEmail', {
  getMessage: field => '请输入正确格式的邮箱',
  validate: value => {
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
  }
})

// 验证码

// 确认密码
Validator.extend('confirmPassword', {
  getMessage: field => '两次输入密码不一致',
  validate: (value, val2) => {
    return value === val2[0]
  }
})

// 验证菜单名称长度
Validator.extend('menuName', {
  getMessage: field => '一级菜单最多4个汉字',
  validate: value => {
    return /^[\u4e00-\u9fa5]{1,4}$/.test(value)
  }
})
Validator.extend('menuName2', {
  getMessage: field => '二级菜单最多7个汉字',
  validate: value => {
    return /^[\u4e00-\u9fa5]{1,7}$/.test(value)
  }
})

export default Validator
