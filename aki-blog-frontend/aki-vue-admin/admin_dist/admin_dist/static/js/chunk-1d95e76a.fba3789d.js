(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d95e76a"],{"4c7e":function(e,t,n){"use strict";var a=n("53ca"),o=(n("b64b"),n("fb6a"),n("d3b7"),n("ac1f"),n("1276"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),n("caad"),n("2532"),n("bc3a")),r=n.n(o),l=n("5c96"),i=n("5f87");r.a.defaults.headers["Content-Type"]="application/json;charset=utf-8";var s=r.a.create({baseURL:"http://localhost:8989",responseType:"blob"});s.interceptors.request.use((function(e){var t=!1===(e.headers||{}).isToken;if(Object(i["a"])()&&!t&&(e.headers["token"]=Object(i["a"])()),"get"===e.method&&e.params){for(var n=e.url+"?",o=0,r=Object.keys(e.params);o<r.length;o++){var l=r[o],s=e.params[l],c=encodeURIComponent(l)+"=";if(null!==s&&"undefined"!==typeof s)if("object"===Object(a["a"])(s))for(var u=0,d=Object.keys(s);u<d.length;u++){var m=d[u];if(null!==s[m]&&"undefined"!==typeof s[m]){var p=l+"["+m+"]",f=encodeURIComponent(p)+"=";n+=f+encodeURIComponent(s[m])+"&"}}else n+=c+encodeURIComponent(s)+"&"}n=n.slice(0,-1),e.params={},e.url=n}return e}),(function(e){console.log(e),Promise.reject(e)})),s.interceptors.response.use((function(e){if(console.log(e),e.data){var t=new Blob([e.data]),n=e.headers["content-disposition"],a="test";n&&(a=window.decodeURI(e.headers["content-disposition"].split("=")[1],"UTF-8"));var o=window.URL.createObjectURL(t),r=document.createElement("a");r.style.display="none",r.href=o,r.setAttribute("download",a),document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(o)}}),(function(e){console.log("err"+e);var t=e.message;return"Network Error"===t?t="後端連接異常":t.includes("timeout")?t="系統請求超時":t.includes("Request failed with status code")&&(t="系統"+t.substr(t.length-3)+"異常"),Object(l["Message"])({message:t,type:"error",duration:5e3}),Promise.reject(e)})),t["a"]=s},"8dec":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-form",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],ref:"queryForm",attrs:{model:e.queryParams,inline:!0,"label-width":"68px"}},[n("el-form-item",{attrs:{label:"分類名稱",prop:"name"}},[n("el-input",{attrs:{placeholder:"請輸入分類名稱",clearable:"",size:"small"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.name,callback:function(t){e.$set(e.queryParams,"name",t)},expression:"queryParams.name"}})],1),n("el-form-item",{attrs:{label:"狀態",prop:"status"}},[n("el-select",{staticStyle:{width:"240px"},attrs:{placeholder:"請選擇",clearable:"",size:"small"},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},[n("el-option",{key:"0",attrs:{label:"正常",value:"0"}}),n("el-option",{key:"1",attrs:{label:"禁用",value:"1"}})],1)],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜尋")])],1)],1),n("el-row",{staticClass:"mb8",attrs:{gutter:10}},[n("el-col",{attrs:{span:1.5}},[n("el-button",{attrs:{type:"primary",plain:"",icon:"el-icon-plus",size:"mini"},on:{click:e.handleAdd}},[e._v("新增")])],1),n("el-col",{attrs:{span:1.5}},[n("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("單項 / 批量刪除")])],1)],1),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.categoryList},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),n("el-table-column",{attrs:{label:"分類ID",align:"center",prop:"id"}}),n("el-table-column",{attrs:{label:"分類名稱",align:"center",prop:"name"}}),n("el-table-column",{attrs:{label:"分類描述",align:"center",prop:"description"}}),n("el-table-column",{attrs:{prop:"status",label:"狀態",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-switch",{attrs:{"active-value":"0","inactive-value":"1"},on:{change:function(n){return e.handleStatusChange(t.row)}},model:{value:t.row.status,callback:function(n){e.$set(t.row,"status",n)},expression:"scope.row.status"}})]}}])}),n("el-table-column",{attrs:{prop:"createTime",label:"創建時間",align:"center"}}),n("el-table-column",{attrs:{prop:"updateTime",label:"更新時間",align:"center"}}),n("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(n){return e.handleUpdate(t.row)}}},[e._v("修改")]),n("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(n){return e.handleDelete(t.row)}}},[e._v("刪除")])]}}])})],1),n("el-pagination",{attrs:{"page-size":e.queryParams.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total,"page-sizes":[10,20,30,40],"current-page":e.queryParams.pageNum},on:{"update:pageSize":function(t){return e.$set(e.queryParams,"pageSize",t)},"update:page-size":function(t){return e.$set(e.queryParams,"pageSize",t)},"update:currentPage":function(t){return e.$set(e.queryParams,"pageNum",t)},"update:current-page":function(t){return e.$set(e.queryParams,"pageNum",t)},"current-change":e.getList,"size-change":e.getList}}),n("el-dialog",{attrs:{title:e.title,visible:e.open,width:"500px","append-to-body":""},on:{"update:visible":function(t){e.open=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"分類名稱",prop:"name"}},[n("el-input",{attrs:{placeholder:"請輸入分類名稱"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"描述",prop:"description"}},[n("el-input",{attrs:{type:"textarea",placeholder:"請輸入內容"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),n("el-form-item",{attrs:{label:"狀態"}},[n("el-select",{attrs:{placeholder:"請選擇"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[n("el-option",{key:"0",attrs:{label:"正常",value:"0"}}),n("el-option",{key:"1",attrs:{label:"禁用",value:"1"}})],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("確 定")]),n("el-button",{on:{click:e.cancel}},[e._v("取 消")])],1)],1)],1)},o=[],r=n("5530"),l=(n("d81d"),n("90fa")),i={name:"Category",data:function(){return{loading:!0,exportLoading:!1,ids:[],single:!0,multiple:!0,showSearch:!0,total:0,categoryList:null,title:"",open:!1,queryParams:{pageNum:1,pageSize:10,name:void 0,description:void 0,metaKeywords:void 0,metaDescription:void 0,status:void 0},form:{},rules:{}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.loading=!0,Object(l["f"])(this.queryParams).then((function(t){e.categoryList=t.rows.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{status:"1"===e.status?"1":"0"})})),e.total=t.total,e.loading=!1,console.log(e.status)}))},cancel:function(){this.open=!1,this.reset()},reset:function(){this.form={id:null,name:null,pid:null,description:null,metaKeywords:null,metaDescription:null,status:"0",createBy:null,createTime:null,updateBy:null,updateTime:null,delFlag:null},this.resetForm("form")},handleQuery:function(){this.queryParams.pageNum=1,this.getList()},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.id})),this.single=1!==e.length,this.multiple=!e.length},handleAdd:function(){this.reset(),this.open=!0,this.title="添加分類"},handleUpdate:function(e){var t=this;this.reset();var n=e.id||this.ids;Object(l["d"])(n).then((function(e){t.form=e,t.open=!0,t.title="修改分類"}))},submitForm:function(){var e=this;this.$refs["form"].validate((function(t){t&&(null!=e.form.id?Object(l["g"])(e.form).then((function(t){e.$modal.msgSuccess("修改成功"),e.open=!1,e.getList()})):Object(l["a"])(e.form).then((function(t){e.$modal.msgSuccess("新增成功"),e.open=!1,e.getList()})))}))},handleDelete:function(e){var t=this,n=e.id||this.ids;this.$modal.confirm('是否確認刪除分類編號為"'+n+'"的資料？').then((function(){return Object(l["b"])(n)})).then((function(){t.getList(),t.$modal.msgSuccess("刪除成功")})).catch((function(){}))},handleExport:function(){var e=this;this.$modal.confirm("是否確認導出所有分類資料？").then((function(){return e.exportLoading=!0,Object(l["c"])()})).then((function(t){e.exportLoading=!1})).catch((function(){}))},handleStatusChange:function(e){var t=this,n=Object(r["a"])(Object(r["a"])({},e),{},{status:e.status});Object(l["g"])(n).then((function(e){t.$modal.msgSuccess("狀態更新成功")})).catch((function(){t.$modal.msgError("狀態更新失敗"),e.status="0"===e.status?"1":"0"}))}}},s=i,c=n("2877"),u=Object(c["a"])(s,a,o,!1,null,null,null);t["default"]=u.exports},"90fa":function(e,t,n){"use strict";n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return s})),n.d(t,"g",(function(){return c})),n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return d}));var a=n("b775"),o=n("4c7e");function r(e){return Object(a["a"])({url:"/content/category/list",method:"get",params:e})}function l(){return Object(a["a"])({url:"/content/category/listAllCategory",method:"get"})}function i(e){return Object(a["a"])({url:"/content/category/"+e,method:"get"})}function s(e){return Object(a["a"])({url:"/content/category",method:"post",data:e})}function c(e){return Object(a["a"])({url:"/content/category",method:"put",data:e})}function u(e){return Object(a["a"])({url:"/content/category/"+e,method:"delete"})}function d(){return Object(o["a"])({url:"/content/category/export",method:"get"})}}}]);