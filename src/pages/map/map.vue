<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        映射管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="dialogVisible = true">映 射</button>
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
              <input type="text" size="small" name="keyword" placeholder="按视频名称搜索" v-model="mapName">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="mapData" highlight-current-row @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="mapName" label="视频名称" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="sourceAddress" label="来源地址" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column label="映射地址" align="center">
            <template slot-scope="scope">
                         <el-tooltip placement="bottom">
                            <div slot="content">点击复制</div>
                            <span style="display:block;cursor:pointer;width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" class="tag-read" :data-clipboard-text="mapData[scope.$index].mappingUrl" @click="copy">{{mapData[scope.$index].mappingUrl}}</span>
                         </el-tooltip>
</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
<template slot-scope="scope">
  <i class="iconfont icon-xiangqing" title="详情" @click="handleDetails(scope.$index, scope.row)"></i>
  <i class="iconfont icon-shanchu-copy" title="删除" @click="handleDel(scope.$index, scope.row)"></i>
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
      <!-- 映射弹窗 -->
      <el-dialog
        title="映射地址"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <ul class="mapInputBor">
          <li>
            <label for="mapName">视频名称 :</label>
            <el-input class="mapInput" v-model="mapsName" id="mapName" placeholder="请输入视频名称" name="mapName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('mapName')} "></el-input>
            <p class="hint"> {{ errors.first('mapName') }} </p>
          </li>
          <li>
            <label for="source">来源地址 :</label>
            <el-input class="mapInput" v-model="sourceAddress" id="source" placeholder="请输入真实地址" @blur="createMap" name="relUrl" v-validate="'required|url'" :class=" {'input':true, 'is-danger': errors.has('relUrl')} "></el-input>
            <p class="hint"> {{ errors.first('relUrl') }} </p>
          </li>
          <li>
            <label for="maps">映射地址 :</label>
            <el-input class="mapInput" v-model="mapAddress" id="maps" placeholder="请输入映射地址" readonly name="mapUrl" ></el-input>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer submit">
          <button  @click="mapSave">保 存</button>
          <button @click="mapBack">取 消</button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除框 -->
    <div class="dataDel" v-show="alertClosed">
      <div class="sureDel">
        <div class="titleDel">
          <p>确认删除</p>
          <i class="iconfont icon-guanbi" @click="close"></i>
        </div>
        <h3>确定要把所选映射进行删除吗？</h3>
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
  import API from "../../API/map.js";
  import Clipboard from 'clipboard'
  export default {
    name: "Map",
    data() {
      return {
        mapsName: "",
        sourceAddress: "",
        mapAddress: "",
        dialogVisible: false,
        mapName: "", // 关键词检索
        mapData: [],
        deleteType: "", // 批量删除
        multipleSelection: [],
        currentPage: 1, // 当前页码
        total: null, //null
        alertClosed: false
      };
    },
    watch: {
      mapName(val) {
        if (val === "") {
          this.search();
        }
      }
    },
    methods: {
      // //复制功能
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$message({
            message: "复制成功!",
            type: "success"
          });
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          clipboard.destroy()
        })
      },
      searchData() {
        this.mapData = [];
        this.currentPage = 1;
        this.search();
      },
      search() {
        this.mapData = [];
        API.getMapList({
          id: "",
          partyschoolId: "",
          videoName: this.mapName,
          mappingUrl: "",
          pageNum: this.currentPage,
          pageSize: 10
        }).then(res => {
          var _data = res.result;
          if (res.code === 200) {
            _data.forEach(item => {
              item.mapName = item.videoName;
              item.sourceAddress = item.realUrl;
              item.mapAddress = item.mappingUrl;
              item.reportID = item.id;
            });
            this.mapData = _data;
            for (var i = 0; i < this.mapData.length; i++) {
              if (i == 9) {
                this.mapData[i].num = this.currentPage + "0"
              } else {
                if (this.currentPage == 1) {
                  this.mapData[i].num = this.currentPage + i + ""
                } else {
                  this.mapData[i].num = this.currentPage - 1 + "" + (i + 1)
                }
              }
            }
          } else if (res.code === 900) {
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search()
            } else {
              this.mapData = []
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
          arr.push(obj);
        });
        API.deleteMap({
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
        API.deleteMap({
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
        // this.$router.push("mapDetails?reportID=" + row.reportID);
        this.$router.push({
          name: 'MapDetails',
          query: {
            reportID: row.reportID,
            currentPage: this.currentPage
          }
        });
      },
      createMap(val) {
        this.$validator.validate('relUrl').then(res => {
          if (res) {
            API.generateMapUrl({
              realUrl: this.sourceAddress
            }).then(res => {
              if (res.code === 200) {
                this.mapAddress = res.result;
              }
            });
          }
        });
      },
      mapSave() {
        // 表单校验:
        this.$validator.validateAll().then(res => {
          if (res) {
            API.addMap({
              partyschoolId: "",
              videoName: this.mapsName,
              mappingUrl: this.mapAddress,
              realUrl: this.sourceAddress
            }).then(res => {
              this.dialogVisible = false;
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.search();
              this.mapsName = ''
              this.mapAddress = ''
              this.sourceAddress = ''
            });
          }
        });
      },
      mapBack() {
        this.dialogVisible = false;
        this.mapsName = ''
        this.mapAddress = ''
        this.sourceAddress = ''
      },
      handleCurrentChange(val) {
        // 分页
        this.currentPage = val;
        this.search();
      },
      handleClose(done) {
        done();
      }
    },
    created() {
      if (this.$route.query.currentPage) {
        this.currentPage = Number(this.$route.query.currentPage);
      }
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
    li {
      height: 50px;
      margin-bottom: 30px;
      label {
        display: inline-block;
        .wh(70px, 32px);
        .ft(13px, 32px);
      }
      .mapInput {
        width: calc(100% - 80px);
      }
      &:last-child {
        margin-bottom: 0px;
      }
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
    color: #ff0000;
  }
</style>






