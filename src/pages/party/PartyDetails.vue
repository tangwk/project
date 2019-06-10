<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        修改
      </p>
      <ul class="resetPwd">
        <!-- 三级联动 -->
        <li>
          <label for="account">
                    <i class="iconfont icon-xinghao"></i>
                    所在地区:<span style="display:inline-block;width:0.5rem;"></span>
              </label>
          <drop-down-menu class="area1" :list="typeArr1" name="typeSelected1" ref="1" v-model="typeSelected1" @input="onSelectProvince()"></drop-down-menu>
          <drop-down-menu class="area1" :list="typeArr2" name="typeSelected2" ref="2" v-model="typeSelected2" @input="onSelectCity()"></drop-down-menu>
          <drop-down-menu class="area1" :list="typeArr3" name="typeSelected3" ref="3" v-model="typeSelected3"></drop-down-menu>
        </li>
        <!-- 三级联动 -->
        <li>
          <label for="partyName">
                 <i class="iconfont icon-xinghao"></i>
                党校名称 : &ensp;</label>
          <input type="text" name="partyName" v-model="partyName" placeholder="请输入党校名称" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('partyName')} " />
          <p id="hint">{{errors.first('partyName')}}</p>
        </li>
        <li>
          <label for="partyType">
                 <i class="iconfont icon-xinghao"></i>
                类<span style="margin-left: 2em;">型</span> : &ensp;
              </label>
          <drop-down-menu class="dropDown" :list="typeArr" name="selectedType" v-model="selectedType" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('partyName')} "></drop-down-menu>
          <p id="hint">{{errors.first('selectedType')}}</p>
        </li>
        <li style="margin-left:28px">
          <label for="linkMan">
                联<span style="margin: 0 0.5em;">系</span>人 : &ensp;
              </label>
          <input type="text" name="linkMan" v-model="linkMan" placeholder="请输入姓名" />
        </li>
        <li style="margin-left:28px">
          <label for="linkPhone">联系电话 : &ensp;</label>
          <input type="text" name="linkPhone" v-model="linkPhone" placeholder="请输入电话号码" v-validate="'telephone'" />
          <p id="hint">{{errors.first('linkPhone')}}</p>
        </li>
        <li>
          <label for="account">
                 <i class="iconfont icon-xinghao"></i>
                账<span style="margin-left: 2em;">号</span> : &ensp;
              </label>
          <input  type="text" name="account" v-model="account" placeholder="请输入账号" />
        </li>
        <li>
          <i class="iconfont icon-xinghao"></i>
          <label for="initPwd">初始密码 : &ensp;</label>
          <input type="password" name="initPwd" v-model="initPwd" placeholder="请输入密码" v-validate="'required|password'" :class=" {'input':true, 'is-danger': errors.has('initPwd')} " style="margin-top:-10px;width:360px" />
          <p id="hint">{{errors.first('initPwd')}}</p>
        </li>
        <li style="margin-left:30px;width:600px;color:red">
          <label for="ClientID">客户端id   : &ensp;</label>
          <input type="text" name="ClientID" v-model="ClientID" placeholder="请输入客户端id"/>
          <span>请在内容管理平台获取</span>
        </li>
         <li  style="margin-left:57px;width:600px;color:red">
          <label for="secretkey">密钥   : &ensp;</label>
          <input type="text" name="secretkey" v-model="secretkey" placeholder="请输入密钥"/>
           <span>请在内容管理平台获取</span>
        </li>
         <!-- <li  style="margin-left:29px">
          <label for="oppenId">oppenId : &ensp;</label>
          <input type="text" name="oppenId" v-model="oppenId" placeholder="请输入oppenId(微信用户提供)"/>
        </li> -->
          <!-- <li  style="margin-left:15px;width:600px;color:red">
          <label for="Custominformation">自定义信息 : &ensp;</label>
          <input type="text" name="Custominformation" v-model="Custominformation" placeholder="请输入自定义信息"/>
           <span>请在内容管理平台获取</span>
        </li> -->
        <li>
          <button @click="Preservation()">保 存</button>
          <button @click="goBack()">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/PartyUser.js";
  import commonBread from "../../components/bread";
  import dropDownMenu from "../../components/dropdownmenu";
  export default {
    name: "PartyDetails",
    data() {
      return {
        partyName: "",
        partyTypeId: "",
        linkMan: "",
        linkPhone: "",
        id: "",
        code: "",
        account: "",
        initPwd: "",
        typeArr: [],
        typeArr1: [],
        typeArr2: [],
        typeArr3: [],
        selectedType: "",
        ClientID:"",//客户端id
        secretkey:"",//密钥
        // oppenId:"",//oppenId
        // Custominformation:"",//自定义用户信息
        typeSelected1: [{
          name: "",
          id: ""
        }],
        typeSelected2: [{
          name: "",
          id: ""
        }],
        typeSelected3: [{
          name: "",
          id: ""
        }],
        flag: true
      };
    },
    watch: {
      code(nval, oval) {
        this.getInfo1();
      }
    },
    methods: {
      //获取用户传过来的id
      demo() {
        this.id = this.$route.query.id;
      },
      // 获取全部的党校类型
      getInfo() {
        API.aaa({
          codeName: "",
          codeType: "partyschoolType",
          code: ""
        }).then(res => {
          if (res.code === 200) {
            var typeArr = res.result;
            var arr = [];
            typeArr.forEach(item => {
              var obj = {};
              obj.name = item.codeName;
              obj.id = item.code;
              arr.push(obj);
            });
            this.typeArr = arr;
          }
        });
      },
      //获取当前党校的类型
      getInfo1() {
        API.aaa({
          codeName: "",
          codeType: "partyschoolType",
          code: this.code
        }).then(res => {
          if (res.code === 200) {
            var typeArr = res.result;
            var arr = [];
            typeArr.forEach(item => {
              var obj = {};
              obj.name = item.codeName;
              obj.id = item.code;
              arr.push(obj);
            });
            this.selectedType = arr;
          }
        });
      },
      onSelectProvince() {
        this.getTypeList1();
        // 市区清空
        this.typeSelected2 = [{
          name: "",
          id: ""
        }];
        this.typeSelected3 = [{
          name: "",
          id: ""
        }];
        this.typeArr3 = []
      },
      onSelectCity() {
        this.getTypeList2();
        this.typeSelected3 = [{
          name: "",
          id: ""
        }];
      },
      // 获取省类型列表
      getTypeList() {
        API.postFilterRank({
          placeType: 1,
          cityCode: "",
          provinceCode: ""
        }).then(res => {
          if (res.code === 200) {
            var typeArr1 = res.result;
            var arr = [];
            typeArr1.forEach(item => {
              var obj = {};
              obj.name = item.placeName;
              obj.id = item.placeCode;
              arr.push(obj);
            });
            this.typeArr1 = arr;
          }
        });
      },
      //获取市类型的列表
      getTypeList1() {
        API.postFilterRank({
          placeType: 2,
          cityCode: "",
          provinceCode: this.typeSelected1[0].id
        }).then(res => {
          if (res.code === 200) {
            var typeArr2 = res.result;
            var arr2 = [];
            typeArr2.forEach(item => {
              var obj2 = {};
              obj2.name = item.placeName;
              obj2.id = item.placeCode;
              arr2.push(obj2);
            });
            this.typeArr2 = arr2;
          }
        });
      },
      //获取县类型的列表
      getTypeList2() {
        API.postFilterRank({
          placeType: 3,
          cityCode: this.typeSelected2[0].id,
          provinceCode: ""
        }).then(res => {
          if (res.code === 200) {
            var typeArr3 = res.result;
            var arr3 = [];
            typeArr3.forEach(item => {
              var obj3 = {};
              obj3.name = item.placeName;
              obj3.id = item.placeCode;
              arr3.push(obj3);
            });
            this.typeArr3 = arr3;
          }
        });
      },
      // 详情功能
      getinitData() {
        API.postAddDepar1({
          id: this.id,
          partyschoolName: "",
          startDate: "",
          endDate: "",
          pageNum: "",
          pageSize: ""
        }).then(res => {
          if (res.result && res.result.length) {
            this.typeSelected1 = [{
              name: "",
              id: ""
            }];
            this.typeSelected2 = [{
              name: "",
              id: ""
            }];
            this.typeSelected3 = [{
              name: "",
              id: ""
            }];
            this.partyName = res.result[0].partyschoolName;
            this.initPwd = res.result[0].passWord;
            this.linkMan = res.result[0].contactName;
            this.linkPhone = res.result[0].contactPhone;
            this.typeSelected1[0].name = res.result[0].provinceName;
            this.typeSelected1[0].id = res.result[0].provinceCode; //=====
            this.typeSelected2[0].name = res.result[0].cityName; //========
            this.typeSelected2[0].id = res.result[0].cityCode;
            this.typeSelected3[0].name = res.result[0].countyName; //======
            this.account = res.result[0].account;
            this.code = res.result[0].partyschoolType;
            this.ClientID=res.result[0].clientId;
            this.secretkey=res.result[0].secret;
            // this.oppenId=res.result[0].openId;
            // this.Custominformation=res.result[0].extraInfo
            this.getTypeList1();
            this.getTypeList2();
          }
        });
      },
      // 保存功能
      Preservation() {
        //表单校验
        this.$validator.validateAll().then(res => {
          if (res) {
            API.amendPartySchool({
              id: this.id,
              partyschoolName: this.partyName,
              areaCode: this.account,
              partyschoolType: this.selectedType[0].id,
              contactName: this.linkMan,
              contactPhone: this.linkPhone,
              startDate: "",
              endDate: "",
              provinceCode: this.typeSelected1[0].id, //编码
              provinceName: this.typeSelected1[0].name, //所在地
              cityCode: this.typeSelected2[0].id,
              cityName: this.typeSelected2[0].name,
              countyCode: this.typeSelected3[0].id,
              countyName: this.typeSelected3[0].name,
              account: this.account,
              passWord: this.initPwd,
              clientId:this.ClientID,
              secret:this.secretkey,
              // openId:"",
              // extraInfo:this.Custominformation
            }).then(res => {
              if (res.code == "200") {
                this.$router.push("PartyUser");
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "保存失败",
                  type: "warning"
                });
              }
            });
          }
        });
      },
      //取消功能
      goBack() {
        this.$router.go(-1);
      }
    },
    //页面渲染功能
    created() {
      this.demo();
      this.getInfo();
      this.getTypeList();
      // this.getTypeList1();
      // this.getTypeList2();
      this.getinitData();
    },
    components: {
      commonBread,
      dropDownMenu
    }
  };
</script>

<style lang="less" scoped>
  @import "../../style/mix";
  @import "../../style/magTable";
  .resetPwd {
    width: 450px;
    margin: 50px auto;
    li {
      .wh(500px, 32px);
      margin-top: 35px;
      label {
        color: #999999;
      }
      input {
        .wh(360px, 32px);
        border: 1px solid #cccccc;
        .brs(5px);
        outline: none;
        text-indent: 5px;
        box-sizing: border-box;
      }
      .hint {
        margin-left: 82px;
        .ft(14px, 18px);
        color: @dc;
      }
      .dropDown {
        width: 360px;
      }
      &:last-child {
        margin-top: 50px;
        text-align: center;
        button {
          .wh(80px, 32px);
          color: @fc;
          background-color: #e9e9e9;
          .brs(3px);
          border: none;
          outline: none;
          margin-left: 74px;
          cursor: pointer;
          &:hover {
            background-color: #cccccc;
          }
          &:first-child {
            background-color: @tbc;
            &:hover {
              background-color: @tc;
            }
          }
        }
      }
    }
  }
  #hint {
    font-size: 14px;
    color: #ff0000;
    margin-left: 80px;
  }
  .area1 {
    width: 118px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-left: 10px;
    line-height: 32px;
    font-size: 14px;
    cursor: pointer;
  }
  i {
    font-size: 24px;
    color: #ff0000;
  }
</style>




