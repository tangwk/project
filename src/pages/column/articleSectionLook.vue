<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章栏目查看
      </p>
      <div class="userListBor">
        <!-- <h3 class="artSecTitle" v-text="artSecTitle"></h3> -->
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
              <input type="text" size="small" name="keyword" placeholder="按文章标题搜索" v-model="artName">
            </li>
            <li>
              <button @click="search">搜 索</button>
            </li>
          </ul>
        </div>
        <div class="bgTop">
          <el-table ref="singleTable" :data="articleTopData" max-height=287 highlight-current-row>
            <el-table-column type="index" label="置顶区" width="80px" align="center">
            </el-table-column>
            <el-table-column property="artName" label="文章标题" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column property="artAuthor" label="作者" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column property="artRelTime" label="发布时间" show-overflow-tooltip align="center">
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
          style="background: #ccc;"
          :data="articleData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="80px"
            align="center">
          </el-table-column>
          <el-table-column
            property="artName"
            label="文章标题"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="artAuthor"
            label="作者"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            property="artRelTime"
            label="发布时间"
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
            :total="total"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            >
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
        <h3>确定要把所选文章进行删除吗？</h3>
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
    name: "ArticleSectionLook",
    data() {
      return {
        // artSecTitle: "",
        numberTop: "",
        artName: "", // 关键词检索
        articleTopData: [],
        articleData: [],
        // tableData: [],
        deleteType: "", // 批量删除
        multipleSelection: [],
        currentPage: 1, // 当前页码
        total: null, //null
        alertClosed: false,
       artSecTitle: this.$route.query.columnName,
        editorFlag: false
      };
    },
    watch: {
      // articleData() {
      //   this.total = this.articleData.length;
      //   this.tableData = this.articleData.slice(
      //     (this.currentPage - 1) * 10,
      //     this.currentPage * 10
      //   );
      // },
      artName(val) {
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
          columnType: "3"
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
        this.articleData = [];
        API.getColumnArticle({
            type: "1",
            id: "",
            title: this.artName,
            columnId: this.reportID,
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
                obj.artName = item.title;
                obj.artAuthor = item.author;
                obj.artRelTime = this.formatDate(item.releaseTime);
                obj.reportID = item.id;
                obj.mark = item.mark;
                obj.articleOrder = item.articleOrder;
                if (item.mark === "0") {
                  this.articleData.push(obj); // watch
                }
              });
            } else if (res.code === 900) {
              if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
                this.search();
              } else {
                this.articleData = [];
              }
            }
            if (res.number) {
              this.total = res.number;
            }
          })
          .catch(err => {});
        // 置顶区
        this.articleTopData = [];
        API.getColumnTopArticle({
          type: "1",
          title: this.artName,
          columnId: this.reportID
        }).then(res => {
          var _data = res.result;
          if (res.code === 200) {
            this.numberTop = res.number + 1;
            this.artSecTitle = _data[0].columnName; // 当前栏目
            var arr = [];
            _data.forEach(item => {
              var obj = {};
              obj.artName = item.title;
              obj.artAuthor = item.author;
              obj.artRelTime = this.formatDate(item.releaseTime);
              obj.reportID = item.id;
              obj.mark = item.mark;
              obj.articleOrder = item.articleOrder;
              if (item.mark === "1") {
                this.articleTopData.push(obj);
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
          obj.id = item.reportID;
          arr.push(obj);
        });
        API.deleteColumnArticle({
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
        API.deleteColumnArticle({
          columnId: this.reportID,
          data: [{
            id: this.currentDelId
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
        this.$router.push("aslDetails?reportID=" + row.reportID);
        // this.$router.push({ name:'AslDetails',query: { reportID: row.reportID, currentPage: this.currentPage, id: this.reportID }});
      },
      handleIstop(index, row) {
        // 置顶
        API.updateArticleMark({
          id: row.reportID,
          mark: "1",
          articleOrder: this.numberTop
        }).then(res => {
          this.search();
        });
      },
      handleUnstick(index, row) {
        // 取消置顶
        API.updateArticleMark({
          id: row.reportID,
          mark: "0",
          articleOrder: this.numberTop
        }).then(res => {
          this.articleTopData.splice(index, 1);
          for (var i = 1; i <= this.articleTopData.length; i++) {
            this.articleTopData[i - 1].sort = i;
            API.updateArticleMark({
              id: this.articleTopData[i - 1].reportID,
              mark: "1",
              articleOrder: i
            }).then(res => {});
          }
          this.search();
        });
      },
      handleUp(index, row) {
        // 上移
        var arr = [];
        this.articleTopData.forEach((item, indx) => {
          if (indx === index) {
            arr.push({
              id: item.reportID,
              articleOrder: index
            });
          } else if (indx === index - 1) {
            arr.push({
              id: item.reportID,
              articleOrder: index + 1
            });
          } else {
            arr.push({
              id: item.reportID,
              articleOrder: indx + 1
            });
          }
        });
        if (index != 0) {
          API.updateArticleOrder({
            data: arr
          }).then(res => {
            this.articleTopData.splice(index - 1, 0, row);
            this.articleTopData.splice(index + 1, 1);
          });
        } else {
          this.$message({
            message: "已到顶！",
            type: "warning"
          });
        }
      },
      handleDown(index, row) {
        // 下移
        var arr = [];
        this.articleTopData.forEach((item, indx) => {
          if (indx === index) {
            arr.push({
              id: item.reportID,
              articleOrder: index + 2
            });
          } else if (indx === index + 1) {
            arr.push({
              id: item.reportID,
              articleOrder: index + 1
            });
          } else {
            arr.push({
              id: item.reportID,
              articleOrder: indx + 1
            });
          }
        });
        if (index !== this.articleTopData.length - 1) {
          API.updateArticleOrder({
            data: arr
          }).then(res => {
            this.articleTopData.splice(index + 2, 0, row);
            this.articleTopData.splice(index, 1);
          });
        } else {
          this.$message({
            message: "已到底！",
            type: "warning"
          });
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search();
        // this.tableData = this.articleData.slice((val - 1) * 10, val * 10);
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
      // if (this.$route.query.currentPage) {
      //   this.currentPage = Number(this.$route.query.currentPage);
      // }
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

