<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        角色详情
      </p>
      <ul class="resetPwd">
        <li>
          <i class="iconfont icon-xinghao" style="color:red"></i>
          <label for="partyType">
                             角色名称 : &ensp;
                           </label>
          <input type="text" name="partyName" v-model="partyName" placeholder="请输入账号" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('partyName')} " />
          <p id="hint">{{errors.first('partyName')}}</p>
        </li>
        <li>
          <i class="iconfont icon-xinghao" style="color:red"></i>
          <label for="account">
                             角色权限 : &ensp;
                          </label>
          <div class="anNiu">
            <el-button round type="primary" @click="resetCheckedAll" id="quanxuan">全选</el-button>
            <el-button round @click="resetChecked" id="quanxuan">清空</el-button>
          </div>
          <div id="tree">
            <el-tree ref="trees" :data="data2" show-checkbox node-key="id" :default-checked-keys="rollQuan" @check="small">
            </el-tree>
          </div>
        </li>
        <li>
          <label for="partyType">
                            备<span style="display:inline-block;width:1.5rem;"></span>注 : &ensp;
                          </label>
          <el-input class="remark" type="textarea" :rows="1" placeholder="请输入内容" resize="none" v-model="remark">
          </el-input>
        </li>
        <li>
          <button @click="xiugai">保 存</button>
          <button @click="goBack">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/system.js";
  import commonBread from '../../components/bread'
  export default {
    name: 'RoleDetails',
    data() {
      return {
        partyName: '',
        remark: '',
        partyTypeId: '',
        linkMan: '',
        linkPhone: '',
        address: '',
        account: '',
        initPwd: '',
        value: '',
        data2: [],
        options: [],
        id: "",
        roleArr: [],
        rollQuan: []
      }
    },
    watch: {
      value() {
        this.small()
      },
    },
    methods: {
      // 权限列表的展示
      search() {
        API.findMenu({
          type: "1"
        }).then(res => {
          if (res.code === 200) {
            this.data2 = res.result
          }
        })
      },
      //获取用户传过来的id
      demo() {
        this.id = this.$route.query.reportID
      },
      //复选框改变的时候获取里面的值
      small(arr1, arr2) {
        if (this.roleArr) {
          var arr = []
          this.rollQuan.forEach(item => {
            var obj = {}
            obj.authorityId = item
            arr.push(obj)
          })
          this.roleArr1 = arr
        }
        this.roleArr = []
        arr2.checkedKeys.forEach(item => {
          var obj = {}
          obj.authorityId = item
          this.roleArr.push(obj)
        })
         this.rollQuan=arr2.checkedKeys
      },
      //角色名称，备足选择
      newPartySubmit() {
        // 表单校验:
        this.$validator.validateAll().then((res) => {
          if (res) {
            API.AddDepar({
              "id": this.id,
              "partyschoolId": "",
              "roleName": "",
              "remark": "",
              "pageNum": "",
              "pageSize": "",
              "type": 1
            }).then((res) => {
              if (res.code === 200) {
                this.partyName = res.result[0].roleName
                this.remark = res.result[0].remark
              } else {
                alert(res.data.msg || res.data.status.msg)
              }
            })
          }
        })
      },
      //保存的方法
      xiugai() {
        console.log(this.rollQuan)
        if (this.rollQuan.length) {
          API.baocun({
            "id": this.id,
            "roleName": this.partyName,
            "remark": this.remark,
            "data": this.roleArr,
            "type": 1
          }).then(res => {
            if (res.code === 200) {
              this.$router.push('role')
              this.$message({
                message: "保存成功",
                type: "success"
              });
            }
          })
        }else{
           this.$message({
                message: "请选择角色权限",
                type: "warning"
              });
        }
      },
      //获取勾选的权限
      baocun() {
        API.baocunID({
          "roleId": this.id
        }).then(res => {
          var arr = []
          res.result.forEach(item => {
            arr.push(item.id)
          })
          this.rollQuan = arr
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      //功能全选
      resetCheckedAll() {
        API.findMenu({
          type: "1",
        }).then(res => {
          var arr = [];
          var arr1 = [];
          var arr2 = [];
          //只获取一级菜单的id
          res.result.forEach(item => {
            var obj = {};
            arr.push(item.id);
            obj.authorityId = item.id;
            arr1.push(obj);
          });
          //获取二级菜单的id
          res.result.forEach(item => {
            if (item.children.length) {
              item.children.forEach(items => {
                var obj = {};
                obj.authorityId = items.id;
                arr2.push(obj);
              });
            }
          });
          this.roleArr = arr1.concat(arr2);
          this.rollQuan=arr1.concat(arr2)
          //全选
          this.$refs.trees.setCheckedKeys(arr);
        });
      },
      //功能板块的取消按钮
      resetChecked() {
        this.$refs.trees.setCheckedKeys([]);
        this.roleArr = []
        this.rollQuan = []
      },
    },
    created() {
      this.search()
      this.demo()
      this.newPartySubmit()
      this.baocun()
    },
    components: {
      commonBread,
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mix';
  @import '../../style/magTable';
  .resetPwd {
    width: 450px;
    margin: 50px auto;
    li {
      width: 450px;
      margin-top: 35px;
      label {
        display: inline-block;
        .wh(70px, 32px);
        .ft(13px, 32px);
        text-align: center;
        color: #999999;
        i {
          font-size: 24px;
          color: #FF0000;
        }
      }
      input {
        .wh(350px, 32px);
        border: 1px solid #cccccc;
        .brs(5px);
        outline: none;
        text-indent: 5px;
        box-sizing: border-box;
      }
      .el-select {
        width: 350px;
      }
      .hint {
        margin-left: 82px;
        .ft(14px, 18px);
        color: @dc;
      }
      &:nth-child(5) {
        label {
          display: inline-block;
        }
        .el-textarea__inner {
          height: 80px !important;
        }
      }
      &:last-child {
        margin-top: 50px;
        text-align: center;
        button {
          .wh(80px, 32px);
          color: @fc;
          background-color: #e9e9e9;
          .brs(3px);
          border: none;
          outline: none;
          margin-left: 74px;
          cursor: pointer;
          &:hover {
            background-color: #cccccc;
          }
          &:first-child {
            background-color: @tbc;
            &:hover {
              background-color: @tc;
            }
          }
        }
      }
    }
  }
  .el-date-editor.el-input {
    width: 350px !important;
  }
  .remark {
    width: 350px;
    box-sizing: border-box;
  }
  #hint {
    font-size: 14px;
    color: #ff0000;
    margin-left: 100px;
  }
  #tree {
    margin-left: 70px;
    margin-top: 13px
  }
  .anNiu {
    margin-top: -32px;
    margin-left: 95px;
  }
  #quanxuan {
    padding: 8px 23px;
  }
</style>
