webpackJsonp([2],{AVWw:function(t,e,i){"use strict";var s=i("vLgD");var a=i("TIfe"),r={data:function(){return{respondBox:"",listDom:"",tmsgBox:"",queryParams:{pageNum:1,pageSize:10,articleId:0},isRespond:!1,textarea:"",pBody:!0,commentList:[],aid:0,hasMore:!1,haslogin:!1,userId:"",type:0,leavePid:"",pid:"",rootId:-1,toCommentId:-1,toCommentUserId:-1,sendTip:"發送評論~",emojilist:[{title:"微笑",url:"smile.gif"},{title:"嘻嘻",url:"bigsmile.gif"},{title:"哈哈",url:"haha.gif"},{title:"可愛",url:"cute.gif"},{title:"可憐",url:"pitiful.gif"},{title:"挖鼻子",url:"notmybusiness.gif"},{title:"吃驚",url:"shock.gif"},{title:"害羞",url:"tere.gif"},{title:"擠眉弄眼",url:"wink.gif"},{title:"閉嘴",url:"shutup.gif"},{title:"鄙視",url:"despise.gif"},{title:"愛你",url:"love.gif"},{title:"淚",url:"tear.gif"},{title:"偷笑",url:"snicker.gif"},{title:"親親",url:"kiss.gif"},{title:"生病",url:"sick.gif"},{title:"超開心",url:"superhappy.gif"},{title:"白眼",url:"rolleyes.gif"},{title:"哼哼 右",url:"hunright.gif"},{title:"哼哼 左",url:"hunleft.gif"},{title:"噓",url:"notalk.gif"},{title:"衰",url:"ai.gif"},{title:"吐",url:"spit.gif"},{title:"哈欠",url:"yawn.gif"},{title:"抱抱",url:"hug.gif"},{title:"怒",url:"angry.gif"},{title:"疑問",url:"question.gif"},{title:"嘴饞",url:"hungry.gif"},{title:"拜拜",url:"bye.gif"},{title:"思考",url:"think.gif"},{title:"汗",url:"sweat.gif"},{title:"睏",url:"wantsleep.gif"},{title:"睡",url:"sleep.gif"},{title:"錢",url:"money.gif"},{title:"失望",url:"dispointed.gif"},{title:"酷",url:"cool.gif"},{title:"色",url:"h.gif"},{title:"哼",url:"hun.gif"},{title:"鼓掌",url:"applaud.gif"},{title:"暈",url:"dizzy.gif"},{title:"悲傷",url:"sad.gif"},{title:"抓狂",url:"crazy.gif"},{title:"黑線",url:"blackline.gif"},{title:"陰險",url:"insidious.gif"},{title:"怒罵",url:"veryangry.gif"},{title:"書呆子",url:"bookworm.gif"},{title:"憤怒",url:"rage.gif"},{title:"感冒",url:"cold.gif"},{title:"心",url:"heart.gif"},{title:"傷心",url:"broken-hearted.gif"},{title:"豬",url:"pig.gif"},{title:"熊貓",url:"panda.gif"},{title:"OK",url:"ok.gif"},{title:"耶",url:"ya.gif"},{title:"棒",url:"good.gif"},{title:"不",url:"no.gif"},{title:"讚",url:"thunbsup.gif"},{title:"來",url:"come.gif"},{title:"弱",url:"suck.gif"},{title:"草尼馬",url:"fxck.gif"},{title:"浮雲",url:"floatingclouds.gif"},{title:"圍觀",url:"look.gif"},{title:"電話話筒",url:"telephonemicrophone.gif"},{title:"蠟燭",url:"candle.gif"},{title:"蛋糕",url:"cake.gif"},{title:"音符",url:"note.gif"},{title:"音符2",url:"note2.gif"},{title:"白色翅膀",url:"whitewing.gif"},{title:"粉色翅膀",url:"pinkwing.gif"},{title:"小草",url:"leaf.gif"},{title:"晴天",url:"sunny.gif"},{title:"雨天",url:"rainy.gif"},{title:"白雲",url:"cloud.gif"}]}},methods:{setData:function(t,e){var i=e.rows;this.commentList=t?i:this.commentList.concat(i),this.hasMore=e.total>this.commentList.length},chooseEmoji:function(t){this.textarea+="["+t+"]"},analyzeEmoji:function(t){var e=/\[[\u4e00-\u9fa5]+\]/,i=t.match(/\[[\u4e00-\u9fa5]+\]/g),s=t;if(i)for(var a=0;a<i.length;a++){for(var r=0;r<this.emojilist.length;r++)if("["+this.emojilist[r].title+"]"==i[a]){var o=this.emojilist[r].url;break}s=s.replace(e,'<img src="static/img/emot/image/'+o+'"/>')}return s},sendMsg:function(){var t,e,i,a,r,o,n=this;if(n.textarea)n.sendTip="咻~",(t=n.type,e=n.aid,i=n.rootId,a=n.toCommentId,r=n.toCommentUserId,o=n.textarea,Object(s.a)({url:"/comment",method:"post",data:{articleId:e,type:t,rootId:i,toCommentId:a,toCommentUserId:r,content:o}})).then(function(t){n.textarea="",n.rootId=-1,n.toCommentId=-1,n.toCommentUserId=-1,n.routeChange(),n.removeRespond();var e=setTimeout(function(){n.sendTip="發送",clearTimeout(e)},1e3)});else{n.sendTip="內容不能為空";var l=setTimeout(function(){n.sendTip="發送",clearTimeout(l)},3e3)}},respondMsg:function(t,e,i){var s=this;if(localStorage.getItem("userInfo")){var a=event.currentTarget;a=a.parentNode,this.isRespond=!0,this.rootId=t,this.toCommentId=e,this.toCommentUserId=i,a.appendChild(this.$refs.respondBox)}else s.$confirm("登入後即可按讚與收藏，是否要前往登入頁面 ?","提示",{confirmButtonText:"確定",cancelButtonText:"取消",type:"warning"}).then(function(){localStorage.setItem("logUrl",s.$route.fullPath),s.$router.push({path:"/Login?login=1"})}).catch(function(){})},removeRespond:function(){this.isRespond=!1,this.rootId=-1,this.toCommentId=-1,this.toCommentUserId=-1,this.$refs.tmsgBox.insertBefore(this.$refs.respondBox,this.$refs.listDom)},showCommentList:function(t){var e=this;e.aid=void 0==e.$route.query.aid?1:parseInt(e.$route.query.aid),e.queryParams.articleId=e.aid;var i,r=Object(a.a)();e.haslogin=!!r,"DetailArticle"==e.$route.name?(e.type=0,(i=e.queryParams,Object(s.a)({url:"/comment/commentList",method:"get",headers:{isToken:!1},params:i})).then(function(i){e.setData(t,i)})):"FriendsLink"==e.$route.name&&(e.type=1,function(t){return Object(s.a)({url:"/comment/linkCommentList",method:"get",params:t})}(e.queryParams).then(function(i){e.setData(t,i)}))},addMoreFun:function(){this.queryParams.pageNum++,this.showCommentList(!1)},routeChange:function(){this.queryParams.pageNum=1,this.showCommentList(!0)}},components:{},watch:{},created:function(){this.routeChange()},mounted:function(){}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"tmsgBox",staticClass:"tmsgBox"},[i("div",{ref:"respondBox",staticClass:"tmsg-respond"},[i("h3",[t._v("發表評論"),i("small",{directives:[{name:"show",rawName:"v-show",value:t.isRespond,expression:"isRespond"}],staticClass:"tcolorm",staticStyle:{"margin-left":"25px"},on:{click:t.removeRespond}},[t._v("取消回覆")])]),t._v(" "),i("form",{},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"要說些什麼呢"},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}}),t._v(" "),i("div",{class:t.pBody?"emoji":"emoji emoji-open"},[i("div",{staticClass:"emoji-logo",on:{click:function(e){t.pBody=!t.pBody}}},[i("span",[t._v("表情符號")])]),t._v(" "),i("div",{staticClass:"emoji-body"},[i("ul",{staticClass:"emoji-items emoji-items-show"},t._l(t.emojilist,function(e,s){return i("li",{key:"oitem"+s,staticClass:"emoji-item",on:{click:function(i){t.chooseEmoji(e.title)}}},[i("img",{attrs:{src:"static/img/emot/image/"+e.url,alt:""}})])})),t._v(" "),t._m(0)])]),t._v(" "),i("el-row",{staticClass:"tmsg-r-info"},[i("el-col",{staticClass:"info-submit",attrs:{span:24}},[i("p",{staticClass:"tcolors-bg",on:{click:t.sendMsg}},[t._v(t._s(t.sendTip))])])],1)],1)]),t._v(" "),i("div",{ref:"listDom",staticClass:"tmsg-comments"},[i("p",{staticClass:"tmsg-comments-tip"},[t._v("發現 "+t._s(t.commentList?t.commentList.length:0)+" 條根評論")]),t._v(" "),i("div",{staticClass:"tmsg-commentshow"},[i("ul",{staticClass:"tmsg-commentlist"},t._l(t.commentList,function(e,s){return i("li",{key:"common"+s,staticClass:"tmsg-c-item"},[i("article",{},[i("header",[i("img",{attrs:{src:t.$store.state.errorImg,onerror:t.$store.state.errorImg}}),t._v(" "),i("div",{staticClass:"i-name"},[t._v("\n                                "+t._s(e.username)+"\n                            ")]),t._v(" "),i("div",{staticClass:"i-time"},[i("time",[t._v(t._s(e.createTime))])])]),t._v(" "),i("section",[i("p",{domProps:{innerHTML:t._s(t.analyzeEmoji(e.content))}}),t._v(" "),t.haslogin?i("div",{staticClass:"tmsg-replay",on:{click:function(i){t.respondMsg(e.id,e.id,e.createBy)}}},[t._v("\n                                回覆\n                            ")]):t._e()])]),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:e.children,expression:"item.children"}],staticClass:"tmsg-commentlist",staticStyle:{"padding-left":"60px"}},t._l(e.children,function(s,a){return i("li",{key:"citem"+a,staticClass:"tmsg-c-item"},[i("article",{},[i("header",[i("img",{attrs:{src:t.$store.state.errorImg,onerror:t.$store.state.errorImg}}),t._v(" "),i("div",{staticClass:"i-name"},[t._v("\n                                            "+t._s(s.username)+" "),i("span",[t._v("回覆")]),t._v(" "+t._s(s.toCommentUserName)+"\n                                        ")]),t._v(" "),i("div",{staticClass:"i-time"},[i("time",[t._v(t._s(s.createTime))])])]),t._v(" "),i("section",[i("p",{domProps:{innerHTML:t._s(t.analyzeEmoji(s.content))}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.haslogin,expression:"haslogin"}],staticClass:"tmsg-replay",on:{click:function(i){t.respondMsg(e.id,s.id,s.createBy)}}},[t._v("\n                                        回覆\n                                    ")])])])])}))])})),t._v(" "),i("h1",{directives:[{name:"show",rawName:"v-show",value:t.hasMore,expression:"hasMore"}],staticClass:"tcolors-bg",on:{click:t.addMoreFun}},[t._v("查看更多評論")]),t._v(" "),i("h1",{directives:[{name:"show",rawName:"v-show",value:!t.hasMore,expression:"!hasMore"}],staticClass:"tcolors-bg"},[t._v("沒有更多評論了")])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"emoji-bar"},[e("ul",{staticClass:"emoji-packages"},[e("li",{staticClass:"emoji-package-active"},[this._v("Emoji")])])])}]};var n=i("VU/8")(r,o,!1,function(t){i("dWfs")},null,null);e.a=n.exports},GuD4:function(t,e){},Ig7e:function(t,e){},dWfs:function(t,e){},"eDx+":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Cz8s"),a=i("MQwy"),r=i("1pQF"),o=i("viA7"),n=i("OS1Z"),l={data:function(){return{aid:"",pdonate:!0,detailObj:{},haslogin:!1,userId:""}},methods:{showInitDate:function(t,e){return Object(r.a)(t,e)},getArticleDetail:function(){var t=this;Object(o.b)(this.aid).then(function(e){t.detailObj=e;var i=n.mavonEditor.getMarkdownIt();t.detailObj.content=i.render(e.content)})},routeChange:function(){this.aid=void 0==this.$route.query.aid?1:parseInt(this.$route.query.aid),localStorage.getItem("userInfo")?(this.haslogin=!0,this.userInfo=JSON.parse(localStorage.getItem("userInfo")),this.userId=this.userInfo.userId):this.haslogin=!1,this.getArticleDetail(),Object(o.d)(this.aid)}},watch:{$route:"routeChange"},components:{},created:function(){this.routeChange()}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"detailBox tcommonBox"},[i("span",{staticClass:"s-round-date"},[i("span",{staticClass:"month",domProps:{innerHTML:t._s(t.showInitDate(t.detailObj.createTime,"month")+"月")}}),t._v(" "),i("span",{staticClass:"day",domProps:{innerHTML:t._s(t.showInitDate(t.detailObj.createTime,"date"))}})]),t._v(" "),i("header",[i("h1",[i("a",{attrs:{href:"#/DetailShare?aid="+t.detailObj.id,target:"_blank"}},[t._v("\n                "+t._s(t.detailObj.title)+"\n            ")])]),t._v(" "),i("h2",[i("i",{staticClass:"fa fa-fw fa-user"}),t._v("文章發表於 "),i("span",[t._v(t._s(t.detailObj.createTime))]),t._v(" •\n            "),i("i",{staticClass:"fa fa-fw fa-eye"}),t._v(t._s(t.detailObj.viewCount)+" 次瀏覽 •\n        ")]),t._v(" "),i("div",{staticClass:"ui label"},[i("a",{attrs:{href:"#/Share?classId="+t.detailObj.categoryId}},[t._v(t._s(t.detailObj.categoryName))])])]),t._v(" "),i("div",{staticClass:"article-content markdown-body",domProps:{innerHTML:t._s(t.detailObj.content)}}),t._v(" "),i("div",{staticClass:"donate"},[i("div",{staticClass:"donate-word"},[i("span",{on:{click:function(e){t.pdonate=!t.pdonate}}},[t._v("贊助")])])])])},staticRenderFns:[]};var u=i("VU/8")(l,c,!1,function(t){i("Ig7e")},null,null).exports,m=i("AVWw"),d={name:"DetailShare",data:function(){return{}},methods:{},components:{"sg-nav":s.a,"sg-articleDetail":u,"sg-message":m.a,"sg-rightlist":a.a},created:function(){},mounted:function(){this.$nextTick(function(){var t=document.querySelector("#detail");if(t){var e=t.offsetTop-60;document.body.scrollTop=e,document.documentElement.scrollTop=e}})}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("sg-nav"),this._v(" "),e("div",{staticClass:"container",attrs:{id:"detail"}},[e("el-row",{attrs:{gutter:30}},[e("el-col",{staticStyle:{transition:"all .5s ease-out","margin-bottom":"30px"},attrs:{sm:24,md:16}},[e("sg-articleDetail"),this._v(" "),e("sg-message")],1),this._v(" "),e("el-col",{attrs:{sm:24,md:8}},[e("sg-rightlist")],1)],1)],1)],1)},staticRenderFns:[]};var f=i("VU/8")(d,g,!1,function(t){i("GuD4")},null,null);e.default=f.exports}});