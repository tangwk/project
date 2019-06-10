<template>
  <div class="user">
    <p class="titleBar">
      内容详情
    </p>
    <ul class="newsBor">
      <li>
        <label for="title">内容标题:</label>
        <!-- <el-input readonly v-model="data.title" id="title"></el-input> -->
        <span>{{data.title}}</span>
      </li>
      <li>
        <label for="title">发<i style="padding-left: 5px;"></i>布<i style="padding-left: 8px;"></i>人 :</label>
        <!-- <el-input readonly v-model="data.author" id="title"></el-input> -->
        <span>{{data.author}}</span>
      </li>
      <li>
        <label for="title">发布时间 :</label>
        <!-- <el-input readonly v-model="data.createDate" id="title"></el-input> -->
        <span>{{data.createDate}}</span>
      </li>
      <li>
        <label for="content">活动内容 :</label>
        <textarea style="border:none" readonly name="content" class="editor" v-model="data.content"></textarea>
      </li>
    </ul>
    <div class="fujian">
      <label style="margin-left:22px">课件内容 :</label>
      <li v-for="(item, index) in data.attachment" :key="index" class="detail" @click="downloadAttachment(item.attachmentName)">
        {{item.nattachmentName}}
      </li>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/infor.js";
  export default {
    name: 'keJianDetails',
    props: ['data'],
    data() {
      return {}
    },
    methods: {
      downloadAttachment(val) {
        API.downloadAttachment({
          uploadType: "1",
          fileName: val
        }).then(res => {
          const {
            href
          } = this.$router.resolve({
            name: 'pdfFile',
            query: {
              url:val
            }
          })
          window.open(href, '_blank', 'toolbar=yes, width=1300, height=900')
        });
      }
    },
    components: {},
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
        .wh(100%, 200px);
        .editor {
          .wh(calc(100% - 100px), 200px);
          overflow-y: scroll;
          margin-left: 84px;
          margin-top: -30px;
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
        }
      }
    }
  }
  .fujian {
    width: 100%;
    height: 200px;
  }
  .dv {
    color: #333;
  }
  .detail {
    margin-left: 102px;
    cursor: pointer;
    margin-top: 10px;
  }
</style>




