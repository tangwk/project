 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        消息修改
      </p>
      <ul class="newsBor">
        <li>
          <label for="title">消息标题 :</label>
          <el-input v-model="input" id="title"></el-input>
        </li>
        <li>
          <label for="author">作<span style="display: inline-block;width: 28px;"></span>者 :</label>
          <el-input v-model="input" id="title"></el-input>
          <label class="label" for="time">发布时间 :</label>
          <el-date-picker
            v-model="value"
            id="time"
            type="date"
            align="right"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <label for="content">发布内容 :</label>
          <div class="editor"></div>
        </li>
        <li class="submit">
          <button>保 存</button>
          <button @click="goBack">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBread from '../../components/bread'
export default {
  name: 'MsgModify',
  data () {
    return {
      input: '',
      value: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
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
  padding: 0 20px;
  li{
    height: 32px;
    margin-top: 50px;
    label{
      display: inline-block;
      .wh(70px,32px);
      .ft(13px,32px);
      color: #333;
    }
    .label{
      margin-left: 10%;
    }
    &:first-child{
      margin-top: 30px;
      .el-input{
        width: calc(100% - 80px);
      }
    }
    &:nth-child(2){
      .el-input{
        width: calc(45% - 80px);
      }
    }
    &:nth-child(3){
      .wh(100%,370px);
      .editor{
        .wh(calc(100% - 85px),360px);
        margin-left: 75px;
        margin-top: -30px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
