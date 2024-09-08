<!-- Donation Module -->
<template>
  <div class="tRewardBox tcommonBox">
    <header>
      <h1>
        <a href="#/DetailShare" target="_blank"> 贊助 </a>
      </h1>
    </header>
    <section>
      <div>
        <img
          src="static/img/defaultHead.jpg"
          alt=""
          style="max-width: 20%"
          class="coffee"
        />
      </div>
      <h1>贊助說明：</h1>
      <p>
        如果我的部落格對您有幫助，可以請作者喝杯咖啡以表鼓勵
        ☕️)<br/>方便的話，請留下您的姓名 / 暱稱以便公布贊助紀錄。
      </p>
      <hr />
      <h1>贊助方式：</h1>
      <el-row :gutter="30">
        <el-col :span="12" class="donate-item">
          <div class="donate-tip">
            <img
              :src="
                rewardData.wechat_image
                  ? rewardData.wechat_image
                  : 'static/img/pay.png'
              "
              :onerror="$store.state.errorImg"
            />
            <span>QR Code掃一掃，<br/>請我喝杯咖啡</span>
          </div>
        </el-col>
      </el-row>
      <h1>@贊助紀錄：</h1>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="payTime"
          label="日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="贊助人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="金額"
          align="center"
        ></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rewardData: "", // 贊助二維碼
      tableData: [
        {
          // 贊助數據
          "payTime":"2024-08-05",
          "name":"測試01",
          "money":"10"
        },
        {
          "payTime":"2024-08-06",
          "name":"測試02",
          "money":"10"
        },
        {
          "payTime":"2024-08-07",
          "name":"測試03",
          "money":"10"
        },
      ],
    };
  },
  methods: {
    showInitDate: function (date, full) {
      // Time handling
      return initDate(date, full);
    },
  },
  components: {
    
  },
  created() {
    // Life circle function
    var that = this;
  },
};
</script>

<style>
.tRewardBox section {
  padding-bottom: 20px;
}
.tRewardBox section h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  /*text-align: center;*/
  line-height: 30px;
}
.tRewardBox section p {
  margin: 10px 0;
  line-height: 24px;
}
.tRewardBox section hr {
  background: #ccc;
  margin-bottom: 30px;
}

.tRewardBox .donate-item {
  text-align: right;
  color: #44b549;
}
.tRewardBox .donate-item:last-child {
  text-align: left;
  color: #00a0e9;
}
.tRewardBox .donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.tRewardBox .donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  text-align: center;
  box-sizing: border-box;
}
.tRewardBox .donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.tRewardBox .el-table__body-wrapper {
  overflow: hidden;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: transparent;
}
</style>
