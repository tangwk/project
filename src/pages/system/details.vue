<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        角色详情
      </p>
      <ul class="resetPwd">
        <li style="padding-left:150px">
          <label for="partyType">
              角色名称 : &ensp;
         </label>
          <div class="role">{{this.partyName}}</div>
        </li>
        <li  style="padding-left:150px">
          <label for="account">
             角色权限 : &ensp;
           </label>
          <div id="tree">
            <el-tree :data="data2" show-checkbox node-key="id" :default-checked-keys="rollQuan" @check="small">
            </el-tree>
          </div>
        </li>
        <li  style="padding-left:150px">
          <label for="partyType">
                      备<span style="display:inline-block;width:1.5rem;"></span>注 : &ensp;
                    </label>
          <div class="role">{{this.remark}}</div>
        </li>
        <li>
          <button @click="goBack">返 回</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "@/API/system.js";
  import commonBread from '../../components/bread'
  export default {
    name: 'xdetails',
    data() {
      return {
        partyName: '',
        remark: '',
        partyTypeId: '',
        linkMan: '',
        linkPhone: '',
        address: '',
        account: '',
        initPwd: '',
        value: '',
        data2: [],
        options: [],
        id: "",
        roleArr: [],
        rollQuan: []
      }
    },
    watch: {
      value() {
        this.small()
      }
    },
    methods: {
      // 权限列表的展示
      search() {
        API.findMenu({
          type: "1"
        }).then(res => {
          var arr=res.result
          arr.forEach(item=>{
            item.disabled=true
            if(item.children.length){
              var _arr=item.children
              _arr.forEach(i=>{
                i.disabled=true
              })
            }
          })
          if (res.code === 200) {
            this.data2 = res.result
          }
        })
      },
      //获取用户传过来的id
      demo() {
        this.id = this.$route.query.reportID
      },
      small(arr1, arr2) {
        this.roleArr = []
        arr2.checkedKeys.forEach(item => {
          var obj = {}
          obj.authorityId = item
          this.roleArr.push(obj)
        })
      },
      newPartySubmit() {
        // 表单校验:
        this.$validator.validateAll().then((res) => {
          if (res) {
            API.AddDepar({
              "id": this.id,
              "partyschoolId": "",
              "roleName": "",
              "remark": "",
              "pageNum": "",
              "pageSize": "",
              "type":1
            }).then((res) => {
              if (res.code === 200) {
                this.partyName = res.result[0].roleName
                this.remark = res.result[0].remark
              } else {
                alert(res.data.msg || res.data.status.msg)
              }
            })
          }
        })
      },
      baocun() {
        API.baocunID({
          "roleId": this.id
        }).then(res => {
          var arr = []
          res.result.forEach(item => {
            arr.push(item.id)
          })
          this.rollQuan = arr
        })
      },
      goBack() {
        this.$router.go(-1)
      }
    },
    created() {
      this.search()
      this.demo()
      this.newPartySubmit()
      this.baocun()
    },
    components: {
      commonBread,
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mix';
  @import '../../style/magTable';
  .resetPwd {
    width: 450px;
    margin: 50px auto;
    li {
      width: 450px;
      margin-top: 35px;
      label {
        display: inline-block;
        .wh(90px, 32px);
        .ft(13px, 32px);
        text-align: center;
        color: #999999;
        i {
          font-size: 24px;
          color: #FF0000;
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
      .el-select {
        width: 350px;
      }
      .hint {
        margin-left: 82px;
        .ft(14px, 18px);
        color: @dc;
      }
      &:nth-child(5) {
        label {
          display: inline-block;
        }
        .el-textarea__inner {
          height: 80px !important;
        }
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
  .el-date-editor.el-input {
    width: 350px !important;
  }
  .remark {
    width: 350px;
    box-sizing: border-box;
  }
  #hint {
    font-size: 14px;
    color: #ff0000;
    margin-left: 100px;
  }
  #tree {
    margin-left: 70px;
  }
    .role{
    width: 350px;
    height: 32px;
    margin-left: 93px;
    margin-top: -30px;
    // border: 1px solid #ccc;
    border-radius:5px;
    line-height: 32px;
    font-size:13px
  }
</style>
