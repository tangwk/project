<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        出版社用户管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="addPubUser">新增用户</button>
            <!-- <button class="newAdd" @click="deleteAll">批量删除</button> -->
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                          <span style="display:inline-block;width: 0.2rem;"></span>关
                          <span style="display:inline-block;width: 0.26rem;"></span>键
                          <span style="display:inline-block;width: 0.26rem;"></span>字 :
                          <span style="display:inline-block;width: 0.18rem;"></span>
                       </label>
              <input type="text" size="small" name="keyword" placeholder="按账号搜索" v-model="content">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="publisherData" highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="userId" label="账号" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="username" label="姓名" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="createDate" label="创建时间" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                  {{scope.row.createDate|dateFormat}}
</template>
          </el-table-column>icon-yanjing-copy
          <el-table-column label="操作" width="200" align="center" >
<template slot-scope="scope">
  <i id="cell" class="iconfont icon-yanjing-copy" title="查看" @click="chakan(scope.$index, scope.row)"></i>
  <i id="cells"  v-if="scope.row.id !== 1 " class="iconfont icon-web-icon-" title="修改" @click="handleDetails(scope.$index, scope.row)"></i>
  <!-- 一般用户对admin账户无权重置密码，其他均可 -->
  <i id="cell1" class="iconfont icon-xinbanben" title="重置密码" v-if="!(scope.row.userId == 'admin' && scope.row.id == 1)" @click="chongZhi(scope.$index, scope.row)"></i>
  <!-- 对admin所有账户id=1 均不可删除;对自己的账户均不可修改，不可删除; 其他均可-->
  <i class="iconfont icon-shanchu-copy" title="删除" v-if="scope.row.id !== 1 " @click="handleDel(scope.$index, scope.row)"></i>
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

          <div class="PS">注意:用户的初始密码为123456</div>
      </div>
    </div>
    <!-- == -->
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
    <!-- == -->
    <div class="dataDel" v-show="alertClosed1">
      <div class="sureDel">
        <div class="titleDel">
          <p>重置密码</p>
          <i class="iconfont icon-guanbi" @click="close1"></i>
        </div>
        <h3>确定要重置密码吗?重置后密码恢复为初始密码!</h3>
        <p>
          <button :data-type="deleteType" ref="deleteRef" @click="sureDel0">确定</button>
          <button @click="close1">取消</button>
        </p>
      </div>
      <div class="opacityDel"></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as API from "@/API/system.js";
  import commonBread from '../../components/bread'
  Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(parseInt(originVal))
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1).toString().padStart(2, '0')
    const d = dt
      .getDate()
      .toString()
      .padStart(2, '0')
    return `${y}-${m}-${d}`
  })
  export default {
    name: 'Publisher',
    data() {
      return {
        userId: localStorage.getItem('userId'),
        rowID: "",
        content: '', // 关键词检索
        publisherData: [],
        deleteType: '', // 批量删除
        currentPage: 1, // 当前页码
        total: '', //null
        alertClosed: false,
        alertClosed1: false,
        multipleSelection: []
      }
    },
    watch: {
      content(nval) {
        if (nval === "") {
          this.search();
        }
      }
    },
    created() {
      this.userId = localStorage.getItem('userId')
    },
    methods: {
      searchData() {
        this.publisherData = [];
        this.currentPage = 1;
        this.search();
      },
      //渲染
      search() {
        API.xuanRang1({
          "id": "",
          "username": "",
          "partyschoolId": "",
          "userId": this.content,
          "pageNum": this.currentPage,
          "pageSize": "10",
          "userType": 1
        }).then(res => {
          if (res.code === 200) {
            this.publisherData = res.result
            console.log(this.publisherData)
            this.total = res.number
            for (var i = 0; i <  this.publisherData.length; i++) {
              if (i == 9) {
                this.publisherData[i].num = this.currentPage + "0"
              } else {
                if (this.currentPage == 1) {
                  this.publisherData[i].num = this.currentPage + i + ""
                } else {
                  this.publisherData[i].num = this.currentPage - 1 + "" + (i + 1)
                }
              }
            }
          }
        })
      },
      handleSelectionChange(val) { // 复选框
        this.multipleSelection = val
      },
      // 删除多个请求
      deleteAll() {
        var arr = []
        this.multipleSelection.map(item => {
          var obj = {}
          obj.id = item.id
          arr.push(obj)
        })
        API.postDelete1({
          data: arr
        }).then((res) => {
          // 刷新
          if (res.code === 200) {
            this.search()
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search();
            } else {
              this.publisherData = [];
            }
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
      },
      // 删除单个请求
      deleteSingle() {
        API.postDelete1({
          data: [{
            "id": this.currentDelId
          }]
        }).then((res) => {
          this.alertClosed = !this.alertClosed
          if (res.code === 200) {
            this.search()
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search();
            } else {
              this.publisherData = [];
            }
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
      },
      //重制密码的方法
      deleteSingle0() {
        API.resetPassWord({
          "id": this.rowID
        }).then((res) => {
          this.alertClosed1 = !this.alertClosed1
          if (res.code === 200) {
            this.$message({
              message: "密码已成功重置，请及时修改密码",
              type: "success"
            });
          }
          // this.$router.push('/')
          //   sessionStorage.removeItem("token");
          // this.$router.push("/login");
        })
      },
      chongZhi(index, row) {
        this.rowID = row.id
        this.alertClosed1 = !this.alertClosed1
      },
      handleDel(index, row) { //单个删除
        this.currentDelId = row.id // 取当前行id
        this.alertClosed = !this.alertClosed
      },
      sureDel() { // 确认删除
        this.deleteSingle()
      },
      sureDel0() { // 确认重制
        this.deleteSingle0()
      },
      close() {
        this.alertClosed = !this.alertClosed // 关闭确认删除弹窗
      },
      close1() {
        this.alertClosed1 = !this.alertClosed1 // 关闭确认删除弹窗
      },
      addPubUser() { // 新增
        this.$router.push('pubUserNew')
      },
      handleDetails(index, row) { // 详情
        this.$router.push('pubUserDetails?reportID=' + row.id)
      },
      chakan(index, row) {
        this.$router.push('chakan?reportID=' + row.id)
      },
      handleCurrentChange(val) { // 分页
        this.currentPage = val
        this.search()
      },
    },
    created() {
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
  .PS {
    color: red;
    margin-top: 100px;
    margin-left: 20px;
    font-size: 18px;
  }
  #cell {
    width: 5px;
    margin-left: 3px;
  }
  #cells {
    width: 2px;
  }
  #cell1 {
    width: 2px;
    color: #999999
  }
</style>

