<!-- Comment Module -->
<template>
    <div class="tmsgBox"  ref="tmsgBox">
        <div class="tmsg-respond"  ref="respondBox">
            <h3>發表評論<small v-show="isRespond" class="tcolorm" @click="removeRespond" style="margin-left: 25px">取消回覆</small></h3>
            <form class=""  >
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="要說些什麼呢"
                  v-model="textarea">
                </el-input>
                <div :class="pBody?'emoji':'emoji emoji-open'">
                    <div class="emoji-logo" @click="pBody=!pBody">
                        <span>表情符號</span>
                    </div>
                    <div class="emoji-body">
                        <ul class="emoji-items emoji-items-show">
                            <li class="emoji-item" v-for="(oitem,index) in emojilist" :key="'oitem'+index" @click="chooseEmoji(oitem.title)">
                                <img :src="'static/img/emot/image/'+oitem.url" alt="">
                            </li>
                        </ul>
                        <div class="emoji-bar">
                            <ul class="emoji-packages">
                                <li class="emoji-package-active">Emoji</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <el-row class="tmsg-r-info">
                    <el-col :span="24" class="info-submit">
                        <p class="tcolors-bg" @click="sendMsg">{{sendTip}}</p>
                    </el-col>
                </el-row>
            </form>
        </div>
        <div class="tmsg-comments"  ref="listDom">
            <p class="tmsg-comments-tip">發現 {{commentList?commentList.length:0}} 條根評論</p>
            <div class="tmsg-commentshow">
                <ul class="tmsg-commentlist">
                    <li class="tmsg-c-item" v-for="(item,index) in commentList" :key="'common'+index">
                        <article class="">
                            <header>
                                <img  :src="$store.state.errorImg"  :onerror="$store.state.errorImg">
                                <div class="i-name">
                                    {{item.username}}
                                </div>
                                <!-- <div class="i-class">
                                    {{item.label}}
                                </div> -->
                                <div class="i-time">
                                    <time>{{item.createTime}}</time>
                                </div>
                            </header>
                            <section>
                                <p v-html="analyzeEmoji(item.content)"></p>
                                <div v-if="haslogin" class="tmsg-replay" @click="respondMsg(item.id,item.id,item.createBy)">
                                    回覆
                                </div>
                            </section>
                        </article>
                        <ul v-show="item.children" class="tmsg-commentlist" style="padding-left:60px;">
                            <li class="tmsg-c-item" v-for="(citem,cindex) in item.children" :key="'citem'+cindex">
                                <article class="">
                                    <header>
                                            <img :src="$store.state.errorImg"  :onerror="$store.state.errorImg">
                                            <div class="i-name">
                                                {{citem.username}} <span>回覆</span> {{citem.toCommentUserName}}
                                            </div>
                                            <div class="i-time">
                                                <time>{{citem.createTime}}</time>
                                            </div>
                                    </header>
                                    <section>
                                        <p v-html="analyzeEmoji(citem.content)"></p>
                                        <div v-show="haslogin" class="tmsg-replay" @click="respondMsg(item.id,citem.id,citem.createBy)">
                                            回覆
                                        </div>
                                    </section>
                                </article>
                            </li>
                        </ul>
                    </li>

                </ul>
                <h1 v-show='hasMore' class="tcolors-bg" @click="addMoreFun" >查看更多評論</h1>
                <h1 v-show='!hasMore' class="tcolors-bg" >沒有更多評論了</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import {sendComment,getArticleComment,getLinkComment} from '../api/comment.js'
    import { getToken } from '../utils/auth.js'
    export default {
        data() { 
            return {
                respondBox:'', // Comment form
                listDom:'', // Comment list
                tmsgBox:'', // total comment box
                
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    articleId: 0
                },
                isRespond:false,
                textarea: '',
                pBody:true, // Emoji opening control 
                commentList:[], 
                aid:0, 
                hasMore:false,
                haslogin:false,
                userId:'', 
                type:0, // The current commentId that write comment to
                leavePid:'', // The category id about donation or others
                pid:'', // The current primary comment id that write comment
                rootId:-1, // Root comment id (If write to text comment, rootId will be '-1'
                toCommentId:-1, // The id of comment that you write to
                toCommentUserId:-1, // The id of user that you write to 
                sendTip:'發送評論~',
                emojilist:[ // Emoji and its paths
                   {'title':'微笑','url':'smile.gif'},
                   {'title':'嘻嘻','url':'bigsmile.gif'},
                   {'title':'哈哈','url':'haha.gif'},
                   {'title':'可愛','url':'cute.gif'},
                   {'title':'可憐','url':'pitiful.gif'},
                   {'title':'挖鼻子','url':'notmybusiness.gif'},
                   {'title':'吃驚','url':'shock.gif'},
                   {'title':'害羞','url':'tere.gif'},
                   {'title':'擠眉弄眼','url':'wink.gif'},
                   {'title':'閉嘴','url':'shutup.gif'},
                   {'title':'鄙視','url':'despise.gif'},
                   {'title':'愛你','url':'love.gif'},
                   {'title':'淚','url':'tear.gif'},
                   {'title':'偷笑','url':'snicker.gif'},
                   {'title':'親親','url':'kiss.gif'},
                   {'title':'生病','url':'sick.gif'},
                   {'title':'超開心','url':'superhappy.gif'},
                   {'title':'白眼','url':'rolleyes.gif'},
                   {'title':'哼哼 右','url':'hunright.gif'},
                   {'title':'哼哼 左','url':'hunleft.gif'},
                   {'title':'噓','url':'notalk.gif'},
                   {'title':'衰','url':'ai.gif'},
                   {'title':'吐','url':'spit.gif'},
                   {'title':'哈欠','url':'yawn.gif'},
                   {'title':'抱抱','url':'hug.gif'},
                   {'title':'怒','url':'angry.gif'},
                   {'title':'疑問','url':'question.gif'},
                   {'title':'嘴饞','url':'hungry.gif'},
                   {'title':'拜拜','url':'bye.gif'},
                   {'title':'思考','url':'think.gif'},
                   {'title':'汗','url':'sweat.gif'},
                   {'title':'睏','url':'wantsleep.gif'},
                   {'title':'睡','url':'sleep.gif'},
                   {'title':'錢','url':'money.gif'},
                   {'title':'失望','url':'dispointed.gif'},
                   {'title':'酷','url':'cool.gif'},
                   {'title':'色','url':'h.gif'},
                   {'title':'哼','url':'hun.gif'},
                   {'title':'鼓掌','url':'applaud.gif'},
                   {'title':'暈','url':'dizzy.gif'},
                   {'title':'悲傷','url':'sad.gif'},
                   {'title':'抓狂','url':'crazy.gif'},
                   {'title':'黑線','url':'blackline.gif'},
                   {'title':'陰險','url':'insidious.gif'},
                   {'title':'怒罵','url':'veryangry.gif'},
                   {'title':'書呆子','url':'bookworm.gif'},
                   {'title':'憤怒','url':'rage.gif'},
                   {'title':'感冒','url':'cold.gif'},
                   {'title':'心','url':'heart.gif'},
                   {'title':'傷心','url':'broken-hearted.gif'},
                   {'title':'豬','url':'pig.gif'},
                   {'title':'熊貓','url':'panda.gif'},
                   {'title':'OK','url':'ok.gif'},
                   {'title':'耶','url':'ya.gif'},
                   {'title':'棒','url':'good.gif'},
                   {'title':'不','url':'no.gif'},
                   {'title':'讚','url':'thunbsup.gif'},
                   {'title':'來','url':'come.gif'},
                   {'title':'弱','url':'suck.gif'},
                   {'title':'草尼馬','url':'fxck.gif'},
                   {'title':'浮雲','url':'floatingclouds.gif'},
                   {'title':'圍觀','url':'look.gif'},
                   {'title':'電話話筒','url':'telephonemicrophone.gif'},
                   {'title':'蠟燭','url':'candle.gif'},
                   {'title':'蛋糕','url':'cake.gif'},
                   {'title':'音符','url':'note.gif'},
                   {'title':'音符2','url':'note2.gif'},
                   {'title':'白色翅膀','url':'whitewing.gif'},
                   {'title':'粉色翅膀','url':'pinkwing.gif'},
                   {'title':'小草','url':'leaf.gif'},
                   {'title':'晴天','url':'sunny.gif'},
                   {'title':'雨天','url':'rainy.gif'},
                   {'title':'白雲','url':'cloud.gif'}
                ]
            }
        },
        methods: { 
            setData(initData,result){
                var msg = result.rows;
                if(initData){
                    // Refresh the list
                    this.commentList = msg;
                }else{
                    // Load more
                    this.commentList = this.commentList.concat(msg);
                }
                
                this.hasMore = result.total>this.commentList.length
              },
          // Choose the package of emoji
          chooseEmoji:function(inner){
              this.textarea +='[' + inner + ']';
          },
          analyzeEmoji:function(cont){ // Compile emoji to image to show
              var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
                var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
                var content = cont.match(pattern1);
                var str = cont;
                if(content){
                    for(var i=0;i<content.length;i++){
                        for(var j=0;j<this.emojilist.length;j++){
                            if("["+this.emojilist[j].title +"]" == content[i]){
                                var src = this.emojilist[j].url;
                                break;
                            }
                        }
                        str = str.replace(pattern2,'<img src="static/img/emot/image/'+src+'"/>');
                    }
                    // console.log(str);
                }
                return str;
          },
    
          sendMsg:function(){ // Leave Comment
              var that = this;
              if(that.textarea){
                  that.sendTip = '咻~';
                    sendComment(that.type,that.aid,that.rootId,that.toCommentId,that.toCommentUserId,that.textarea).then((response)=>{
                        that.textarea = '';
                        that.rootId = -1;
                        that.toCommentId = -1;
                        that.toCommentUserId=-1;

                        that.routeChange();
                        that.removeRespond();
                        var timer02 = setTimeout(function(){
                            that.sendTip = '發送';
                            clearTimeout(timer02);
                        },1000)
                    })
              }else{
                  that.sendTip = '內容不能為空'
                  var timer = setTimeout(function(){
                      that.sendTip = '發送';
                      clearTimeout(timer);
                  },3000)
              }
          },
          respondMsg:function(rootId,toCommentId,toCommentUserId){ // Response comment 
              // console.log(leavePid,pid);
              var that = this;
              if(localStorage.getItem('userInfo')){
                  var dom = event.currentTarget;
                  dom = dom.parentNode;
                  this.isRespond = true;
                //   this.leavePid = leavePid;
                  this.rootId = rootId
                  this.toCommentId = toCommentId;
                  this.toCommentUserId = toCommentUserId
                  dom.appendChild(this.$refs.respondBox);
              }else{
                  that.$confirm('登入後即可按讚與收藏，是否要前往登入頁面 ?', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => { // Checking, direct to login page
                        // Saving the cuurent page path, direct to here after logining
                        localStorage.setItem('logUrl',that.$route.fullPath);
                        that.$router.push({path:'/Login?login=1'});
                   }).catch(() => {

                   });
              }
          },
          removeRespond:function(){ // Canceling response comment
            this.isRespond = false;
            this.rootId = -1;
            this.toCommentId = -1;
            this.toCommentUserId=-1;
            this.$refs.tmsgBox.insertBefore(this.$refs.respondBox,this.$refs.listDom);
          },
          showCommentList: function(initData){
              var that = this;
              that.aid = that.$route.query.aid==undefined?1:parseInt(that.$route.query.aid);
              that.queryParams.articleId = that.aid
              // Is user login ?
              var token = getToken();
              if(token){
                  that.haslogin = true;
              }else{
                  that.haslogin = false;
              }

              // public set data method 
              
              if(that.$route.name=='DetailArticle'){ // Article list comment 
                  that.type = 0;
                  getArticleComment(that.queryParams).then((response)=>{
                     that.setData(initData,response);
                  })
              }else{ // Other comments
                    if(that.$route.name == 'FriendsLink'){
                      that.type = 1
                      getLinkComment(that.queryParams).then((response)=>{
                          that.setData(initData,response);
                      })
                  }
              }
          },
          addMoreFun:function(){ // See more
              this.queryParams.pageNum++
              this.showCommentList(false);
          },
          routeChange:function(){ // reload
              var that = this;
              this.queryParams.pageNum = 1
              this.showCommentList(true);
          }
        },
        components: { 

        },
        watch: {
           // If router changes, execute the method again
           // '$route':'routeChange'
         },
        created() { // Life Circle Function
            // console.log(this.$route);
            var that = this;
            that.routeChange();
        },
        mounted(){ // After page loading, do...

        }
    }
</script>

<style>
.tmsgBox{
    position: relative;
    background: #fff;
    padding:15px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.tmsg-respond h3{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}
.tmsg-respond h3 small{
    font-size: smaller;
    cursor: pointer;
}
.tmsg-respond textarea{
    background:#f4f6f7;
    height:100px;
    margin-bottom: 10px;
}
.emoji{
    position: relative;
    z-index: 1;
}
.emoji .emoji-logo{
    position: relative;
    border-radius: 4px;
    color:#444;
    display: inline-block;
    background: #fff;
    border:1px solid #ddd;
    font-size: 13px;
    padding:0 6px;
    cursor: pointer;
    height:30px;
    box-sizing: border-box;
    z-index: 2;
    line-height: 30px;
}
.emoji .emoji-logo:hover{
    animation:a 5s infinite ease-in-out;
    -webkit-animation:a 5s infinite ease-in-out;
}
.emoji .emoji-body{
    position: absolute;
    background: #fff;
    border:1px solid #ddd;
    z-index: 1;
    top:29px;
    border-radius: 0 4px 4px 4px;
    display: none;
}
.emoji-open .emoji-body{
    display: block;
}
.emoji-open .emoji-logo{
    border-radius: 4px 4px 0 0;
    border-bottom: none;
}
.emoji-open .emoji-logo:hover{
    animation:none;
    -webkit-animation:none;
}
.emoji .emoji-items {
    max-height: 197px;
    overflow: scroll;
    font-size: 0;
    padding:10px;
    z-index: 1
}
.emoji .emoji-items .emoji-item{
    background: #f7f7f7;
    padding:5px 10px;
    border-radius: 5px;
    display: inline-block;
    margin: 0 10px 12px 0;
    transition: 0.3s;
    line-height: 19px;
    font-size: 20px;
    cursor: pointer;
}
.emoji .emoji-items .emoji-item:hover{
    background: #eee;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),
                0 3px 1px -2px rgba(0,0,0,.2),
                0 1px 5px 0 rgba(0,0,0,.12);
    animation:a 5s infinite ease-in-out;
    -webkit-animation:a 5s infinite ease-in-out;
}
.emoji .emoji-body .emoji-bar{
    width:100%;
    height:30px;
    border-top: 1px solid #ddd;
    background: #fff;
    border-radius: 0 0 4px 4px;
    color: #444;
}
.emoji .emoji-body .emoji-bar .emoji-packages li{
    display: inline-block;
    line-height: 30px;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
    margin-right: 3px;
    text-align: center;
}
.emoji .emoji-body .emoji-bar .emoji-packages li:first-of-type{
    border-radius: 0 0 0 3px;
}
@-webkit-keyframes a{
    2%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    4%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    6%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    8%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    10%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    12%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    14%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    16%{-webkit-transform:translateY(-.5px) rotate(-1.5deg);transform:translateY(-.5px) rotate(-1.5deg)}
    18%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    20%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    22%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    24%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    26%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    28%{-webkit-transform:translateY(.5px) rotate(1.5deg);transform:translateY(.5px) rotate(1.5deg)}
    30%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    32%,34%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    36%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    38%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    40%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    42%{-webkit-transform:translateY(2.5px) rotate(-1.5deg);transform:translateY(2.5px) rotate(-1.5deg)}
    44%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    46%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    48%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    50%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    52%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    54%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    56%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    58%{-webkit-transform:translateY(.5px) rotate(2.5deg);transform:translateY(.5px) rotate(2.5deg)}
    60%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    62%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    64%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    66%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    68%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    70%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    72%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    74%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    76%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    78%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    80%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    82%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    84%{-webkit-transform:translateY(1.5px) rotate(2.5deg);transform:translateY(1.5px) rotate(2.5deg)}
    86%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    88%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    90%{-webkit-transform:translateY(2.5px) rotate(-.5deg);transform:translateY(2.5px) rotate(-.5deg)}
    92%{-webkit-transform:translateY(.5px) rotate(-.5deg);transform:translateY(.5px) rotate(-.5deg)}
    94%{-webkit-transform:translateY(2.5px) rotate(.5deg);transform:translateY(2.5px) rotate(.5deg)}
    96%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    98%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    0%,to{-webkit-transform:translate(0) rotate(0deg);transform:translate(0) rotate(0deg)}
}
@keyframes a{
    2%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    4%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    6%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    8%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    10%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    12%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    14%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    16%{-webkit-transform:translateY(-.5px) rotate(-1.5deg);transform:translateY(-.5px) rotate(-1.5deg)}
    18%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    20%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    22%{-webkit-transform:translateY(.5px) rotate(-1.5deg);transform:translateY(.5px) rotate(-1.5deg)}
    24%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    26%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    28%{-webkit-transform:translateY(.5px) rotate(1.5deg);transform:translateY(.5px) rotate(1.5deg)}
    30%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    32%,34%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    36%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    38%{-webkit-transform:translateY(1.5px) rotate(-1.5deg);transform:translateY(1.5px) rotate(-1.5deg)}
    40%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    42%{-webkit-transform:translateY(2.5px) rotate(-1.5deg);transform:translateY(2.5px) rotate(-1.5deg)}
    44%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    46%{-webkit-transform:translateY(-1.5px) rotate(2.5deg);transform:translateY(-1.5px) rotate(2.5deg)}
    48%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    50%{-webkit-transform:translateY(.5px) rotate(.5deg);transform:translateY(.5px) rotate(.5deg)}
    52%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    54%{-webkit-transform:translateY(-1.5px) rotate(1.5deg);transform:translateY(-1.5px) rotate(1.5deg)}
    56%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    58%{-webkit-transform:translateY(.5px) rotate(2.5deg);transform:translateY(.5px) rotate(2.5deg)}
    60%{-webkit-transform:translateY(2.5px) rotate(2.5deg);transform:translateY(2.5px) rotate(2.5deg)}
    62%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    64%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    66%{-webkit-transform:translateY(1.5px) rotate(-.5deg);transform:translateY(1.5px) rotate(-.5deg)}
    68%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    70%{-webkit-transform:translateY(1.5px) rotate(.5deg);transform:translateY(1.5px) rotate(.5deg)}
    72%{-webkit-transform:translateY(2.5px) rotate(1.5deg);transform:translateY(2.5px) rotate(1.5deg)}
    74%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    76%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    78%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    80%{-webkit-transform:translateY(1.5px) rotate(1.5deg);transform:translateY(1.5px) rotate(1.5deg)}
    82%{-webkit-transform:translateY(-.5px) rotate(.5deg);transform:translateY(-.5px) rotate(.5deg)}
    84%{-webkit-transform:translateY(1.5px) rotate(2.5deg);transform:translateY(1.5px) rotate(2.5deg)}
    86%{-webkit-transform:translateY(-1.5px) rotate(-1.5deg);transform:translateY(-1.5px) rotate(-1.5deg)}
    88%{-webkit-transform:translateY(-.5px) rotate(2.5deg);transform:translateY(-.5px) rotate(2.5deg)}
    90%{-webkit-transform:translateY(2.5px) rotate(-.5deg);transform:translateY(2.5px) rotate(-.5deg)}
    92%{-webkit-transform:translateY(.5px) rotate(-.5deg);transform:translateY(.5px) rotate(-.5deg)}
    94%{-webkit-transform:translateY(2.5px) rotate(.5deg);transform:translateY(2.5px) rotate(.5deg)}
    96%{-webkit-transform:translateY(-.5px) rotate(1.5deg);transform:translateY(-.5px) rotate(1.5deg)}
    98%{-webkit-transform:translateY(-1.5px) rotate(-.5deg);transform:translateY(-1.5px) rotate(-.5deg)}
    0%,to{-webkit-transform:translate(0) rotate(0deg);transform:translate(0) rotate(0deg)}
}
/* User key-in form */
.tmsg-r-info{
    margin:10px 0;
}
.tmsg-r-info input{
    height:30px;
    border-radius: 4px;
    background: #f4f6f7;
}
.tmsg-r-info .info-submit{
    margin: 10px 0;
    text-align: center;
}
.tmsg-r-info .info-submit p,.tmsg-commentshow h1{
    /*background: #97dffd;*/
    color:#fff;
    border-radius: 5px;
    cursor: pointer;
    /*transition: all .3s ease-in-out;*/
    height:30px;
    line-height: 30px;
    text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/* Comment List */
.tmsg-comments .tmsg-comments-tip{
    display: block;
    border-left: 2px solid #363d4c;
    padding: 0 10px;
    margin: 40px 0;
    font-size: 20px;
}
.tmsg-commentlist {
    margin-bottom:20px;

}
.tmsg-commentshow>.tmsg-commentlist{
    border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item{
    border-top: 1px solid #e5eaed;
}
.tmsg-c-item article{
    margin:20px 0;
}
.tmsg-c-item article header{
    margin-bottom:10px;
}
.tmsg-c-item article header img{
    width: 65px;
    height: 65px;
    border-radius: 50%;
    float: left;
    transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    margin-right: 15px;
    object-fit: cover;
}
.tmsg-c-item article header img:hover{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name{
    font-size: 14px;
    margin:5px 8px 7px 0;
    color:#444;
    font-weight: bold;
    display: inline-block;
}
.tmsg-c-item article header .i-class{
    display: inline-block;
    margin-left:10px;
    background: #dff0d8;
    color:#3c763d;
    border-radius: 5px;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 400;
}
.tmsg-c-item article header .i-time{
    color:#aaa;
    font-size: 12px;
}
.tmsg-c-item article section{
    margin-left: 80px;
}
.tmsg-c-item article section p img{
    vertical-align: middle;
}
.tmsg-c-item article section .tmsg-replay{
    margin:10px 0;
    font-size: 12px;
    color:#64609E;
    cursor: pointer;
}

</style>
