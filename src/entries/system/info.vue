<template>
  <div class="system-info">
    <div class="system-info__label">
      <div class="system-info__label-left">
        <h3>基础信息</h3>
      </div>
      <div class="system-info__label-right">
        <div class="system-info__label-row">
          <label>注册时间</label>
          <div class="system-info__label-row__content">{{ formatDate(userInfo.createAt) }}</div>
        </div>
        <div class="system-info__label-row">
          <label>商户ID</label>
          <div class="system-info__label-row__content">{{ userInfo.userId }}</div>
        </div>
        <div class="system-info__label-row">
          <label>商户类型</label>
          <div class="system-info__label-row__content">{{ formatCommercialType(userInfo.commercialType) }}</div>
        </div>
        <div class="system-info__label-row">
          <label>商户名称</label>
          <div class="system-info__label-row__content">{{ userInfo.commercialName }}</div>
        </div>
        <div class="system-info__label-row">
          <label>证件号</label>
          <div class="system-info__label-row__content">{{ userInfo.certificateNo }}</div>
        </div>
        <div class="system-info__label-row">
          <label>主账号</label>
          <div class="system-info__label-row__content">{{ userInfo.loginAccount }}</div>
        </div>
      </div>

    </div>
    <div class="system-info__label">
      <div class="system-info__label-left">
        <h3>预留银行信息</h3>
      </div>
      <div class="system-info__label-right">
        <div class="system-info__label-row">
          <label>开户人</label>
          <div class="system-info__label-row__content">{{ userInfo.accountName }}</div>
        </div>
        <div class="system-info__label-row">
          <label>开户银行</label>
          <div class="system-info__label-row__content">{{ userInfo.bankName }}</div>
        </div>
        <div class="system-info__label-row">
          <label>银行账号</label>
          <div class="system-info__label-row__content">{{ userInfo.bankCardNo }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import api      from '@/api/api';
  import format   from '@/services/format';

  export default {

    data() {
      return {
        userInfo: {
          createAt: '',
          userId: '',
          commercialType: '',
          commercialName: '',
          certificateNo: '',
          loginAccount: '',
          bankName: '',
          bankCardNo: ''
        }
      };
    },

    methods: {
      __fetchInfo () {
        let token = localStorage.getItem('FINANCE_TOKEN');
        api.userInfo(token)
          .then(rep => {
            if(rep.data) {
              this.userInfo = rep.data;
            }
          })
          .catch(err => this.$message.error(err));
      },
      formatDate (time) {
        return format.getDate(time);
      },
      formatCommercialType (type) {
        return format.formatCommercialType(type);
      },
    },
    created() {
      this.__fetchInfo();
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .system-info {
    &__label {
      @include clearfix;
      width: 650px;
      margin: 50px auto;
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
      h3 {

      }
      &-row {
        margin-bottom: 22px;
        @include clearfix;
        label {
          float: left;
          width: 130px;
          text-align: right;
          font-size: 14px;
          color: #606266;
          line-height: 34px;
          padding: 0 12px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        &__content {
          margin-left: 140px;
          line-height: 34px;
          position: relative;
          font-size: 14px;
        }
      }
    }
  }
</style>
