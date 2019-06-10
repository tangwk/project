<template>
  <div class="powerBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        党校授权
      </p>
      <div class="during">
        <!-- 时间选择开始 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="授权期限 : " style="float:left">
            <input type="text" v-model="filters.column.create_start_date" style="width:83px">
          </el-form-item>
          <el-form-item label="至" label-width="25px" style="float:left">
            <input type="text" v-model="filters.column.create_end_date">
          </el-form-item>
        </el-form>
        <!-- 时间选择结 -->
      </div>
      <!-- 功能页面 -->
      <div class="function">
        <h3>功<span style="display: inline-block;width: 30px;"></span>能 :</h3>
        <div id="tree">
          <el-tree ref="trees" :data="data2" show-checkbox node-key="id" :default-checked-keys="gongNeng" :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <!-- 功能页面结束 -->
      <!-- 内容资源开始 -->
      <div class="content">
        <h3>内容资源 :</h3>
        <div class="treeBor">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
          <el-tree :data="data3" show-checkbox node-key="id" :default-checked-keys="content" :props="defaultProps" ref="tree" :filter-node-method="filterNode">
          </el-tree>
        </div>
      </div>
      <!-- 内容资源结束 -->
      <div class="submit">
        <button style="background:#79ac88;color:#fff;" @click="goBack">返 回</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/API/PartyUser.js";
import commonBread from "../../components/bread";
export default {
  name: "poewrDetails",
  data() {
    return {
      filters: {
        // 日期选择
        column: {
          create_start_date: "", // new Date()
          create_end_date: "" // new Date()
        }
      },
      rollArr1: [], //功能
      rollArr2: [], //内容资源
      rollArr: [], //发送请求要传的数据
      mark: [], //总的
      startDate: "",
      id: "",
      endDate: "",
      gongNeng: [],
      content: [],
      multipleSelection: [],
      data2: [],
      data3: [],
      flag: true,
      funcList: [],
      filterText: "",
      libaryData1: [],
      libaryData2: [],
      libaryData3: [],
      defaultProps: {
        label: "label",
        children: "children",
        isLeaf: "leaf"
      },
      resolve: null
    };
  },
  watch: {
    // 过滤方法
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    //获取传过来的id
    demo() {
      this.id = this.$route.query.reportID;
    },
    //内容权限查看
    search1() {
      API.Jurisdiction({
        partyschoolId: this.id,
        type: "2",
        resourcesType: "2",
        sourceType: "1"
      }).then(res => {
        if (res.code === 200) {
          // console.log(res.result);
          this.data3 = res.result;
          //查看内容里授权的内容，mark标识符，并取出来
          //查看二级菜单里的mark值，并去除id
          var arr = [];
          this.rollArr2 = [];
          this.data3.forEach(item => {
            item.disabled = true;
            if (item.children.length) {
              item.children.forEach(items => {
                items.disabled = true;
                if (items.mark) {
                  arr.push(items.id);
                }
              });
            }
          });
        }
        this.content = arr;
        // console.log(this.content);
      });
    },
    getData() {
      var vm = this;
      API.Jurisdiction({
        partyschoolId: this.id,
        type: "2",
        resourcesType: "2",
        sourceType: "1"
      }).then(res => {
        //获取出版全部的内容资源
        // this.data3 = res.result
      });
    },
    //功能权限查看功能
    search() {
      API.Jurisdiction({
        partyschoolId: this.id,
        type: "1",
        resourcesType: "1",
        sourceType: ""
      }).then(res => {
        // console.log(res.result)
        if (res.code === 200) {
          this.data2 = res.result;
          this.filters.column.create_start_date = res.result[0].startDate;
          this.filters.column.create_end_date = res.result[0].endDate;
          //查看功能里授权的内容，mark标识符，并取出来
          //查看二级菜单里的mark值，并取出id
          var arr = [];
          var arr1 = [];
          this.data2.forEach(item => {
            if (item.children.length) {
              item.disabled = true;
              item.children.forEach(items => {
                items.disabled = true;
                if (items.mark) {
                  arr.push(items.id);
                }
              });
            }
          });
          //查看只有一级菜单的时候，并取出有mark值的id
          this.data2.forEach(val => {
            val.disabled = true;
            if (!val.children.length) {
              if (val.mark) {
                arr1.push(val.id);
              }
            }
          });
          this.gongNeng = arr.concat(arr1);
          this.rollArr1 = [];
        }
      });
    },
    //回退的方法
    goBack() {
      this.$router.go(-1);
    },
    //搜所功能的方法
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  components: {
    commonBread
  },
  created() {
    this.demo();
    this.getData();
    this.search();
    this.search1();
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.during {
  .wh(100%, 60px);
  overflow: hidden;
  border-bottom: 1px solid #f5f5f5;
  padding: 10px 0 0 15px;
  box-sizing: border-box;
}
.function {
  border-bottom: 1px solid #f5f5f5;
  h3 {
    .ft(15px, 60px);
    color: #333333;
    padding-left: 18px;
  }
  .tabBor {
    padding: 0 95px 30px;
    box-sizing: border-box;
  }
}
.content {
  h3 {
    .ft(15px, 60px);
    color: #333333;
    padding-left: 18px;
  }
  .treeBor {
    padding: 0 95px 0px;
    box-sizing: border-box;
  }
}
#tree {
  margin-top: 20px;
  margin-left: 94px;
}
.anNiu {
  margin-top: -45px;
  margin-left: 95px;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background: green !important;
}
</style>




