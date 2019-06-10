<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        用户详情
      </p>
      <ul class="resetPwd">
        <li>
          <label for="partyType">
               <i class="iconfont icon-xinghao"></i>
               账<span style="display:inline-block;width:1.5rem;"></span>号 : &ensp;
             </label>
          <input readonly="value" type="text" name="account" v-model="partyName" placeholder="请输入账号" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('account')} " />
          <p id="hint">{{errors.first('account')}}</p>
        </li>
        <li>
          <label for="partyType">
                  <i class="iconfont icon-xinghao"></i>
               姓<span style="display:inline-block;width:1.5rem;"></span>名 : &ensp;
            </label>
          <input type="text" name="userId" v-model="linkPhone" placeholder="请输入姓名" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('userId')} " />
          <p id="hint">{{errors.first('userId')}}</p>
        </li>
        <li>
          <label for="account">
                  <i class="iconfont icon-xinghao"></i>
               角<span style="display:inline-block;width:1.5rem;"></span> 色 : &ensp;
            </label>
          <el-select v-model="value" multiple placeholder="请选择角色" name="value" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('value')} ">
            <el-option v-for="item in options" :key="item.value" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
          <p id="hint">{{errors.first('value')}}</p>
        </li>
        <li v-if="this.$route.query.reportID !== '1' && partyName !== userId">
          <!-- admin均不可修改保存;对自己账户不可修改保存 -->
          <button @click="newPartySubmit1">保 存</button>
          <button @click="goBack">取 消</button>
        </li>
        <li v-else>
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/system.js";
  import commonBread from '../../components/bread'
  export default {
    name: 'PubUserDetails',
    components: {
      commonBread,
    },
    data() {
      return {
        userId: localStorage.getItem('userId'),
        partyName: '',
        partyTypeId: '',
        linkMan: '',
        linkPhone: '',
        address: '',
        account: '',
        initPwd: '',
        value: '',
        options: [],
        id: "",
        roleArr: []
      }
    },
    watch: {
      value() {
        this.small()
      }
    },
    methods: {
      newPartySubmit() {
        // 表单校验:
        this.$validator.validateAll().then((res) => {
          if (res) {
            API.xuanRang({
              "id": this.id,
              "username": "",
              "partyschoolId": "",
              "userId": "",
              "pageNum": "",
              "pageSize": "",
              "userType": 1
            }).then((res) => {
              if (res.code === 200) {
                this.partyName = res.result[0].userId
                this.linkPhone = res.result[0].username
              } else {
                alert(res.data.msg || res.data.status.msg)
              }
            })
          }
        })
      },
      //获取传过来的id
      demo() {
        this.id = this.$route.query.reportID
      },
      //查询到全部的角色
      search() {
        API.deal({
          "id": "",
          "partyschoolId": "",
          "roleName": "",
          "remark": "",
          "pageNum": "",
          "pageSize": "",
          "type": 1
        }).then(res => {
          if (res.code === 200) {
            this.options = res.result
          }
        })
      },
      small() {
        let arr = []
        var demo = this.value
        demo.forEach(item => {
          var obj = {}
          obj.roleId = item
          arr.push(obj)
        });
        this.roleArr = arr
      },
      newPartySubmit1() {
        if (this.linkPhone) {
          API.modify({
            "id": this.id,
            "username": this.linkPhone,
            "data": this.roleArr,
            "uesrType": 1
          }).then(res => {
            this.$router.push('publisher')
          })
        } else {
          this.$message({
            message: "请输入完整内容!",
            type: "warning"
          });
        }
      },
      //查询有哪些角色
      big() {
        API.searchID({
          "userId": this.id,
        }).then(res => {
          let _arr = []
          let arr = res.result
          arr.forEach(item => {
            _arr.push(item.id)
            this.value = _arr
          })
        })
      },
      goBack() {
        this.$router.go(-1)
      },
    },
    created() {
      this.userId = localStorage.getItem('userId')
      this.demo()
      this.search()
      this.newPartySubmit()
      this.big()
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
        .wh(93px, 32px);
        .ft(13px, 32px);
        text-align: center;
        color: #999999;
        i {
          // font-size: 24px;
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
    width: 355px;
    box-sizing: border-box;
  }
  #hint {
    font-size: 14px;
    color: #ff0000;
    margin-left: 100px;
  }
</style>
