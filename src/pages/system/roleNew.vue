<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        角色新增
      </p>
      <ul class="resetPwd">
        <li>
          <label for="partyType">
              <i class="iconfont icon-xinghao"></i>角色名称 : &ensp;
          </label>
          <input type="text" name="partyName1" v-model="partyName1" placeholder="请输入角色名称" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('partyName1')} " />
          <p id="hint">{{errors.first('partyName1')}}</p>
        </li>
        <li>
          <label for="account">
              <i class="iconfont icon-xinghao"></i>角色权限 : &ensp;
          </label>
            <div class="anNiu">
          <el-button round type="primary" @click="resetCheckedAll" id="quanxuan">全选</el-button>
          <el-button round  @click="resetChecked" id="quanxuan">清空</el-button>
        </div>
          <div id="tree">
            <el-tree ref="trees" :data="data2" show-checkbox @check="handleCheck" node-key="id">
            </el-tree>
          </div>
        </li>
        <li>
          <label for="partyType"><span style="display: inline-block;width: 22px;"></span>
             备<span style="display:inline-block;width:1.5rem;"></span>注 : &ensp;
          </label>
          <el-input class="remark" type="textarea" :rows="1" placeholder="请输入内容" resize="none" v-model="remark">
          </el-input>
        </li>
        <li>
          <button @click="newPartySubmit">保 存</button>
          <button @click="goBack">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as API from "@/API/system.js";
import commonBread from "../../components/bread";
export default {
  name: "RoleNew",
  data() {
    return {
      partyName1: "",
      remark: "",
      partyTypeId: "",
      linkMan: "",
      linkPhone: "",
      address: "",
      account: "",
      initPwd: "",
      value: [],
      roleArr: [],
      options: [],
      data2: [],
      newRoll: []
    };
  },
  watch: {
    value() {
      this.demo();
    }
  },
  methods: {
    // 权限列表的展示
    search() {
      API.findMenu({
        type: "1"
      }).then(res => {
        if (res.code === 200) {
          this.data2 = res.result;
        }
      });
    },
    handleCheck(arr1, arr2) {
      var roll = arr2.checkedNodes;
      this.newRoll = [];
      roll.forEach(item => {
        var obj = {};
        obj.authorityId = item.id;
        this.newRoll.push(obj);
      });
    },
    demo() {
      let arr = [];
      var demo = this.value;
      demo.forEach(item => {
        var obj = {};
        obj.authorityId = item;
        arr.push(obj);
      });
      this.roleArr = arr;
    },
    newPartySubmit() {
      if (this.newRoll.length) {
        // 表单校验:
        this.$validator.validateAll().then(res => {
          if (res) {
            API.postAddDepar({
              roleName: this.partyName1,
              partyschoolId: "",
              remark: this.remark,
              data: this.newRoll,
              type: 1
            }).then(res => {
              if (res.code == "200") {
                this.$router.push("role");
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                alert(res.msg || res.status.msg);
              }
            });
          }
        });
      }else{
         this.$message({
                  message: "请选择角色权限",
                  type: "warning"
                });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //功能全选
    resetCheckedAll() {
      API.findMenu({
        // partyschoolId: localStorage.getItem("partyschoolId"),
        type: "1"
        // resourcesType: "1",
        // sourceType: ""
      }).then(res => {
        var arr = [];
        var arr1 = [];
        var arr2 = [];
        //只获取一级菜单的id
        res.result.forEach(item => {
          var obj = {};
          arr.push(item.id);
          obj.authorityId = item.id;
          // obj.type = 1;
          arr1.push(obj);
        });
        //获取二级菜单的id
        res.result.forEach(item => {
          if (item.children.length) {
            item.children.forEach(items => {
              var obj = {};
              obj.authorityId = items.id;
              // obj.type = 1;
              arr2.push(obj);
            });
          }
        });
        this.newRoll = arr1.concat(arr2);
        // console.log(this.rollArr1)
        // this.newRoll = this.rollArr1.concat(this.rollArr2);
        //全选
        this.$refs.trees.setCheckedKeys(arr);
      });
    },
    //功能板块的取消按钮
    resetChecked() {
      this.$refs.trees.setCheckedKeys([]);
      // this.rollArr1 = [];
      this.newRoll = [];
    }
  },
  created() {
    this.search();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.resetPwd {
  width: 450px;
  margin: 50px auto;
  li {
    width: 450px;
    margin-top: 35px;
    label {
      .wh(90px, 32px);
      .ft(13px, 32px);
      color: #999999;
      i {
        font-size: 24px;
        color: #ff0000;
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
  margin-top: 13px;
}
.anNiu {
  margin-top: -32px;
  margin-left: 95px;
}
#quanxuan {
  padding: 8px 23px;
}
</style>
