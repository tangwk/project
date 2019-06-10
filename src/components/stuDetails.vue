 <template>
  <div class="user">
    <p class="titleBar">
      学员详情
    </p>
    <ul class="newsBor">
      <li>
        <label for="title">学员名称 :</label>
        <!-- <el-input readonly v-model="data.student" id="title"></el-input> -->
        <span>{{data.student}}</span>
      </li>
      <li>
        <label for="title">性<i style="padding-left: 26px;"></i>别 :</label>
        <!-- <el-input readonly v-model="data.sex" id="title"></el-input> -->
        <span>{{data.sex}}</span>
      </li>
      <!-- <li>
        <label for="title">学<i style="padding-left: 26px;"></i>号 :</label>
        <el-input readonly v-model="data.code" id="title"></el-input>
      </li> -->
      <li>
        <label for="title">单<i style="padding-left: 26px;"></i>位 :</label>
        <!-- <el-input readonly v-model="data.unit" id="title"></el-input> -->
        <span>{{data.unit}}</span>
      </li>
      <li>
        <label for="title">职<i style="padding-left: 26px;"></i>务 :</label>
        <!-- <el-input readonly v-model="data.job" id="title"></el-input> -->
        <span>{{data.job}}</span>
      </li>
      <li>
        <label for="title">联系方式 :</label>
        <!-- <el-input readonly v-model="data.phone" id="title"></el-input> -->
        <span>{{data.phone}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'stuDetails',
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
  width: 500px;
  margin-left: calc(50% - 250px);
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
  }
}
</style>




