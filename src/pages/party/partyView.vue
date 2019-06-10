<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        党校详情
      </p>
      <ul class="resetPwd">
        <!-- 三级联动 -->
        <li>
          <label for="account">
            所在地区:<span style="display:inline-block;width:0.5rem;"></span>
          </label>
          <div class="suozai">{{ provinceName }}--{{ cityName }}--{{ countyName }}</div>
        </li>
        <!-- 三级联动 -->
        <li>
          <label for="partyName">党校名称 : &ensp;</label>
          <div class="suozai">{{ this.partyName}}</div>
        </li>
        <li>
          <label for="partyType">
            类<span style="display:inline-block;width:1.5rem;"></span>型 : &ensp;
          </label>
          <div class="suozai">{{ this.selectedType }}</div>
        </li>
        <li>
          <label for="linkMan">
            联<span style="display:inline-block;width:0.18rem;"></span>系<span style="display:inline-block;width:0.18rem;"></span>人 : &ensp;
          </label>
           <div class="suozai">{{ this.linkMan }}</div>
        </li>
        <li>
          <label for="linkPhone">联系电话 : &ensp;</label>
           <div class="suozai">{{ this.linkPhone }}</div>
        </li>
        <li>
          <label for="account">
            账<span style="display:inline-block;width:1.5rem;"></span>号 : &ensp;
          </label>
           <span style="margin-left:10px">{{account}}</span>
        </li>
        <li>
          <label for="ClientID">
            客户端id:<span style="display:inline-block;width:1rem;"></span>&ensp;
          </label>
           <span style="text-align:left">{{ClientID}}</span>
        </li>
         <li>
          <label for="secretkey">
            密<span style="display:inline-block;width:2rem;"></span>钥：&ensp;
          </label>
           <span style="text-align:left">{{secretkey}}</span>
        </li>
         <!-- <li>
          <label for="oppenId">
            oppenId:<span style="display:inline-block;width:1rem;"></span>&ensp;
          </label>
           <span style="text-align:left">{{oppenId}}</span>
        </li> -->
          <!-- <li>
          <label for="Custominformation">
          自定义信息:<span style="display:inline-block;width:0rem;"></span>&ensp;
          </label>
           <span style="text-align:left">{{Custominformation}}</span>
        </li> -->
        <li>
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as API from "@/API/PartyUser.js";
import commonBread from "../../components/bread";

export default {
  name: "partyView",
  components: {
    commonBread
  },
  data() {
    return {
      partyName: "",
      partyTypeId: "",
      linkMan: "",
      linkPhone: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      id: "",
      code: "",
      account: "",
      ClientID:"",//客户端id
      secretkey:"",//密钥
      // oppenId:"",//oppenId
      // Custominformation:"",//自定义信息
      initPwd: "**********",
      typeArr: [],
      typeArr1: [],
      typeArr2: [],
      typeArr3: [],
      selectedType: "",
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
    getUserId() {
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
        if (res.code === 200 && res.result && res.result.length) {
          this.selectedType = res.result[0].codeName
        }
      });
    },
    // 详情功能
    getDetails() {
      API.postAddDepar1({
        id: this.id,
        partyschoolName: "",
        startDate: "",
        endDate: "",
        pageNum: "",
        pageSize: ""
      }).then(res => {
        console.log(res)
        if (res.result && res.result[0]) {
          var obj = res.result[0];
          this.partyName = obj.partyschoolName;
          this.linkMan = obj.contactName;
          this.linkPhone = obj.contactPhone;
          this.provinceName = obj.provinceName;
          this.cityName = obj.cityName;
          this.countyName = obj.countyName;
          this.account = obj.account;
          this.code = obj.partyschoolType;
          this.ClientID=obj.clientId
          this.secretkey=obj.secret
          // this.oppenId=obj.openId
          // this.Custominformation=obj.extraInfo
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
    this.getUserId();
    this.getInfo();
    this.getDetails();
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
    .wh(450px, 32px);
    margin-top: 35px;
    label {
      color: #999999;
    }
    input {
      .wh(360px, 32px);
      border: 1px solid #cccccc;
      .brs(5px);
      outline: none;
      padding: 0 10px;
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
.suozai {
  width: 358px;
  padding: 0 10px;
  // border: 1px solid #cccccc;
  height: 32px;
  border-radius: 4px;
  margin-left: 78px;
  margin-top: -25px;
  text-align: left;
  line-height: 32px;
}
.linkMan {
  margin-left: 7px;
}
</style>




