webpackJsonp([33],{hdrl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("7FYt"),i={name:"RoleDetails",data:function(){return{partyName:"",remark:"",partyTypeId:"",linkMan:"",linkPhone:"",address:"",account:"",initPwd:"",value:"",data2:[],options:[],id:"",roleArr:[],rollQuan:[]}},watch:{value:function(){this.small()}},methods:{search:function(){var t=this;r.e({type:"1"}).then(function(e){200===e.code&&(t.data2=e.result)})},demo:function(){this.id=this.$route.query.reportID},small:function(t,e){var a=this;if(this.roleArr){var r=[];this.rollQuan.forEach(function(t){var e={};e.authorityId=t,r.push(e)}),this.roleArr1=r}this.roleArr=[],e.checkedKeys.forEach(function(t){var e={};e.authorityId=t,a.roleArr.push(e)})},newPartySubmit:function(){var t=this;this.$validator.validateAll().then(function(e){e&&r.a({id:t.id,partyschoolId:"",roleName:"",remark:"",pageNum:"",pageSize:"",type:1}).then(function(e){200===e.code?(t.partyName=e.result[0].roleName,t.remark=e.result[0].remark):alert(e.data.msg||e.data.status.msg)})})},xiugai:function(){var t=this;r.b({id:this.id,roleName:this.partyName,remark:this.remark,data:this.roleArr,type:1}).then(function(e){200===e.code&&(t.$router.push("role"),t.$message({message:"保存成功",type:"success"}))})},baocun:function(){var t=this;r.c({roleId:this.id}).then(function(e){var a=[];e.result.forEach(function(t){a.push(t.id)}),t.rollQuan=a})},goBack:function(){this.$router.go(-1)},resetCheckedAll:function(){var t=this;r.e({type:"1"}).then(function(e){var a=[],r=[],i=[];e.result.forEach(function(t){var e={};a.push(t.id),e.authorityId=t.id,r.push(e)}),e.result.forEach(function(t){t.children.length&&t.children.forEach(function(t){var e={};e.authorityId=t.id,i.push(e)})}),t.roleArr=r.concat(i),t.$refs.trees.setCheckedKeys(a)})},resetChecked:function(){this.$refs.trees.setCheckedKeys([]),this.roleArr=[]}},created:function(){this.search(),this.demo(),this.newPartySubmit(),this.baocun()},components:{commonBread:a("Osha").a}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boxBor"},[a("div",{staticClass:"crumbs"},[a("common-bread")],1),t._v(" "),a("div",{staticClass:"user"},[a("p",{staticClass:"titleBar"},[t._v("\n      角色详情\n    ")]),t._v(" "),a("ul",{staticClass:"resetPwd"},[a("li",[a("i",{staticClass:"iconfont icon-xinghao",staticStyle:{color:"red"}}),t._v(" "),a("label",{attrs:{for:"partyType"}},[t._v("\n                         角色名称 :  \n                       ")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.partyName,expression:"partyName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":t.errors.has("partyName")},attrs:{type:"text",name:"partyName",placeholder:"请输入账号"},domProps:{value:t.partyName},on:{input:function(e){e.target.composing||(t.partyName=e.target.value)}}}),t._v(" "),a("p",{attrs:{id:"hint"}},[t._v(t._s(t.errors.first("partyName")))])]),t._v(" "),a("li",[a("i",{staticClass:"iconfont icon-xinghao",staticStyle:{color:"red"}}),t._v(" "),a("label",{attrs:{for:"account"}},[t._v("\n                         角色权限 :  \n                      ")]),t._v(" "),a("div",{staticClass:"anNiu"},[a("el-button",{attrs:{round:"",type:"primary",id:"quanxuan"},on:{click:t.resetCheckedAll}},[t._v("全选")]),t._v(" "),a("el-button",{attrs:{round:"",id:"quanxuan"},on:{click:t.resetChecked}},[t._v("清空")])],1),t._v(" "),a("div",{attrs:{id:"tree"}},[a("el-tree",{ref:"trees",attrs:{data:t.data2,"show-checkbox":"","node-key":"id","default-checked-keys":t.rollQuan},on:{check:t.small}})],1)]),t._v(" "),a("li",[t._m(0),t._v(" "),a("el-input",{staticClass:"remark",attrs:{type:"textarea",rows:1,placeholder:"请输入内容",resize:"none"},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),a("li",[a("button",{on:{click:t.xiugai}},[t._v("保 存")]),t._v(" "),a("button",{on:{click:t.goBack}},[t._v("取 消")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"partyType"}},[this._v("\n                        备"),e("span",{staticStyle:{display:"inline-block",width:"1.5rem"}}),this._v("注 :  \n                      ")])}]};var s=a("C7Lr")(i,n,!1,function(t){a("k8fn")},"data-v-4abefc52",null);e.default=s.exports},k8fn:function(t,e){}});
//# sourceMappingURL=33.080d5e06bc7209e434a8.js.map