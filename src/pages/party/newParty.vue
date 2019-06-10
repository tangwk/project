<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        新增党校
      </p>
      <ul class="resetPwd">
        <!-- 三级联动 -->
        <li>
          <label for="account">
              <i class="iconfont icon-xinghao"></i>
              所在地区:<span style="display:inline-block;width:0.5rem;"></span>
             </label>
          <drop-down-menu class="dropDown" :list="typeArr1" name="typeSelected1" id="area1" v-model="typeSelected1" @input="onSelectProvince()"></drop-down-menu>
          <drop-down-menu class="dropDown" :list="typeArr2" name="typeSelected2" id="area1" v-model="typeSelected2" @input="onSelectCity()"></drop-down-menu>
          <drop-down-menu class="dropDown" :list="typeArr3" name="typeSelected3" id="area1" v-model="typeSelected3"></drop-down-menu>
        </li>
        <!-- 三级联动 -->
        <li>
          <label for="partyName"><i class="iconfont icon-xinghao"></i>党校名称 : &ensp;</label>
          <input type="text" name="partyName" v-model="partyName" placeholder="请输入党校名称" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('partyName')} " />
          <p id="hint">{{errors.first('partyName')}}</p>
        </li>
        <li>
          <label for="partyType">
                  <i class="iconfont icon-xinghao"></i>类<span style="display:inline-block;width:1.5rem;"></span>型 : &ensp;
             </label>
          <drop-down-menu class="dropDown" :list="typeArr" :value="typeSelted" name="typeSelected" @input="typeSelected"></drop-down-menu>
          <p id="hint">{{errors.first('typeSelected')}}</p>
        </li>
        <li>
          <label for="linkMan"><span style="display: inline-block;width: 22px;"></span>联<span style="display:inline-block;width:0.18rem;"></span>系<span style="display:inline-block;width:0.18rem;"></span> 人 : &ensp;
            </label>
          <input style="margin-left:6px" type="text" name="linkMan" v-model="linkMan" placeholder="请输入姓名" />
          <p id="hint">{{errors.first('linkMan')}}</p>
        </li>
        <li>
          <label for="linkPhone"><span style="display: inline-block;width: 26px;"></span>联系电话 : &ensp;</label>
          <input style="margin-left:-2px" type="text" name="linkPhone" v-model="linkPhone" placeholder="请输入电话号码" v-validate="'telephone'" />
          <p id="hint">{{errors.first('linkPhone')}}</p>
        </li>
        <li>
          <label for="account">
               <i class="iconfont icon-xinghao"></i>账<span style="display:inline-block;width:1.5rem;"></span>号 : &ensp;
            </label>
          <input @blur="shiJiao" type="text" name="account" v-model="account" placeholder="请输入账号" v-validate="'required|user'" :class=" {'input':true, 'is-danger': errors.has('account')} " />
          <p id="hint">{{errors.first('account')}}</p>
        </li>
        <li>
          <label for="initPwd"><i class="iconfont icon-xinghao"></i>初始密码 : &ensp;</label>
          <input type="password" name="initPwd" v-model="initPwd" placeholder="请输入密码" v-validate="'required|password'" :class=" {'input':true, 'is-danger': errors.has('initPwd')} " />
          <p id="hint">{{errors.first('initPwd')}}</p>
        </li>
          <li  style="margin-left:23px;width:600px;color:red">
          <label for="ClientID">客户端id   : &ensp;</label>
          <input type="text" name="ClientID" v-model="ClientID" placeholder="请输入客户端id"/>
          <span>请在内容管理平台获取</span>
        </li>
         <li  style="margin-left:46px;width:600px;color:red">
          <label for="secretkey">密钥   : &ensp;</label>
          <input type="text" name="secretkey" v-model="secretkey" placeholder="请输入密钥"/>
           <span>请在内容管理平台获取</span>
        </li>
         <!-- <li  style="margin-left:19px">
          <label for="oppenId">oppenId : &ensp;</label>
          <input type="text" name="oppenId" v-model="oppenId" placeholder="请输入oppenId(微信用户提供)"/>
        </li> -->
          <!-- <li  style="margin-left:6px;width:600px;color:red">
          <label for="Custominformation">自定义信息 : &ensp;</label>
          <input type="text" name="Custominformation" v-model="Custominformation" placeholder="请输入自定义信息"/>
           <span>请在内容管理平台获取</span>
        </li> -->
        <li>
          <button @click="newPartySubmit">保 存</button>
          <button @click="goBack">取 消</button>
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
  name: "NewParty",
  data() {
    return {
      partyName: "",
      partyTypeId: "",
      linkMan: "",
      linkPhone: "",
      address: "",
      account: "",
      initPwd: "",
      ClientID:"",//客户端ID
      secretkey:"",//密钥
      // oppenId:"",//openId
      // Custominformation:"",//自定义信息
      typeArr: [],
      typeArr1: [],
      typeArr2: [],
      typeArr3: [],
      typeSelected1: [
        {
          name: "",
          id: ""
        }
      ],
      typeSelected2: [
        {
          name: "",
          id: ""
        }
      ],
      typeSelected3: [
        {
          name: "",
          id: ""
        }
      ],
      typeSelted: ""
    };
  },
  // watch: {
  //   typeSelected1(nval, oval) {
  //     if (nval !== oval) {
  //       this.getTypeList1();
  //     }
  //   },
  //   typeSelected2(nval, oval) {
  //     if (nval !== oval) {
  //       this.getTypeList2();
  //     }
  //   }
  // },
  methods: {
    // 获取党校类型
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
    onSelectProvince() {
      this.getTypeList1();
      // 市区清空
      this.typeSelected2 = [
        {
          name: "",
          id: ""
        }
      ];
      this.typeSelected3 = [
        {
          name: "",
          id: ""
        }
      ];
      this.typeArr3 = [];
    },
    onSelectCity() {
      this.getTypeList2();
      this.typeSelected3 = [
        {
          name: "",
          id: ""
        }
      ];
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
    //用户名校样
    shiJiao() {
      API.jiaoYang({
        userId: this.account,
        userType: 2,
        partyschoolId:""
      }).then(res => {
        if (res.code !== 200) {
          this.$message({
            message: "用户已存在!",
            type: "warning"
          });
          this.account = "";
        }
      });
    },
    // 党校类型弹出下拉框当前选中值
    typeSelected(obj) {
      // 初始默认值
      this.partyTypeId = obj[0].id;
    },
    // 点击保存新增的方法
    newPartySubmit() {
      // 表单校验:
      this.$validator.validateAll().then(res => {
        if (res) {
          API.postAddDepar({
            partyschoolName: this.partyName, //党校名称
            provinceCode: this.typeSelected1[0].id, //编码
            provinceName: this.typeSelected1[0].name, //所在地
            cityCode: this.typeSelected2[0].id,
            cityName: this.typeSelected2[0].name,
            countyCode: this.typeSelected3[0].id,
            countyName: this.typeSelected3[0].name,
            partyschoolType: this.typeArr[0].id, //类型
            contactName: this.linkMan, //联系人
            contactPhone: this.linkPhone, //联系电话
            account: this.account, //账号
            passWord: this.initPwd,//初始密码
            clientId:this.ClientID,//客户端id
            secret:this.secretkey,//密钥
            // openId:this.oppenId,//oppenId
            // extraInfo:this.Custominformation,//自定义信息
          }).then(res => {
            if (res.code == "200") {
              this.$router.push("PartyUser");
              this.partyName = "";
              this.address = "";
              this.linkMan = "";
              this.linkPhone = "";
              this.account = "";
              this.initPwd = "";
              this.partyschoolType = "";
              this.$message({
                message: "保存成功!",
                type: "success"
              });
            } else {
              // alert(res.data.msg || res.data.status.msg);
              this.$message({
                message: "保存失败!",
                type: "warning"
              });
            }
          });
        }
      });
    },
    // 点击取消返回的方法
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getTypeList();
    this.getInfo();
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
    .wh(450px, 32px);
    margin-top: 35px;
    label {
      .wh(90px, 32px);
      .ft(13px, 32px);
      color: #999999;
      i {
        font-size: 24px;
        color: #ff0000;
      }
    }
    input {
      .wh(350px, 32px);
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
      width: 350px;
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
.cascader {
  width: 345px;
  height: 32px;
  margin-left: -10px;
}
#hint {
  font-size: 14px;
  color: #ff0000;
  margin-left: 100px;
}
#area1 {
  width: 115px;
}
</style>




