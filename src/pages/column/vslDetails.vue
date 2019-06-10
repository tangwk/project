 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频详情
      </p>
      <ul class="newsvidBor">
        <li>
          <iframe class="iframe" width="100%" height="358px" :src="videoUrl" frameborder="0"></iframe>
        </li>
        <li>
          <el-input v-model="videoName" readonly id="title"></el-input>
        </li>
        <li class="clear">
          <el-input v-model="videoTime" readonly id="time"></el-input>

          <el-select v-model="typeVal" clearable disabled placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <div class="editor" v-html="videoContent"></div>
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
import API from "../../API/resource.js";
export default {
  name: 'VslDetails',
  data () {
    return {
      videoName: "",
      videoTime: "",
      videoContent: "",
      typeVal: "",
      videoUrl: "",
      options: [
        // {
        //   label: "类型1",
        //   value: "1"
        // },
      ],
    }
  },
  methods: {
    toLook() {
      API.getVideos({  // getVideoList
        type: "1",
        id: this.reportID,
        videoName: this.videoName,
        partyschoolId: "",
        videoContent: this.videoContent,
        startDate: "",
        endDate: "",
        pageNum: "1",
        pageSize: "1"
      })
        .then(res => {
          var _data = res.result;
          this.videoName = _data.videoName;
          this.videoTime = this.formatDate(_data.uploadDate);
          this.typeVal = _data.videoType;
          this.videoContent = _data.videoContent.replace(/<\/?.+?>/g,"");
          this.videoUrl = _data.realUrl
        })
        .catch(err => {
        });
    },
    getTypeList() {
      API.typeList({
        codeName: '',
        codeType: "videoType",
        id: '',
        code: this.typeVal
      }).then(res => {
        var _datas = res.result
        this.options = []
        if (_datas) {
          _datas.forEach((item) => {
            item.label = item.codeName
            item.value = item.code
          })
          this.options = _datas
        }
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
  created () {
    this.reportID = this.$route.query.reportID;
    this.toLook();
    this.getTypeList();
  },
  components: {
    commonBread
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mix';
@import '../../style/magTable';
.newsvidBor{
  padding: 0 20px;
  li{
    margin-top: 15px;
    label{
      display: inline-block;
      text-align: center;
      .wh(90px,32px);
      .ft(13px,32px);
      color: #333;
      i{
        font-size: 24px;
        color: #FF0000;
      }
    }
    .label{
      margin-left: 10%;
    }
    &:first-child {
      iframe{
        width: 100%;
        min-width: 950px;
        height: 358px;
      }
    }
    &:nth-child(2){
      height: 32px;
      margin-top: 15px;
      .el-input{
        width: 100%;
      }
    }
    &:nth-child(3){
      margin-top: 15px;
      .el-input {
        float: left;
        width: 48%;
      }
      .el-select{
        float: right;
        width: 48%;
        margin-left: 4%;
      }
    }
    &:nth-child(4){
      .editor {
        .wh(100%,auto);
        text-indent: 2rem;
        padding: 10px 30px;
        box-sizing: border-box;
        line-height: 24px;
        letter-spacing: 0.5px;
        word-wrap:break-word;
      }
    }
    &:last-child{
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
