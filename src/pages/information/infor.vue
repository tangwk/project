<template>
  <div class="InforBor">
    <div class="crumbs">
      <common-bread></common-bread>
      <div style="text-align:right;margin-right:10px;margin-top:-30px;color:#79ac88">当前党校:<span style="margin-left:20px">{{this.schoolName || "暂无党校"}}</span></div>
    </div>
    <div class="inforContent">
      <el-row :gutter="15">
        <el-col :span="4" style="height:200vh">
          <div class="inforTreeBor">
            <!-- <p class="title">
                        信息监管
                      </p> -->
            <!-- 树状结构 -->
            <!-- <div class="inforTree">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                            </el-input>
                            左侧的三级菜单栏
                            <el-tree  class="filter-tree" :data="partyData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree">
                            </el-tree>
                          </div> -->
            <!-- <div class="block" v-if="total>1">
                            <el-pagination :pager-count=5 :small="true" @current-change="handleCurrentChange" :current-page="currPage" :page-size="25" layout="total, prev, pager, next, jumper" :total="total">
                            </el-pagination>
                          </div> -->
            <!-- 下拉框的 -->
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <el-collapse-item style="padding-left:10px;" :title=item.label :name="item.placeCode" v-for="(item,index) in partyData1" :key="index">
                <div v-if="peoData1">
                  <div @click="handleNodeClick(items.id,items.partyschoolName)" id="dv" style="cursor:pointer;font-size:12px;margin-left:20px;margin-right:20px" v-for="(items,index) in peoData1" :key="index">{{items.partyschoolName}}</div>
                </div>
                <div v-else id="dv" style="cursor:pointer;font-size:12px;padding-left:20px;margin-left:20px;margin-right:20px">暂无数据</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
        <el-col :span="20" style="height:200vh">
          <div class="inforTable">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="内容信息" name="first">
                <!--请选择内容类型  -->
                <div v-show="contShow">
                  <el-select v-model="value" placeholder="请选择内容类型">
                    <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <common-myTable :inforData="contData" :columns="coluData1" @on-change="changePage1" :currentPage="currentPage1" :total="total1" v-on:details="handleContDetails1"></common-myTable>
                </div>
                <!--请选择内容类型  -->
                <div v-show="!contShow" v-if="this.value==1">
                  <!-- <common-ContDetails :data="contDetail"></common-ContDetails> -->
                  <common-DongTai :data="contDetail"></common-DongTai>
                  <!-- <button class="backBtn" id="backBtn1" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:55px;" type="primary" v-on:click="back" id="backBtn1" class="backBtn">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==2">
                  <common-ContDetails :data="contDetail"></common-ContDetails>
                  <!-- <common-LifeDetails :data="contDetail"></common-LifeDetails> -->
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:0px" type="primary" v-on:click="back" class="backBtn">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==3">
                  <common-ContDetails :data="contDetail"></common-ContDetails>
                  <!-- <common-LifeDetails :data="contDetail"></common-LifeDetails> -->
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:0px" type="primary" v-on:click="back" class="backBtn">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==4">
                  <common-ContDetails :data="contDetail"></common-ContDetails>
                  <!-- <common-LifeDetails :data="contDetail"></common-LifeDetails> -->
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:0px" type="primary" v-on:click="back" class="backBtn">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==5">
                  <!-- <common-ContDetails :data="contDetail"></common-ContDetails> -->
                  <common-LifeDetails :data="contDetail"></common-LifeDetails>
                  <!-- <button class="backBtn backBtn2" id="backBtns" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:320px" type="primary" v-on:click="back" class="backBtn" id="backBtns">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==6">
                  <!-- <common-ContDetails :data="contDetail"></common-ContDetails> -->
                  <common-videoDetails :data="contDetail"></common-videoDetails>
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button type="primary" v-on:click="back" class="backBtn" style="margin-top:0px">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==7">
                  <common-ContDetails :data="contDetail"></common-ContDetails>
                  <!-- <common-LifeDetails :data="contDetail"></common-LifeDetails> -->
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:0px" type="primary" v-on:click="back" class="backBtn">返回</el-button>
                </div>
                <div v-show="!contShow" v-if="this.value==8">
                  <common-KeJianDetails :data="contDetail"></common-KeJianDetails>
                  <!-- <common-LifeDetails :data="contDetail"></common-LifeDetails> -->
                  <!-- <button class="backBtn backBtn2" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:220px" type="primary" v-on:click="back" class="backBtn backBtn2">返回</el-button>
                </div>
              </el-tab-pane>
              <!-- == -->
              <el-tab-pane label="人员信息" name="second">
                <common-myTable v-show="peoShow == 1" :inforData="peoData" :columns="coluData2" @on-change="changePage2" :currentPage="currentPage2" :total="total2" v-on:details="handlePeoDetails2"></common-myTable>
                <!-- == -->
                <div v-show="peoShow == 2">
                  <common-myTable :inforData="stuData" :columns="coluData21" @on-change="changePage3" :currentPage="currentPage3" :total="total3" v-on:details="handleStuDetails"></common-myTable>
                  <!-- <button class="backBtn" v-on:click="stuBacks">返 回</button> -->
                  <el-button style="margin-top:20px" type="primary" v-on:click="stuBacks" class="backBtn">返回</el-button>
                </div>
                <div v-show="peoShow == 3">
                  <common-StuDetails :data="StuDetails"></common-StuDetails>
                  <!-- <button class="backBtn" v-on:click="stuBack">返 回</button> -->
                  <el-button type="primary" v-on:click="stuBack" class="backBtn">返回</el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程信息" name="third">
                <common-myTable v-show="courShow" :inforData="courData" :columns="coluData3" @on-change="changePage4" :currentPage="currentPage4" :total="total4" v-on:details="handleCourDetails"></common-myTable>
                <div v-show="!courShow">
                  <common-CourDetails :data="CourDetails"></common-CourDetails>
                  <!-- <button class="backBtn" v-on:click="back">返 回</button> -->
                  <el-button style="margin-top:30px" type="primary" v-on:click="back" class="backBtn">返回</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/infor.js";
  import commonBread from "../../components/bread"; //主页的组件
  import commonMyTable from "../../components/table"; //表格的组件
  import commonContDetails from "../../components/contDetails"; //内容信息点击详情以后,内容详情组件
  import commonStuDetails from "../../components/stuDetails"; //人员信息点击详情以后,学员详情组件
  import commonCourDetails from "../../components/courDetails"; //课程信息的课程详情的组件
  import commonLifeDetails from "../../components/lifeDetails"; //生活服务
  import commonVideoDetails from "../../components/videoDetails"; //视频资源
  import commonDongTai from "../../components/dongTai"; //党校动态详情
  import commonKeJianDetails from "../../components/keJianDetails"; //课件资源
  export default {
    name: "Infor",
    data() {
      return {
        activeNames: "",
        contShow: true,
        peoShow: 1,
        courShow: true,
        currPage: 1,
        pageCount: 25,
        total: "",
        contData: [],
        potoName: "",
        coluData1: [{
            label: "序号",
            property: "index"
          },
          {
            label: "内容标题",
            property: "title"
          },
          {
            label: "发布人",
            property: "author"
          },
          {
            label: "发布时间",
            property: "time"
          }
        ],
        peoData: [{
            index: 1,
            className: "一份",
            classNum: "外人烤",
            startTime: "1012-06-29",
            endTime: "1052-06-28"
          },
          {
            index: 2,
            className: "十份",
            classNum: "国人烤",
            startTime: "1035-03-15",
            endTime: "1066-03-14"
          }
        ],
        peoData1: [],
        coluData2: [{
            label: "序号",
            property: "index"
          },
          {
            label: "班级名称",
            property: "className"
          },
          {
            label: "班级人数",
            property: "classNum"
          },
          {
            label: "开班时间",
            property: "startTime"
          },
          {
            label: "毕业时间",
            property: "endTime"
          }
        ],
        stuData: [],
        coluData21: [{
            label: "序号",
            property: "index"
          },
          {
            label: "学员名称",
            property: "student"
          },
          {
            label: "单位",
            property: "company"
          },
          {
            label: "职务",
            property: "job"
          }
        ],
        courData: [{
            index: 1,
            name: "1份",
            author: "外国人烤鱼",
            describe: "3012-66-99"
          },
          {
            index: 2,
            name: "10份",
            author: "中国人烤鱼",
            describe: "9012-66-99"
          }
        ],
        coluData3: [{
            label: "序号",
            property: "index"
          },
          {
            label: "课程名称",
            property: "name"
          },
          {
            label: "课时",
            property: "hours"
          },
          {
            label: "课程简述",
            property: "describe"
          }
        ],
        filterText: "",
        partyData: [{
          id: 1,
          label: "一级 1",
          children: [{
            id: 4,
            label: "二级 1-1",
            children: [{
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }]
        }],
        partyData1: [],
        defaultProps: {
          children: "children",
          label: "label"
        },
        schoolId: "", // 选中的党校id
        schoolName: "",
        activeName: "first",
        options: [], //请选择的内容类型
        value: "1",
        content: "",
        contentData: [{
            contentName: "xxx纪念活动",
            issuer: "楚天",
            pubdate: "2018-01-01"
          },
          {
            contentName: "xxx纪念活动",
            issuer: "楚天",
            pubdate: "2018-01-01"
          },
          {
            contentName: "xxx纪念活动",
            issuer: "楚天",
            pubdate: "2018-01-01"
          },
          {
            contentName: "xxx纪念活动",
            issuer: "楚天",
            pubdate: "2018-01-01"
          },
          {
            contentName: "xxx纪念活动",
            issuer: "楚天",
            pubdate: "2018-01-01"
          }
        ],
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1,
        currentPage4: 1,
        total1: null,
        total2: null,
        total3: null,
        total4: 50,
        contDetail: {}, // 内容信息详情页
        StuDetails: {}, // 人员详情页
        CourDetails: {}, // 课程信息详情页
        mappingUrlId: ""
      };
    },
    watch: {
      //搜索的方法
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      value(val) {
        this.getContentData();
      },
      activeName(name) {
        if (name === "first") {
          this.contShow = true;
          this.value = "1";
          this.getContentData();
        }
        if (name === "second") {
          this.peoShow = 1;
          this.getClassData();
        }
        if (name === "third") {
          this.courShow = true;
          this.findAllSchedule();
        }
      }
    },
    methods: {
      findPartyschoolUserByProvinceCode() {
        API.findPartyschoolUserByProvinceCode({
          provinceCode: "110000"
        }).then(res => {
          this.peoData1 = res.result
          this.schoolId = res.result[0].id
          this.getContentData();
          this.schoolName = res.result[0].partyschoolName;
        })
      },
      handleChange(val) {
        API.findPartyschoolUserByProvinceCode({
          provinceCode: val
        }).then(res => {
          this.peoData1 = res.result
          this.schoolId = res.result[0].id
          this.getContentData();
          this.schoolName = res.result[0].partyschoolName;
        })
      },
      //分页
      handleCurrentChange(val) {
        this.currPage = val;
        this.getTreeData();
      },
      //获取所有的省
      findAddressInfo() {
        API.findAddressInfo({
          placeType: 1,
          cityCode: "",
          provinceCode: ""
        }).then(res => {
          var arr = []
          res.result.forEach(item => {
            var obj = {}
            // console.log(item)
            obj.id = item.id
            obj.label = item.placeName
            obj.placeCode = item.placeCode
            arr.push(obj)
          })
          this.partyData1 = arr
        })
      },
      // 获取左侧树数据
      getTreeData() {
        API.getSchoolList({
          id: "",
          partyschoolName: "",
          startDate: "",
          endDate: "",
          pageNum: this.currPage,
          pageSize: 25
        }).then(res => {
          var data = [];
          if (res.result && res.result.length) {
            res.result.forEach(item => {
              data.push({
                id: item.id,
                label: item.partyschoolName
              });
            });
          }
          this.total = res.number;
          this.partyData = data;
          // 默认第一个党校的数据
          this.schoolId = data[0].id;
          this.schoolName = res.result[0].partyschoolName;
          this.getContentData();
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data, data1) {
        this.schoolId = data;
        this.schoolName = data1
        // 切换党校 内容信息类型默认：1党校动态; tab切换为1；
        this.value = "1";
        this.activeName = "first";
        this.getContentData();
      },
      //tab栏切换功能
      handleClick(tab, event) {
        this.activeName = tab.name;
      },
      // 内容信息,主页的渲染
      getContentData() {
        this.contData = [];
        if (this.value != 5 && this.value != 1) {
          API.findInfo({
            infoType: this.value,
            partyschoolId: this.schoolId,
            pageNum: this.currentPage1,
            pageSize: 10
          }).then(res => {
            var data = [];
            this.total1 = res.number;
            if (res.result && res.result.length) {
              res.result.forEach((item, index) => {
                // 判断信息类型
                var title = "";
                if (this.value === "5") {
                  title = item.introduction;
                } else if (this.value === "6") {
                  title = item.videoName;
                } else if (this.value === "8") {
                  title = item.coursewareName;
                } else {
                  title = item.title;
                }
                var author = this.schoolName;
                // var author = this.schoolName
                data.push({
                  index: index + 1 + (this.currentPage1 - 1) * 10,
                  title: title,
                  author: author,
                  time: this.formatDate(item.createDate),
                  id: item.id
                });
              });
            }
            this.contData = data;
          });
        } else if (this.value == 1) {
          API.findInfo({
            infoType: this.value,
            partyschoolId: this.schoolId,
            pageNum: this.currentPage1,
            pageSize: 10
          }).then(res => {
            var data = [];
            this.total1 = res.number;
            if (res.result && res.result.length) {
              res.result.forEach((item, index) => {
                // 判断信息类型
                var title = item.title;
                var author = this.schoolName;
                // var author = this.schoolName
                data.push({
                  index: index + 1 + (this.currentPage1 - 1) * 10,
                  title: title,
                  author: author,
                  time: this.formatDate(item.createDate),
                  id: item.id,
                  photoName: item.photoName
                });
              });
            }
            this.contData = data;
          });
        } else {
          API.findCollege({
            id: "",
            partyschoolId: this.schoolId,
            introduction: "",
            phone: "",
            trafficRoute: "",
            mapName: ""
          }).then(res => {
            var data = [];
            this.photoName = res.result[0].mapName;
            this.total1 = res.number;
            if (res.result && res.result.length) {
              res.result.forEach((item, index) => {
                // 判断信息类型
                var title = "院校信息";
                var author = this.schoolName;
                data.push({
                  index: index + 1 + (this.currentPage1 - 1) * 10,
                  title: title,
                  author: author,
                  time: this.formatDate(item.createDate),
                  id: item.id,
                  photoName: item.mapName
                });
              });
            }
            this.contData = data;
          });
        }
      },
      // 人员信息
      getClassData() {
        this.peoData = [];
        API.findClassByStatus({
          partyschoolId: this.schoolId,
          className: "",
          classType: "",
          status: "",
          pageNum: this.currentPage2,
          pageSize: 10
        }).then(res => {
          var data = [];
          this.total2 = res.number;
          if (res.result && res.result.length) {
            res.result.forEach((item, index) => {
              data.push({
                index: index + 1 + (this.currentPage2 - 1) * 10,
                className: item.className,
                classType: item.classType,
                classNum: item.studentsNum,
                startTime: this.formatDate(item.createDate),
                endTime: this.formatDate(item.endDate),
                id: item.id
              });
            });
          }
          this.peoData = data;
        });
      },
      formatDate: function(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + MM + "-" + d + " ";
      },
      // 课程信息
      findAllSchedule() {
        this.courData = [];
        API.findAllSchedule({
          partyschoolId: this.schoolId,
          id: "",
          courseName: "",
          pageNum: this.currentPage4,
          pageSize: 10
        }).then(res => {
          var data = [];
          this.total4 = res.number;
          res.result.forEach((item, index) => {
            data.push({
              index: index + 1 + (this.currentPage4 - 1) * 10,
              name: item.courseName,
              describe: item.introduction,
              id: item.id,
              hours: item.schoolHours,
              status: item.status
            });
          });
          this.courData = data;
        });
      },
      // 内容信息-详情--1
      // handleContDetails1(row) {
      //   var vm = this;
      //   vm.contDetail = [];
      //   vm.contShow = false;
      //   // 1-3查询通知公告接口; 4查询规章制度;
      //   // 5-7???; 8获取课件资源
      //   if (this.value < 4) {
      //     this.postFindNotice(row);
      //     vm.contShow = !vm.contShow;
      //   }
      //   if (this.value === "4") {
      //     this.postFindReg(row);
      //     vm.contShow = !vm.contShow;
      //   } else if (this.value === "8") {
      //     this.postFindCourseware(row);
      //     vm.contShow = !vm.contShow;
      //   } else {
      //     debugger
      //     this.postFindNotice(row)
      //     vm.contShow = !vm.contShow;
      //   }
      // },
      handleContDetails1(row) {
        var vm = this;
        vm.contDetail = [];
        vm.contShow = false;
        // 1-3查询通知公告接口; 4查询规章制度;
        // 5-7???; 8获取课件资源
        if (this.value < 4) {
          this.postFindNotice(row);
          vm.contShow = !vm.contShow;
        }
        if (this.value === "4") {
          this.postFindReg(row); //查询规章制度
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "5") {
          this.postFindLife(row);
          // this.getMap()
          vm.contShow = !vm.contShow; //生活服务
        }
        if (this.value > "5" && this.value < "8") {
          this.postFindReg(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "8") {
          this.postFindCourseware(row);
          vm.contShow = !vm.contShow; //生活服务
        }
        //===================================================
        if (vm.value == "1") {
          // this.postFindNotice(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "2") {
          // this.postFindNotice(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "3") {
          // this.postFindNotice(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "4") {
          // this.postFindReg(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "5") {
          // this.postFindLife(row);
          vm.contShow = !vm.contShow; //生活服务
        }
        if (vm.value == "6") {
          //视频资源
          this.postFindVideo(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "7") {
          //文章资源
          this.postFindArcticle(row);
          vm.contShow = !vm.contShow;
        }
        if (vm.value == "8") {
          //课件资源
          // this.postFindCourseware(row);
          vm.contShow = !vm.contShow;
        }
      },
      postFindNotice(row) {
        // 查询通知公告接口
        var vm = this;
        API.findNotice({
          partyschoolId: this.schoolId,
          id: row.id,
          title: "",
          type: this.value,
          content: "",
          pageNum: "", //this.currentPage1,
          pageSize: 10
        }).then(res => {
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.content = data.content.replace(/<[^>]+>/g, "");
            data.content = data.content.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetails = {
              title: data.title,
              content: data.content.replace(/<[^>]+>/g, ""),
              createDate: this.formatDate(data.createDate),
              author: row.author
            };
          }
          this.getphone(row.photoName);
        });
      },
      //获取党校动态的地图图片============================================================
      getphone(val) {
        if (val) {
          API.downloadImg({
            uploadType: "5",
            photoName: val
          }).then(res => {
            window.URL = window.URL || window.webkitURL;
            var data = [];
            data.push(res);
            let url = window.URL.createObjectURL(new Blob(data));
            var obj = this.contDetails;
            obj.picture = url;
            this.contDetail = obj;
          });
        } else {
          API.downloadImg({
            uploadType: "5",
            photoName: val
          }).then(res => {
            window.URL = window.URL || window.webkitURL;
            var data = [];
            data.push(res);
            // let url = window.URL.createObjectURL(new Blob(data));
            var obj = this.contDetails;
            // obj.picture = url
            this.contDetail = obj;
          });
        }
      },
      postFindReg(row) {
        // 查询规章制度
        var vm = this;
        API.findRegulation({
          partyschoolId: this.schoolId,
          id: row.id,
          title: "",
          // type: "",
          startDate: "",
          endDate: "",
          content: "",
          pageNum: "",
          pageSize: 10
        }).then(res => {
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.content = data.content.replace(/<[^>]+>/g, "");
            data.content = data.content.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetail = {
              title: data.title,
              content: data.content.replace(/<[^>]+>/g, ""),
              createDate: this.formatDate(data.createDate),
              author: row.author
            };
            // vm.contShow = !vm.contShow;
          }
        });
      },
      postFindCourseware(row) {
        // 获取课件资源
        var vm = this;
        API.findCourseware({
          partyschoolId: this.schoolId,
          id: row.id,
          coursewareName: "",
          pageNum: "",
          pageSize: ""
        }).then(res => {
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.content = data.content.replace(/<[^>]+>/g, "");
            data.content = data.content.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetails = {
              title: data.coursewareName,
              content: data.content.replace(/<[^>]+>/g, ""),
              createDate: this.formatDate(data.createDate),
              author: row.author
            };
          }
        });
        this.findCoursewareResById(row.id);
      },
      //查找课件的名字
      findCoursewareResById(val) {
        API.findCoursewareResById({
          partyschoolId: this.schoolId,
          id: val,
          coursewareName: "",
          pageNum: "",
          pageSize: ""
        }).then(res => {
          var obj = this.contDetails;
          obj.attachment = res.result[0].attachment;
          this.contDetail = obj;
          obj.attachment.forEach(item => {
            item.attachmentName = item.attachmentName;
            item.nattachmentName = item.attachmentName.substring(13);
          });
        });
      },
      //获取视频资源
      postFindVideo(row) {
        var vm = this;
        API.findVideo({
          id: row.id,
          videoName: "",
          videoContent: "",
          partyschoolId: "",
          startDate: "",
          endDate: "",
          type: "",
          pageNum: "",
          pageSize: ""
        }).then(res => {
          this.mappingUrlId = res.result[0].id;
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.videoContent = data.videoContent.replace(/<[^>]+>/g, "");
            data.videoContent = data.videoContent.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetails = {
              title: data.videoName,
              content: data.videoContent.replace(/<.*?>/gi, ""),
              createDate: this.formatDate(data.createDate),
              author: row.author
            };
          }
          this.demo();
        });
      },
      //获取到的mappingUrl需要重新映射一下
      demo() {
        API.findeRealUrl({
          videoId: this.mappingUrlId
        }).then(res => {
          var obj = this.contDetails;
          obj.video = res.result.realUrl;
          this.contDetail = obj;
        });
      },
      //获取文章资源
      postFindArcticle(row) {
        var vm = this;
        API.findArticle({
          id: row.id,
          title: "",
          content: "",
          partyschoolId: "",
          startDate: "",
          endDate: "",
          type: "",
          pageNum: "",
          pageSize: ""
        }).then(res => {
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.content = data.content.replace(/<[^>]+>/g, "");
            data.content = data.content.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetail = {
              title: data.title,
              content: data.content.replace(/<[^>]+>/g, ""),
              createDate: this.formatDate(data.createDate),
              author: row.author
            };
          }
        });
      },
      //获取生活服务
      postFindLife(row) {
        var vm = this;
        API.findCollege({
          id: row.id,
          partyschoolId: this.schoolId,
          introduction: "",
          phone: "",
          trafficRoute: "",
          mapName: ""
        }).then(res => {
          if (res.result && res.result.length) {
            var data = res.result[0];
            data.introduction = data.introduction.replace(/<[^>]+>/g, "");
            data.introduction = data.introduction.replace(/[ ]|[&nbsp;]/g, "");
            vm.contDetails = {
              title: data.phone,
              content: data.introduction,
              createDate: "",
              author: data.trafficRoute
            };
          }
          this.getMap(row.photoName);
        });
      },
      //获取生活服务的地图图片
      getMap(val) {
        API.downloadImg({
          uploadType: "3",
          photoName: val
        }).then(res => {
          window.URL = window.URL || window.webkitURL;
          var data = [];
          data.push(res);
          let url = window.URL.createObjectURL(new Blob(data));
          var obj = this.contDetails;
          obj.picture = url;
          this.contDetail = obj;
        });
      },
      // 人员信息-人员列表
      handlePeoDetails2(row) {
        this.peoShow = 2;
        var vm = this;
        vm.stuData = [];
        API.getStuList({
          classId: row.id
        }).then(res => {
          this.total3 = res.number;
          if (res.result && res.result.length) {
            res.result.forEach((item, index) => {
              vm.stuData.push({
                index: index + 1,
                student: item.name,
                company: item.unit,
                job: item.position,
                email: item.email,
                idNumber: item.idNumber,
                phone: item.phone,
                nation: item.nation,
                politicalStatus: item.politicalStatus,
                roomCode: item.politicalStatus,
                roleId: item.roleId,
                sex: item.sex,
                unit: item.unit
              });
            });
          }
        });
      },
      // 人员信息-人员详情
      handleStuDetails(row) {
        this.peoShow = 3;
        row.sex = row.sex == "1" ? "男" : "女";
        this.StuDetails = row;
      },
      // 课程信息-详情
      handleCourDetails(row) {
        this.courShow = !this.courShow;
        this.CourDetails = row;
      },
      stuBack() {
        this.peoShow = 2;
      },
      stuBacks() {
        this.peoShow = 1;
      },
      back() {
        this.contShow = !this.contShow;
        this.courShow = !this.courShow;
      },
      // 分页
      changePage1(val) {
        this.currentPage1 = val; // 内容信息
        this.getContentData();
      },
      changePage2(val) {
        this.currentPage2 = val; // 人员信息-班级
        this.getClassData();
      },
      changePage3(val) {
        this.currentPage3 = val; // 人员信息-班级-人员
        this.handlePeoDetails2();
      },
      changePage4(val) {
        this.currentPage4 = val; // 课程信息
        this.findAllSchedule();
      },
      getOptions() {
        var vm = this;
        API.infor({
          codeName: "",
          codeType: "infoType",
          code: ""
        }).then(res => {
          vm.options = [];
          if (res.result && res.result.length) {
            res.result.forEach(item => {
              vm.options.push({
                value: item.code,
                label: item.codeName
              });
            });
          }
        });
      }
    },
    components: {
      commonBread,
      commonMyTable,
      commonContDetails,
      commonStuDetails,
      commonCourDetails,
      commonLifeDetails,
      commonVideoDetails,
      commonDongTai,
      commonKeJianDetails
    },
    created() {
      this.findAddressInfo(); //省级地区的获取
      this.getOptions();
      this.findPartyschoolUserByProvinceCode()
      // this.getTreeData();
    }
  };
</script>

<style lang="less" scoped>
  @import "../../style/mix";
  .InforBor {
    width: 100%;
    height: calc(100% - 15px);
    .crumbs {
      height: 40px;
      margin: 10px 10px 10px 15px;
      background-color: @fc;
    }
    .inforContent {
      margin: 10px 10px 10px 15px; // height: calc(100% - 60px);
      min-height: 100vh;
      .el-row {
        height: 100%;
        .el-col {
          height: 100%;
          .inforTreeBor {
            height: 100%;
            background-color: @fc;
            .title {
              .wh(100%, 40px);
              .ft(14px, 40px);
              padding-left: 15px;
              color: #666666;
              box-sizing: border-box;
            }
            .inforTree {
              padding: 10px 20px 0;
              box-sizing: border-box;
              .el-input {
                margin-bottom: 20px;
              }
            }
          }
          .inforTable {
            height: 100%;
            background-color: @fc;
            padding: 0 15px;
            box-sizing: border-box;
            .el-select {
              float: right;
              margin: 0 20px 10px 0;
            }
            .backBtn {
              .wh(80px, 32px);
              color: #fff;
              .brs(5px);
              cursor: pointer;
              margin-left: calc(50% - 40px);
              margin-top: 151px;
            } // 分页
            .block {
              float: right;
              margin: 20px 60px 0 0;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
  #backBtns {
    position: absolute;
    top: 355px;
  }
  #backBtn1 {
    margin-top: 0px;
  }
  .backBtn2 {
    position: absolute;
    top: 357px;
  }
  .filter-tree {
    .oneline(100);
  }
  .block {
    // margin-left: 20px;
    margin-top: 50px;
  }
  #dv {
    // background: green;
    color: rgb(121, 172, 136);
    margin-top: 10px;
    padding-left: 10px; // border: 1px solid rgb(121, 172, 136);
  }
  #dv:hover {
    // background: rgb(121, 172, 136);
    background: rgb(191, 235, 204);
    color: #fff;
    border-radius: 9px;
  }
</style>
