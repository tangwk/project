<template>
  <div class="user">
    <p class="titleBar">
      内容详情
    </p>
    <!-- {{data}}
      <img :src="data.picture" />
      <img src="blob:http://localhost:8080/4c18a14a-a762-489f-a394-26190924e3e5" width="300" height="300">
      <img src="blob:http://localhost:8080/2e0c21af-a238-4e3f-9c7e-613cbf9b38ac" width="300" height="300"> -->
    <ul class="newsBor">
      <li>
        <label for="title">联系电话 :</label>
        <!-- <el-input readonly v-model="data.title" id="title"></el-input> -->
        <span>{{data.title}}</span>
      </li>
      <li>
        <label for="title">交通路线:</label>
        <!-- <el-input readonly v-model="data.author" id="title"></el-input> -->
        <span>{{data.author}}</span>
      </li>
       <li>
        <label for="title">地图照片 :</label>
        <!-- <el-input readonly v-model="data.createDate" id="title"></el-input> -->
        <div class="dv">
          <img :src="data.picture" alt="" />
        </div>
      </li>
      <li>
        <label for="content">简介内容 :</label>
        <textarea readonly name="content" class="editor" v-model="data.content" style="border:none"></textarea>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'lifeDetails',
    props: ['data'],
    data() {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="less" scoped>
  @import '../style/mix';
  @import '../style/magTable';
  .newsBor {
    padding: 0 20px;
    li {
      height: 32px;
      margin-top: 15px;
      .el-input {
        width: calc(100% - 100px);
      }
      label {
        display: inline-block;
        .wh(80px, 32px);
        .ft(13px, 32px);
        color: #333;
        i {
          font-size: 24px;
          color: #FF0000;
        }
      }
      &:nth-child(4) {
        .wh(100%, 370px);
        margin-top: 155px;
        .editor {
          .wh(calc(100% - 100px), 300px);
          overflow-y: scroll;
          margin-left: 84px;
          margin-top: -36px;
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
        }
      }
    }
  }
  .dv {
    width: 92%; // border: 1px solid #dcdfe6;
    margin-left: 86px;
    margin-top: -25px;
    border-radius: 6px;
  }
  img {
    display: block;
    width: 300px;
    height: 150px;
    border: 1px solid #dcdfe6;
  }
</style>




