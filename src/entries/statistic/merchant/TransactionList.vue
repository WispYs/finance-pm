<template>
  <div class="transaction-list">
    <div class="transaction-list__filter-bar">
      <filter-bar
        @query-click="queryTransactions"
        @reset-click="queryTransactions">
      </filter-bar>
    </div>

    <div class="transaction-list__summary-bar">
      <summary-bar></summary-bar>
    </div>

    <div class="transaction-list__table">
      <transaction-table :transactions="transactions"></transaction-table>
    </div>

    <div class="transaction-list__pagination-bar" v-if="1000 > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="100"
        :total="1000"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import FilterBar        from './transaction-list/FilterBar';
  import SummaryBar       from './transaction-list/SummaryBar';
  import TransactionTable from './transaction-list/TransactionTable';

  import moment from 'moment';

  import transactions from '@/mock-data/merchant-statistic';

  export default {
    components: {
      FilterBar,
      SummaryBar,
      TransactionTable
    },

    data() {
      return {
        transactions: [],
        currentPage: 1
      };
    },

    methods: {
      __fetchTransactions(filter) {
        // TODO: connect api
        this.transactions = transactions;
      },

      queryTransactions(filter) {
        this.__fetchTransactions(filter);
      },

      currentPageChange() {

      }
    },

    created() {
      const nowDate = moment().format('YYYY-MM-DD');

      this.__fetchTransactions({
        tradeDate: [nowDate, nowDate],
        merchant: '',
        payChannel: '全部'
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .transaction-list {
    &__summary-bar,
    &__table {
      margin-top: 30px;
    }

    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
