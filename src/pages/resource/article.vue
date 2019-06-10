<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="pubArt">发布文章</button>
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
              <input type="text" size="small" name="keyword" placeholder="按文章标题搜索" v-model="artName">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="articleData" highlight-current-row @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="artName" label="文章标题" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="artAuthor" label="作者" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="artRelTime" label="发布时间" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="status" label="状态" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column label="操作" width="240" align="center">
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
    name: "Article",
    data() {
      return {
        artName: "", // 关键词检索
        articleData: [],
        deleteType: "", // 删除类型
        multipleSelection: [],
        currentPage: 1, // 当前页码
        total: null,
        alertClosed: false
      };
    },
    watch: {
      artName(val) {
        if (val === "") {
          this.search();
        }
      }
    },
    methods: {
      searchData() {
        this.articleData = [];
        this.currentPage = 1;
        this.search();
      },
      search() {
        this.articleData = [];
        API.getArticleList({
          type: "1",
          id: "",
          partyschoolId: "",
          title: this.artName,
          content: "",
          startDate: "",
          endDate: "",
          pageNum: this.currentPage,
          pageSize: 10
        }).then(res => {
          var _data = res.result;
          if (res.code === 200) {
            _data.forEach(item => {
              item.artName = item.title;
              item.artAuthor = item.author;
              item.artRelTime = this.formatDate(item.releaseTime);
              item.reportID = item.id;
              item.status = item.status;
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
            this.articleData = _data;
            //================================
            for (var i = 0; i < this.articleData.length; i++) {
              if (i == 9) {
                this.articleData[i].num = this.currentPage + "0"
              } else {
                if (this.currentPage == 1) {
                  this.articleData[i].num = this.currentPage + i + ""
                } else {
                  this.articleData[i].num = this.currentPage - 1 + "" + (i + 1)
                }
              }
            }
          } else if (res.code === 900) {
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search()
            } else {
              this.articleData = []
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
      // 删除多个请求
      deleteAll() {
        var arr = [];
        this.multipleSelection.map(item => {
          var obj = {};
          obj.id = item.id;
          obj.status = item.status;
          arr.push(obj);
        });
        API.deleteArticle({
          data: arr,
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
        API.deleteArticle({
          data: [{
            id: this.currentDelId,
            status: this.status
          }]
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
      pubArt() {
        // 发布
        this.$router.push("publishArticle");
      },
      handleLook(index, row) {
        // 查看
        // this.$router.push("articleLook?reportID=" + row.reportID);
        this.$router.push({
          name: 'ArticleLook',
          query: {
            reportID: row.reportID,
            currentPage: this.currentPage
          }
        });
      },
      handleModify(index, row) {
        // 修改
        // this.$router.push("articleModify?reportID=" + row.reportID);
        this.$router.push({
          name: 'ArticleModify',
          query: {
            reportID: row.reportID,
            currentPage: this.currentPage
          }
        });
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
    components: {
      commonBread
    },
    created() {
      if (this.$route.query.currentPage) {
        this.currentPage = Number(this.$route.query.currentPage);
      }
      this.search();
    },
    filters: {}
  };
</script>

<style lang="less" scoped>
  @import "../../style/mix";
  @import "../../style/magTable";
</style>

