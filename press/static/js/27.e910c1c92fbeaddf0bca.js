webpackJsonp([27],{Th32:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("Osha"),i=o("r7iS"),r=o("/p82"),n={name:"todoVidDetails",data:function(){return{videoName:"",videoTime:"",videoContent:"",opinion:"",typeVal:"",videoUrl:"",options:[{label:"类型1",value:"1"},{label:"类型2",value:"2"},{label:"类型3",value:"3"},{label:"类型4",value:"4"},{label:"类型5",value:"5"}],eDitor:""}},methods:{demo:function(){this.$router.back(-1)},toLook:function(){var e=this;r.a.getVideos({id:this.reportID}).then(function(t){var o=t.result;e.videoName=o.videoName,e.videoTime=e.formatDate(o.uploadDate),e.typeVal=o.videoType,e.videoContent=o.videoContent.replace(/<\/?.+?>/g,""),e.videoId=o.id,e.videoUrl=o.realUrl}).catch(function(e){})},agree:function(){var e=this;i.a.agreeTodo({data:[{resourcesId:this.videoId,resourcesType:2,status:1,opinion:this.opinion}]}).then(function(t){e.$router.push("/layOut/todo?currentPage="+e.$route.query.currentPage)})},disagree:function(){var e=this;i.a.agreeTodo({data:[{resourcesId:this.videoId,resourcesType:2,status:3,opinion:this.opinion}]}).then(function(t){e.$router.push("/layOut/todo?currentPage="+e.$route.query.currentPage)})},formatDate:function(e){var t=new Date(e),o=t.getFullYear(),a=t.getMonth()+1;a=a<10?"0"+a:a;var i=t.getDate();return o+"-"+a+"-"+(i=i<10?"0"+i:i)+" "}},created:function(){this.reportID=this.$route.query.reportID,this.toLook()},components:{commonBread:a.a}},l={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"boxBor"},[o("div",{staticClass:"crumbs"},[o("common-bread")],1),e._v(" "),o("div",{staticClass:"user"},[o("p",{staticClass:"titleBar"},[e._v("\n      视频资源详情\n    ")]),e._v(" "),o("ul",{staticClass:"newsvidBor"},[o("li",[o("iframe",{staticClass:"iframe",attrs:{width:"100%",height:"358px",src:e.videoUrl,frameborder:"0"}})]),e._v(" "),o("li",[o("el-input",{attrs:{readonly:"",id:"title"},model:{value:e.videoName,callback:function(t){e.videoName=t},expression:"videoName"}})],1),e._v(" "),o("li",{staticClass:"clear"},[o("el-input",{attrs:{readonly:"",id:"time"},model:{value:e.videoTime,callback:function(t){e.videoTime=t},expression:"videoTime"}}),e._v(" "),o("el-select",{attrs:{clearable:"",disabled:"",placeholder:""},model:{value:e.typeVal,callback:function(t){e.typeVal=t},expression:"typeVal"}},e._l(e.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),o("li",[o("div",{staticClass:"editor",domProps:{innerHTML:e._s(e.videoContent)}})]),e._v(" "),o("li",{staticClass:"submit"},[o("button",{staticStyle:{background:"#79ac88",color:"#fff"},on:{click:e.demo}},[e._v("返回")])])])])])},staticRenderFns:[]};var s=o("C7Lr")(n,l,!1,function(e){o("Zepe")},"data-v-5b8028c6",null);t.default=s.exports},Zepe:function(e,t){}});
//# sourceMappingURL=27.e910c1c92fbeaddf0bca.js.map