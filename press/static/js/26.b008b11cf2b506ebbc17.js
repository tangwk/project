webpackJsonp([26],{V41h:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Osha"),n=a("lK/u"),l={name:"ArticleSectionIn",data:function(){return{artName:"",articleData:[],currentPage:1,total:null}},watch:{artName:function(t){""===t&&this.search()}},methods:{search:function(){var t=this;this.articleData=[],n.a.getInColumnArticle({type:"1",partyschoolId:"",columnType:"3",sourceType:"1",columnId:this.reportID,title:this.artName,pageNum:this.currentPage,pageSize:10}).then(function(e){var a=e.result;200===e.code?(a.forEach(function(e){e.artName=e.title,e.artAuthor=e.author,e.artRelTime=t.formatDate(e.releaseTime),e.reportID=e.id,e.status=e.status}),t.articleData=a):900===e.code&&(t.currentPage>1?(t.currentPage=t.currentPage-1,t.search()):t.articleData=[]),e.number&&(t.total=e.number)})},handleSelectionChange:function(t){this.multipleSelection=t},artSecIn:function(){var t=this,e=[];this.multipleSelection.map(function(t){var a={};a.articleId=t.id,e.push(a)}),n.a.InColumnArticle({columnId:this.reportID,data:e}).then(function(e){200===e.code&&(t.$message({message:"导入成功！",type:"success"}),t.search())}).catch(function(t){})},handleCurrentChange:function(t){this.currentPage=t,this.search()},formatDate:function(t){var e=new Date(t),a=e.getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;var n=e.getDate();return a+"-"+r+"-"+(n=n<10?"0"+n:n)+" "}},created:function(){this.reportID=this.$route.query.reportID,this.search()},components:{commonBread:r.a}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boxBor"},[a("div",{staticClass:"crumbs"},[a("common-bread")],1),t._v(" "),a("div",{staticClass:"user"},[a("p",{staticClass:"titleBar"},[t._v("\n      文章导入\n    ")]),t._v(" "),a("div",{staticClass:"userListBor"},[a("div",{staticClass:"userList clear"},[a("div",{staticClass:"actBtn left"},[a("button",{staticClass:"newAdd",on:{click:t.artSecIn}},[t._v("导 入")])]),t._v(" "),a("ul",{staticClass:"fillIn right"},[a("li",[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.artName,expression:"artName"}],attrs:{type:"text",size:"small",name:"keyword",placeholder:"按文章标题搜索"},domProps:{value:t.artName},on:{input:function(e){e.target.composing||(t.artName=e.target.value)}}})]),t._v(" "),a("li",[a("button",{on:{click:t.search}},[t._v("搜 索")])])])]),t._v(" "),a("el-table",{ref:"singleTable",attrs:{data:t.articleData,"highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),t._v(" "),a("el-table-column",{attrs:{property:"artName",label:"文章标题","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artAuthor",label:"作者","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artRelTime",label:"发布时间","show-overflow-tooltip":"",align:"center"}})],1),t._v(" "),t.total>1?a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1):t._e()],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"keyword"}},[e("span",{staticStyle:{display:"inline-block",width:"0.2rem"}}),this._v("关\n              "),e("span",{staticStyle:{display:"inline-block",width:"0.26rem"}}),this._v("键\n              "),e("span",{staticStyle:{display:"inline-block",width:"0.26rem"}}),this._v("字 :\n              "),e("span",{staticStyle:{display:"inline-block",width:"0.18rem"}})])}]};var s=a("C7Lr")(l,i,!1,function(t){a("oHc1")},"data-v-5eee9064",null);e.default=s.exports},oHc1:function(t,e){}});
//# sourceMappingURL=26.b008b11cf2b506ebbc17.js.map