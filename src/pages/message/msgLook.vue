 <template>
  <div class="msgLookBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        消息详情
      </p>
      <ul class="newsBor">
        <li>
          <el-input class="title" readonly v-model="magTitle" id="title"></el-input>
        </li>
        <li>
          <label for="author">作<span style="display: inline-block;width: 28px;"></span>者 :</label>
          <el-input v-model="msgAuthor" readonly id="title"></el-input>
          <label class="label" for="time">发布时间 :</label>
          <el-input v-model="msgTime" readonly id="title"></el-input>
        </li>
        <li>
          <div class="editor" v-html="msgContent"></div>
        </li>
        <li class="submit">
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBread from '../../components/bread'
import API from "../../API/message.js";
export default {
  name: 'MsgLook',
  data () {
    return {
      magTitle: "",
      msgAuthor: "",
      msgTime: "",
      msgContent: "",
    }
  },
  methods: {
    toLook() {
      API.getMessageList({
        id: this.reportID,
        title: "",
        pageNum: '',
        pageSize: ''
      }).then((res) => {
        var _data = res.result[0];
        this.magTitle = _data.title;
        this.msgAuthor = _data.releaseName;
        this.msgTime = this.formatDate(_data.releaseDate);
        this.msgContent = _data.content;
      }).catch((err) => {
      });
    },
    goBack () {
      this.$router.go(-1)
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
}
</script>

<style lang="less" scoped>
@import '../../style/mix';
@import '../../style/magTable';
.newsBor{
  padding: 0 50px;
  li{
    height: 32px;
    margin-top: 45px;
    label{
      display: inline-block;
      .wh(70px,32px);
      .ft(13px,32px);
      color: #333;
    }
    .label{
      margin-left: 15%;
    }
    &:first-child{
      margin-top: 30px;
      .el-input{
        width: 100%;
      }
    }
    &:nth-child(2){
      text-align: center;
      .el-input{
        width: 25%;
      }
    }
    &:nth-child(3){
      .wh(100%,370px);
      .editor{
        .wh(100%,360px);
        border: 1px solid #dcdfe6;
        padding: 10px;
        text-indent: 2em;
        box-sizing: border-box;
      }
    }
  }
  .submit{
    button{
      margin-right: 0px;
    }
  }
}
</style>
