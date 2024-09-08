<!-- 友情連節 Module -->
<template>
<div class="tFriendsBox">
    <h1>歡迎在留言區留下友情連節 -- 格式如下: </h1>
        <h3>        網站名稱: Aki Chou 部落格</h3>
        <h3>網站網址: https://www.google.com.tw/ </h3>
        <h3>網站描述: Google解決方法</h3>
        <h3>網站Logo: https://xxxxx.xxxx/logo.jpg</h3>

    <el-row>
        <el-col :span="12" class="tf-item" v-for="(item,index) in friendslink" :key="'f'+index">
            <a :href="item.address" target="_blank">
                <img :src="item.logo?item.logo:'static/img/tou.jpg'"  :onerror="$store.state.errorImg">
                <h4>{{item.name}}</h4>
                <p>{{item.description}}</p>
            </a>
        </el-col>
    </el-row>
</div>
</template>

<script>
import { getAllLink } from "../api/link.js";
export default {
  data() {
    return {
      friendslink: []
    };
  },
  methods: {
    getList() {
      getAllLink().then((response) => {
        this.friendslink = response;
      });
    },
  },
  components: {

  },
  created() {
    // Life circle function
    this.getList();
  },
};
</script>

<style>
.tFriendsBox {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
}
.tFriendsBox h1 {
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
}

.tFriendsBox h3 {
  padding: 8px 0;
  font-size: 20px;
  color: #6c6f71;
}
.tFriendsBox .tf-item {
  transition: all 0.3s ease-out;
  border-radius: 5px;
  position: relative;
}
.tFriendsBox .tf-item:hover {
  background: rgba(230, 244, 250, 0.5);
}
.tFriendsBox .tf-item a {
  display: block;
  padding: 0 10px 0 90px;
  height: 90px;
}
.tFriendsBox .tf-item a img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  object-fit: cover;
}
.tFriendsBox .tf-item a h4 {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  padding-top: 15px;
  font-weight: bold;
}
.tFriendsBox .tf-item a p {
  margin: 10px 0;
  font-size: 12px;
  line-height: 24px;
  color: #999;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
