<template>
  <div class="headBor">
    <h3 class="left">
      <i class="iconfont icon-renminchubansheguanlihoutaizhuanhuan-copy"></i>
    </h3>
    <ul class="right">
      <li @click="show">
        {{propsname}}<i class="iconfont icon-plus-select-down"></i>
        <div class="about" v-show="showOn" v-on:mouseleave="hide">
          <div @click="reset">修改密码</div>
          <div @click="quit">退出</div>
        </div>
      </li>
      <li @click="todo" v-if="isTodo" class="todo"><i class="iconfont icon-daiban0"></i>待办事项<span v-show="remind != 0" class="remind">{{remind}}</span></li>
      <li @click="message" v-if="isNews"><i class="iconfont icon-xiaoxi0"></i>消息中心</li>
    </ul>
  </div>
</template>

<script>
  import API from "../API/backlog.js";
  export default {
    name: "commonHeadBar",
    props: ["propsname", "isNews", "isTodo"],
    data() {
      return {
        showOn: false,
        remind: '0',
        timer: null, //定时器名
      };
    },
    created() {
      // if(this.timer){
      //   clearInterval(this.timer);
      // }
      this.remindTodo()
      this.timer = setInterval(this.remindTodo, 3000);
    },
    watch: {
      remind(val) {
        this.remindTodo();
      }
    },
    methods: {
      show() {
        this.showOn = !this.showOn;
      },
      hide() {
        this.showOn = !this.showOn;
      },
      todo() {
        this.$router.push("/layOut/todo");
      },
      message() {
        this.$router.push("/layOut/message");
      },
      reset() {
        this.$router.push("/layOut/reset");
      },
      quit() {
        // API.postQuit({
        //   userId: this.userId
        // }).then((res) => {
        //   // console.log(res)
        //   localStorage.clear()
        //   this.$router.push('/') // persission判断token
        // })
        if (!localStorage.getItem('remberPass')) {
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('password');
        }
        // localStorage.clear()
        localStorage.removeItem('defaultActive');
        sessionStorage.removeItem("token");
        this.$router.push("/login");
      },
      remindTodo() {
        API.getRemind({}).then(res => {
          if (res.code === 200) {
            this.remind = res.number
          }
        })
      },
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../style/mix";
  .headBor {
    .wh(100%, 113px);
    .bis("../assets/img/header.jpg");
    h3 {
      .wh(40%, 113px);
      line-height: 113px;
      i {
        .sc(32px, @fc);
        margin-left: 54px;
      }
    }
    ul {
      .wh(60%, 113px);
      li {
        float: right;
        min-width: 86px; // _width: 86px;
        height: 32px;
        white-space: nowrap;
        padding: 0 8px;
        margin: 40px 20px 0 0;
        text-align: center;
        cursor: pointer; // .ft(18px, 32px);
        font-size: 18px;
        .sc(18px, @fc);
        .brs(5px);
        &:hover {
          background-color: #2c768d;
        }
        i {
          .sc(18px, @fc);
          margin: 0px 6px;
        }
        position: relative;
        .about {
          .wh(100%, 80px);
          z-index: 999;
          padding: 10px 0;
          background-color: @fc;
          box-sizing: border-box;
          position: absolute;
          right: 0;
          top: 32px;
          box-shadow: 0px 2px 8px 0px #bbbbbb;
          .brs(0 0 3px 3px);
          div {
            .wh(100%, 30px);
            .ft(13px, 30px);
            color: #999999;
            &:hover {
              background-color: @bc;
            }
          }
        }
      }
      .todo {
        position: relative;
        .remind {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #E21918;
          position: absolute;
          right: -5px;
          top: -5px;
          font-size: 12px;
        }
      }
    }
  }
</style>
