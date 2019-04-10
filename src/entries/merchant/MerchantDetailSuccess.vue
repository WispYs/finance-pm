<template>
  <div class="merchant-detail">
    <el-form class="merchant-detail__el-form" label-width="140px">
      <div class="merchant-detail__title">
        <div class="merchant-detail__title-back">
          <i class="el-icon-arrow-left"></i>
          <el-button type="text" @click="$router.back(-1)">返回</el-button>
        </div>
        <div class="merchant-detail__title-status success">审核成功</div>
      </div>

      <div class="merchant-detail__info">
        <div class="merchant-detail__info-left">
          <h3 class="merchant-detail__info-title">基本信息</h3>
        </div>
        <div class="merchant-detail__info-right">
          <el-form-item label="用户类型：" v-if="financeType == '1'">
            <span>{{ formatUserType(merchantInfo.userType) }}</span>
          </el-form-item>
          <el-form-item label="注册时间：">
            <span>{{ formatDateTime(merchantInfo.createAt) }}</span>
          </el-form-item>
          <el-form-item label="商户ID：">
            <span>{{merchantInfo.userId}}</span>
          </el-form-item>
          <el-form-item label="商户类型：">
            <span>{{ formatCommercialType(merchantInfo.commercialType) }}</span>
          </el-form-item>
          <el-form-item label="商户名称：">
            <span>{{merchantInfo.commercialName}}</span>
          </el-form-item>
          <el-form-item label="证件号：">
            <span>{{merchantInfo.businessLicenseNo}}</span>
          </el-form-item>
          <el-form-item label="设置登入账号：">
            <span>{{merchantInfo.loginAccount}}</span>
          </el-form-item>
        </div>
      </div>

      <div class="merchant-detail__info">
        <div class="merchant-detail__info-left">
          <h3 class="merchant-detail__info-title">商户信息</h3>
        </div>
        <div class="merchant-detail__info-right">
          <el-form-item label="开户人：">
            <span>{{merchantInfo.idName}}</span>
          </el-form-item>
          <el-form-item label="开户银行：">
            <span>{{merchantInfo.bankName}}</span>
          </el-form-item>
          <el-form-item label="银行账号：">
            <span>{{merchantInfo.cardNo}}</span>
          </el-form-item>
        </div>
      </div>

      <div class="merchant-detail__info">
        <div class="merchant-detail__info-left">
          <h3 class="merchant-detail__info-title">其他信息</h3>
        </div>
        <div class="merchant-detail__info-right" >
          <el-form-item label="提现模式：" v-if="financeType != '1'">
            <span>{{merchantInfo.withdrawDepositType == '0' ? '手动提现' : '自动提现（固定时间）T+1日'}}</span>
          </el-form-item>
          <!-- <el-form-item label="操作日志：" v-if="financeType == '1'">
            <span><el-button type="text" @click="handleLogs">查看详情</el-button></span>
          </el-form-item> -->
          <el-form-item label="影像件资料：">
            <span><el-button type="text" @click="handlePicFile">查看详情</el-button></span>
          </el-form-item>
        </div>
      </div>

      <!-- <div class="merchant-detail__log" v-if="logShow">
        <h3 class="merchant-detail__log-title">操作日志</h3>
        <ul class="merchant-detail__log-content">
          <li>1、2018-06-25  17:01:55，由系统自动审核，结果为审核成功。</li>
          <li>2、2018-06-25  17:01:55，由小明重新提价，结果为审核中。</li>
          <li>3、2018-06-25  17:01:55，由系统自动审核，结果为审核失败，错误字段为法人证件号、营业期限。</li>
          <li>4、2018-06-25  17:01:55，由小明首次提交，结果为审核中。</li>
        </ul>
      </div> -->

      <div class="merchant-detail__pic" v-if="picFileShow">
        <h3 class="merchant-detail__pic-title">影像件资料</h3>
        <div class="merchant-detail__pic-item" v-if="merchantInfo.businessLicenseUrl">
          <img :src="merchantInfo.businessLicenseUrl" alt="">
        </div>
        <div class="merchant-detail__pic-item" v-if="merchantInfo.idNoUrl_1">
          <img :src="merchantInfo.idNoUrl_1" alt="">
        </div>
        <div class="merchant-detail__pic-item" v-if="merchantInfo.idNoUrl_2">
          <img :src="merchantInfo.idNoUrl_2" alt="">
        </div>
        <div class="merchant-detail__pic-item" v-if="merchantInfo.lincenceUrl">
          <img :src="merchantInfo.lincenceUrl" alt="">
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api      from '@/api/api';
  import format   from '@/common/format';

  export default {
    data() {
      return {
        financeType: '',
        logShow: false,
        picFileShow: false,
        merchantInfo: {
          userType: '',
          createAt: '',
          userId: '',
          commercialType: '',
          commercialName: '',
          businessLicenseNo: '',
          loginAccount: '',
          idName: '',
          bankName: '',
          cardNo: '',
          withdrawDepositType: '',
          businessLicenseUrl: '',
          idNoUrl_1: '',
          idNoUrl_2: '',
          lincenceUrl: '',
        },
      }
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      __fetchMerchantBasicInfo() {
        let userId = this.$route.params.merchantId;
        api.fetchMerchantBasicInfo(userId)
          .then(rep => {
            this.merchantInfo.userType = rep.data.userType;
            this.merchantInfo.createAt = rep.data.createAt;
            this.merchantInfo.userId = rep.data.userId;
            this.merchantInfo.loginAccount = rep.data.loginAccount;
            this.merchantInfo.commercialType = rep.data.commercialType;
            // this.__fetchMerchantDetail();
          })
          .catch(err => this.$message.error(err))
      },
      __fetchMerchantInfo() {
        let data = {
          userId: this.$route.params.merchantId,
          flag: '2' //     1：未开通时查看   2：开通成功后查看
        }
        api.fetchMerchantInfo(data)
          .then(rep => {
            this.merchantInfo.commercialName = rep.data.commercial.commercialName;
            this.merchantInfo.businessLicenseNo = rep.data.commercial.businessLicenseNo;
            this.merchantInfo.idName = rep.data.commercial.idName;
            this.merchantInfo.bankName = rep.data.commercialBank ? rep.data.commercialBank.bankName : '';
            this.merchantInfo.cardNo = rep.data.commercialBank ? rep.data.commercialBank.cardNo : '';
            this.merchantInfo.withdrawDepositType = rep.data.commercial.withdrawDepositType;
            this.merchantInfo.businessLicenseUrl = rep.data.commercial.businessLicenseUrl;
            this.merchantInfo.idNoUrl_1 = rep.data.commercial.idNoUrl ? rep.data.commercial.idNoUrl.split(',')[0] : '';
            this.merchantInfo.idNoUrl_2 = rep.data.commercial.idNoUrl ? rep.data.commercial.idNoUrl.split(',')[1] : '';
            this.merchantInfo.lincenceUrl = rep.data.commercial.lincenceUrl;
          })
          .catch(err => this.$message.error(err))
      },
      formatDateTime(timestamp) {
        return format.getDateTime(timestamp);
      },
      formatCommercialType(type) {
        return format.formatCommercialType(type);
      },
      formatUserType(type) {
        return format.formatUserType(type);
      },

      // handleLogs() {
      //   this.logShow = !this.logShow;
      // },
      handlePicFile() {
        this.picFileShow = !this.picFileShow;
      },

    },
    created() {
      this.__fetchMerchantBasicInfo();
      this.__fetchMerchantInfo();
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }

  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .merchant-detail {
    padding: 20px;
    &__title {
      color: #409EFF;
      position: relative;
      margin-bottom: 20px;
      &-back{
        position: absolute;
        left: 0;
        top: 0;
      }
      &-status{
        width: 200px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;
        border-radius: 4px;
        text-align: center;
      }
      &-status.fault{
        border: 1px solid #FFC0CB;
        background: $red-light;
        color: $red;
      }
      &-status.success{
        border: 1px solid #D5EEC8;
        background: #f0f9eb;
        color: $green;
      }
      &-status.warning{
        border: 1px solid #F7E5C8;
        background: #FCF6EB;
        color: #e6a23c;
      }
    }
    &__info {
      width: 630px;
      margin: 50px auto;
      overflow: hidden;
      &-left {
        float: left;
        width: 170px;
        text-align: right;
      }
      &-right {
        float: left;
        border-left: 1px solid #eee;
        margin-left: 50px;
        width: calc(100% - 221px);
      }
      span {
        display: inline-block;
        text-align: center;
        margin-right: 20px;
        img{
          margin-bottom: 10px;
          display: block;
          width: 220px;
          height: 150px;
        }
      }
      .log-list{
        margin-left: 60px;
        line-height: 40px;
      }
      .image-wrap{
         margin-left: 60px;
      }
      .image-list{
        display: inline-block;
        width: 160px;
        height: 120px;
        margin-right: 10px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    &__log, &__pic {
      @include clearfix;
      position: relative;
      width: 800px;
      margin: 50px auto;
      padding: 30px;
      border: 1px solid #dedede;
      &-title {
        position: absolute;
        padding: 0 10px;
        background: #fff;
        top: -9px;
        left: 20px;
        margin: 0;
      }
      &-content {
        li {
          line-height: 34px;
          font-size: 14px;
          color:#666;
        }
      }
      &-item {
        float: left;
        width: 120px;
        height: 90px;
        margin-left: 20px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    &__footer{
      text-align: center;
      margin-top: 50px;
    }
  }
</style>
