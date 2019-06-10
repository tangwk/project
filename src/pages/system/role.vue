<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        角色管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="addRole">角色新增</button>
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
              <input type="text" size="small" name="keyword" placeholder="按角色名称搜索" v-model="content">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="roleData" highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="roleName" label="角色名称" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="createDate" label="创建时间" show-overflow-tooltip align="center" v-model="startDate" prop="add_time">
            <template slot-scope="scope">
                   {{scope.row.createDate|dateFormat}}
</template>
          </el-table-column>
          <el-table-column property="remark" label="备注" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
<template slot-scope="scope">
  <i class="iconfont icon-yanjing-copy" title="查看" @click="details(scope.$index, scope.row)"></i>
  <i  v-if="scope.row.id !== 1" id="cell" class="iconfont icon-web-icon-" title="修改" @click="handleDetails(scope.$index, scope.row)"></i>
  <i  v-if="scope.row.id !== 1" class="iconfont icon-shanchu-copy" title="删除" @click="handleDel(scope.$index, scope.row)"></i>
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
        <h3>是否确认删除？</h3>
        <p>
          <button :data-type="deleteType" ref="deleteRef" @click="deleteSingle">确定</button>
          <button @click="close">取消</button>
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
    name: 'Role',
    data() {
      return {
        content: '', // 关键词检索
        roleData: [],
        deleteType: '', // 批量删除
        currentPage: 1, // 当前页码
        total: "", //null
        alertClosed: false,
        currentDelId: '',
        startDate: ""
      }
    },
    watch: {
      content(nval) {
        if (nval === "") {
          this.search();
        }
      }
    },
    methods: {
      searchData() {
        this.roleData = [];
        this.currentPage = 1;
        this.search();
      },
      search() {
        API.deal({
          "id": "",
          "partyschoolId": "",
          "roleName": this.content,
          "remark": "",
          "pageNum": this.currentPage,
          "pageSize": "10",
          "type": 1
        }).then(res => {
          if (res.code === 200) {
            this.total = res.number
            this.roleData = res.result
            this.startDate = res.result[0].createDate
            for (var i = 0; i < this.roleData.length; i++) {
              if (i == 9) {
                this.roleData[i].num = this.currentPage + "0"
              } else {
                if (this.currentPage == 1) {
                  this.roleData[i].num = this.currentPage + i + ""
                } else {
                  this.roleData[i].num = this.currentPage - 1 + "" + (i + 1)
                }
              }
            }
          }
        })
      },
      //弹出删除界面
      handleDel(index, row) { //单个删除
        this.currentDelId = row.id // 取当前行id
        this.alertClosed = !this.alertClosed
        this.deleteType = 'deleteSingle'
      },
      close() {
        this.alertClosed = !this.alertClosed // 关闭确认删除弹窗
      },
      //跳往新增页面
      addRole() { // 新增
        this.$router.push('roleNew')
      },
      //跳往新增页面并传递当前的id
      handleDetails(index, row) { // 详情
        this.$router.push('roleDetails?reportID=' + row.id)
      },
      details(index, row) {
        this.$router.push('xdetails?reportID=' + row.id)
      },
      handleCurrentChange(val) { // 分页
        this.currentPage = val
        this.search()
      },
      //复选框全选全不选界面
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
        API.postDelete({
          data: arr
        }).then(res => {
          if (res.code === 200) {
            this.search()
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search();
            } else {
              this.roleData = [];
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
        API.postDelete({
          data: [{
            "id": this.currentDelId
          }]
        }).then((res) => {
          this.alertClosed = !this.alertClosed
          if (res.code === 200) {
            this.search();
            if (this.currentPage > 1) {
              this.currentPage = this.currentPage - 1;
              this.search();
            } else {
              this.roleData = [];
            }
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
      },
      checkDel() {
        this.alertClosed = !this.alertClosed // 批量删除
        this.deleteType = 'deleteAll'
      },
      sureDel() { // 确认删除
        var _type = this.$refs.deleteRef.getAttribute('data-type')
        if (_type === 'deleteAll') {
          this.deleteAll()
        } else {
          this.deleteSingle()
        }
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
  #cell {
    width: 5px;
    margin-left: 2px;
  }
</style>

