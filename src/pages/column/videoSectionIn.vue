 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频导入
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="artSecIn">导 入</button>
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                <span style="display:inline-block;width: 0.2rem;"></span>关
                <span style="display:inline-block;width: 0.26rem;"></span>键
                <span style="display:inline-block;width: 0.26rem;"></span>字 :
                <span style="display:inline-block;width: 0.18rem;"></span>
              </label>
              <input type="text" size="small" name="keyword" placeholder="按视频名称搜索" v-model="videoName">
            </li>
            <li>
              <button @click="search">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table
          ref="singleTable"
          :data="videoSData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            property="videoName"
            label="视频名称"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="videoTime"
            label="上传时间"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="videoSource"
            label="映射地址"
            show-overflow-tooltip
            align="center">
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block" v-if="total>1">
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
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import API from "../../API/column.js";
export default {
  name: "ArticleSectionIn",
  data() {
    return {
      videoName: "", // 关键词检索
      videoSData: [],
      currentPage: 1, // 当前页码
      total: null //null
    };
  },
  watch: {
    videoName(val) {
      if (val === "") {
        this.search();
      }
    }
  },
  methods: {
    search() {
      this.videoSData = [];
      API.getInColumnVideo({
        status: "1",
        type: "1",
        partyschoolId: "",
        columnType: "2",
        sourceType: "1",
        columnId: this.reportID,
        videoName: this.videoName,
        pageNum: this.currentPage,
        pageSize: 10
      }).then(res => {
        var _data = res.result;
        if (res.code === 200) {
          _data.forEach(item => {
            item.videoName = item.videoName;
            item.videoTime = this.formatDate(item.uploadDate);
            item.videoSource = item.mappingUrl;
            item.reportID = item.id;
            item.status = item.status;
          });
          this.videoSData = _data;
        } else if(res.code === 900) {
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.search()
          }else{
            this.videoSData = []
          }
        }
        if (res.number) {
          this.total = res.number;
        }
      });
    },
    handleSelectionChange(val) {
      // 复选框
      this.multipleSelection = val;
    },
    artSecIn() {
      var inArray = [];
      this.multipleSelection.map(item => {
        var obj = {};
        obj.videoId = item.id;
        inArray.push(obj);
      });
      API.InColumnVideo({
        columnId: this.reportID,
        data: inArray
      })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              message: "导入成功！",
              type: "success"
            });
            this.search();
          }
        })
        .catch(err => {});
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val;
      this.search();
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
    this.search();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
</style>

