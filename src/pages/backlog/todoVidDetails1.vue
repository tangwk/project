 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频资源详情
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

          <el-select v-model="typeVal" clearable disabled placeholder="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <div class="editor" v-html="videoContent" ></div>
        </li>
        <li>
          <label for="opinion">审批意见 :</label>
          <textarea class="opinion" v-model="opinion" name="" id="" ></textarea>
        </li>
        <li class="submit">
          <!-- （审批人） -->
          <!-- <button @click="agree">同 意</button> -->
          <button @click="disagree">不同意</button>
           <button @click="demo">返回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import API from '../../API/backlog.js'
import API1 from "../../API/resource.js";
export default {
  name: "todoVidDetails",
  data() {
    return {
      videoName: "",
      videoTime: "",
      videoContent: "",
      opinion: "",
      typeVal: "",
      videoUrl: "",
      options: [
        {
          label: "类型1",
          value: "1"
        },
        {
          label: "类型2",
          value: "2"
        },
        {
          label: "类型3",
          value: "3"
        },
        {
          label: "类型4",
          value: "4"
        },
        {
          label: "类型5",
          value: "5"
        }
      ],
      eDitor: "",
    };
  },
  methods: {
    toLook() {
      API1.getVideos({
        id: this.reportID,
      })
        .then(res => {
          var _data = res.result;
          this.videoName = _data.videoName;
          this.videoTime = this.formatDate(_data.uploadDate);
          this.typeVal = _data.videoType;
          this.videoContent = _data.videoContent.replace(/<\/?.+?>/g,"");
          this.videoId = _data.id;
          this.videoUrl = _data.realUrl
        })
        .catch(err => {
        });
    },
    agree() {
      API.agreeTodo({
        data: [
          {
            resourcesId: this.videoId,
            resourcesType: 2,
            status: 1,
            opinion: this.opinion,
          }
        ],
      }).then(res => {
        this.$router.push('/layOut/todo?currentPage=' + this.$route.query.currentPage)
      });
    },
    demo(){
      this.$router.back(-1)
    },
    disagree () {
      API.agreeTodo({
        data: [
          {
            resourcesId: this.videoId,
            resourcesType: 2,
            status: 3,
            opinion: this.opinion,
          }
        ]
      }).then(res => {
        this.$router.push('/layOut/todo?currentPage=' + this.$route.query.currentPage)
      });
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
  },
  components: {
    commonBread,
    // UE
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.newsvidBor {
  padding: 0 20px;
  li {
    // height: 32px;
    margin-top: 15px;
    label {
      display: inline-block;
      text-align: center;
      .wh(90px,32px);
      .ft(13px,32px);
      color: #333;
      i {
        font-size: 24px;
        color: #ff0000;
      }
    }
    .label {
      margin-left: 10%;
    }
    &:first-child {
      // height: 32px;
      iframe{
        width: 100%;
        min-width: 950px;
        height: 358px;
      }
    }
    &:nth-child(2) {
      height: 32px;
      margin-top: 15px;
      .el-input {
        width: 100%;
      }
    }
    &:nth-child(3) {
      height: 32px;
      margin-top: 15px;
      .el-input{
        float: left;
        width: 48%;
      }
      .el-select {
        float: right;
        width: 48%;
        margin-left: 4%;
      }
    }
    &:nth-child(4) {
      // .wh(100%,370px);
      .editor {
        .wh(100%,auto);
        // border: 1px solid gold;
        text-indent: 2rem;
        padding: 10px 30px;
        box-sizing: border-box;
        line-height: 24px;
        letter-spacing: 0.5px;
        word-wrap:break-word;
      }
    }
    &:nth-child(5) {
      // height: 160px;
      margin-top: 30px;
      .opinion{
        .wh(100%,160px);
        // margin-left: 94px;
        // margin-top: -30px;
        text-indent: 2em;
        padding: 10px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        .ft(14px,24px);
        color: #333;
        letter-spacing: 1px;
      }
    }
    &:last-child {
      margin-bottom: 30px;
      // height: 32px;
    }
  }
}
</style>




