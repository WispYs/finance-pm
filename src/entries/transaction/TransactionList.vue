<template>
  <div class="transaction-list">
    <div class="transaction-list__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            :pay-channel-options="payChannels"
            @query-click="queryTransactions"
            @reset-click="queryTransactions">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="transaction-list__banner">
      <div class="transaction-list__banner__left">
        <span class="transaction-list__banner__total-amount">
          <span>账单金额共: </span>
          <span class="amount">{{ totalTransactionAmount }}</span>
          <span>元</span>
        </span>
      </div>
      <div class="transaction-list__banner__left">
        <span class="transaction-list__banner__total-amount">
          <span>共计交易: </span>
          <span class="amount">{{ totalTransactionCount }}</span>
          <span>笔</span>
        </span>
      </div>

      <div class="transaction-list__banner__right">
        <!-- <el-button
          type="warning"
          size="small"
          icon="el-icon-download"
          plain
          @click="exportTransactions">
          导出
        </el-button> -->
      </div>
    </div>

    <template>
      <div class="transaction-list__table">
        <transaction-table
          v-loading="loading"
          element-loading-text="加载中"
          :transactions="transactions">
        </transaction-table>
      </div>
    </template>

    <div class="transaction-list__pagination-bar" v-if="transactionsTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="transactionsTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import FilterBar        from './transaction-list/FilterBar';
  import TransactionTable from './transaction-list/TransactionTable';

  import moment   from 'moment';
  import download from '@/services/download';
  import api      from '@/api/api';

  export default {
    components: {
      FilterBar,
      TransactionTable
    },

    data() {
      return {
        transactions: [],
        transactionsTotal: 0,
        filterBarActiveName: '1',
        payChannels: [],
        currentFilter: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          payWay: '',
          tradeStatus: '',
          data: ''
        },
        totalTransactionAmount: 0,
        totalTransactionCount: 0,
        currentPage: 1,
        pageSize: 10,
        loading: false
      };
    },

    methods: {
      __fetchTransactions(filter) {
        let data = Object.assign({}, filter, {
          page: this.currentPage,
          pageSize: this.pageSize
        });
        this.loading = true;
        setTimeout(() => {
          api.fetchMerchantTransactions(data)
            .then(rep => {
              this.loading = false;
              if(rep){
                let offset = (this.currentPage - 1)  * this.pageSize;
                this.transactions = rep.data.queryOrderModels.map((t, i) => Object.assign({}, t, {
                  no: offset + i + 1
                }));
                this.transactionsTotal = rep.data.count;
                // 过滤 只显示联动的支付通道
                this.payChannels = rep.data.payChannels.filter(t => t.pay_channel_3rd.indexOf('LD') > -1);
                this.totalTransactionAmount = rep.data.countAmount || 0;
                this.totalTransactionCount = rep.data.count;
              }else {
                this.$message.error('暂无数据')
              }

            })
            .catch(err => {this.loading = false;this.$message.error(err);})
        }, 200)

      },

      queryTransactions(filter) {
        this.currentPage = 1;
        this.currentFilter = filter;
        this.__fetchTransactions(filter);
      },

      exportTransactions() {
        let url = 'http://menco.cn/resource/download/5b2c6886e80db2af36e57621/hash/file.xlsx';
        download(url);
      },

      currentPageChange(page) {
        this.currentPage = page;

        this.__fetchTransactions(this.currentFilter);
      }
    },

    created() {
      this.__fetchTransactions(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .transaction-list {
    &__banner {
      @include clearfix;
      margin: 20px 0;

      &__left {
        float: left;
        margin-right: 30px;
      }

      &__right {
        float: right;
      }

      &__total-amount {
        color: $gray-dark;
        font-weight: bold;

        .amount {
          color: $green-light;
        }
      }
    }

    &__empty {
      color: $gray-dark;
      text-align: center;
      opacity: .8;
    }

    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
