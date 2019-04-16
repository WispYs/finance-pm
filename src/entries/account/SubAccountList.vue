<template>
  <div class="subAccount-list">
    <div class="subAccount-list__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            :parent-merchant-options="parentMerchantOptions"
            @query-click="querySubAccount"
            @reset-click="querySubAccount">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>

    </div>

    <template>
      <div class="subAccount-list__table">
        <sub-account-table
          v-loading="loading"
          element-loading-text="加载中"
          :accounts="subAccountList">
        </sub-account-table>
      </div>
    </template>
    <div class="subAccount-list__pagination-bar" v-if="subAccountListTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="subAccountListTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import api              from '@/api/api';
  import FilterBar        from './subAccount-list/FilterBar';
  import SubAccountTable  from './subAccount-list/SubAccountTable';

  export default {
    components: {
      FilterBar,
      SubAccountTable
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        subAccountList: [],
        subAccountListTotal: 0,
        parentMerchantOptions: [],
        currentFilter: {
          idOrName: '',
          userType: '',
          pid: ''
        },
        currentPage: 1,
        pageSize: 10,
        loading: false
      };
    },

    methods: {
      // 获取所属商户列表
      __fetchBelongList() {
        api.merchantAccountBelongList()
          .then(rep => {
            if(rep) {
              this.parentMerchantOptions = rep.data;
            }
          })
          .catch(err => this.$message.error(err))
      },
      __fetchSubAccount(filter) {
        let data = Object.assign({}, filter, {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        });
        this.loading = true;
        setTimeout(() => {
          api.fetchMerchantAccountList(data)
            .then(rep => {
              this.loading = false;
              if(rep) {
                if(rep.data.pageData.length <= 0) {
                  this.subAccountList = [];
                  this.subAccountListTotal = rep.data.total;
                  // this.$message.error('暂无数据')
                }else {
                  let offset = (this.currentPage - 1) * this.pageSize;
                  this.subAccountList = rep.data.pageData.map((t, i) => Object.assign({}, t, {
                    no: offset + i + 1
                  }));
                  this.subAccountListTotal = rep.data.total;
                }
              }else {
                this.$message.error('暂无数据');
              }
            })
            .catch(err => {this.loading = false;this.$message.error(err);})
        }, 200)

      },

      querySubAccount(filter) {
        this.currentPage = 1;
        this.currentFilter = filter;

        this.__fetchSubAccount(filter);
      },

      currentPageChange(page) {
        this.currentPage = page;
        this.__fetchSubAccount(this.currentFilter);
      }
    },

    created() {
      this.__fetchSubAccount(this.currentFilter);
      this.__fetchBelongList();
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .subAccount-list {
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
