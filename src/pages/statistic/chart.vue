 <template>
  <div class="chartBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        统计分析
      </p>
      <!-- <div class="userListBor"> -->
        <iframe width="100%" scrolling="yes" style="height:700px" :src="bookSrc" frameborder="0"></iframe>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import axios from "axios";
export default {
  name: "Chart",
  data() {
    return {
      bookSrc: ""
    };
  },
  methods: {
    baobiao() {
      var vm = this;
      axios
        .post("http://123.59.106.152:8085/xsbReport/auth/getAuthMenuList", {
          systemCode: "dxpxpt",
          token: "d96561810f7d42d0b55319a62ae66ca7",
          authExtDTO: {
            schoolId: 16
          }
        })
        .then(function(response) {
          vm.bookSrc = response.data.resultBody[0].reportUrl;
          console.log(vm.bookSrc);
        })
        .catch(function(error) {});
    }
  },
  created() {
    this.baobiao();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable.less";
</style>







