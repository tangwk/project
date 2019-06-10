 <template>
  <div class="msgLookBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章资源详情
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
          <div class="editor" v-html="artContent" ></div>
        </li>
        <li>
          <label for="opinion">审批意见 :</label>
          <textarea class="opinion" v-model="opinion" name="" id="" cols="30" rows="10"></textarea>
        </li>
        <li class="submit">
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
export default {
  name: "todoArtDetails",
  data() {
    return {
      artName: "",
      subName: "",
      artAuthor: "",
      artTime: "",
      artContent: "",
      opinion: "",
      editor: null
    };
  },
  methods: {
    toLook() {
      API.findTodoArticle({
        type: '1',
        id: this.reportID,
        partyschoolId: "",
        title: "",
        content: "",
        startDate: "",
        endDate: "",
        pageNum: "",
        pageSize: ""
      }).then((res) => {
        var _data = res.result[0];
        this.artName = _data.title;
        this.subName = _data.subtitle;
        this.artAuthor = _data.author;
        this.artTime = this.formatDate(_data.releaseTime);
        this.artContent = _data.content.replace(/<\/?.+?>/g,"");
        this.artId = _data.id
      }).catch((err) => {
      });
    },
    demo(){
      this.$router.back(-1)
    },
    agree () {
      API.agreeTodo({
        data: [
          {
            resourcesId: this.artId,
            resourcesType: 3,
            status: 1,
            opinion: this.opinion,
          }
        ],
      }).then(res => {
        this.$router.push('/layOut/todo?currentPage=' + this.$route.query.currentPage)
      });
    },
    disagree () {
      API.agreeTodo({
        data: [
          {
            resourcesId: this.artId,
            resourcesType: 3,
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
  created() {
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
.newsBor {
  padding: 0 50px;
  li {
    // height: 32px;
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
      height: 32px;
      margin-top: 30px;
      .el-input {
        width: 100%;
      }
    }
    &:nth-child(2) {
      height: 32px;
      text-align: center;
      margin-top: 15px;
      .el-input {
        width: 100%;
      }
    }
    &:nth-child(3) {
      height: 32px;
      text-align: center;
      .el-input {
        width: 25%;
      }
    }
    &:nth-child(4) {
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
    &:nth-child(5) {
      height: 192px;
      margin-top: 30px;
      .opinion{
        .wh(100%,160px);
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
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
}
</style>
