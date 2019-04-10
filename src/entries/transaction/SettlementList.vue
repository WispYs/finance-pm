<template>
  <div class="settlement-list">
    <div class="settlement-list__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            @query-click="querySettlements"
            @reset-click="querySettlements">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="settlement-list__banner">
      <div class="settlement-list__banner__left">
        <span class="settlement-list__banner__total-amount">
          <span>到账总金额: </span>
          <span class="amount">{{ totalTransactionAmount }}</span>
          <span>元</span>
        </span>
      </div>

      <div class="settlement-list__banner__right">
        <!-- <el-button
          type="warning"
          size="small"
          icon="el-icon-download"
          plain
          @click="exportSettlements">
          导出
        </el-button> -->
      </div>
    </div>

    <div class="settlement-list__table">
      <settlement-table :settlements="settlements"></settlement-table>
    </div>

    <div class="settlement-list__pagination-bar" v-if="settlementsTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="settlementsTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import FilterBar       from './settlement-list/FilterBar';
  import SettlementTable from './settlement-list/SettlementTable';

  import moment   from 'moment';
  import download from '@/services/download';
  import api      from '@/api/api';

  export default {
    components: {
      FilterBar,
      SettlementTable
    },

    data() {
      return {
        settlements: [],
        settlementsTotal: 0,
        filterBarActiveName: ['1'],
        currentFilter: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          tradeStatus: '',
          keyword: ''
        },
        totalTransactionAmount: 0,
        currentPage: 1,
        pageSize: 10
      };
    },

    methods: {
      __fetchSettlements(filter) {
        let data = Object.assign({}, filter, {
          userId: this.userId,
          page: this.currentPage,
          pageSize: this.pageSize
        });

        api.fetchMerchantSettlements(data)
          .then(rep => {
            let offset = (this.currentPage - 1)  * this.pageSize;
            this.settlements = rep.data.querySettlementModels.map((t, i) => Object.assign({}, t, {
              no: offset + i + 1
            }));
            this.settlementsTotal = rep.data.count;
            this.totalTransactionAmount = rep.data.countAmount || 0;
          })
          .catch(err => this.$message.error(err))
      },

      querySettlements(filter) {
        this.currentPage = 1;
        this.currentFilter = filter;

        this.__fetchSettlements(filter);
      },

      exportSettlements() {
        let url = 'http://menco.cn/resource/download/5b2c6886e80db2af36e57621/hash/file.xlsx';
        download(url);
      },

      currentPageChange(page) {
        this.currentPage = page;

        this.__fetchSettlements(this.currentFilter);
      }
    },

    created() {
      this.userId = localStorage.getItem('FINANCE_USERID');
      this.__fetchSettlements(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .settlement-list {
    &__banner {
      @include clearfix;
      margin: 20px 0;

      &__left {
        float: left;
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

    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
