<template>
  <div class="transaction-table">
    <el-table :data="transactions" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="创建时间"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="支付时间"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="支付流水号" width="200" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.tradeNo }}</template>
      </el-table-column>
      <el-table-column label="商户名称"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.apartmentName }}</template>
      </el-table-column>
      <el-table-column label="账单金额（元）"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>
      <el-table-column label="通道费（元）"   show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.serviceCharge }}</template>
      </el-table-column>
      <el-table-column label="支付通道"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.payWay }}</template>
      </el-table-column>
      <el-table-column label="状态" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatTradeStatus(scope.row.tradeStatus) }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import format   from '@/services/format';

  export default {
    props: ['transactions'],

    methods: {

      formatFundFlow(fundFlow) {
        return format.formatFundFlow(fundFlow);
      },
      formatTradeStatus(tradeStatus) {
        return format.formatTradeStatus(tradeStatus);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .transaction-table {
    overflow-x: auto;

    table {
      min-width: 100%;
      border-collapse: collapse;
    }

    &__row {
      border-bottom: 1px solid #ebeef5;
      color: #606266;
      text-align: left;
      cursor: pointer;

      &.is-header {
        color: #909399;
        font-weight: bold;

        &:hover {
          background-color: $white;
        }
      }

      &.is-expanded {
        display: none;
      }

      &:hover {
        background-color: #f5f7fa;
        transition: background-color .25s ease;
      }

      th, td {
        padding: 12px 10px;
      }

      &__expand {
        width: 20px;
        color: #666666;

        i {
          transition: transform .2s ease-in-out;

          &.is-rotated {
            transform: rotate(90deg);
          }
        }
      }

      &__index {
        min-width: 32px;
      }

      &__trade-date {
        min-width: 150px;
      }

      &__trade-serical {
        min-width: 150px;
      }

      &__apartment-account,
      &__apartment-name {
        min-width: 100px;
      }

      &__room {
        min-width: 150px;
      }

      &__fee-type {
        min-width: 90px;
      }

      &__tenant {
        min-width: 80px;
      }

      &__bill-cycle {
        min-width: 180px;
      }

      &__pay-channel {
        min-width: 150px;
      }

      &__fund-flow {
        min-width: 66px;
      }

      &__amount {
        min-width: 100px;

        &.is-in {
          color: $green-light;
        }

        &.is-out {
          color: $red;
        }
      }

      &__trade-status {
        min-width: 66px;
      }
    }
  }
</style>
