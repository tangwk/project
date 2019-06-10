 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        消息发布
      </p>
      <ul class="newsBor">
        <li>
          <label for="title"><i class="iconfont icon-xinghao"></i>消息标题 :</label>
          <el-input v-model="magTitle" id="title" name="msgName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('msgName')} "></el-input>
          <p class="hint"> {{ errors.first('msgName') }} </p>
        </li>
        <li class="clear">
          <div class="left">
            <label for="author"><i class="iconfont icon-xinghao"></i>作<span style="display: inline-block;width: 28px;"></span>者 :</label>
            <el-input v-model="msgAuthor" id="title" name="authorName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('authorName')} "></el-input>
            <p class="hint"> {{ errors.first('authorName') }} </p>
          </div>
          <div class="right">
            <label for="time"><i class="iconfont icon-xinghao"></i>发布时间 :</label>
            <el-date-picker
              v-model="msgTime"
              name="artTime" 
              v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('artTime')} "
              id="time"
              type="date"
              align="right"
              placeholder="选择日期">
            </el-date-picker>
            <p class="hint"> {{ errors.first('artTime') }} </p>
          </div>
        </li>
        <li>
          <label for="content"><i class="iconfont icon-xinghao"></i>发布内容 :</label>
          <div class="editor">
            <input type="hidden" v-model="msgContent" name="artContent" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('artContent')} ">
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
import commonBread from "../../components/bread";
import UE from "../../components/Ueditor";
import API from "../../API/message.js";
export default {
  name: "PublishNews",
  data() {
    return {
      magTitle: "",
      msgAuthor: "",
      msgTime: "",
      msgContent: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      editor: null
    };
  },
  methods: {
    handleReady(ue) {
      this.editor = ue;
    },
    submit() {
      // 表单校验:
      var htmlString = this.editor.getContent();
      this.msgContent = htmlString;

      var vm = this;
      this.$validator.validateAll().then(res => {
        if (res) {
          API.addMessage({
            title: this.magTitle,
            releaseDate: this.msgTime,
            releaseId: "",
            releaseName: vm.msgAuthor,
            level: "",
            content: vm.msgContent
          }).then((res) => {
            this.$router.push("/layOut/message");
          });
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {
    commonBread,
    UE
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.newsBor {
  padding: 0 20px;
  li {
    height: 32px;
    margin-top: 40px;
    label {
      display: inline-block;
      .wh(90px,32px);
      .ft(13px,32px);
      color: #333;
      i {
        font-size: 24px;
        color: #ff0000;
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
      margin-top: 35px;
      div {
        .el-input {
          width: calc(100% - 100px);
        }
      }
    }
    &:nth-child(3) {
      .wh(100%,370px);
      .editor {
        .wh(calc(100% - 100px),360px);
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
.hint{
  margin-left: 100px;
  font-size: 14px;
  line-height: 18px;
  color: #ff0000;
}
</style>




