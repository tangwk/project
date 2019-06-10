
<template>
  <div class="homeBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <!-- <div class="dynamicInfor">
      <p class="titleBar">
        最新动态信息
      </p>
      <el-row :gutter="40" class="infor">
        <el-col :span="6">
          <div class="grid-content bg-purple1">
            <p class="inforTitle">党校申请</p>
            <div class="inforBor">
              <div class="inforData">{{ apply }}</div>
              <div class="inforHint">今日新增 (所)</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple2">
            <p class="inforTitle">授权到期</p>
            <div class="inforBor">
              <div class="inforData">{{ expire }}</div>
              <div class="inforHint">已到期 (所)</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple3">
            <p class="inforTitle">注册人数</p>
            <div class="inforBor">
              <div class="inforData">{{ peopleNum }}</div>
              <div class="inforHint">历史累计 (人)</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple4">
            <p class="inforTitle">党校接入</p>
            <div class="inforBor">
              <div class="inforData">{{ party }}</div>
              <div class="inforHint">历史累计 (所)</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
   <!-- <div style="height:700px"> -->
     <iframe scrolling="no" width="100%" style="height:900px"  :src="bookSrc" frameborder="0"></iframe>
   <!-- </div> -->
<!-- <div class="Hot clear">
      <div class="HotCourse left">
        <p class="titleBar">
          热门图书
        </p>
        <el-table ref="singleTable" :data="hotCourseData" highlight-current-row>
          <el-table-column type="index" label="序号" show-overflow-tooltip width="60px" align="center">
          </el-table-column>
          <el-table-column property="courseName" label="图书名称" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="teacher" label="栏目" show-overflow-tooltip align="center">
          </el-table-column>
          <el-table-column property="playCount" label="点击次数" show-overflow-tooltip align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="percentage right">
        <p class="titleBar">
          资源数量占比
          <XChart></XChart>
        </p>
      </div>
    </div> -->
    <!-- <div class="PartyInfor">
      <p class="titleBar">
        党校信息
      </p>
      <el-table ref="singleTable" :data="partyInforData" highlight-current-row>
        <el-table-column type="index" label="序号" show-overflow-tooltip width="100px" align="center">
        </el-table-column>
        <el-table-column property="partyName" label="党校名称" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column property="during" label="授权期限" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column property="studentNum" label="学员人数 (人)" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column property="videoNum" label="视频 (个)" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column property="bookNum" label="图书 (本)" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column property="artNum" label="文章 (篇)" show-overflow-tooltip align="center">
        </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
import * as API from "@/API/homepage.js";
import axios from "axios";
import commonBread from "../components/bread";
import XChart from "@/pages/echarts.vue";
// import options from "@/chart-option/option.js";
export default {
  name: "homepage",
  data() {
    return {
      bookSrc:"",
      apply: "",
      expire: "",
      peopleNum: "",
      party: "",
      hotCourseData: [
        {
          courseName: "当代世界军事",
          teacher: "张三",
          playCount: "98765w"
        },
        {
          courseName: "当代世界军事",
          teacher: "张三",
          playCount: "98765w"
        },
        {
          courseName: "当代世界军事",
          teacher: "张三",
          playCount: "98765w"
        },
        {
          courseName: "当代世界军事",
          teacher: "张三",
          playCount: "98765w"
        },
        {
          courseName: "当代世界军事",
          teacher: "张三",
          playCount: "98765w"
        }
      ],
      partyInforData: [
        {
          partyName: "辽宁党校",
          during: "3年",
          studentNum: "78.25w",
          videoNum: "68.26w",
          bookNum: "88.27w",
          artNum: "58.22w"
        },
        {
          partyName: "抚顺党校",
          during: "3年",
          studentNum: "78.25w",
          videoNum: "68.26w",
          bookNum: "88.27w",
          artNum: "58.22w"
        },
        {
          partyName: "新华党校",
          during: "3年",
          studentNum: "78.25w",
          videoNum: "68.26w",
          bookNum: "88.27w",
          artNum: "58.22w"
        },
        {
          partyName: "人民党校",
          during: "3年",
          studentNum: "78.25w",
          videoNum: "68.26w",
          bookNum: "88.27w",
          artNum: "58.22w"
        },
        {
          partyName: "顺义党校",
          during: "3年",
          studentNum: "78.25w",
          videoNum: "68.26w",
          bookNum: "88.27w",
          artNum: "58.22w"
        }
      ]
    };
  },
  methods: {
    demo11() {
      var b = new Base64();
      if (localStorage.getItem("password") == b.encode("123456")) {
        this.$message({
          message: "为了你账户的安全，请及时修改密码",
          type: "warning"
        });
        this.$router.push("reset");
      }
    },
    infor() {
      API.homepage().then(res => {
        if (res.code === 200) {
          this.apply = res.number;
        } else {
          this.apply = 0;
        }
      });
    },
    search() {
      API.daoQi().then(res => {
        this.expire = res.number;
      });
    },
    login() {
      API.history({
        pageNum: "1",
        pageSize: "10",
        name: "",
        id: ""
      }).then(res => {
        this.peopleNum = res.number;
      });
    },
    demo() {
      API.dangXiao({
        id: "",
        partyschoolName: "",
        startDate: "",
        endDate: "",
        pageNum: "1",
        pageSize: "10"
      }).then(res => {
        this.party = res.number;
      });
    },
    baobiao() {
      var vm=this
      axios
        .post("http://123.59.106.152:8085/xsbReport/auth/getAuthMenuList", {
          systemCode: "dxpxpt",
          token: "d96561810f7d42d0b55319a62ae66ca7",
          authExtDTO: {
           "schoolId": 16
          }
        })
        .then(function(response) {


        vm.bookSrc = response.data.resultBody[1].reportUrl
        console.log(vm.bookSrc)

        })
        .catch(function(error) {});
    }
  },
  components: {
    commonBread,
    XChart
  },
  created() {
    this.demo11();
    this.infor();
    this.search();
    this.login();
    this.demo();
    this.baobiao();
  }
};
</script>

<style lang="less" scoped>
@import "../style/mix";
.homeBor {
  .wh(100%, 100%);
  .crumbs {
    height: 40px;
    margin: 10px 10px 10px 15px;
    background-color: @fc;
  }
  .dynamicInfor {
    height: 210px;
    margin: 10px 10px 10px 15px;
    background-color: @fc;
    .brs(5px);
    .el-row {
      margin-top: 16px;
      padding: 0 30px;
      .el-col {
        .bg-purple1 {
          background: #bdebec;
        }
        .bg-purple2 {
          background: #bdecc7;
        }
        .bg-purple3 {
          background: #ecbdd1;
        }
        .bg-purple4 {
          background: #ecd4bd;
        }
        .grid-content {
          border-radius: 4px;
          min-height: 136px;
          .brs(30px 0px 10px 10px);
          .inforTitle {
            .wh(100%, 30px);
            .ft(12px, 30px);
            color: @fc;
            padding-left: 25px;
            border-bottom: 1px solid @fc;
          }
          .inforBor {
            .inforData {
              .wh(100%, 68px);
              .ft(42px, 68px);
              text-align: center;
              color: @fc;
            }
            .inforHint {
              width: 100%;
              .sc(14px, #666666);
              text-align: center;
            }
          }
        }
      }
    }
  }
  .Hot {
    height: 304px;
    margin: 0 10px 0 15px;
    .HotCourse {
      width: 50%;
      height: 304px;
      background-color: @fc;
      .brs(5px);
      .el-table {
        .wh(100%, 263px);
      }
    }
    .percentage {
      width: 49%;
      height: 304px;
      background-color: @fc;
      .brs(5px);
    }
  }
  .PartyInfor {
    height: 337px;
    margin: 10px 10px 10px 15px;
    background-color: @fc;
    .brs(5px);
  }
}
#test {
  width: 100px;
  height: 100px;
  margin: 40px auto;
  background-color: red;
}
</style>
