webpackJsonp([21],{"1uYi":function(t,e){},"V9/v":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Osha"),i=a("lK/u"),l={name:"ArticleSectionLook",data:function(){return{numberTop:"",artName:"",articleTopData:[],articleData:[],deleteType:"",multipleSelection:[],currentPage:1,total:null,alertClosed:!1,artSecTitle:this.$route.query.columnName,editorFlag:!1}},watch:{artName:function(t){""===t&&this.search()}},methods:{editor:function(){var t=this;this.editorFlag=!0,this.$nextTick(function(){t.$refs.inputName.focus()})},editorBlur:function(){var t=this;i.a.updateColumn({id:this.$route.query.reportID,columnName:this.artSecTitle,columnType:"3"}).then(function(e){200==e.code&&(t.editorFlag=!1,t.$message({message:"修改成功!",type:"success"}))})},search:function(){var t=this;this.articleData=[],i.a.getColumnArticle({type:"1",id:"",title:this.artName,columnId:this.reportID,pageNum:this.currentPage,pageSize:10}).then(function(e){var a=e.result;if(200===e.code){t.artSecTitle=a[0].columnName;a.forEach(function(e){var a={};a.artName=e.title,a.artAuthor=e.author,a.artRelTime=t.formatDate(e.releaseTime),a.reportID=e.id,a.mark=e.mark,a.articleOrder=e.articleOrder,"0"===e.mark&&t.articleData.push(a)})}else 900===e.code&&(t.currentPage>1?(t.currentPage=t.currentPage-1,t.search()):t.articleData=[]);e.number&&(t.total=e.number)}).catch(function(t){}),this.articleTopData=[],i.a.getColumnTopArticle({type:"1",title:this.artName,columnId:this.reportID}).then(function(e){var a=e.result;if(200===e.code){t.numberTop=e.number+1,t.artSecTitle=a[0].columnName;a.forEach(function(e){var a={};a.artName=e.title,a.artAuthor=e.author,a.artRelTime=t.formatDate(e.releaseTime),a.reportID=e.id,a.mark=e.mark,a.articleOrder=e.articleOrder,"1"===e.mark&&t.articleTopData.push(a)})}else 900===e.code&&(t.numberTop=1)})},handleSelectionChange:function(t){this.multipleSelection=t},deleteAll:function(){var t=this,e=[];this.multipleSelection.map(function(t){var a={};a.id=t.reportID,e.push(a)}),i.a.deleteColumnArticle({columnId:this.reportID,data:e,status:0}).then(function(e){200===e.code&&(t.alertClosed=!t.alertClosed,t.$message({message:"删除成功！",type:"success"}),t.search())})},deleteSingle:function(){var t=this;i.a.deleteColumnArticle({columnId:this.reportID,data:[{id:this.currentDelId}],status:0}).then(function(e){200===e.code&&(t.alertClosed=!t.alertClosed,t.$message({message:"删除成功！",type:"success"}),t.search())})},checkDel:function(){this.alertClosed=!this.alertClosed,this.deleteType="deleteAll"},handleDel:function(t,e){this.currentDelId=e.reportID,this.alertClosed=!this.alertClosed,this.deleteType="deleteSingle"},sureDel:function(){"deleteAll"===this.$refs.deleteRef.getAttribute("data-type")?this.deleteAll():this.deleteSingle()},close:function(){this.alertClosed=!this.alertClosed},handleDetails:function(t,e){this.$router.push("aslDetails?reportID="+e.reportID)},handleIstop:function(t,e){var a=this;i.a.updateArticleMark({id:e.reportID,mark:"1",articleOrder:this.numberTop}).then(function(t){a.search()})},handleUnstick:function(t,e){var a=this;i.a.updateArticleMark({id:e.reportID,mark:"0",articleOrder:this.numberTop}).then(function(e){a.articleTopData.splice(t,1);for(var r=1;r<=a.articleTopData.length;r++)a.articleTopData[r-1].sort=r,i.a.updateArticleMark({id:a.articleTopData[r-1].reportID,mark:"1",articleOrder:r}).then(function(t){});a.search()})},handleUp:function(t,e){var a=this,r=[];this.articleTopData.forEach(function(e,a){a===t?r.push({id:e.reportID,articleOrder:t}):a===t-1?r.push({id:e.reportID,articleOrder:t+1}):r.push({id:e.reportID,articleOrder:a+1})}),0!=t?i.a.updateArticleOrder({data:r}).then(function(r){a.articleTopData.splice(t-1,0,e),a.articleTopData.splice(t+1,1)}):this.$message({message:"已到顶！",type:"warning"})},handleDown:function(t,e){var a=this,r=[];this.articleTopData.forEach(function(e,a){a===t?r.push({id:e.reportID,articleOrder:t+2}):a===t+1?r.push({id:e.reportID,articleOrder:t+1}):r.push({id:e.reportID,articleOrder:a+1})}),t!==this.articleTopData.length-1?i.a.updateArticleOrder({data:r}).then(function(r){a.articleTopData.splice(t+2,0,e),a.articleTopData.splice(t,1)}):this.$message({message:"已到底！",type:"warning"})},handleCurrentChange:function(t){this.currentPage=t,this.search()},formatDate:function(t){var e=new Date(t),a=e.getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;var i=e.getDate();return a+"-"+r+"-"+(i=i<10?"0"+i:i)+" "}},created:function(){this.reportID=this.$route.query.reportID,this.search()},components:{commonBread:r.a}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boxBor"},[a("div",{staticClass:"crumbs"},[a("common-bread")],1),t._v(" "),a("div",{staticClass:"user"},[a("p",{staticClass:"titleBar"},[t._v("\n        文章栏目查看\n      ")]),t._v(" "),a("div",{staticClass:"userListBor"},[a("div",{staticStyle:{"text-align":"center"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:!t.editorFlag,expression:"!editorFlag"}],staticStyle:{"font-size":"20px"},attrs:{for:""},domProps:{textContent:t._s(this.artSecTitle)}}),t._v(" "),a("el-input",{directives:[{name:"show",rawName:"v-show",value:t.editorFlag,expression:"editorFlag"}],ref:"inputName",staticClass:"artSecTitle",staticStyle:{width:"200px"},on:{blur:t.editorBlur},model:{value:t.artSecTitle,callback:function(e){t.artSecTitle=e},expression:"artSecTitle"}}),t._v(" "),a("i",{staticClass:"el-icon-edit-outline",staticStyle:{"font-size":"20px",cursor:"pointer"},on:{click:t.editor}})],1),t._v(" "),a("div",{staticClass:"userList clear"},[a("div",{staticClass:"actBtn left"},[a("button",{staticClass:"newAdd",attrs:{disabled:0==t.multipleSelection.length},on:{click:t.checkDel}},[t._v("批量删除")])]),t._v(" "),a("ul",{staticClass:"fillIn right"},[a("li",[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.artName,expression:"artName"}],attrs:{type:"text",size:"small",name:"keyword",placeholder:"按文章标题搜索"},domProps:{value:t.artName},on:{input:function(e){e.target.composing||(t.artName=e.target.value)}}})]),t._v(" "),a("li",[a("button",{on:{click:t.search}},[t._v("搜 索")])])])]),t._v(" "),a("div",{staticClass:"bgTop"},[a("el-table",{ref:"singleTable",attrs:{data:t.articleTopData,"max-height":"287","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"index",label:"置顶区",width:"80px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artName",label:"文章标题","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artAuthor",label:"作者","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artRelTime",label:"发布时间","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"iconfont icon-xiangqing",staticStyle:{color:"#79ac88"},attrs:{title:"详情"},on:{click:function(a){t.handleDetails(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-shangyi",staticStyle:{color:"#0089cc"},attrs:{title:"上移"},on:{click:function(a){t.handleUp(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-shangyi-copy",staticStyle:{color:"#0089cc"},attrs:{title:"下移"},on:{click:function(a){t.handleDown(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-quxiaozhiding",staticStyle:{color:"#e82121"},attrs:{title:"取消置顶"},on:{click:function(a){t.handleUnstick(e.$index,e.row)}}})]}}])})],1)],1),t._v(" "),a("el-table",{ref:"singleTable",staticStyle:{background:"#ccc"},attrs:{data:t.articleData,"highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"80px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artName",label:"文章标题","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artAuthor",label:"作者","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{property:"artRelTime",label:"发布时间","show-overflow-tooltip":"",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"240",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"iconfont icon-xiangqing",attrs:{title:"详情"},on:{click:function(a){t.handleDetails(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-zhiding",attrs:{title:"置顶"},on:{click:function(a){t.handleIstop(e.$index,e.row)}}}),t._v(" "),a("i",{staticClass:"iconfont icon-shanchu-copy",attrs:{title:"删除"},on:{click:function(a){t.handleDel(e.$index,e.row)}}})]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,total:t.total,"page-size":10,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.handleCurrentChange}})],1)],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.alertClosed,expression:"alertClosed"}],staticClass:"dataDel"},[a("div",{staticClass:"sureDel"},[a("div",{staticClass:"titleDel"},[a("p",[t._v("确认删除")]),t._v(" "),a("i",{staticClass:"iconfont icon-guanbi",on:{click:t.close}})]),t._v(" "),a("h3",[t._v("确定要把所选文章进行删除吗？")]),t._v(" "),a("p",[a("button",{ref:"deleteRef",attrs:{"data-type":t.deleteType},on:{click:t.sureDel}},[t._v("确定")]),t._v(" "),a("button",{on:{click:t.close}},[t._v("取消")])])]),t._v(" "),a("div",{staticClass:"opacityDel"})])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"keyword"}},[this._v("\n                  关"),e("span",{staticStyle:{margin:"0 0.5em"}},[this._v("键")]),e("span",{staticStyle:{"margin-right":"0.5em"}},[this._v("字 : ")])])}]};var o=a("C7Lr")(l,n,!1,function(t){a("1uYi")},"data-v-6dfb77cc",null);e.default=o.exports}});
//# sourceMappingURL=21.136fee05b7bc4f05f7b5.js.map