<template>
  <div class="loginBor">
    <div class="userBox">
      <!-- 头部 -->
      <!-- 登陆框 -->
      <h3 class="userTitle">
        <i class="iconfont icon-renminchubansheguanlihoutaizhuanhuan"></i>
      </h3>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input @change="loginU" placeholder="登录名称" v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <!-- 登陆框 -->
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input placeholder="登录密码" v-model="loginForm.password" :type="ispwd ? 'password' : 'text'">
          </el-input>
        </el-form-item>
        <!-- 密码框 -->
        <div class="check">
          <input type="checkbox" name="checkbox" v-model="remberPass" />
          <label for="checkbox">记住用户名和密码</label>
        </div>
        <el-row>
          <el-col>
            <el-button class="loginBtn" type="primary" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/login.js";
  export default {
    name: "login",
    data() {
      return {
        // 是否渲染为密码框
        ispwd: true,
        // 登录表单对象
        //  usernamer:this.loginForm.username,
        loginForm: {
          username: "",
          password: ""
        },
        remberPass: "",
        // 登录表单验证规则
        loginFormRules: {
          // 用户名的校验规则
          username: [{
              required: true,
              message: "请输入登录名",
              trigger: "blur"
            },
            {
              min: 4,
              message: "长度大于4个字符",
              trigger: "change"
            }
          ]
        }
      };
    },
    mounted() {
      this.hoverGradient();
      if (localStorage.getItem("remberPass") === "true") {
        var b = new Base64();
        // alert(localStorage.getItem("userId"))
        this.loginForm.username = localStorage.getItem("userId");
        this.loginForm.password = b.decode(localStorage.getItem("password"));
        this.remberPass = localStorage.getItem("remberPass");
      } else {
        this.userId = "";
        this.passwd = "";
        this.remberPass = "";
      }
    },
    watch: {
      username(val) {
        this.loginForm.password = ""
      }
    },
    methods: {
      loginU() {
        if (this.loginForm.username == "") {
          this.loginForm.password = ""
        }
      },
      hoverGradient() {
        document.querySelector(".loginBtn").onmousemove = e => {
          const x = e.pageX - e.target.offsetLeft;
          const y = e.pageY - e.target.offsetTop;
          e.target.style.setProperty("--x", `${x}px`); // .getPropertyValue("--x");cSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称。
          e.target.style.setProperty("--y", `${y}px`);
        };
      },
      login() {
        // 先校验表单的合法性
        this.$refs.loginFormRef.validate(valid => {
          // 表单验证失败！
          if (!valid) return this.$message.error("请填写完整的登录信息！");
          API.login({
            userId: this.loginForm.username,
            password: this.loginForm.password,
            userType: "1"
          }).then(res => {
            if (res.code === 200) {
              var b = new Base64();
              var _data = res.result
              // 把 登录成功后，服务器颁发的令牌，存储到 sessionStorage 中
              sessionStorage.setItem("token", _data.token);
              //把用户名存储到localstorage中
              localStorage.setItem("userId", this.loginForm.username),
                localStorage.setItem("userName", _data.username),
                localStorage.setItem("password", b.encode(this.loginForm.password)),
                localStorage.setItem("remberPass", this.remberPass);
              // 通过 编程式导航 API，跳转到 后台 首页的 路由地址  /home
              this.$router.push("/layout");
            } else {
              if (res.massege === "密码错误!") {
                this.$message({
                  message: "密码错误!",
                  type: "warning"
                });
                this.loginForm.password = "";
              } else if (res.massege === "用戶不存在") {
                this.$message({
                  message: "用戶不存在",
                  type: "warning"
                });
                this.loginForm.password = "";
                this.loginForm.username = "";
              }
            }
          });
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../style/mix";
  body,
  html {
    .wh(100%, 100%);
  }
  .loginBor {
    .wh(100%, 100%);
    .bis("../assets/img/background.jpg");
    .userBox {
      .wh(451px, 346px);
      .ctp(451px, 450px);
      .userTitle {
        .wh(451px, 45px);
        text-align: center;
        margin-bottom: 54px;
        i {
          display: block;
          color: @tc;
          font-size: 42px;
        }
      }
      .userBor {
        padding-left: 44px;
        .input {
          .wh(362px, 42px);
          background-color: @fc;
          position: relative;
          margin-bottom: 32px;
          .brs(5px);
          input {
            .wh(313px, 42px);
            padding-left: 49px;
            font-size: 14px;
          }
          i {
            .sc(18px, rgba(137, 192, 153, 0.6));
            position: absolute;
            left: 17px;
            top: 10px;
          }
          p {
            .wh(362px, 24px);
            .sc(14px;
            #ff0000);
            position: absolute;
            left: 5px;
            top: 45px;
          }
        }
        .check {
          input {
            .wh(21px, 21px);
            .brs(3px); // border: 1px solid #dfdfdf;
            // margin: 0;
          }
          label {
            .sc(12px, #888888);
            vertical-align: super;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .loginBtn {
    margin-top: 30px;
    .wh(451px, 32px);
    .ft(18px, 32px);
    .brs(5px);
    color: @fc;
    background-color: @tc;
    border: none;
    cursor: pointer;
  }
</style>
