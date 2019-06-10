<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        授权管理
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                       <span style="display:inline-block;width: 0.2rem;"></span>关
                       <span style="display:inline-block;width: 0.26rem;"></span>键
                       <span style="display:inline-block;width: 0.26rem;"></span>字 :
                       <span style="display:inline-block;width: 0.18rem;"></span>
                    </label>
              <input type="text" size="small" name="keyword" placeholder="按党校名称搜索" v-model="content">
            </li>
            <li>
              <button @click="searchData">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table ref="singleTable" :data="partyUserData" highlight-current-row>
          <el-table-column property="num" label="序号" show-overflow-tooltip width="80px" align="center">
          </el-table-column>
          <el-table-column property="partyschoolName" label="党校名称" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="provinceName" label="所在地" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="status" label="期限状态" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
<template slot-scope="scope">
  <el-button size="mini" type="primary" title="授权" @click="handleEmpower(scope.$index, scope.row)">
    授权</el-button>
  <el-button title="查看" @click="handlePowerDetails(scope.$index, scope.row)">查看</el-button>
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
  </div>
</template>

<script>
  import * as API from "@/API/PartyUser.js";
  import commonBread from "../../components/bread";
  export default {
    name: "Empower",
    data() {
      return {
        content: "", // 关键词检索
        partyUserData: [],
        currentPage: 1, // 当前页码
        total: "" //null
      };
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
        this.partyUserData = [];
        this.currentPage = 1;
        this.search();
      },
      // 页面渲染
      search() {
        API.JH_news({
          id: "",
          partyschoolName: this.content,
          startDate: "",
          endDate: "",
          pageNum: this.currentPage,
          pageSize: "10"
        }).then(res => {
          var arr = res.result;
          arr.forEach((item, index) => {
            if (item.status == 1) {
              item.status = "未到期";
            } else {
              item.status = "已到期";
            }
          });
          for (var i = 0; i < arr.length; i++) {
            if (i == 9) {
              arr[i].num = this.currentPage + "0"
            } else {
              if (this.currentPage == 1) {
                arr[i].num = this.currentPage + i + ""
              } else {
                arr[i].num = this.currentPage - 1 + "" + (i + 1)
              }
            }
          }
          this.partyUserData = res.result;
          this.total = res.number;
        });
      },
      handleEmpower(index, row) {
        // 授权
        this.$router.push("power?reportID=" + row.id+"&partyschoolName="+row.partyschoolName);
      },
      handlePowerDetails(index, row) {
        //详情功能
        this.$router.push("powerDetails?reportID=" + row.id);
      },
      handleCurrentChange(val) {
        // 分页
        this.currentPage = val;
        this.search();
      }
    },
    components: {
      commonBread
    },
    created() {
      this.search();
    }
  };
</script>

<style lang="less" scoped>
  @import "../../style/mix";
  @import "../../style/magTable";
</style>
