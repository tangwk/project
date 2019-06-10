 <template>
  <div class="user">
    <p class="titleBar">
      内容详情
    </p>
    <ul class="newsBor">
      <li>
        <label for="title">内容标题 :</label>
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
      <li style="height:200px;width:700px;">
        <label for="title" style="vertical-align:top">视频内容 :</label>
        <iframe id="video" :src="data.video" frameborder="0" scrolling="no" style="width:300px" height="200px"></iframe>
     </li>
      <li id="jianjie">
        <label for="content" style="float:left">视频简介 :</label>
        <textarea style="border:none;float:left" readonly name="content" class="editor" v-model="data.content"></textarea>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'videoDetails',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
@import '../style/mix';
@import '../style/magTable';
.newsBor{
  padding: 0 20px;
  li{
    height: 32px;
    margin-top: 15px;
    .el-input{
      width: calc(100% - 100px);
    }
    label{
      display: inline-block;
      .wh(80px,32px);
      .ft(13px,32px);
      color: #333;
      i{
        font-size: 24px;
        color: #FF0000;
      }
    }
    &:nth-child(5){
      .wh(100%,120px);
      margin-top: 0px;
      .editor{
        .wh(calc(100% - 100px),300px);
        overflow-y: scroll;
        // margin-left: 84px;
        // margin-top: -33px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
      }
    }
  }
}


</style>




