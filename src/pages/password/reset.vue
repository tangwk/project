<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        修改密码
      </p>
      <ul class="resetPwd">
        <li>
          <label for="oldPassword">原&ensp;密&ensp;码 : &ensp;</label>
          <input type="password" @blur="jiaoYang" name="oldPassword" v-model="oldPwd" placeholder="请输入原密码" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('oldPassword')} " />
          <p class="hint"> {{ errors.first('oldPassword') }} </p>
        </li>
        <li>
          <label for="newPassword">新&ensp;密&ensp;码 : &ensp;</label>
          <input type="password" name="newPassword" v-model="newPwd" placeholder="请输入新密码" v-validate="'required|password'" :class=" {'input':true, 'is-danger': errors.has('newPassword')} " />
          <p class="hint"> {{ errors.first('newPassword') }} </p>
        </li>
        <li>
          <label for="surePassword">确认密码 : &ensp;</label>
          <input type="password" name="surePassword" v-model="surePwd" placeholder="请再次输入新密码" v-validate="'required|confirmPassword:'+this.newPwd" :class="{'input': true, 'is-danger': errors.has('surePassword') }" />
          <p class="hint"> {{ errors.first('surePassword') }} </p>
        </li>
        <li>
          <button @click="save">保存</button>
          <button @click="goBack">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import commonBread from "../../components/bread";
  import * as API from "@/API/reset.js";
  export default {
    name: "Reset",
    data() {
      return {
        userId: "",
        newPwd: "",
        oldPwd: "",
        surePwd: ""
      };
    },
    methods: {
      save() {
        // 表单校验:
        this.$validator.validateAll().then(res => {
          if (res) {
            API.postPassword({
              userId: localStorage.getItem("userId"),
              newPassWord: this.surePwd,
              oldPassWord: this.oldPwd
            }).then(res => {
              // localStorage.clear()
              sessionStorage.setItem("token", "");
              this.$router.push("/login");
              this.$message({
                message: "修改密码成功，请重新登录",
                type: "success"
              });
            });
          }
        });
      },
      jiaoYang() {
       var b = new Base64();
        if (b.encode(this.oldPwd) != localStorage.getItem("password")) {
          this.$message({
            message: "原密码不正确，请输入正确的密码",
            type: "warning"
          });
          this.oldPwd = ""
        }
      },
      goBack() {
        this.$router.go(-1);
      }
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
    .wh(450px, 360px);
    margin: 100px auto;
    li {
      .wh(450px, 30px);
      margin-top: 50px;
      label {
        color: #999999;
      }
      input {
        .wh(360px, 30px);
        border: 1px solid #cccccc;
        .brs(5px);
        outline: none;
        text-indent: 5px;
      }
      .hint {
        margin-left: 82px;
        .ft(14px, 18px);
        color: @dc;
      }
      &:last-child {
        margin-top: 70px;
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
</style>




