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
        <el-form ref="form" label-width="80px" style="color:#999999;">
          <el-form-item label="授权期限 : " style="display:inline-block;color:#999999;">
            <el-date-picker value-format=" yyyy-MM-dd" id="date1" v-model="filters.column.create_start_date" @change="filters.column.create_start_date=$event" type="date" size="small" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" label-width="25px" style="display:inline-block;color:#999999;">
            <el-date-picker value-format=" yyyy-MM-dd" id="date2" v-model="filters.column.create_end_date" @change="filters.column.create_end_date=$event" type="date" size="small" format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <!-- 时间选择结 -->
      </div>
      <!-- 功能页面 -->
      <div class="function">
        <h3>功<span style="display: inline-block;width: 30px;"></span>能 :</h3>
        <div class="anNiu">
          <el-button round type="primary" @click="resetCheckedAll" id="quanxuan">全选</el-button>
          <el-button round @click="resetChecked" id="quanxuan">清空</el-button>
        </div>
        <div id="tree">
          <el-tree ref="trees" :data="data2" show-checkbox node-key="id" :default-checked-keys="gongNeng" :props="defaultProps" @check="handleSelectionChange">
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
          <el-tree :data="data3" show-checkbox node-key="id" :default-checked-keys="content" :props="defaultProps" @check="handleCheck" ref="tree" :filter-node-method="filterNode">
          </el-tree>
        </div>
      </div>
      <!-- 内容资源结束 -->
      <div class="submit">
        <button @click="powerSubmit">授 权</button>
        <button @click="goBack">取 消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/PartyUser.js";
  import commonBread from "../../components/bread";
  export default {
    name: "Power",
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
        mark1: [], //功能的mark
        mark2: [], //内容资源的mark
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
        pickerBeginDateBefore: {
          // 设定开始日期区间
          disabledDate: time => {
            return time.getTime() < Date.now() - 86400000;
          }
        },
        pickerBeginDateAfter: {
          // 设定结束日期区间
          disabledDate: time => {
            return time.getTime() < Date.now() - 86400000;
          }
        },
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
      //党校接入事件埋点代码
      monitorActivate() {
        //获取唯一标识uId
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
          ""
        );
        var uuid = [],
          i;
        for (i = 0; i < 8; i++)
          uuid[i] = chars[0 | (Math.random() * chars.length)];
        var uId = uuid.join("");
        _BFD.UserAction("add_partySchool", {
          uid: uId,
          partyschool_name:this.$route.query.partyschoolName,
          start_date:this.filters.column.create_start_date,
          end_date:this.filters.column.create_end_date
        });
      },
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
            this.data3 = res.result;
            //查看内容里授权的内容，mark标识符，并取出来
            //查看二级菜单里的mark值，并去除id
            var arr = [];
            this.rollArr2 = [];
            this.data3.forEach(item => {
              if (item.children.length) {
                item.children.forEach(items => {
                  if (items.mark) {
                    arr.push(items.id);
                    this.rollArr2.push({
                      authorizationId: items.id,
                      type: "2"
                    });
                    this.rollArr = this.rollArr1.concat(this.rollArr2);
                  }
                });
              }
            });
          }
          this.content = arr;
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
          this.data3 = res.result;
        });
      },
      // 功能复选框,数据改变时获取实时的数据
      handleSelectionChange(val, val1) {
        this.rollArr1 = [];
        if (val1.halfCheckedKeys.length) {
          val1.halfCheckedKeys.forEach(item => {
            var obj = {};
            obj.authorizationId = item;
            obj.type = 1;
            this.rollArr1.push(obj);
          });
        }
        var _node = val1.checkedNodes; //当前选中状态的全部节点halfCheckedKeys
        _node.forEach(item => {
          var obj = {};
          obj.authorizationId = item.id;
          obj.type = 1;
          this.rollArr1.push(obj);
        });
        this.rollArr = this.rollArr1.concat(this.rollArr2);
      },
      //内容复选框，当内容资源点击的时候，数据改变获取实时的数据
      handleCheck(arr1, arr2) {
        this.rollArr2 = [];
        var _node = arr2.checkedNodes; //当前选中状态的全部节点
        _node.forEach(item => {
          var obj = {};
          obj.authorizationId = item.id;
          obj.type = 2;
          this.rollArr2.push(obj);
        });
        this.rollArr = this.rollArr1.concat(this.rollArr2);
      },
      //功能权限查看功能
      search() {
        API.Jurisdiction({
          partyschoolId: this.id,
          type: "1",
          resourcesType: "1",
          sourceType: ""
        }).then(res => {
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
                item.children.forEach(items => {
                  if (items.mark) {
                    arr.push(items.id);
                  }
                });
              }
            });
            //查看只有一级菜单的时候，并取出有mark值的id
            this.data2.forEach(val => {
              if (!val.children.length) {
                if (val.mark) {
                  arr1.push(val.id);
                }
              }
            });
            this.gongNeng = arr.concat(arr1);
            this.rollArr1 = [];
            this.gongNeng.forEach(item => {
              this.rollArr1.push({
                authorizationId: item,
                type: "1"
              });
            });
            this.rollArr = this.rollArr1.concat(this.rollArr2);
          }
        });
      },
      //点击按钮授权
      powerSubmit() {
        if (
          this.filters.column.create_start_date &&
          this.filters.column.create_end_date
        ) {
           if(this.rollArr1.length){
                  if (this.flag) {
            this.flag = false;
            API.shouQuan({
              data: this.rollArr,
              partyschoolId: this.id,
              startDate: this.filters.column.create_start_date,
              endDate: this.filters.column.create_end_date
            }).then(res => {
              if (res.code === 200) {
                this.$router.push("empower");
                this.$message({
                  message: "授权成功!",
                  type: "success"
                });
                this.monitorActivate()
                this.flag = true;
              } else {
                this.$message({
                  message: "授权失败!",
                  type: "warning"
                });
              }
            });
          }
           }else{
             this.$message({
            message: "请进行功能授权",
            type: "warning"
          });
          }
        } else {
          this.$message({
            message: "请输入授权期限",
            type: "warning"
          });
        }
      },
      //回退的方法
      goBack() {
        this.$router.go(-1);
      },
      //搜所功能的方法
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //功能板块的取消按钮
      resetChecked() {
        this.$refs.trees.setCheckedKeys([]);
        this.rollArr1 = [];
        this.rollArr = this.rollArr1.concat(this.rollArr2);
      },
      //功能板块的全选按钮
      resetCheckedAll() {
        API.Jurisdiction({
          partyschoolId: this.id,
          type: "1",
          resourcesType: "1",
          sourceType: ""
        }).then(res => {
          var arr = [];
          var arr1 = [];
          var arr2 = [];
          //只获取一级菜单的id
          res.result.forEach(item => {
            var obj = {};
            arr.push(item.id);
            obj.authorizationId = item.id;
            obj.type = 1;
            arr1.push(obj);
          });
          //获取二级菜单的id
          res.result.forEach(item => {
            if (item.children.length) {
              item.children.forEach(items => {
                var obj = {};
                obj.authorizationId = items.id;
                obj.type = 1;
                arr2.push(obj);
              });
            }
          });
          this.rollArr1 = arr1.concat(arr2);
          this.rollArr = this.rollArr1.concat(this.rollArr2);
          //全选
          this.$refs.trees.setCheckedKeys(arr);
        });
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
  #quanxuan {
    padding: 8px 23px;
  }
</style>




