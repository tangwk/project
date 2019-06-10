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
        <label for="title">内容标题 :</label>
        <!-- <el-input readonly v-model="data.title" id="title"></el-input> -->
        <span>{{data.title}}</span>
      </li>
      <li>
        <label for="title">发布人:</label>
        <!-- <el-input readonly v-model="data.author" id="title"></el-input> -->
        <span>{{data.author}}</span>
      </li>
       <li style="height:100px;"  v-if="data.picture">
        <label for="title" style="float:left">动态图片:</label>
        <!-- <el-input readonly v-model="data.createDate" id="title"></el-input> -->
        <!-- <div class="dv"> -->
          <img  :src="data.picture" style="float:left">
        <!-- </div> -->
      </li>
        <li style="margin-top:0px;height:0px"  v-else>
        <!-- <label for="title">动态图片:</label> -->
        <!-- <el-input readonly v-model="data.createDate" id="title"></el-input> -->
        <!-- <div class="dv"> -->
          <!-- <img  :src="data.picture" alt="本条党校动态未上传图片"> -->
        <!-- </div> -->
      </li>
      <li v-if="data.picture">
        <label for="content" style="float:left">活动内容 :</label>
        <textarea readonly name="content" class="editor" v-model="data.content"  style="border:none;float:left;"></textarea>
        <!-- <span id="dv1">{{data.content}}</span> -->
      </li>
        <li v-else>
        <label style="float:left" for="content">活动内容 :</label>
        <textarea readonly name="content" class="editor1" v-model="data.content" style="border:none;float:left;"></textarea>
         <!-- <span id="dv1">{{data.content}}</span> -->
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'dongTai',
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
      margin-top: 20px;
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
        .wh(100%, 179px);
            margin-top: 28px;
        .editor {
          .wh(calc(100% - 100px), 320px);
          overflow-y: scroll;
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
        }
      }
    }
  }
  img {
    display: inline-block;
  }
 .editor1 {
  .wh(calc(100% - 100px), 450px);
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
}
// #dv1{
//     width: 1095px;
//     display: inline-block;
//     text-indent: 2em;
//     word-break:break-all;
// }
</style>




