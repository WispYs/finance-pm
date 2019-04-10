<template>
  <div class="system-info">
    <div class="system-info__label">
      <div class="system-info__label-left">
        <h3>分账信息</h3>
      </div>
      <div class="system-info__label-right">
        <div class="system-info__label-row">
          <label>商户名称</label>
          <div class="system-info__label-row__content">{{routingDetail.merchantName}}</div>
        </div>
        <div class="system-info__label-row">
          <label>商户ID</label>
          <div class="system-info__label-row__content">{{routingDetail.merchantId}}</div>
        </div>
        <div class="system-info__label-row">
          <label>分账金额</label>
          <div class="system-info__label-row__content">{{routingDetail.routingAmount}}元</div>
        </div>
        <div class="system-info__label-row">
          <label>分账模板</label>
          <div class="system-info__label-row__content">{{routingDetail.routingName}}</div>
        </div>
        <div class="system-info__label-row">
          <label>分账模板ID</label>
          <div class="system-info__label-row__content">{{routingDetail.routingNo}}</div>
        </div>
        <div class="system-info__label-row">
          <label>分账顺序</label>
          <div class="system-info__label-row__content">{{ formatRoutingSort(routingDetail.routingSort) }}</div>
        </div>
        <div class="system-info__label-row" v-if="routingDetail.assumePerson == 'landlord'">
          <label>通道费承担方</label>
          <div class="system-info__label-row__content">{{ routingDetail.slottingFeeBearer == '1' ? '是' : '否' }}</div>
        </div>
      </div>

    </div>
    <div class="system-info__label">
      <div class="system-info__label-left">
        <h3>订单信息</h3>
      </div>
      <div class="system-info__label-right">
        <div class="system-info__label-row">
          <label>支付时间</label>
          <div class="system-info__label-row__content">{{routingDetail.time}}</div>
        </div>
        <div class="system-info__label-row">
          <label>支付流水号</label>
          <div class="system-info__label-row__content">{{routingDetail.tradeNo}}</div>
        </div>
        <div class="system-info__label-row">
          <label>所属商户</label>
          <div class="system-info__label-row__content">{{routingDetail.pertainmMerchant}}</div>
        </div>
        <div class="system-info__label-row">
          <label>账单金额</label>
          <div class="system-info__label-row__content">{{routingDetail.amount}}元</div>
        </div>
        <div class="system-info__label-row" v-if="routingDetail.assumePerson == 'landlord'">
          <label>通道费</label>
          <div class="system-info__label-row__content">{{routingDetail.serviceAmount}}元</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import api  from '@/api/api';

  export default {

    data() {
      return {
        routingDetail: {
          merchantName: '',
          merchantId: '',
          routingAmount: '',
          routingName: '',
          routingNo: '',
          routingSort: '',
          slottingFeeBearer: '',
          time: '',
          tradeNo: '',
          pertainmMerchant: '',
          amount: '',
          serviceAmount: '',
        }
      };
    },

    methods: {
      __fetchRoutingDetail() {
        let routingId = this.$route.params.detailId;
        api.routingRecordDetail(routingId)
          .then(rep => {
            if(rep.data) {
              this.routingDetail = rep.data;
            }else {
              this.$message.error('获取分账详情失败')
            }
          })
          .catch(err => this.$message.error(err))
      },

      formatRoutingSort(sort) {
        switch(sort) {
          case '1' : return '第一顺序分账方';break;
          case '2' : return '第二顺序分账方';break;
          case '3' : return '第三顺序分账方';break;
          case '4' : return '第四顺序分账方';break;
          case '5' : return '第五顺序分账方';break;
          default  : return '--';
        }
      },

    },

    created() {
      this.__fetchRoutingDetail();
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .system-info {
    &__label {
      @include clearfix;
      width: 630px;
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
        @include clearfix;
        margin-bottom: 22px;
        label {
          float: left;
          width: 140px;
          text-align: right;
          font-size: 14px;
          color: #606266;
          line-height: 34px;
          padding: 0 12px 0 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        &__content {
          margin-left: 150px;
          line-height: 34px;
          position: relative;
          font-size: 14px;
        }
      }
    }
  }
</style>
