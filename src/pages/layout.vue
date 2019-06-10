<template>
  <div class="layOutBor">
    <el-container class="container">
      <el-header class="header">
        <common-headbar :propsname='userName' :isTodo="isTodo" :isNews="isNews"></common-headbar>
      </el-header>
      <el-container>
        <el-aside width="210px" class="side">
          <left-menu :menuList="menuData" :currActive="defaultActive"></left-menu>
        </el-aside>
        <el-main class="content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import CommonHeadbar from "../components/headBar";
import LeftMenu from "../components/leftMenu";
import { getLeftMenuList } from "@/API/getleftmenu";

// 左侧菜单全部权限
const menuList = [
  {
    name: "homepage",
    label: "主页",
    meta: { icon: "icon-renminchubanshe" },
    checked: true // 默认只展示主页
  },
  {
    name: "2",
    label: "党校管理",
    meta: { icon: "icon-dangzhuanhuan" },
    children: [
      {
        name: "PartyUser",
        label: "用户管理"
      },
      {
        name: "Empower",
        label: "授权管理"
      }
    ]
  },
  {
    name: "map",
    label: "映射管理",
    meta: { icon: "icon-yingshezhuanhuan" }
  },
  {
    name: "3",
    label: "资源管理",
    meta: { icon: "icon-ziyuanguanli" },
    children: [
      {
        name: "Article",
        label: "文章管理"
      },
      {
        name: "Video",
        label: "视频管理"
      }
    ]
  },
  {
    name: "4",
    label: "栏目管理",
    meta: { icon: "icon-lanmu" },
    children: [
      {
        name: "ArticleSection",
        label: "文章栏目管理"
      },
      {
        name: "VideoSection",
        label: "视频栏目管理"
      }
    ]
  },
  {
    name: "infor",
    label: "信息监管",
    meta: { icon: "icon-xinxijianguanzhuanhuan" }
  },
  {
    name: "chart",
    label: "统计分析",
    meta: { icon: "icon-shujufenxizhuanhuan" }
  },
  {
    name: "wechat",
    label: "公众号管理",
    meta: { icon: "icon-gongzhonghao" }
  },
  {
    name: "5",
    label: "系统管理",
    meta: { icon: "icon-xitongguanli" },
    children: [
      {
        name: "Publisher",
        label: "出版社用户管理"
      },
      {
        name: "Role",
        label: "角色管理"
      }
    ]
  }
];
export default {
  name: "layOut",
  data() {
    return {
      userID: "",
      menuData: [],
      defaultActive: '', // 当前激活菜单的 index
      isTodo: false, // 待办事项标识
      isNews: false // 消息中心标识
    };
  },
  components: {
    CommonHeadbar,
    LeftMenu
  },
  watch: {
    $route(to) {
      this.defaultActive = this.$route.name
      localStorage.setItem('defaultActive', this.$route.name)
    }
  },
  created() {
    this.search();
    this.getmenuData();
  },
  methods: {
    search() {
      // this.userID = localStorage.getItem("userId");
      this.userName = localStorage.getItem("userName");
    },
    getmenuData() {
      // 动态菜单获取
      getLeftMenuList({
        userId: localStorage.getItem("userId"),
        userType: "1"
      })
        .then(res => {
          if (res.result && res.result.length) {
            var data = res.result;
            this.dealData(data);
          } else {
            this.dealData();
          }
        })
        .catch(() => {
          // 返回错误，默认仅展示主页
          this.menuData = menuList
        });
    },
    dealData(data) {
      var arr2 = [];
      if (data && data.length) {
        // 2. data多维数组转化为普通二级数组
        data.forEach(item => {
          // 判断头部是否显示'待办事项'和'消息中心'功能
          if(item.label == '待办事项'){
            this.isTodo = true
          }
          if(item.label == '消息中心'){
            this.isNews = true
          }
          if (item.children && item.children.length) {
            var obj = {
              label: item.label
            };
            arr2.push(obj);
            item.children.forEach(foo => {
              arr2.push(foo);
            });
          } else {
            arr2.push(item);
          }
        });

        // 3. 循环全部菜单，如返回有相应的权限，加上checked:true
        for (var i = 0; i < menuList.length; i++) {
          var _obj = menuList[i];
          var _obj2 = menuList[i].children;

          // 一级处理
          for (var j = 0; j < arr2.length; j++) {
            if (arr2[j].label === _obj.label) {
              _obj.checked = true;
            }
          }

          // 判断children有无
          if (_obj2 && _obj2.length) {
            for (var k = 0; k < _obj2.length; k++) {
              var _obj3 = _obj2[k];
              for (var m = 0; m < arr2.length; m++) {
                if (arr2[m].label === _obj3.label) {
                  _obj3.checked = true;
                }
              }
            }
          }
        }
      }

      this.menuData = menuList
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mix";
.layOutBor {
  .wh(100%, 100%);
  background-color: #f5f5f5;
  .container {
    .wh(100%, 100%);
    min-width: 1200px;
    padding: 0;
    .header {
      .wh(100%, 113px) !important;
      min-width: 1200px;
      padding: 0;
    }
    .side {
      width: 210px;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 0;
    }
    .content {
      width: calc(100% - 210px);
      min-width:965px;
      margin-left: 210px;
      background-color: #f5f5f5;
      overflow-y: scroll;
      overflow-x: hidden;
      position: fixed;
      top: 113px;
      bottom: 0px;
    }
  }
}
</style>

