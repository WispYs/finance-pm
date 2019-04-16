<template>
  <div class="merchant-list">
    <div class="merchant-list__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            :parent-merchant-options="parentMerchantOptions"
            @query-click="queryMerchants"
            @reset-click="queryMerchants">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>

    </div>

   <!--  <div class="merchant-list__view-log">
      <el-button type="text" @click="logDialogVisible = true">查看日志</el-button>
    </div> -->

    <div class="merchant-list__table">
      <merchant-table
        v-loading="loading"
        element-loading-text="加载中"
        :merchants="merchants"
        @selection-change="selectedMerchantChange"
        @set-table-field-click="toSetTableField"
        @freeze-click="toFreezeMerchant"
        @unfreeze-click="toUnfreezeMerchant"
        @edit-fee-click="toEditFee"
        @edit-fee-payer-click="toEditFeePayer">
      </merchant-table>
    </div>

    <div class="merchant-list__pagination-bar" v-if="merchantsTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="merchantsTotal"
        @current-change="currentPageChange">
      </el-pagination>
      <!-- <footer-bar
        :is-fixed="hasScrollbar"
        :edit-fee-enable="selectedMerchants.length > 0"
        :pagination="pagination"
        @page-size-change="pageSizeChange"
        @current-page-change="currentPageChange"
        @batch-edit-fee-click="toEditFee">
      </footer-bar> -->
    </div>

    <log-dialog
      v-if="logDialogVisible"
      @close-click="logDialogVisible = false">
    </log-dialog>

    <set-table-field-dialog
      v-if="setTableFieldDialogVisible"
      @cancel-set="setTableFieldDialogVisible = false"
      @set-done="setTableFieldDone">
    </set-table-field-dialog>

    <freeze-merchant-dialog
      v-if="freezeMerchantDialogVisible"
      :merchant="merchantForFreeze"
      @cancel-freeze="freezeMerchantDialogVisible = false"
      @freeze-done="freezeMerchantDone">
    </freeze-merchant-dialog>

    <unfreeze-merchant-dialog
      v-if="unfreezeMerchantDialogVisible"
      :merchant="merchantForUnfreeze"
      @cancel-unfreeze="unfreezeMerchantDialogVisible = false"
      @unfreeze-done="unfreezeMerchantDone">
    </unfreeze-merchant-dialog>

    <edit-fee-dialog
      v-if="editFeeDialogVisible"
      :is-batch="isBatchEditFee"
      :merchants="merchantsForEditFee"
      @cancel-edit="editFeeDialogVisible = false"
      @edit-done="editFeeDone">
    </edit-fee-dialog>

    <edit-fee-payer-dialog
      v-if="editFeePayerDialogVisible"
      :merchant="merchantForEditFeePayer"
      @cancel-edit="editFeePayerDialogVisible = false"
      @edit-done="editFeePayerDone">
    </edit-fee-payer-dialog>
  </div>
</template>

<script>
  import FilterBar              from './merchant-list/FilterBar';
  import MerchantTable          from './merchant-list/MerchantTable';
  import FooterBar              from './merchant-list/FooterBar';
  import LogDialog              from './merchant-list/LogDialog';
  import SetTableFieldDialog    from './merchant-list/SetTableFieldDialog';
  import FreezeMerchantDialog   from './merchant-list/FreezeMerchantDialog';
  import UnfreezeMerchantDialog from './merchant-list/UnfreezeMerchantDialog';
  import EditFeeDialog          from './merchant-list/EditFeeDialog';
  import EditFeePayerDialog     from './merchant-list/EditFeePayerDialog';

  import moment   from 'moment';
  import api      from '@/api/api';

  export default {
    components: {
      FilterBar,
      MerchantTable,
      FooterBar,
      LogDialog,
      SetTableFieldDialog,
      FreezeMerchantDialog,
      UnfreezeMerchantDialog,
      EditFeeDialog,
      EditFeePayerDialog
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        merchants: [],
        parentMerchantOptions: [],
        currentFilter: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          reviewStatus: '',
          type: '',
          parentMerchant: '',
          pid: '',
          data: ''
        },
        pagination: null,

        selectedMerchants: [],

        hasScrollbar: false,
        currentPage: 1,
        pageSize: 10,
        merchantsTotal: 0,

        merchantForFreeze: null,
        merchantForUnfreeze: null,
        merchantsForEditFee: null,
        merchantForEditFeePayer: null,

        isBatchEditFee: false,

        logDialogVisible: false,
        setTableFieldDialogVisible: false,
        freezeMerchantDialogVisible: false,
        unfreezeMerchantDialogVisible: false,
        editFeeDialogVisible: false,
        editFeePayerDialogVisible: false,
        loading: false
      };
    },

    watch: {
      'merchants.length': function() {
        this.$nextTick(() => {
          if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
            this.hasScrollbar = true;
          } else {
            this.hasScrollbar = false;
          }
        });
      }
    },

    methods: {
      __fetchMerchants(filter) {
        // TODO: connect api

        let filters = Object.assign({}, filter, {
          token: localStorage.getItem('FINANCE_TOKEN'),
          page: this.currentPage,
          pageSize: this.pageSize,
        })
        this.loading = true;
        setTimeout(() => {
          api.fetchMerchantList(filters)
            .then(rep => {
              this.loading = false;

              if(rep) {
                // 筛选项所属商户
                this.parentMerchantOptions = rep.data.list;
                if(rep.data.merchantDataModels.length <= 0) {
                  this.merchants = [];
                  this.merchantsTotal = rep.data.count;
                  // this.$message.error('暂无数据')

                }else {
                  let offset = (this.currentPage - 1) * this.pageSize;
                  this.merchants = rep.data.merchantDataModels.map((t, i) => Object.assign({}, t, {
                    no: offset + i + 1
                  }));
                  this.merchantsTotal = rep.data.count;
                }
              }else {
                this.$message.error('暂无数据')
              }

            })
            .catch(err => {this.loading = false;this.$message.error(err);})
        }, 200)

      },

      queryMerchants(filter) {
        this.currentPage = 1;
        this.currentFilter = filter;
        this.__fetchMerchants(this.currentFilter);
      },

      selectedMerchantChange(selectedMerchants) {
        this.selectedMerchants = selectedMerchants;
      },

      toSetTableField() {
        this.setTableFieldDialogVisible = true;
      },
      setTableFieldDone() {
        // TODO: update data
        this.setTableFieldDialogVisible = false;
      },

      toFreezeMerchant(merchant) {
        this.merchantForFreeze = merchant;
        this.freezeMerchantDialogVisible = true;
      },
      freezeMerchantDone() {
        // TODO: update data
        this.freezeMerchantDialogVisible = false;
      },

      toUnfreezeMerchant(merchant) {
        this.merchantForUnfreeze = merchant;
        this.unfreezeMerchantDialogVisible = true;
      },
      unfreezeMerchantDone() {
        // TODO: update data
        this.unfreezeMerchantDialogVisible = false;
      },

      toEditFee(isBatch, merchant) {
        if (isBatch) {
          this.isBatchEditFee = true;
          this.merchantsForEditFee = this.selectedMerchants;
        } else {
          this.isBatchEditFee = false;
          this.merchantsForEditFee = [].concat(Object.assign({}, merchant, {
            payChannels: [
              { name: '支付宝(线上)', fee: 0.60 },
              { name: '微信(线上)', fee: 0.60 },
              { name: '借记卡', fee: 0.60 }
            ]
          }));
        }

        // TODO: get merchant detail api
        this.editFeeDialogVisible = true;
      },
      editFeeDone() {
        // TODO: update data
        this.editFeeDialogVisible = false;
      },

      toEditFeePayer(merchant) {
        this.merchantForEditFeePayer = Object.assign({}, merchant, {
          feePayer: 'apartment'
        });
        this.editFeePayerDialogVisible = true;
      },
      editFeePayerDone() {
        // TODO: update data
        this.editFeePayerDialogVisible = false;
      },

      // pageSizeChange(pageSize) {
      //   // TODO: update data
      //   if (pageSize === 10) {
      //     this.merchants = this.merchants.slice(0, 4);
      //   } else {
      //     this.merchants = testData.data;
      //   }

      //   this.pagination = Object.assign(this.pagination, {
      //     pageSize: pageSize,
      //     currentPage: 1,
      //     pageCount: Math.ceil(this.pagination.total / pageSize)
      //   });
      // },
      currentPageChange(page) {
        this.currentPage = page;
        this.__fetchMerchants(this.currentFilter);
      }
    },

    created() {
      this.__fetchMerchants(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .merchant-list {
    &__view-log {
      margin-top: 15px;
      border-bottom: 1px solid $gray-lighter;
      text-align: right;
    }

    &__footer-bar {
      border-bottom: 1px solid $gray-lighter;
    }
    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
