<template>
  <div class="routing-statistic">
    <div class="routing-statistic__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            :parent-merchant-options="parentMerchantOptions"
            @query-click="queryStatistic"
            @reset-click="queryStatistic">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>
    </div>

    <template>
      <div class="routing-statistic__table">
        <statistic-table
          v-loading="loading"
          element-loading-text="加载中"
          :withdraw="statisticList">
        </statistic-table>
      </div>
    </template>

    <div class="routing-statistic__pagination-bar" v-if="statisticListTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="statisticListTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api      from '@/api/api';
  import moment   from 'moment';

  import FilterBar        from './statistic/FilterBar';
  import StatisticTable   from './statistic/StatisticTable';

  export default {
    components: {
      FilterBar,
      StatisticTable,
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        detailDialogShow: false,
        statisticList: [],
        statisticListTotal: 0,
        parentMerchantOptions: [],
        currentFilter: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          pid: '',
          userId: '',
          data: '',
        },
        currentPage: 1,
        pageSize: 10,
        loading: false
      };
    },

    methods: {
      __fetchStatistic(filter) {

        let filters = Object.assign({}, filter, {
          page: this.currentPage,
          pageSize: this.pageSize,
        })
        this.loading = true;
        setTimeout(() => {
          api.getRoutingRecord(filters)
            .then(rep => {
              this.loading = false;
              if(rep) {
                this.parentMerchantOptions = rep.data.list.filter(it => it != null);
                if(rep.data.routingRecordsMoudels.length <= 0) {
                  this.statisticList = [];
                  this.statisticListTotal = rep.data.count;
                  // this.$message.error('暂无数据')

                }else {
                  let offset = (this.currentPage - 1) * this.pageSize;
                  this.statisticList = rep.data.routingRecordsMoudels.map((t, i) => Object.assign({}, t, {
                    no: offset + i + 1
                  }));
                  this.statisticListTotal = rep.data.count;
                }
              }else {
                this.$message.error('暂无数据');
              }
            })
            .catch(err => {this.loading = false;this.$message.error(err);})
        }, 200)

      },

      queryStatistic(filter) {
        this.currentPage = 1;
        this.currentFilter = filter;

        this.__fetchStatistic(filter);
      },

      currentPageChange(page) {
        this.currentPage = page;

        this.__fetchStatistic(this.currentFilter);
      },

    },

    created() {
      this.__fetchStatistic(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .routing-statistic {

    &__table {
      margin-top: 20px;
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
