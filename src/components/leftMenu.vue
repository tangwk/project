<template>
	<div class="navBar">
		<el-menu :default-active="defaultActive" class="nav" style="min-height: 100%;" router>
      <template v-for="item in menuList" v-if="item.checked">
        <el-menu-item v-if="(!item.children || !item.children.length)" class="navBor" :index="item.name">
          <i class="iconfont" :class="item.meta.icon"></i>
          {{ item.label }}
        </el-menu-item>
        <el-submenu v-if="item.children && item.children.length" :index="item.name">
          <template class="navBor" slot="title">
            <i style="font-size: 24px;" class="iconfont" :class="item.meta.icon"></i>{{ item.label }}
          </template>
          <el-menu-item v-for="(child, index) in item.children" :key="index" v-if="child.checked" :index="child.name">
            <i class="iconfont icon-dianzhuanhuan"></i>{{ child.label }}
          </el-menu-item>
        </el-submenu>
      </template>

		</el-menu>
	</div>
</template>

<script>
export default {
  name: "leftMenu",
  props: ["menuList", "currActive"],
  data() {
    return {
      // defaultActive: '',
      data: [
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
          checked: true,
          children: [
            {
              name: "PartyUser",
              label: "用户管理",
              checked: true
            },
            {
              name: "Empower",
              label: "授权管理",
              checked: true
            }
          ]
        },
        {
          name: "map",
          label: "映射管理",
          meta: { icon: "icon-yingshezhuanhuan" },
          checked: true
        },
        {
          name: "3",
          label: "资源管理",
          meta: { icon: "icon-ziyuanguanli" },
          checked: true,
          children: [
            {
              name: "Article",
              label: "文章管理",
              checked: true
            },
            {
              name: "Video",
              label: "视频管理",
              checked: true
            }
          ]
        },
        {
          name: "4",
          label: "栏目管理",
          meta: { icon: "icon-lanmu" },
          checked: true,
          children: [
            {
              name: "ArticleSection",
              label: "文章栏目管理",
              checked: true
            },
            {
              name: "VideoSection",
              label: "视频栏目管理",
              checked: true
            }
          ]
        },
        {
          name: "infor",
          label: "信息监管",
          meta: { icon: "icon-xinxijianguanzhuanhuan" },
          checked: true
        },
        {
          name: "chart",
          label: "统计分析",
          meta: { icon: "icon-shujufenxizhuanhuan" },
          checked: true
        },
        {
          name: "wechat",
          label: "公众号管理",
          meta: { icon: "icon-gongzhonghao" },
          checked: true
        },
        {
          name: "5",
          label: "系统管理",
          meta: { icon: "icon-xitongguanli" },
          checked: true,
          children: [
            {
              name: "Publisher",
              label: "出版社用户管理",
              checked: true
            },
            {
              name: "Role",
              label: "角色管理",
              checked: true
            }
          ]
        }
      ]
    };
  },

  computed: {
    defaultActive() {
      if(this.currActive){
        return this.currActive
      } else {
        return localStorage.getItem('defaultActive') || 'homepage'
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mix";
.navBar {
  min-height: 100%;
  width: 210px;
  height: 100%;
  padding: 20px 10px 0;
  box-sizing: border-box;
  background-color: @fc;
  overflow-y: scroll;
  .nav {
    min-height: 100%;
    border: none;
    background-color: @fc;
    .navBor {
      height: 36px;
      .ft(16px,36px);
      color: @tc;
      font-weight: bold;
      margin: 5px 0;
      i {
        .sc(22px,@tc);
        margin-right: 10px;
      }
      &:hover {
        .brs(25px);
        color: @tc;
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
