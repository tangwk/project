 <template>
  <div class="user">
    <p class="titleBar">
      课程详情
    </p>
    <ul class="newsBor">
      <li>
        <label for="title">课程名称 :</label>
        <!-- <el-input readonly v-model="data.name" id="title"></el-input> -->
        <span>{{data.name}}</span>
      </li>
      <li>
        <label for="title">课<i style="padding-left: 16px;"></i>时:</label>
        <!-- <el-input readonly v-model="data.hours" id="title"></el-input> -->
        <span>{{data.hours}}</span>
      </li>
      <li>
        <label for="content">活动内容 :</label>
        <textarea style="border:none"  readonly name="describe" class="editor" v-model="data.describe"></textarea>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'courDetails',
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
    margin-top: 40px;
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
    &:nth-child(3){
      .wh(100%,255px);
      .editor{
        .wh(calc(100% - 100px),255px);
        overflow-y: scroll;
        margin-left: 84px;
        margin-top: -30px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
      }
    }
  }
}
</style>




