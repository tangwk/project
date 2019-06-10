 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="upload">上传视频</button>
            <!-- <button class="newAdd" @click="checkDel" :disabled="multipleSelection.length == 0">批量删除</button> -->
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
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table
          ref="singleTable"
          :data="videoData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          >
          <!-- <el-table-column type="selection"></el-table-column> -->
             <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column
            property="videoName"
            label="视频名称"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="videoType"
            label="分类"
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
            property="status"
            label="状态"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
            align="center">
            <template slot-scope="scope">
              <i class="iconfont icon-yanjing-copy" title="查看" @click="handleLook(scope.$index, scope.row)"></i>
              <i class="iconfont icon-web-icon-" title="修改" @click="handleModify(scope.$index, scope.row)"></i>
              <i class="iconfont icon-shanchu-copy" title="删除" @click="handleDel(scope.$index, scope.row)" ></i>
            </template>
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
    <div class="dataDel" v-show="alertClosed">
      <div class="sureDel">
        <div class="titleDel">
          <p>确认删除</p>
          <i class="iconfont icon-guanbi" @click="close"></i>
        </div>
        <h3>是否确认删除?</h3>
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
import commonBread from "../../components/bread";
import API from "../../API/resource.js";
export default {
  name: "Video",
  data() {
    return {
      videoName: "", // 关键词检索
      videoData: [],
      deleteType: "", // 批量删除
      multipleSelection: [],
      currentPage: 1, // 当前页码
      total: null, //null
      alertClosed: false,
      options: []
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
    searchData(){
      this.videoData = [];
      this.currentPage = 1;
      this.search();
    },
    search() {
      this.videoData = [];
      API.getVideoList({
        type: "1",
        id: "",
        partyschoolId: "",
        videoName: this.videoName,
        videoContent: "",
        startDate: "",
        endDate: "",
        pageNum: this.currentPage,
        pageSize: 10
      }).then(res => {
        var _data = res.result;
        if (res.code === 200) {
          _data.forEach(item => {
            item.videoName = item.videoName,
            item.videoTime = this.formatDate(item.uploadDate),
            this.options.forEach(foo => {
              if(foo.value == item.videoType) {
                item.videoType = foo.label
              }
            })
            item.status = item.status,
            item.reportID = item.id
            if (item.status === "1") {
              item.status = "已审批";
            }
            if (item.status === "2") {
              item.status = "待审批";
            }
            if (item.status === "3") {
              item.status = "未通过";
            }
          });
          this.videoData = _data;
            for (var i = 0; i < this.videoData.length; i++) {
              if (i == 9) {
                this.videoData[i].num = this.currentPage + "0"
              } else {
                if (this.currentPage == 1) {
                  this.videoData[i].num = this.currentPage + i + ""
                } else {
                  this.videoData[i].num = this.currentPage - 1 + "" + (i + 1)
                }
              }
            }
          // console.log(this.videoData);
        } else if (res.code === 900) {
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.search();
          } else {
            this.videoData = [];
          }
        }
        if (res.number) {
          this.total = res.number;
        }
      });
    },
    getTypeList() {
      API.typeList({
        codeName: '',
        codeType: "videoType",
        id: '',
        code: ""
      }).then(res => {
        var _datas = res.result
        this.options = []
        if (_datas) {
          _datas.forEach((item) => {
            item.label = item.codeName
            item.value = item.code
          })
          this.options = _datas
        }
      });
    },
    handleSelectionChange(val) {
      // 复选框
      this.multipleSelection = val;
    },
    // 删除多个请求
    deleteAll() {
      var arr = [];
      this.multipleSelection.map(item => {
        var obj = {};
        obj.id = item.id;
        obj.status = item.status;
        arr.push(obj);
      });

      API.deleteVideo({
        data: arr
        // status: 0
      }).then(res => {
        // 刷新
        if (res.code === 200) {
          this.alertClosed = !this.alertClosed;
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.search();
        }
      });
    },
    // 删除单个请求
    deleteSingle() {
      API.deleteVideo({
        data: [
          {
            id: this.currentDelId,
            status: this.status
          }
        ]
      }).then(res => {
        if (res.code === 200) {
          this.alertClosed = !this.alertClosed;
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.search();
        }
      });
    },
    checkDel() {
      this.alertClosed = !this.alertClosed; // 批量删除
      this.deleteType = "deleteAll";
    },
    handleDel(index, row) {
      //单个删除
      this.currentDelId = row.reportID; // 取当前行id
      this.status = row.status;
      this.alertClosed = !this.alertClosed;
      this.deleteType = "deleteSingle";
    },
    sureDel() {
      // 确认删除
      var _type = this.$refs.deleteRef.getAttribute("data-type");
      if (_type === "deleteAll") {
        this.deleteAll();
      } else {
        this.deleteSingle();
      }
    },
    close() {
      this.alertClosed = !this.alertClosed; // 关闭确认删除弹窗
    },
    upload() {
      this.$router.push("uploadVideo");
    },
    handleLook(index, row) {
      // 查看
      // this.$router.push("videoLook?reportID=" + row.reportID);
      this.$router.push({ name:'VideoLook',query: { reportID: row.reportID,currentPage: this.currentPage }});
    },
    handleModify(index, row) {
      // 修改
      // this.$router.push("videoModify?reportID=" + row.reportID);
      this.$router.push({ name:'VideoModify',query: { reportID: row.reportID,currentPage: this.currentPage }});
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
    if (this.$route.query.currentPage) {
      this.currentPage = Number(this.$route.query.currentPage);
    }
    this.getTypeList();
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






