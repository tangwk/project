<template>
  <div class="PartyBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        用户管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="newParty">新 增</button>
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                   <span style="display:inline-block;width: 0.2rem;"></span>关
                   <span style="display:inline-block;width: 0.26rem;"></span>键
                   <span style="display:inline-block;width: 0.26rem;"></span>字 :
                   <span style="display:inline-block;width: 0.18rem;"></span>
               </label>
              <input type="text" size="small" name="keyword" placeholder="按党校名称搜索" v-model="partyName">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="partyUserData" highlight-current-row>
          <el-table-column label="党校名称" show-overflow-tooltip align="center">
            <template slot-scope="scope">{{ scope.row.partyschoolName }}
</template>
          </el-table-column>
          <el-table-column
            label="所在地"
            show-overflow-tooltip
            align="center">
           <template slot-scope="scope">
            {{ scope.row.provinceName }}
          </template>
          </el-table-column>
          <el-table-column
            label="联系人"
            show-overflow-tooltip
            align="center">
          <template slot-scope="scope">
           {{ scope.row.contactName }}
          </template>
          </el-table-column>
          <el-table-column
            label="联系电话"
            show-overflow-tooltip
            align="center">
          <template slot-scope="scope">
          {{ scope.row.contactPhone }}
           </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center">
          <template slot-scope="scope">
             <i class="iconfont icon-yanjing-copy" title="查看" @click="seeDetails(scope.$index, scope.row)"></i>
              <i class="iconfont icon-web-icon-" title="修改" @click="handleDetails(scope.$index, scope.row)"  id="cell"></i>
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
      <div class="dataDel" v-show="alertClosed">
        <div class="sureDel">
          <div class="titleDel">
            <p>确认删除</p>
            <i class="iconfont icon-icon-test" @click="close"></i>
          </div>
          <h3>是否确认删除？</h3>
          <p>
            <button ref="deleteRef" @click="sureDel">确定</button>
            <button @click="close">取消</button>
          </p>
        </div>
        <div class="opacityDel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/API/PartyUser.js";
import commonBread from "../../components/bread";
export default {
  name: "PartyUser",
  data() {
    return {
      partyUserData: [],
      partyName: "", // 关键词检索
      // deleteType: '',
      currentPage: 1, // 当前页码
      total: null,
      alertClosed: false,
      currentDelId: ""
    };
  },
  watch: {
    partyName(nval) {
      if (nval === "") {
        this.search();
      }
    }
  },
  methods: {
    searchData(){
      this.partyUserData = [];
      this.currentPage = 1;
      this.search();
    },
    // 页面渲染的功能
    search() {
      API.JH_news({
        id: "",
        partyschoolName: this.partyName,
        startDate: "",
        endDate: "",
        pageNum: this.currentPage,
        pageSize: "10"
      }).then(res => {
        this.total = res.number;
        this.partyUserData = res.result;
      });
    },
    // 点击新增按钮调到新增党校的路由界面
    newParty() {
      this.$router.push("newParty");
    },
    //点击分页跳转到当要跳转的页码并重新赋值
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val;
      this.search();
    },
    //点击删除按钮弹出界面功能
    handleDel(index, row) {
      this.currentDelId = row.id; // 取当前行id
      this.alertClosed = !this.alertClosed; //关闭弹窗
      // this.deleteType = 'deleteSingle'
    },
    // 删除请求的功能
    deleteSingle() {
      API.postDelete({
        id: this.currentDelId
      }).then(res => {
        if (res.code == 200) {
          this.alertClosed = !this.alertClosed; // 关闭确认删除弹窗
          this.search();
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.search();
          } else {
            this.partyUserData = [];
          }
          this.$message({
            message: "删除成功!",
            type: "success"
          });
        } else {
          this.$message({
            message: "删除失败!",
            type: "warning"
          });
        }
      });
    },
    sureDel() {
      this.deleteSingle();
    },
    close() {
      this.alertClosed = !this.alertClosed; // 关闭确认删除弹窗
    },
    // 党校详情功能
    handleDetails(index, row) {
      this.$router.push("PartyDetails?id=" + row.id);
    },
    seeDetails(index, row) {
      this.$router.push("partyView?id=" + row.id);
    }
  },
  components: {
    commonBread
  },
  //页面渲染
  created() {
    this.search();
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
#cell {
  width: 5px;
  margin-left: 0px;
}
</style>




