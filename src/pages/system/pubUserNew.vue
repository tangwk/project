<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        用户新增
      </p>
      <ul class="resetPwd">
        <li>
          <label for="partyType">
                      <i class="iconfont icon-xinghao"></i>账<span style="display:inline-block;width:1.5rem;"></span>号 : &ensp;
                    </label>
          <input @blur="shiJiao" type="text" name="account" v-model="partyName" placeholder="请输入账号" v-validate="'user'" :class=" {'input':true, 'is-danger': errors.has('account')} " />
          <p id="hint">{{errors.first('account')}}</p>
        </li>
        <li>
          <label for="partyType">
                       <i class="iconfont icon-xinghao"></i>姓<span style="display:inline-block;width:1.5rem;"></span> 名 : &ensp;
                    </label>
          <input type="text" name="rolename" v-model="linkPhone" placeholder="请输入姓名" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('rolename')} " />
          <p id="hint">{{errors.first('rolename')}}</p>
        </li>
        <li>
          <label for="account">
                        <i class="iconfont icon-xinghao"></i>角<span style="display:inline-block;width:1.5rem;"></span>色 : &ensp;
                     </label>
          <el-select v-model="value" multiple placeholder="请选择角色" name="role" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('value')} ">
            <el-option v-for="item in options" :key="item.value" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
          <p id="hint">{{errors.first('role')}}</p>
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
    name: "PubUserNew",
    data() {
      return {
        partyName: "",
        partyTypeId: "",
        linkMan: "",
        linkPhone: "",
        address: "",
        account: "",
        initPwd: "",
        value: "",
        options: [],
        roleArr: []
      };
    },
    watch: {
      value() {
        this.demo();
      }
    },
    methods: {
      newPartySubmit() {
        // 表单校验:
        this.$validator.validateAll().then(res => {
          if (res && this.partyName) {
            API.saveUser({
              userId: this.partyName,
              partyschoolId: "",
              userType: "",
              password: "",
              username: this.linkPhone,
              data: this.roleArr,
              creater: "",
              userType: 1
            }).then(res => {
              if (res.code === 200) {
                this.$router.push("publisher");
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "保存失败!",
                  type: "warning"
                });
              }
            });
          } else {
            this.$message({
              message: "请输入完整内容!",
              type: "warning"
            });
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      demo() {
        let arr = [];
        var demo = this.value;
        demo.forEach(item => {
          var obj = {};
          obj.roleId = item;
          arr.push(obj);
        });
        this.roleArr = arr;
      },
      //用户名校样
      shiJiao() {
        if (this.partyName) {
          API.jiaoYang({
            userId: this.partyName,
            userType: 1,
            partyschoolId: ""
          }).then(res => {
            if (res.code !== 200) {
              this.$message({
                message: "用户名存在!",
                type: "warning"
              });
              this.partyName = "";
            }
          });
        }
      },
      search() {
        API.deal({
          id: "",
          partyschoolId: "",
          roleName: "",
          remark: "",
          pageNum: "",
          pageSize: "",
          type: 1
        }).then(res => {
          if (res.code === 200) {
            this.options = res.result;
          }
        });
      }
    },
    components: {
      commonBread
    },
    created() {
      this.search();
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
    width: 349px;
    box-sizing: border-box;
  }
  #hint {
    font-size: 14px;
    color: #ff0000;
    margin-left: 100px;
  }
</style>
