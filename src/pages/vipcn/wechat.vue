 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        公众号管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                <span style="display:inline-block;width: 0.2rem;"></span>关
                <span style="display:inline-block;width: 0.26rem;"></span>键
                <span style="display:inline-block;width: 0.26rem;"></span>字 :
                <span style="display:inline-block;width: 0.18rem;"></span>
              </label>
              <input type="text" size="small" name="keyword" placeholder="按公众号名称搜索" v-model="weName">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table
          ref="singleTable"
          :data="publisherData"
          highlight-current-row
          >
          <el-table-column  label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column
            property="weName"
            label="公众号名称"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="weStartTime"
            label="创建时间"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="appSecret"
            label="AppSecret"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="appId"
            label="AppId"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
            align="center">
            <template slot-scope="scope">
              <i class="iconfont icon-xiangqing button" title="自定义菜单" @click="handleMenu(scope.$index, scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block" v-if="total>0">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="dataDel" v-show="alertClosed">
      <div class="sureDel">
        <div class="titleDel">
          <p>确认删除</p>
          <i class="iconfont icon-guanbi" @click="close"></i>
        </div>
        <h3>确定要把所选公众号进行删除吗？</h3>
        <p>
          <button :data-type="deleteType" ref="deleteRef" @click="sureDel">确定</button>
          <button @click="close">取消</button>
        </p>
      </div>
      <div class="opacityDel"></div>
    </div>
  </div>
</template>

<script>
import commonBread from '../../components/bread'
import API from "../../API/wechat.js";
export default {
  name: 'Wechat',
  data () {
    return {
      weName: '', // 关键词检索
      publisherData: [],
      deleteType: "", // 删除类型
      currentPage: 1, // 当前页码
      total: null, //null
      alertClosed: false,
    }
  },
  watch: {
    weName(val) {
      if (val === "") {
        this.search();
      }
    }
  },
  methods: {
    searchData(){
      this.publisherData = [];
      this.currentPage = 1;
      this.search();
    },
    search () {
      API.getWeChatList({
        id: "",
        partyschoolId: "",
        wfaName: this.weName,
        pageNum: this.currentPage,
        pageSize: 10
      }).then(res => {
        // console.log(res)
        var _data = res.result
        this.publisherData = []
        if (res.code === 200) {
          _data.forEach((item) => {
            item.weName = item.wfaName
            item.weStartTime = this.formatDate(item.createDate)
            item.reportID = item.partyschoolId
            item.appSecret = item.wfaAppSecret
            item.appId = item.wfaAppid
            item.status = item.status
          })
          this.publisherData = _data
        } else if(res.code === 900) {
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.search()
          }else{
            this.publisherData = []
          }
        }
        if(res.number) {
          this.total = res.number
        }
      });
    },
    // 删除单个请求
    deleteSingle () {
      API.deleteMenu({
        data: [
          {
            APPID: 'wx139f89139d0670e9',
            APPSECRET: 'f51af4f64f433bf606e3ec493074a65d'
          }
        ],
        status: 0
      }).then((res) => {
        this.alertClosed = !this.alertClosed
        if (res.code === '200') {
          this.items.forEach((item, index) => {
            if (item.reportID === this.currentDelId) {
              this.items.splice(index, 1)
              this.total--
            }
          })
        }
      })
    },
    handleDel (index, row) { //单个删除
      this.currentDelId = row.reportID// 取当前行id
      this.alertClosed = !this.alertClosed
      this.deleteType = 'deleteSingle'
    },
    sureDel () { // 确认删除
      var _type = this.$refs.deleteRef.getAttribute('data-type')
      this.deleteSingle()
    },
    close () {
      this.alertClosed = !this.alertClosed// 关闭确认删除弹窗
    },
    handleMenu (index, row) { // 自定义菜单
      // this.$router.push('weMenu?reportID=' + row.reportID)
      this.$router.push({ name:'WeMenu',query: { reportID: row.reportID,partyschoolId: row.partyschoolId,currentPage: this.currentPage }});
    },
    handleCurrentChange (val) { // 分页
      this.currentPage = val
      this.search()
    },
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + MM + '-' + d + ' '
    }
  },
  created() {
    if (this.$route.query.currentPage) {
      this.currentPage = Number(this.$route.query.currentPage);
    }
    this.search()
  },
  components: {
    commonBread
  }
}
</script>

<style lang="less" scoped>
@import '../../style/mix';
@import '../../style/magTable';
.button{
  color: #999999 !important;
  &:hover{
    color: @tc !important;
  }
}
</style>

