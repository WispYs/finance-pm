<template>
  <div class="transaction-table">
    <el-table :data="transactions" border empty-text="没有符合查询条件的数据">
      <el-table-column label="统计周期" min-width="200" align="center">
        <template slot-scope="scope">{{ scope.row.cycle }}</template>
      </el-table-column>

      <el-table-column label="商户号" min-width="80" align="center">
        <template slot-scope="scope">{{ scope.row.merchant }}</template>
      </el-table-column>

      <el-table-column label="公寓名称" min-width="80" align="center">
        <template slot-scope="scope">{{ scope.row.apartment }}</template>
      </el-table-column>

      <el-table-column label="收单通道" min-width="150" align="center">
        <template slot-scope="scope">{{ scope.row.payChannel }}</template>
      </el-table-column>

      <el-table-column label="成功交易笔数" min-width="120" align="center">
        <template slot-scope="scope">{{ scope.row.successTradeCount }}</template>
      </el-table-column>

      <el-table-column label="成功到账笔数" min-width="120" align="center">
        <template slot-scope="scope">{{ scope.row.successReceivedCount }}</template>
      </el-table-column>

      <el-table-column label="成功交易金额(元)" min-width="130" align="center">
        <template slot-scope="scope">{{ scope.row.successTradeAmount }}</template>
      </el-table-column>

      <el-table-column label="支付机构手续费(元)" min-width="150" align="center">
        <template slot-scope="scope">{{ scope.row.payAgentFee }}</template>
      </el-table-column>

      <el-table-column label="水滴手续费(元)" min-width="120" align="center">
        <template slot-scope="scope">{{ scope.row.shuidiFee }}</template>
      </el-table-column>

      <el-table-column label="结算金额(元)" min-width="100" align="center">
        <template slot-scope="scope">{{ scope.row.settleAmount }}</span></template>
      </el-table-column>

      <el-table-column label="结算手续费(元/笔)" min-width="150" align="center">
        <template slot-scope="scope">{{ scope.row.settleFee }}</span></template>
      </el-table-column>

      <el-table-column label="到账金额(元)" min-width="100" align="center">
        <template slot-scope="scope">{{ scope.row.amount }}</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['transactions']
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .transaction-table {
    &__amount {
      color: $green-light;
    }
  }
</style>
