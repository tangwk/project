 <template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        资源审批
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="handleAgreeAll" :disabled="multipleSelection.length == 0">批量通过</button>
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                <span style="display:inline-block;width: 0.2rem;"></span>关
                <span style="display:inline-block;width: 0.26rem;"></span>键
                <span style="display:inline-block;width: 0.26rem;"></span>字 :
                <span style="display:inline-block;width: 0.18rem;"></span>
              </label>
              <input type="text" size="small" name="keyword" placeholder="按资源搜索" v-model="resource">
            </li>
            <li>
              <button @click="search">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table
          ref="singleTable"
          :data="todoData"
          highlight-current-row
          @selection-change = "handleSelectionChange"
          >
          <el-table-column width="80" align="center" type="selection"></el-table-column>
          <el-table-column
            property="resource"
            label="待审批资源"
            align="center">
          </el-table-column>
          <el-table-column
            property="sendTime"
            label="发送时间"
            align="center">
          </el-table-column>
          <el-table-column
            property="submitter"
            label="提交人"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="220"
            align="center">
            <template slot-scope="scope">
              <i style="font-size: 14px;" @click="lookDetail(scope.$index, scope.row)">详情</i>
              <i style="font-size: 14px;" @click="handleAgree(scope.$index, scope.row)">同意</i>
              <i style="font-size: 14px;" @click="handleDisagree(scope.$index, scope.row)">不同意</i>
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
import commonBread from "../../components/bread";
import API from "../../API/backlog.js";
export default {
  name: "Todo",
  data() {
    return {
      resource: "", // 关键词检索
      todoData: [],
      multipleSelection: [],
      currentPage: 1, // 当前页码
      total: null //null
    };
  },
  watch: {
    resource(val) {
      if (val === "") {
        this.search();
      }
    }
  },
  methods: {
    search() {
      this.todoData = [];
      API.getTodoList({
        id: "",
        resourcesName: this.resource,
        status: "2",
        pageNum: this.currentPage,
        pageSize: 10
      })
        .then(res => {
          var _data = res.result;
          if (_data) {
            _data.forEach(item => {
              item.resource = item.resourcesName;
              item.sendTime = this.formatDate(item.createDate);
              item.submitter = item.createrName;
              item.reportID = item.resourcesId;
            });
            this.todoData = _data;
          }
          if (res.number) {
            this.total = res.number;
          }
        })
        .catch(err => {
        });
    },
    lookDetail(index, row){
      if(row.resourcesType === "3"){
        // this.$router.push("todoArtDetails?reportID=" + row.reportID);
        this.$router.push({ name:'todoArtDetails',query: { reportID: row.reportID,currentPage: this.currentPage }});
      }
      if(row.resourcesType === "2"){
        // this.$router.push("todoVidDetails?reportID=" + row.reportID);
        this.$router.push({ name:'todoVidDetails',query: { reportID: row.reportID,currentPage: this.currentPage }});
      }
    },
    handleSelectionChange(val) {
      // 复选框
      this.multipleSelection = val;
    },
    handleAgree(index, row) {
      // 同意
      API.agreeTodo({
        data: [
          {
            resourcesId: row.resourcesId,
            resourcesType: row.resourcesType,
            status: 1,
            opinion: ""
          }
        ]
      }).then(res => {
        this.search();
      });
    },
    handleAgreeAll() {
      var arr = [];
      this.multipleSelection.map(item => {
        var obj = {};
        obj.id = item.id;
        obj.status = 1;
        obj.resourcesId = item.resourcesId;
        obj.resourcesType = item.resourcesType;
        obj.opinion = item.opinion
        arr.push(obj);
      });

      API.agreeTodo({
        data: arr
      }).then(res => {
        this.search();
      });
    },
    handleDisagree(index, row) {
      console.log(row.resourcesType)
      if(row.resourcesType === "3"){
           this.$router.push({ name:'todoArtDetails1',query: { reportID: row.reportID,currentPage: this.currentPage }});
      }
      if(row.resourcesType === "2"){
          this.$router.push({ name:'todoVidDetails1',query: { reportID: row.reportID,currentPage: this.currentPage }});
      }
      //新增一个弹窗，输入不同意的意见

      // 不同意
      // API.agreeTodo({
      //   data: [
      //     {
      //       resourcesId: row.resourcesId,
      //       resourcesType: row.resourcesType,
      //       status: 3,
      //       opinion: ""
      //     }
      //   ]
      // }).then(res => {
      //   this.search();
      // });
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




