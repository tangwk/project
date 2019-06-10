<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频栏目查看
      </p>
      <div class="userListBor">
        <div style="text-align:center">
          <span v-show="!editorFlag" style="font-size:20px" for="" v-text="this.artSecTitle"></span>
          <el-input v-model="artSecTitle" ref="inputName" v-show="editorFlag" style="width:200px;" class="artSecTitle" @blur="editorBlur"></el-input>
          <i class="el-icon-edit-outline" style="font-size:20px;cursor:pointer" @click="editor"></i>
        </div>
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="checkDel" :disabled="multipleSelection.length == 0">批量删除</button>
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                    关<span style="margin: 0 0.5em;">键</span><span style="margin-right: 0.5em;">字 : </span>
                  </label>
              <input type="text" size="small" name="keyword" placeholder="按视频名称搜索" v-model="videoName">
            </li>
            <li>
              <button @click="search">搜 索</button>
            </li>
          </ul>
        </div>
        <div class="bgTop">
          <el-table ref="singleTable" :data="videoTopData" max-height=287 highlight-current-row>
            <el-table-column type="index" label="置顶区" width="80px" align="center">
            </el-table-column>
            <el-table-column property="videoName" label="视频名称" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column property="videoTime" label="上传时间" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column property="videoSource" label="映射地址" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="操作" width="240" align="center">
              <template slot-scope="scope">
                    <i class="iconfont icon-xiangqing" title="详情" style="color: #79ac88;" @click="handleDetails(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-shangyi" title="上移" style="color: #0089cc;" @click="handleUp(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-shangyi-copy" title="下移" style="color: #0089cc;" @click="handleDown(scope.$index, scope.row)"></i>
                    <i class="iconfont icon-quxiaozhiding" title="取消置顶" style="color: #e82121;" @click="handleUnstick(scope.$index, scope.row)" ></i>
</template>
            </el-table-column>
          </el-table>
        </div>

        <el-table
          ref="singleTable"
          :data="videoSData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="80px"
            align="center">
          </el-table-column>
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
          <el-table-column
            label="操作"
            width="240"
            align="center">
<template slot-scope="scope">
  <i class="iconfont icon-xiangqing" title="详情" @click="handleDetails(scope.$index, scope.row)"></i>
  <i class="iconfont icon-zhiding" title="置顶" @click="handleIstop(scope.$index, scope.row)"></i>
  <i class="iconfont icon-shanchu-copy" title="删除" @click="handleDel(scope.$index, scope.row)"></i>
</template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
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
        <h3>确定要把所选视频进行删除吗？</h3>
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
  import API from "../../API/column.js";
  export default {
    name: "VideoSectionLook",
    data() {
      return {
        artSecTitle: this.$route.query.columnName,
        numberTop: "",
        videoName: "", // 关键词检索
        videoTopData: [],
        videoSData: [],
        // tableData: [],
        deleteType: "", // 批量删除
        multipleSelection: [],
        currentPage: 1, // 当前页码
        total: null, //null
        alertClosed: false,
        editorFlag: false
      };
    },
    watch: {
      // videoSData() {
      //   this.total = this.videoSData.length;
      //   this.tableData = this.videoSData.slice(
      //     (this.currentPage - 1) * 10,
      //     this.currentPage * 10
      //   );
      // },
      videoName(val) {
        if (val === "") {
          this.search();
        }
      }
    },
    methods: {
      editor() {
        this.editorFlag = true;
        //等到页面渲染完成之后再执行聚焦
        this.$nextTick(() => {
          this.$refs.inputName.focus();
        });
      },
      editorBlur() {
        // if (this.editorFlag) {
        API.updateColumn({
          id: this.$route.query.reportID,
          columnName: this.artSecTitle,
          columnType: "2"
        }).then(res => {
          if (res.code == 200) {
            this.editorFlag = false;
            // this.$Message.success("修改成功!");
            this.$message({
              message: "修改成功!",
              type: "success"
            });
          }
        });
        // }
      },
      search() {
        // 非置顶区
        this.videoSData = [];
        API.getColumnVideo({
            type: "1",
            id: "",
            columnId: this.reportID,
            columnName: "",
            videoName: this.videoName,
            partyschoolId: "",
            videoContent: "",
            startDate: "",
            endDate: "",
            pageNum: this.currentPage,
            pageSize: 10
          })
          .then(res => {
            var _data = res.result;
            if (res.code === 200) {
              this.artSecTitle = _data[0].columnName; // 当前栏目
              var arr = [];
              _data.forEach(item => {
                var obj = {};
                obj.videoName = item.videoName;
                obj.videoTime = this.formatDate(item.uploadDate);
                obj.videoSource = item.mappingUrl;
                obj.reportID = item.id;
                obj.mark = item.mark;
                obj.videoOrder = item.videoOrder;
                if (item.mark === "0") {
                  this.videoSData.push(obj);
                }
              });
            } else if (res.code === 900) {
              if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
                this.search();
              } else {
                this.videoSData = [];
              }
            }
            if (res.number) {
              this.total = res.number;
            }
          })
          .catch(err => {});
        // 置顶区
        this.videoTopData = [];
        API.getColumnTopVideo({
          type: "1",
          id: "",
          columnId: this.reportID,
          columnName: "",
          videoName: this.videoName,
          partyschoolId: "",
          videoContent: "",
          startDate: "",
          endDate: ""
        }).then(res => {
          var _data = res.result;
          if (res.code === 200) {
            this.numberTop = res.number + 1;
            this.artSecTitle = _data[0].columnName; // 当前栏目
            var arr = [];
            _data.forEach(item => {
              var obj = {};
              obj.videoName = item.videoName;
              obj.videoTime = this.formatDate(item.uploadDate);
              obj.videoSource = item.mappingUrl;
              obj.reportID = item.id;
              obj.mark = item.mark;
              obj.videoOrder = item.videoOrder;
              if (item.mark === "1") {
                this.videoTopData.push(obj);
              }
            });
          } else if (res.code === 900) {
            this.numberTop = 1;
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
          obj.videoId = item.reportID;
          arr.push(obj);
        });
        API.deleteColumnVideo({
          columnId: this.reportID,
          data: arr,
          status: 0
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
        API.deleteColumnVideo({
          columnId: this.reportID,
          data: [{
            videoId: this.currentDelId
          }],
          status: 0
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
      handleDetails(index, row) {
        // 详情
        this.$router.push("vslDetails?reportID=" + row.reportID);
      },
      handleIstop(index, row) {
        // 置顶
        API.updateVideoMark({
          id: row.reportID,
          mark: "1",
          videoOrder: this.numberTop
        }).then(res => {
          if (row.mark === "0") {
            this.search();
          }
        });
      },
      handleUnstick(index, row) {
        // 取消置顶
        API.updateVideoMark({
          id: row.reportID,
          mark: "0",
          videoOrder: "999"
        }).then(res => {
          if (row.mark === "1") {
            this.videoTopData.splice(index, 1);
            for (var i = 1; i <= this.videoTopData.length; i++) {
              this.videoTopData[i - 1].sort = i;
              API.updateVideoMark({
                id: this.videoTopData[i - 1].reportID,
                mark: "1",
                videoOrder: i
              }).then(res => {});
            }
            this.search();
          }
        });
      },
      handleUp(index, row) {
        // 上移
        var arr = [];
        this.videoTopData.forEach((item, indx) => {
          if (indx === index) {
            arr.push({
              id: item.reportID,
              videoOrder: index
            });
          } else if (indx === index - 1) {
            arr.push({
              id: item.reportID,
              videoOrder: index + 1
            });
          } else {
            arr.push({
              id: item.reportID,
              videoOrder: indx + 1
            });
          }
        });
        if (index != 0) {
          API.updateVideoOrder({
            data: arr
          }).then(res => {
            this.videoTopData.splice(index - 1, 0, row);
            this.videoTopData.splice(index + 1, 1);
          });
        } else {
          this.$message({
            message: "到顶啦！",
            type: "warning"
          });
        }
      },
      handleDown(index, row) {
        // 下移
        var arr = [];
        this.videoTopData.forEach((item, indx) => {
          if (indx === index) {
            arr.push({
              id: item.reportID,
              videoOrder: index + 2
            });
          } else if (indx === index + 1) {
            arr.push({
              id: item.reportID,
              videoOrder: index + 1
            });
          } else {
            arr.push({
              id: item.reportID,
              videoOrder: indx + 1
            });
          }
        });
        if (index !== this.videoTopData.length - 1) {
          API.updateVideoOrder({
            data: arr
          }).then(res => {
            this.videoTopData.splice(index + 2, 0, row);
            this.videoTopData.splice(index, 1);
          });
        } else {
          this.$message({
            message: "已到底！",
            type: "warning"
          });
        }
      },
      handleCurrentChange(val) {
        // 分页
        this.currentPage = val;
        this.search();
        // this.tableData = this.videoSData.slice((val - 1) * 10, val * 10);
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
  .artSecTitle {
    .wh(100%, 32px);
    .ft(16px, 32px);
    margin-top: 15px;
    text-align: center;
  }
</style>

