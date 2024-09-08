(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-031420e8"],{"4c7e":function(e,t,n){"use strict";var a=n("53ca"),r=(n("b64b"),n("fb6a"),n("d3b7"),n("ac1f"),n("1276"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),n("caad"),n("2532"),n("bc3a")),o=n.n(r),i=n("5c96"),l=n("5f87");o.a.defaults.headers["Content-Type"]="application/json;charset=utf-8";var s=o.a.create({baseURL:"/prod-api",responseType:"blob"});s.interceptors.request.use((function(e){var t=!1===(e.headers||{}).isToken;if(Object(l["a"])()&&!t&&(e.headers["token"]=Object(l["a"])()),"get"===e.method&&e.params){for(var n=e.url+"?",r=0,o=Object.keys(e.params);r<o.length;r++){var i=o[r],s=e.params[i],c=encodeURIComponent(i)+"=";if(null!==s&&"undefined"!==typeof s)if("object"===Object(a["a"])(s))for(var u=0,d=Object.keys(s);u<d.length;u++){var m=d[u];if(null!==s[m]&&"undefined"!==typeof s[m]){var p=i+"["+m+"]",h=encodeURIComponent(p)+"=";n+=h+encodeURIComponent(s[m])+"&"}}else n+=c+encodeURIComponent(s)+"&"}n=n.slice(0,-1),e.params={},e.url=n}return e}),(function(e){console.log(e),Promise.reject(e)})),s.interceptors.response.use((function(e){if(console.log(e),e.data){var t=new Blob([e.data]),n=e.headers["content-disposition"],a="test";n&&(a=window.decodeURI(e.headers["content-disposition"].split("=")[1],"UTF-8"));var r=window.URL.createObjectURL(t),o=document.createElement("a");o.style.display="none",o.href=r,o.setAttribute("download",a),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(r)}}),(function(e){console.log("err"+e);var t=e.message;return"Network Error"===t?t="後端連接異常":t.includes("timeout")?t="系統請求超時":t.includes("Request failed with status code")&&(t="系統"+t.substr(t.length-3)+"異常"),Object(i["Message"])({message:t,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=s},"9dd4":function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return s})),n.d(t,"g",(function(){return c})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return d}));var a=n("b775"),r=n("4c7e");function o(e){return Object(a["a"])({url:"/content/tag/list",method:"get",params:e})}function i(){return Object(a["a"])({url:"/content/tag/listAllTag",method:"get"})}function l(e){return Object(a["a"])({url:"/content/tag/"+e,method:"get"})}function s(e){return Object(a["a"])({url:"/content/tag",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/content/tag",method:"put",data:e})}function u(e){return Object(a["a"])({url:"/content/tag/"+e,method:"delete"})}function d(){return Object(r["a"])({url:"/content/tag/export",method:"get"})}},fbd8:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-form",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],ref:"queryForm",attrs:{model:e.queryParams,inline:!0,"label-width":"68px"}},[n("el-form-item",{attrs:{label:"標籤名稱",prop:"name"}},[n("el-input",{attrs:{placeholder:"請輸入標籤名稱",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name",t)},expression:"queryParams.name"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜尋")])],1)],1),n("el-row",{staticClass:"mb8",attrs:{gutter:10}},[n("el-col",{attrs:{span:1.5}},[n("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-plus",size:"mini"},on:{click:e.handleAdd}},[e._v("新增")])],1),n("el-col",{attrs:{span:1.5}},[n("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("單項 / 批量刪除")])],1),n("el-col",{attrs:{span:1.5}},[n("el-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:["content:tag:export"],expression:"['content:tag:export']"}],attrs:{type:"warning",plain:"",icon:"el-icon-download",size:"mini",loading:e.exportLoading},on:{click:e.handleExport}},[e._v("導出")])],1)],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.categoryList},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),n("el-table-column",{attrs:{label:"標籤ID",align:"center",prop:"id",width:"100"}}),n("el-table-column",{attrs:{label:"標籤名稱",align:"center",prop:"name",width:"140"}}),n("el-table-column",{attrs:{label:"備註",align:"center",prop:"remark","min-width":"240"}}),n("el-table-column",{attrs:{label:"創建時間",align:"center",prop:"createTime"}}),n("el-table-column",{attrs:{label:"更新時間",align:"center",prop:"updateTime"}}),n("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(n){return e.handleUpdate(t.row)}}},[e._v("修改")]),n("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(n){return e.handleDelete(t.row)}}},[e._v("刪除")])]}}])})],1),n("el-pagination",{attrs:{"page-size":e.queryParams.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,"page-sizes":[10,20,30,40],"current-page":e.queryParams.pageNum},on:{"update:pageSize":function(t){return e.$set(e.queryParams,"pageSize",t)},"update:page-size":function(t){return e.$set(e.queryParams,"pageSize",t)},"update:currentPage":function(t){return e.$set(e.queryParams,"pageNum",t)},"update:current-page":function(t){return e.$set(e.queryParams,"pageNum",t)},"current-change":e.handlePageChange,"size-change":e.handlePageSizeChange}}),n("el-dialog",{attrs:{title:e.title,visible:e.open,width:"500px","append-to-body":""},on:{"update:visible":function(t){e.open=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"標籤名稱",prop:"name"}},[n("el-input",{attrs:{placeholder:"請輸入標籤名稱"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"備註",prop:"remark"}},[n("el-input",{attrs:{type:"textarea",placeholder:"請輸入備註"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("確 定")]),n("el-button",{on:{click:e.cancel}},[e._v("取 消")])],1)],1)],1)},r=[],o=(n("d81d"),n("9dd4")),i={name:"Tag",data:function(){return{loading:!0,exportLoading:!1,ids:[],single:!0,multiple:!0,showSearch:!0,total:0,categoryList:null,title:"",open:!1,queryParams:{pageNum:1,pageSize:10,name:null},form:{},rules:{}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.loading=!0,Object(o["f"])(this.queryParams).then((function(t){e.categoryList=t.rows,e.total=t.total,e.loading=!1}))},cancel:function(){this.open=!1,this.reset()},reset:function(){this.form={id:null,name:null,remark:null},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},resetQuery:function(){this.resetForm("queryForm"),this.handleQuery()},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.id})),this.single=1!==e.length,this.multiple=!e.length},handleAdd:function(){this.reset(),this.open=!0,this.title="添加標籤"},handleUpdate:function(e){var t=this;this.reset();var n=e.id||this.ids;Object(o["d"])(n).then((function(e){t.form=e,t.open=!0,t.title="修改標籤"}))},submitForm:function(){var e=this;this.$refs["form"].validate((function(t){t&&(null!=e.form.id?Object(o["g"])(e.form).then((function(t){e.$modal.msgSuccess("修改成功"),e.open=!1,e.getList()})):Object(o["a"])(e.form).then((function(t){e.$modal.msgSuccess("新增成功"),e.open=!1,e.getList()})))}))},handleDelete:function(e){var t=this,n=e.id||this.ids;this.$modal.confirm('是否確認刪除標籤編號為"'+n+'"的資料 ？').then((function(){return Object(o["b"])(n)})).then((function(){t.getList(),t.$modal.msgSuccess("刪除成功")})).catch((function(){}))},handlePageChange:function(e){this.queryParams.pageNum=e,this.getList()},handlePageSizeChange:function(e){this.queryParams.pageSize=e,this.queryParams.pageNum=1,this.getList()},handleExport:function(){var e=this;this.$modal.confirm("是否確認導出所有標籤資料 ?").then((function(){return e.exportLoading=!0,Object(o["c"])()})).then((function(t){e.exportLoading=!1})).catch((function(){}))}}},l=i,s=n("2877"),c=Object(s["a"])(l,a,r,!1,null,null,null);t["default"]=c.exports}}]);