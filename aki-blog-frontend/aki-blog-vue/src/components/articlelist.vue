<!-- Article List -->
<template>
    <div> <!-- Add a root element to contain all contents -->
    <el-row class="searchBox article-search" style="position: fixed;top: 0.2%;right: 7%;width: 30%;z-index: 999; margin-right: 360px; display: none;">
        <el-col :span="8" :offset="8" style="margin-left: 0px">
            <el-input v-model="queryParams.search" placeholder="請輸入文章標題" :maxlength="10"></el-input>
        </el-col>
        <el-col :span="8" style="padding-right: 100px">
            <el-button type="primary" @click="handleSearch">搜尋</el-button>
        </el-col>
    </el-row>
    <el-row class="sharelistBox">

        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
            <span class="s-round-date">
                <span class="month" v-html="showInitDate(item.createTime,'month')+'月'"></span>
                <span class="day" v-html="showInitDate(item.createTime,'date')"></span>
            </span>
            <header>
                <h1>
                    <a :href="'#/DetailArticle?aid='+item.id" target="_blank">
                        {{item.title}}
                    </a>
                </h1>
                <h2>
                    <span>
                        <i class="fa fa-fw fa-user"></i> 文章發表於
                        <i class="fa fa-fw fa-clock"></i>
                    <span v-html="showInitDate(item.createTime,'all')"></span>
                    </span>
                    <span>
                        <i class="fa fa-fw fa-eye"></i> {{item.viewCount}} 次瀏覽
                    </span>
                </h2>
                <div class="ui label">
                    <a :href="'#/Share?classId='+item.categoryId">{{item.categoryName}}</a>
                </div>
            </header>
            <div class="article-content">
                <p style="text-indent:2em;">
                    {{item.summary}}
                </p>
                <p  style="max-height:300px;overflow:hidden;text-align:center;">
                    <img :src="item.thumbnail" alt="" class="maxW">
                </p>
            </div>
            <div class="viewdetail">
                <a class="tcolors-bg" :href="'#/DetailArticle?aid='+item.id" target="_blank">
                    閱讀全文>>
                </a>
            </div>

        </el-col>
         <el-col class="viewmore">
            <a v-show="hasMore" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">點擊加載更多文章</a>
            <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暫無更多數據</a>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import {initDate} from '../utils/server.js'
import {articleList} from '../api/article'

    export default {
        name:'Share',
        data() { 
            return {
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    categoryId: 0,
                    search: '',  // Initialize the search content to be empty string
                },
                articleList:[],
                hasMore: true
            }
        },

        methods: {
            showInitDate: function(oldDate,full){
                return initDate(oldDate,full)
            },
            handleSearch() {
                this.articleList = []
                this.getList()
            },
            getList(){
                articleList(this.queryParams).then((response)=>{
                    this.articleList = this.articleList.concat(response.rows)
                    if(response.total <= this.articleList.length){
                        this.hasMore = false
                    }else{
                        this.hasMore = true
                        this.queryParams.pageNum ++
                    }
                    this.clearSearch()
                })
            },
            clearSearch() {
                this.queryParams.search = '';
            },
            showSearchShowList:function(initData){ // Show data
                if(initData){
                    this.articleList = []

                }
                this.getList()
            },
            addMoreFun:function(){ // To get more articles
                this.showSearchShowList(false);
            },
            routeChange:function(){
                var that = this;
                this.queryParams.categoryId = (that.$route.query.classId==undefined?0:parseInt(that.$route.query.classId)); // Getting sent parameter's classId
                this.showSearchShowList(true);
            }
        },
        components: { 

        },
        watch: {
           // If route changes, execute this method again.
           '$route':'routeChange',
           //'$store.state.keywords':'routeChange'
        },
        created() { // Life circle function
            this.routeChange();
        }
    }
</script>

<style>
@media (min-width: 926px) {
  .article-search {
    position: fixed;
    top: 0.2%;
    right: 7%;
    width: 50%;
    z-index: 999;
  }
}

@media (max-width: 926px) {
  .article-search {
    display: none;
  }
}
/* Share the title */
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/* Article List */
.sharelistBox{
    transition: all 0.5s ease-out;
    font-size: 15px;
}

/*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
    background: #48456C;
}*/
</style>
