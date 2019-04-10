<template>
  <div class="settlement-table">
    <el-table :data="settlements" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>

      <el-table-column label="创建时间"  show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column label="处理时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>

      <el-table-column label="提现流水号" width="200" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.tradeNo }}</template>
      </el-table-column>

      <el-table-column label="商户名称" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.merchantName }}</template>
      </el-table-column>

      <el-table-column label="提现金额（元）"  show-overflow-tooltip>
        <template slot-scope="scope">{{ formatDecimals(scope.row.amount) }}</template>
      </el-table-column>

      <el-table-column label="通道费（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatDecimals(scope.row.serviceFee) }}</template>
      </el-table-column>

      <el-table-column label="到账金额（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatDecimals(scope.row.enterMoney) }}</template>
      </el-table-column>

      <el-table-column label="收款银行" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.bankName }}</template>
      </el-table-column>

      <el-table-column label="收款账户" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.cardNo }}</template>
      </el-table-column>

      <el-table-column label="状态" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatSettlementStatus(scope.row.tradeStatus) }}</template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import format from '@/common/format';
  export default {
    props: ['settlements'],

    methods: {
      formatDecimals(num) {
        return format.formatDecimals(num);
      },
      formatSettlementType(settlementType) {
        return format.formatSettlementType(settlementType);
      },
      formatSettlementStatus(settlementStatus) {
        return format.formatSettlementStatus(settlementStatus);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .settlement-table {
    /deep/ .el-table th>.cell {
      white-space: nowrap;
    }

    &__amount {
      color: $green-light;
    }
  }
</style>
