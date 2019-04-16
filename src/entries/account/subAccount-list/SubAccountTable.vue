<template>
  <div class="subAccount-table">
    <el-table :data="accounts" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="商户ID" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="商户名称" width="250" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.commercialName }}</template>
      </el-table-column>
      <el-table-column label="用户类型" show-overflow-tooltip v-if="financeType == '1'">
        <template slot-scope="scope">{{ formatType(scope.row.userType) }}</template>
      </el-table-column>
      <el-table-column label="所属商户" show-overflow-tooltip v-if="financeType == '1'">
        <template slot-scope="scope">{{ scope.row.belongCommercialName }}</template>
      </el-table-column>
      <el-table-column label="可提现金额（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.allowWithDrawAmonut }}</template>
      </el-table-column>
      <el-table-column label="不可提现金额（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatDecimals(scope.row.notAllowWithDrawAmount) }}</template>
      </el-table-column>
      <el-table-column label="保证金（元）" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.cashDeposit }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="100">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push({
              name: 'account__detail',
              params: { accountId: scope.row.userId }
            })">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import format   from '@/services/format';

  export default {
    props: ['accounts'],
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
      formatDecimals(num) {
        return format.formatDecimals(num);
      },
      formatType(type) {
        return format.formatUserType(type);
      },

    },

    created(){
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .subAccount-table {
    margin: 20px 0;
    overflow-x: auto;

  }
</style>
