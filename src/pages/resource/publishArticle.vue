<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章发布
      </p>
      <ul class="newsBor">
        <li>
          <label for="title"><i class="iconfont icon-xinghao"></i>文章标题 :</label>
          <el-input name="artTitle" v-model="artName" id="title" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('artTitle')} "></el-input>
          <p class="hint"> {{ errors.first('artTitle') }} </p>
        </li>
        <li>
          <label for="title"><span style="display: inline-block;width: 24px;"></span>副<span style="display: inline-block;width: 6.5px;"></span>标<span style="display: inline-block;width: 6.5px;"></span>题 :</label>
          <el-input v-model="subName" id="title"></el-input>
        </li>
        <li class="clear">
          <div class="left">
            <label for="author"><i class="iconfont icon-xinghao"></i>作<span style="display: inline-block;width: 28px;"></span>者 :</label>
            <el-input v-model="artAuthor" id="title" name="authorName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('authorName')} "></el-input>
            <p class="hint"> {{ errors.first('authorName') }} </p>
          </div>
          <div class="right">
            <label for="time">发布时间 :</label>
            <!-- <el-date-picker
                v-model="artTime"
                name="artTime"
                id="time"
                type="date"
                align="right"
                :readonly="true">
              </el-date-picker> -->
            <span>{{Date.now()|dateFormat}}</span>
          </div>
        </li>
        <li>
          <label for="content"><i class="iconfont icon-xinghao"></i>发布内容 :</label>
          <div class="editor">
            <input type="hidden" v-model="artContent" name="artContent" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('artContent')} ">
            <UE :config="config" ref="ue" @onready="handleReady"></UE>
          </div>
          <p class="hint"> {{ errors.first('artContent') }} </p>
        </li>
        <li class="submit">
          <button @click="submit">发 布</button>
          <button @click="goBack">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import commonBread from '../../components/bread'
  import UE from '../../components/Ueditor'
  import API from "../../API/resource.js";
  Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(parseInt(originVal))
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1).toString().padStart(2, '0')
    const d = dt
      .getDate()
      .toString()
      .padStart(2, '0')
    return `${y}-${m}-${d}`
  })
  export default {
    name: 'PublishArticle',
    data() {
      return {
        artName: '',
        subName: '',
        artAuthor: '',
        artTime: new Date(),
        artContent: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350,
        },
        editor: null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      handleReady(ue) {
        this.editor = ue
      },
      submit() {
        // 表单校验:
        //  this.$router.push('/layOut/article')
        var htmlString = this.editor.getContent()
        this.artContent = htmlString
        var vm = this
        this.$validator.validateAll().then((res) => {
          if (res) {
            API.addArticle({
              type: '1',
              partyschoolId: "",
              title: vm.artName,
              content: vm.artContent,
              subtitle: vm.subName,
              author: vm.artAuthor,
              releaseTime: vm.artTime,
              releaseId: localStorage.getItem("userId"),
              releaseName: localStorage.getItem("userName"),
            }).then((res) => {
              this.$router.push('/layOut/article')
            })
          }
        })
      }
    },
    components: {
      commonBread,
      UE
    },
    destroyed() {
      // this.editor.destroy()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mix';
  @import '../../style/magTable';
  .newsBor {
    padding: 0 20px;
    li {
      height: 32px;
      margin-top: 40px;
      label {
        display: inline-block;
        .wh(90px, 32px);
        .ft(13px, 32px);
        color: #333;
        i {
          font-size: 24px;
          color: #FF0000;
        }
      }
      .left,
      .right {
        width: 46%;
      }
      &:first-child {
        margin-top: 30px;
        .el-input {
          width: calc(100% - 100px);
        }
      }
      &:nth-child(2) {
        .el-input {
          width: calc(100% - 100px);
        }
      }
      &:nth-child(3) {
        margin-top: 35px;
        div {
          .el-input {
            width: calc(100% - 100px);
          }
        }
      }
      &:nth-child(4) {
        .wh(100%, 370px);
        .editor {
          .wh(calc(100% - 100px), 360px);
          margin-left: 94px;
          margin-top: -30px;
          box-sizing: border-box;
        }
      }
      &:last-child {
        margin-bottom: 30px;
      }
    }
  }
  .hint {
    margin-left: 100px;
    font-size: 14px;
    line-height: 18px;
    color: #ff0000;
  }
</style>




