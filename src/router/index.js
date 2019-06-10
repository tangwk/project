import Vue from "vue";
import Router from "vue-router";
import layOut from "@/pages/layOut";
// import manage from '@/pages/manage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/layOut"
    },
    {
      path:'/pdf',
      name:"pdfFile",
      component: resolve => require(["@/pages/pdf"], resolve)
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["@/pages/login"], resolve)
    },
    {
      path: "/tpl",
      name: "tpl",
      component: resolve => require(["@/pages/tpl"], resolve)
    },
    {
      path: "/layOut",
      name: "layOut",
      component: layOut,
      redirect: "/layOut/homepage",
      children: [
        {
          path: "homepage",
          name: "homepage",
          component: resolve => require(["@/pages/homepage"], resolve),
          meta: ["主页"]
        },
        {
          path: "message",
          name: "Message",
          component: resolve => require(["@/pages/message/message"], resolve),
          meta: ["消息中心"]
        },
        {
          path: "publishNews",
          name: "PublishNews",
          component: resolve =>
            require(["@/pages/message/publishNews"], resolve),
          meta: ["消息中心", "消息发布"]
        },
        {
          path: "msgLook",
          name: "MsgLook",
          component: resolve => require(["@/pages/message/msgLook"], resolve),
          meta: ["消息中心", "消息详情"]
        },
        {
          path: "msgModify",
          name: "MsgModify",
          component: resolve => require(["@/pages/message/msgModify"], resolve),
          meta: ["消息中心", "消息修改"]
        },
        {
          path: "todo",
          name: "Todo",
          component: resolve => require(["@/pages/backlog/todo"], resolve),
          meta: ["待办事项"]
        },
        {
          path: "todoArtDetails",
          name: "todoArtDetails",
          component: resolve =>
            require(["@/pages/backlog/todoArtDetails"], resolve),
          meta: ["待办事项", "资源详情"]
        },
        {
          path: "todoArtDetails1",
          name: "todoArtDetails1",
          component: resolve =>
            require(["@/pages/backlog/todoArtDetails1"], resolve),
          meta: ["待办事项", "不同意详情"]
        },
        {
          path: "todoVidDetails",
          name: "todoVidDetails",
          component: resolve =>
            require(["@/pages/backlog/todoVidDetails"], resolve),
          meta: ["待办事项", "资源详情"]
        },
        {
          path: "todoVidDetails1",
          name: "todoVidDetails1",
          component: resolve =>
            require(["@/pages/backlog/todoVidDetails1"], resolve),
          meta: ["待办事项", "不同意详情"]
        },
        {
          path: "reset",
          name: "Reset",
          component: resolve => require(["@/pages/password/reset"], resolve),
          meta: ["修改密码"]
        },
        {
          path: "PartyUser",
          name: "PartyUser",
          component: resolve => require(["@/pages/party/PartyUser"], resolve),
          meta: ["党校管理", "用户管理"]
        },
        {
          path: "newParty",
          name: "NewParty",
          component: resolve => require(["@/pages/party/newParty"], resolve),
          meta: ["党校管理", "用户管理", "用户新增"]
        },
        {
          path: "PartyDetails",
          name: "PartyDetails",
          component: resolve =>
            require(["@/pages/party/PartyDetails"], resolve),
          meta: ["党校管理", "用户管理", "用户详情"]
        },
        {
          path: "empower",
          name: "Empower",
          component: resolve => require(["@/pages/party/empower"], resolve),
          meta: ["党校管理", "授权管理"]
        },
        {
          path: "powerDetails",
          name: "powerDetails",
          component: resolve => require(["@/pages/party/powerDetails"], resolve),
          meta: ["党校管理", "授权管理详情见面"]
        },
        {
          path: "partyView",
          name: "partyView",
          component: resolve => require(["@/pages/party/partyView"], resolve),
          meta: ["党校管理", "用户管理详情见面"]
        },
        {
          path: "power",
          name: "Power",
          component: resolve => require(["@/pages/party/power"], resolve),
          meta: ["党校管理", "授权管理", "党校授权"]
        },
        {
          path: "article",
          name: "Article",
          component: resolve => require(["@/pages/resource/article"], resolve),
          meta: ["资源管理", "文章管理"]
        },
        {
          path: "publishArticle",
          name: "PublishArticle",
          component: resolve =>
            require(["@/pages/resource/publishArticle"], resolve),
          meta: ["资源管理", "文章管理", "文章发布"]
        },
        {
          path: "articleLook",
          name: "ArticleLook",
          component: resolve =>
            require(["@/pages/resource/articleLook"], resolve),
          meta: ["资源管理", "文章管理", "文章详情"]
        },
        {
          path: "articleModify",
          name: "ArticleModify",
          component: resolve =>
            require(["@/pages/resource/articleModify"], resolve),
          meta: ["资源管理", "文章管理", "文章修改"]
        },
        {
          path: "video",
          name: "Video",
          component: resolve => require(["@/pages/resource/video"], resolve),
          meta: ["资源管理", "视频管理"]
        },
        {
          path: "uploadVideo",
          name: "UploadVideo",
          component: resolve =>
            require(["@/pages/resource/uploadVideo"], resolve),
          meta: ["资源管理", "视频管理", "视频上传"]
        },
        {
          path: "videoLook",
          name: "VideoLook",
          component: resolve =>
            require(["@/pages/resource/videoLook"], resolve),
          meta: ["资源管理", "视频管理", "视频详情"]
        },
        {
          path: "videoModify",
          name: "VideoModify",
          component: resolve =>
            require(["@/pages/resource/videoModify"], resolve),
          meta: ["资源管理", "视频管理", "视频修改"]
        },
        {
          path: "map",
          name: "Map",
          component: resolve => require(["@/pages/map/map"], resolve),
          meta: ["映射管理"]
        },
        {
          path: "mapDetails",
          name: "MapDetails",
          component: resolve => require(["@/pages/map/mapDetails"], resolve),
          meta: ["映射管理", "映射详情"]
        },
        {
          path: "articleSection",
          name: "ArticleSection",
          component: resolve =>
            require(["@/pages/column/articleSection"], resolve),
          meta: ["栏目管理", "文章栏目管理"]
        },
        {
          path: "articleSectionLook",
          name: "ArticleSectionLook",
          component: resolve =>
            require(["@/pages/column/articleSectionLook"], resolve),
          meta: ["栏目管理", "文章栏目管理", "文章栏目查看"]
        },
        {
          path: "aslDetails",
          name: "AslDetails",
          component: resolve => require(["@/pages/column/aslDetails"], resolve),
          meta: ["栏目管理", "文章栏目管理", "文章栏目查看", "文章详情"]
        },
        {
          path: "articleSectionIn",
          name: "ArticleSectionIn",
          component: resolve =>
            require(["@/pages/column/articleSectionIn"], resolve),
          meta: ["栏目管理", "文章栏目管理", "文章导入"]
        },
        {
          path: "videoSection",
          name: "VideoSection",
          component: resolve =>
            require(["@/pages/column/videoSection"], resolve),
          meta: ["栏目管理", "视频栏目管理"]
        },
        {
          path: "videoSectionLook",
          name: "VideoSectionLook",
          component: resolve =>
            require(["@/pages/column/videoSectionLook"], resolve),
          meta: ["栏目管理", "视频栏目管理", "视频栏目查看"]
        },
        {
          path: "vslDetails",
          name: "VslDetails",
          component: resolve => require(["@/pages/column/vslDetails"], resolve),
          meta: ["栏目管理", "视频栏目管理", "视频栏目查看", "视频详情"]
        },
        {
          path: "videoSectionIn",
          name: "VideoSectionIn",
          component: resolve =>
            require(["@/pages/column/videoSectionIn"], resolve),
          meta: ["栏目管理", "视频栏目管理", "视频导入"]
        },
        {
          path: "infor",
          name: "Infor",
          component: resolve => require(["@/pages/information/infor"], resolve),
          meta: ["信息监管"]
        },
        {
          path: "chart",
          name: "Chart",
          component: resolve => require(["@/pages/statistic/chart"], resolve),
          meta: ["统计分析"]
        },
        {
          path: "wechat",
          name: "Wechat",
          component: resolve => require(["@/pages/vipcn/wechat"], resolve),
          meta: ["微信公众号", "公众号管理"]
        },
        {
          path: "weMenu",
          name: "WeMenu",
          component: resolve => require(["@/pages/vipcn/weMenu"], resolve),
          meta: ["微信公众号", "公众号管理", "自定义菜单"]
        },
        {
          path: "publisher",
          name: "Publisher",
          component: resolve => require(["@/pages/system/publisher"], resolve),
          meta: ["系统管理", "出版社用户管理"]
        },
        {
          path: "pubUserNew",
          name: "PubUserNew",
          component: resolve => require(["@/pages/system/pubUserNew"], resolve),
          meta: ["系统管理", "出版社用户管理", "用户新增"]
        },
        {
          path: "chakan",
          name: "chakan",
          component: resolve => require(["@/pages/system/chakan"], resolve),
          meta: ["系统管理", "出版社用户管理", "用户详情"]
        },
        {
          path: "pubUserDetails",
          name: "PubUserDetails",
          component: resolve =>
            require(["@/pages/system/pubUserDetails"], resolve),
          meta: ["系统管理", "出版社用户管理", "用户修改"]
        },
        {
          path: "role",
          name: "Role",
          component: resolve => require(["@/pages/system/role"], resolve),
          meta: ["系统管理", "角色管理"]
        },
        {
          path: "xdetails",
          name: "xdetails",
          component: resolve => require(["@/pages/system/details"], resolve),
          meta: ["系统管理", "角色管理","角色详情"]
        },
        {
          path: "roleNew",
          name: "RoleNew",
          component: resolve => require(["@/pages/system/roleNew"], resolve),
          meta: ["系统管理", "角色管理", "角色新增"]
        },
        {
          path: "roleDetails",
          name: "RoleDetails",
          component: resolve =>
            require(["@/pages/system/roleDetails"], resolve),
          meta: ["系统管理", "角色管理", "角色修改"]
        }
      ]
    }
  ]
});
