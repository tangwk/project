 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        映射详情
      </p>
      <ul class="newsBor">
        <li>
          <label for="title">映射名称 :</label>
          <el-input v-model="mapsName" id="title" placeholder="请输入映射名称" name="mapName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('mapName')} "></el-input>
          <p class="hint"> {{ errors.first('mapName') }} </p>
        </li>
        <li>
          <label for="source">来源地址 :</label>
          <el-input v-model="sourceAddress" id="source" placeholder="请输入真实地址" name="relUrl" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('relUrl')} "></el-input>
          <p class="hint"> {{ errors.first('relUrl') }} </p>
        </li>
        <li>
          <label for="map">映射地址 :</label>
          <el-input v-model="mapAddress" id="map" disabled="disabled" placeholder="请输入映射地址" naem="mapUrl"></el-input>
        </li>
        <li class="submit">
          <button @click="mapSave">保 存</button>
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import API from "../../API/map.js";
export default {
  name: "MapDetails",
  data() {
    return {
      mapsName: "",
      sourceAddress: "",
      mapAddress: ""
    };
  },
  methods: {
    toLook() {
      API.getMapList({
        id: this.reportID,
        partyschoolId: "",
        videoName: "",
        mappingUrl: "",
        pageNum: "",
        pageSize: ""
      }).then(res => {
        var _data = res.result[0]
        this.mapsName = _data.videoName
        this.sourceAddress = _data.realUrl
        this.mapAddress = _data.mappingUrl
      })
      .catch(err => {
      });
    },
    mapSave() {
      // 表单校验:
      this.$validator.validateAll().then(res => {
        if (res) {
          API.updateMap({
            id: this.reportID,
            videoName: this.mapsName,
            mappingUrl: this.mapAddress,
            realUrl: this.sourceAddress
          }).then(res => {

            // this.$router.push("/layout/map");
            this.$router.push('/layOut/map?currentPage=' + this.$route.query.currentPage)
          });
        }
      });
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push('/layOut/map?currentPage=' + this.$route.query.currentPage)
    }
  },
  created() {
    this.reportID = this.$route.query.reportID;
    this.toLook();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.newsBor {
  padding: 0 200px;
  li {
    height: 32px;
    margin-top: 50px;
    label {
      display: inline-block;
      .wh(70px,32px);
      .ft(13px,32px);
      color: #333;
    }
    .el-input {
      width: calc(100% - 80px);
    }
  }
}
</style>
