<template>
  <div class="withdraw-table">
    <el-table :data="withdraw" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="支付时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="关联流水号" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.tradeNo }}</template>
      </el-table-column>
      <el-table-column label="商户名称" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.merchantName }}</template>
      </el-table-column>
      <el-table-column label="所属商户" show-overflow-tooltip v-if="financeType == '1'">
        <template slot-scope="scope">{{ scope.row.pertainmMerchant }}</template>
      </el-table-column>
      <el-table-column label="分账金额（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.amount }}</template>
      </el-table-column>

      <el-table-column fixed="right" width='100'>
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push({
              name: 'routing__detail',
              params: { detailId: scope.row.routingId }
            })">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['withdraw'],
    data() {
      return{
        financeType: '',
      }
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {

    },

    created() {
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .withdraw-table {
    overflow-x: auto;

  }
</style>
