 <template>
  <div class="messageBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        消息中心
      </p>
      <div class="userListBor">
        <div class="userList clear">
          <div class="actBtn left">
            <button class="newAdd" @click="publish">发布消息</button>
            <button class="newAdd" @click="checkDel" :disabled="multipleSelection.length == 0">批量删除</button>
          </div>
          <ul class="fillIn right">
            <li>
              <label for="keyword">
                <span style="display:inline-block;width: 0.2rem;"></span>关
                <span style="display:inline-block;width: 0.26rem;"></span>键
                <span style="display:inline-block;width: 0.26rem;"></span>字 :
                <span style="display:inline-block;width: 0.18rem;"></span>
              </label>
              <input type="text" size="small" name="keyword" placeholder="按标题搜索" v-model="msgTitle">
            </li>
            <li>
              <button @click="search">搜 索</button>
            </li>
          </ul>
        </div>
        <el-table
          ref="singleTable"
          :data="messageData"
          highlight-current-row
          @selection-change="handleSelectionChange"
          >
          <el-table-column width="80" align="center" type="selection"></el-table-column>
          <el-table-column
            property="msgTitle"
            label="消息标题"
            align="center">
          </el-table-column>
          <el-table-column
            property="sendTime"
            label="发布时间"
            align="center">
          </el-table-column>
          <el-table-column
            property="publisher"
            label="发布人"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="240"
            align="center">
            <template slot-scope="scope">
              <i class="iconfont icon-yanjing-copy" title="查看" @click="handleLook(scope.$index, scope.row)"></i>
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
        <h3>确定要把所选消息进行删除吗？</h3>
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
import API from "../../API/message.js";
export default {
  name: "Message",
  data() {
    return {
      msgTitle: "", // 关键词检索
      messageData: [
        // {
        //   msgTitle: "邓小平理论概论",
        //   sendTime: "8692A",
        //   publisher: "钱淦荣"
        // },
      ],
      deleteType: "", // 批量删除
      multipleSelection: [],
      currentPage: 1, // 当前页码
      total: null, //null
      alertClosed: false
    };
  },
  watch: {
    msgTitle(val) {
      if (val === "") {
        this.search();
      }
    }
  },
  methods: {
    search() {
      var messageData = [];
      API.getMessageList({
        id: "",
        title: this.msgTitle,
        pageNum: this.currentPage,
        pageSize: 10
      })
        .then(res => {
          console.log(res);
          var _data = res.result;
          if (_data) {
            _data.forEach(item => {
              item.msgTitle = item.title;
              item.sendTime = this.formatDate(item.releaseDate);
              item.publisher = item.releaseName;
              item.reportID = item.id;
            });
            this.messageData = _data;
          }
          if (res.number) {
            this.total = res.number;
          }
        })
        .catch(err => {});
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

      API.deleteMessage({
        data: arr,
        status: 0
      }).then(res => {
        // 刷新
        if (res.code === "200") {
          this.alertClosed = !this.alertClosed;
        }
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.search();
      });
    },
    // 删除单个请求
    deleteSingle() {
      API.deleteMessage({
        data: [
          {
            id: this.currentDelId
          }
        ],
        status: 0
      }).then(res => {
        this.alertClosed = !this.alertClosed;
        if (res.code === "200") {
          this.items.forEach((item, index) => {
            if (item.reportID === this.currentDelId) {
              this.items.splice(index, 1);
              this.total--;
            }
          });
        }
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.search();
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
      this.$router.push("msgLook?reportID=" + row.reportID);
    },
    publish() {
      // 发布
      this.$router.push("publishNews?reportID");
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
.el-table .cell {
  width: 200px;
}
</style>




