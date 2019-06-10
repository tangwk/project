<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        文章栏目管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="dialogVisible = true">新建栏目</button>
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
              <input type="text" size="small" name="keyword" placeholder="按栏目名称搜索" v-model="sectionName">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="artSecData" highlight-current-row @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="sectionName" label="栏目名称" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="creatTime" label="创建时间" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column label="操作" width="240" align="center">
            <template slot-scope="scope">
                <i class="iconfont icon-yanjing-copy" title="查看" @click="handleLook(scope.$index, scope.row)"></i>
                <i class="iconfont icon-daoru-copy" title="导入" @click="handleIn(scope.$index, scope.row)"></i>
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
      <!-- 新建栏目弹窗 -->
      <el-dialog
        title="新建文章栏目"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <div class="mapInputBor">
          <label for="sectionName">栏目名称 :</label>
          <el-input class="mapInput" v-model="secName" id="sectionName" placeholder="请输入栏目名称" name="sectionName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('sectionName')} "></el-input>
          <p class="hint"> {{ errors.first('sectionName') }} </p>
        </div>
        <span slot="footer" class="dialog-footer submit">
          <button  @click="save">保 存</button>
          <button @click="dialogVisible = false">取 消</button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除弹窗 -->
    <div class="dataDel" v-show="alertClosed">
      <div class="sureDel">
        <div class="titleDel">
          <p>确认删除</p>
          <i class="iconfont icon-guanbi" @click="close"></i>
        </div>
        <h3>是否确认删除？</h3>
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
    name: "ArticleSection",
    data() {
      return {
        secName: "", // 新建
        dialogVisible: false,
        sectionName: "", // 关键词检索
        artSecData: [],
        deleteType: "", // 批量删除
        multipleSelection: [],
        currentPage: 1, // 当前页码
        total: null, //null
        alertClosed: false
      };
    },
    watch: {
      sectionName(val) {
        if (val === "") {
          this.search();
        }
      }
    },
    methods: {
      searchData() {
        this.artSecData = [];
        this.currentPage = 1;
        this.search();
      },
      search() {
        this.artSecData = [];
        API.getColumnList({
            id: "",
            columnName: this.sectionName,
            partyschoolId: "",
            columnType: "3", // 1 = 图书 , 2 = 视频 , 3 = 文章 （固定必传）
            sourceType: "1", // 1 = 出版社 , 2 = 党校
            pageNum: this.currentPage,
            pageSize: 10
          })
          .then(res => {
            var _data = res.result;
            if (res.code === 200) {
              _data.forEach(item => {
                item.sectionName = item.columnName;
                item.creatTime = this.formatDate(item.modifyDate);
                item.reportID = item.id;
              });
              this.artSecData = _data;
              for (var i = 0; i < this.artSecData.length; i++) {
                if (i == 9) {
                  this.artSecData[i].num = this.currentPage + "0"
                } else {
                  if (this.currentPage == 1) {
                    this.artSecData[i].num = this.currentPage + i + ""
                  } else {
                    this.artSecData[i].num = this.currentPage - 1 + "" + (i + 1)
                  }
                }
              }
            } else if (res.code === 900) {
              if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
                this.search()
              } else {
                this.artSecData = []
              }
            }
            if (res.number) {
              this.total = res.number;
            }
          })
          .catch(err => {});
      },
      save() {
        this.$validator.validateAll().then(res => {
          if (res) {
            API.addColumn({
                partyschoolId: "",
                columnName: this.secName,
                columnType: "3",
                sourceType: "1"
              })
              .then(res => {
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                this.dialogVisible = false;
                this.search();
                this.secName = ""
              })
              .catch(err => {});
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
          arr.push(obj);
        });
        API.deleteColumn({
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
        API.deleteColumn({
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
            this.search()
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
      handleLook(index, row) {
        // 查看
        this.$router.push("articleSectionLook?reportID=" + row.reportID+"&columnName="+row.columnName);
      },
      handleIn(index, row) {
        // 导入
        this.$router.push("articleSectionIn?reportID=" + row.reportID);
      },
      handleCurrentChange(val) {
        // 分页
        this.currentPage = val;
        this.search();
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
  .mapInputBor {
    width: 100%;
    height: 50px;
    label {
      display: inline-block;
      .wh(70px, 32px);
      .ft(13px, 32px);
    }
    .mapInput {
      width: calc(100% - 80px);
    }
  }
  .dialog-footer {
    display: block;
    width: 100%;
    text-align: center;
  }
  .hint {
    margin-left: 90px;
    font-size: 14px;
    line-height: 18px;
    color: #ff0000;
  }
</style>










