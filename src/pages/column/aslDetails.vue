<template>
  <div class="msgLookBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章详情
      </p>
      <ul class="newsBor">
        <li>
          <el-input class="title" readonly v-model="artName" id="title"></el-input>
        </li>
        <li>
          <el-input class="title2" readonly v-model="subName" id="title"></el-input>
        </li>
        <li>
          <label for="author">作<span style="display: inline-block;width: 28px;"></span>者 :</label>
          <el-input v-model="artAuthor" readonly id="title"></el-input>
          <label class="label" for="time">发布时间 :</label>
          <el-input v-model="artTime" readonly id="title"></el-input>
        </li>
        <li>
          <div class="editor" v-html="artContent"></div>
        </li>
        <li class="submit">
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import API from "../../API/resource.js";
export default {
  name: "AslDetails",
  data() {
    return {
      artName: "",
      subName: "",
      artAuthor: "",
      artTime: "",
      artContent: ""
    };
  },
  methods: {
    toLook() {
      API.getArticleList({
        type: "1",
        id: this.reportID,
        partyschoolId: "",
        title: this.artName,
        content: this.artContent,
        startDate: "",
        endDate: "",
        pageNum: "",
        pageSize: ""
      })
        .then(res => {
          var _data = res.result[0];
          this.artName = _data.title;
          this.subName = _data.subtitle;
          this.artAuthor = _data.author;
          this.artTime = this.formatDate(_data.releaseTime);
          this.artContent = _data.content;
        })
        .catch(err => {
        });
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.push('/layOut/articleSectionLook?currentPage=' + this.$route.query.currentPage)
      // this.$router.push({ name:'ArticleSectionLook',query: { reportID: this.$route.query.id, currentPage: this.$route.query.currentPage }});
    },
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d + " ";
    }
  },
  created() {
    this.reportID = this.$route.query.reportID;
    this.toLook();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.newsBor {
  padding: 0 50px;
  li {
    height: 32px;
    margin-top: 30px;
    label {
      display: inline-block;
      .wh(70px,32px);
      .ft(13px,32px);
      color: #333;
    }
    .label {
      margin-left: 15%;
    }
    &:first-child {
      margin-top: 30px;
      .el-input {
        width: 100%;
      }
    }
    &:nth-child(2) {
      text-align: center;
      margin-top: 15px;
      .el-input {
        width: 100%;
      }
    }
    &:nth-child(3) {
      text-align: center;
      .el-input {
        width: 25%;
      }
    }
    &:nth-child(4) {
      // .wh(100%,370px);
      .wh(100%,auto);
      .editor {
        .wh(100%,auto);
        // border: 1px solid #dcdfe6;
        text-indent: 2rem;
        padding: 10px 20px;
        box-sizing: border-box;
        line-height: 24px;
        letter-spacing: 0.5px;
        word-wrap:break-word;
      }
    }
    &:last-child {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
}
</style>
