webpackJsonp([14],{"/Db1":function(t,e){},AsCi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Osha"),r=a("/p82"),s={name:"Article",data:function(){return{artName:"",articleData:[],deleteType:"",multipleSelection:[],currentPage:1,total:null,alertClosed:!1}},watch:{artName:function(t){""===t&&this.search()}},methods:{searchData:function(){this.articleData=[],this.currentPage=1,this.search()},search:function(){var t=this;this.articleData=[],r.a.getArticleList({type:"1",id:"",partyschoolId:"",title:this.artName,content:"",startDate:"",endDate:"",pageNum:this.currentPage,pageSize:10}).then(function(e){var a=e.result;if(200===e.code){a.forEach(function(e){e.artName=e.title,e.artAuthor=e.author,e.artRelTime=t.formatDate(e.releaseTime),e.reportID=e.id,e.status=e.status,"1"===e.status&&(e.status="已审批"),"2"===e.status&&(e.status="待审批"),"3"===e.status&&(e.status="未通过")}),t.articleData=a;for(var l=0;l<t.articleData.length;l++)9==l?t.articleData[l].num=t.currentPage+"0":1==t.currentPage?t.articleData[l].num=t.currentPage+l+"":t.articleData[l].num=t.currentPage-1+""+(l+1)}else 900===e.code&&(t.currentPage>1?(t.currentPage=t.currentPage-1,t.search()):t.articleData=[]);e.number&&(t.total=e.number)})},handleSelectionChange:function(t){this.multipleSelection=t},deleteAll:function(){var t=this,e=[];this.multipleSelection.map(function(t){var a={};a.id=t.id,a.status=t.status,e.push(a)}),r.a.deleteArticle({data:e}).then(function(e){200===e.code&&(t.alertClosed=!t.alertClosed,t.$message({message:"删除成功！",type:"success"}),t.search())})},deleteSingle:function(){var t=this;r.a.deleteArticle({data:[{id:this.currentDelId,status:this.status}]}).then(function(e){200===e.code&&(t.alertClosed=!t.alertClosed,t.$message({message:"删除成功！",type:"success"}),t.search())})},checkDel:function(){this.alertClosed=!this.alertClosed,this.deleteType="deleteAll"},handleDel:function(t,e){this.currentDelId=e.reportID,this.status=e.status,this.alertClosed=!this.alertClosed,this.deleteType="deleteSingle"},sureDel:function(){"deleteAll"===this.$refs.deleteRef.getAttribute("data-type")?this.deleteAll():this.deleteSingle()},close:function(){this.alertClosed=!this.alertClosed},pubArt:function(){this.$router.push("publishArticle")},handleLook:function(t,e){this.$router.push({name:"ArticleLook",query:{reportID:e.reportID,currentPage:this.currentPage}})},handleModify:function(t,e){this.$router.push({name:"ArticleModify",query:{reportID:e.reportID,currentPage:this.currentPage}})},handleCurrentChange:function(t){this.currentPage=t,this.search()},formatDate:function(t){var e=new Date(t),a=e.getFullYear(),l=e.getMonth()+1;l=l<10?"0"+l:l;var r=e.getDate();return a+"-"+l+"-"+(r=r<10?"0"+r:r)+" "}},components:{commonBread:l.a},created:function(){this.$route.query.currentPage&&(this.currentPage=Number(this.$route.query.currentPage)),this.search()},filters:{}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boxBor"},[a("div",{staticClass:"crumbs"},[a("common-bread")],1),t._v(" "),a("div",{staticClass:"user"},[a("p",{staticClass:"titleBar"},[t._v("\n        文章管理\n      ")]),t._v(" "),a("div",{staticClass:"userListBor"},[a("div",{staticClass:"userList clear"},[a("div",{staticClass:"actBtn left"},[a("button",{staticClass:"newAdd",on:{click:t.pubArt}},[t._v("发布文章")])]),t._v(" "),a("ul",{staticClass:"fillIn right"},[a("li",[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.artName,expression:"artName"}],attrs:{type:"text",size:"small",name:"keyword",placeholder:"按文章标题搜索"},domProps:{value:t.artName},on:{input:function(e){e.target.composing||(t.artName=e.target.value)}}})]),t._v(" "),a("li",[a("button",{on:{click:t.searchData}},[t._v("搜 索")])])])]),t._v(" "),a("el-table",{ref:"singleTable",attrs:{data:t.articleData,"highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{property:"num",label:"序号","show-overflow-tooltip":"",width:"80px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artName",label:"文章标题","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artAuthor",label:"作者","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artRelTime",label:"发布时间","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"status",label:"状态","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"iconfont icon-yanjing-copy",attrs:{title:"查看"},on:{click:function(a){t.handleLook(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-web-icon-",attrs:{title:"修改"},on:{click:function(a){t.handleModify(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-shanchu-copy",attrs:{title:"删除"},on:{click:function(a){t.handleDel(e.$index,e.row)}}})]}}])})],1),t._v(" "),t.total>1?a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":10,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1):t._e()],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.alertClosed,expression:"alertClosed"}],staticClass:"dataDel"},[a("div",{staticClass:"sureDel"},[a("div",{staticClass:"titleDel"},[a("p",[t._v("确认删除")]),t._v(" "),a("i",{staticClass:"iconfont icon-guanbi",on:{click:t.close}})]),t._v(" "),a("h3",[t._v("是否确认删除?")]),t._v(" "),a("p",[a("button",{ref:"deleteRef",attrs:{"data-type":t.deleteType},on:{click:t.sureDel}},[t._v("确定")]),t._v(" "),a("button",{on:{click:t.close}},[t._v("取消")])])]),t._v(" "),a("div",{staticClass:"opacityDel"})])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"keyword"}},[e("span",{staticStyle:{display:"inline-block",width:"0.2rem"}}),this._v("关\n                    "),e("span",{staticStyle:{display:"inline-block",width:"0.26rem"}}),this._v("键\n                    "),e("span",{staticStyle:{display:"inline-block",width:"0.26rem"}}),this._v("字 :\n                    "),e("span",{staticStyle:{display:"inline-block",width:"0.18rem"}})])}]};var n=a("C7Lr")(s,i,!1,function(t){a("/Db1")},"data-v-e71e17b0",null);e.default=n.exports}});
//# sourceMappingURL=14.c30b1dfd9c91b72853f6.js.map