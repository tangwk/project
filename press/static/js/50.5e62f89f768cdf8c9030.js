webpackJsonp([50],{LLqs:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("IvJb"),r=a("Osha"),s=a("dC0T"),n=a("/p82");i.default.filter("dateFormat",function(t){var e=new Date(parseInt(t));return e.getFullYear()+"-"+(e.getMonth()+1).toString().padStart(2,"0")+"-"+e.getDate().toString().padStart(2,"0")});var l={name:"PublishArticle",data:function(){return{artName:"",subName:"",artAuthor:"",artTime:new Date,artContent:"",config:{initialFrameWidth:null,initialFrameHeight:350},editor:null}},methods:{goBack:function(){this.$router.go(-1)},handleReady:function(t){this.editor=t},submit:function(){var t=this,e=this.editor.getContent();this.artContent=e;var a=this;this.$validator.validateAll().then(function(e){e&&n.a.addArticle({type:"1",partyschoolId:"",title:a.artName,content:a.artContent,subtitle:a.subName,author:a.artAuthor,releaseTime:a.artTime,releaseId:localStorage.getItem("userId"),releaseName:localStorage.getItem("userName")}).then(function(e){t.$router.push("/layOut/article")})})}},components:{commonBread:r.a,UE:s.a},destroyed:function(){}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"boxBor"},[a("div",{staticClass:"crumbs"},[a("common-bread")],1),t._v(" "),a("div",{staticClass:"user"},[a("p",{staticClass:"titleBar"},[t._v("\n      文章发布\n    ")]),t._v(" "),a("ul",{staticClass:"newsBor"},[a("li",[t._m(0),t._v(" "),a("el-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":t.errors.has("artTitle")},attrs:{name:"artTitle",id:"title"},model:{value:t.artName,callback:function(e){t.artName=e},expression:"artName"}}),t._v(" "),a("p",{staticClass:"hint"},[t._v(" "+t._s(t.errors.first("artTitle"))+" ")])],1),t._v(" "),a("li",[t._m(1),t._v(" "),a("el-input",{attrs:{id:"title"},model:{value:t.subName,callback:function(e){t.subName=e},expression:"subName"}})],1),t._v(" "),a("li",{staticClass:"clear"},[a("div",{staticClass:"left"},[t._m(2),t._v(" "),a("el-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":t.errors.has("authorName")},attrs:{id:"title",name:"authorName"},model:{value:t.artAuthor,callback:function(e){t.artAuthor=e},expression:"artAuthor"}}),t._v(" "),a("p",{staticClass:"hint"},[t._v(" "+t._s(t.errors.first("authorName"))+" ")])],1),t._v(" "),a("div",{staticClass:"right"},[a("label",{attrs:{for:"time"}},[t._v("发布时间 :")]),t._v(" "),a("span",[t._v(t._s(t._f("dateFormat")(Date.now())))])])]),t._v(" "),a("li",[t._m(3),t._v(" "),a("div",{staticClass:"editor"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.artContent,expression:"artContent"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{input:!0,"is-danger":t.errors.has("artContent")},attrs:{type:"hidden",name:"artContent"},domProps:{value:t.artContent},on:{input:function(e){e.target.composing||(t.artContent=e.target.value)}}}),t._v(" "),a("UE",{ref:"ue",attrs:{config:t.config},on:{onready:t.handleReady}})],1),t._v(" "),a("p",{staticClass:"hint"},[t._v(" "+t._s(t.errors.first("artContent"))+" ")])]),t._v(" "),a("li",{staticClass:"submit"},[a("button",{on:{click:t.submit}},[t._v("发 布")]),t._v(" "),a("button",{on:{click:t.goBack}},[t._v("取 消")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"title"}},[e("i",{staticClass:"iconfont icon-xinghao"}),this._v("文章标题 :")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"title"}},[e("span",{staticStyle:{display:"inline-block",width:"24px"}}),this._v("副"),e("span",{staticStyle:{display:"inline-block",width:"6.5px"}}),this._v("标"),e("span",{staticStyle:{display:"inline-block",width:"6.5px"}}),this._v("题 :")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"author"}},[e("i",{staticClass:"iconfont icon-xinghao"}),this._v("作"),e("span",{staticStyle:{display:"inline-block",width:"28px"}}),this._v("者 :")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{for:"content"}},[e("i",{staticClass:"iconfont icon-xinghao"}),this._v("发布内容 :")])}]};var c=a("C7Lr")(l,o,!1,function(t){a("ptnV")},"data-v-103aab03",null);e.default=c.exports},ptnV:function(t,e){}});
//# sourceMappingURL=50.5e62f89f768cdf8c9030.js.map