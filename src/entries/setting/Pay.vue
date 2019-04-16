<template>
  <div class="pay">
    <div class="pay__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            @query-click="queryPay"
            @reset-click="queryPay">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>

    </div>

    <!-- <div class="pay__view-log">
      <el-button type="text" @click="logDialogVisible = true">查看日志</el-button>
    </div> -->

    <div class="pay__table">
      <pay-table
        v-loading="loading"
        element-loading-text="加载中"
        :pay="payList"
        @edit-click="editPay">
      </pay-table>
    </div>

    <div class="pay__pagination-bar" v-if="payListTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="payListTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
    <log-dialog
      v-if="logDialogVisible"
      @close-click="logDialogVisible = false">
    </log-dialog>
    <edit-dialog
      :pay-detail="editPayDetail"
      v-if="editDialogVisible"
      @reload="reloadPay"
      @close-click="editDialogVisible = false">
    </edit-dialog>
  </div>
</template>

<script>

  import api              from '@/api/api';
  import FilterBar        from './pay/FilterBar';
  import PayTable         from './pay/PayTable';
  import LogDialog        from './pay/LogDialog';
  import EditDialog       from './pay/EditDialog';

  export default {
    components: {
      FilterBar,
      PayTable,
      LogDialog,
      EditDialog
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        payList: [],
        payListTotal: 0,
        currentFilter: {
          condition: ''
        },
        editPayDetail: null,
        currentPage: 1,
        pageSize: 10,
        logDialogVisible: false,
        editDialogVisible: false,
        loading: false
      };
    },

    methods: {
      __fetchPay(filter) {
        let data = Object.assign({}, filter, {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        });
        this.loading = true;
        setTimeout(() => {
          api.fetchSettingPay(data)
            .then(rep => {
              this.loading = false;
              if(rep) {
                if(rep.data.pageData.length <= 0) {
                  this.payList = [];
                  this.payListTotal = rep.data.total;
                }
                let offset = (this.currentPage - 1)  * this.pageSize;
                this.payList = rep.data.pageData.map((t, i) => Object.assign({}, t, {
                  no: offset + i + 1
                }));
                this.payListTotal = rep.data.total;
              }else {
                this.$message.error('暂无数据');
              }
            })
            .catch(err => {this.loading = false;this.$message.error(err);})
        }, 200)

      },

      queryPay(filter) {
        console.log(filter)
        this.currentPage = 1;
        this.currentFilter = filter;

        this.__fetchPay(filter);
      },

      currentPageChange(page) {
        this.currentPage = page;
        this.__fetchPay(this.currentFilter);
      },

      editPay(index) {
        this.editDialogVisible = true;
        console.log(index)
        this.editPayDetail = {
          userId: this.payList[index].userId,
          commercialName: this.payList[index].commercialName,
          userType: this.payList[index].userType,
          payAssume: this.payList[index].paySet[0].assumePerson,
          payServiceCharge: this.payList[index].paySet[0].serviceCharge,
          remark: this.payList[index].remark
        }
      },

      reloadPay() {
        this.__fetchPay(this.currentFilter);
      }
    },

    created() {
      this.__fetchPay(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .pay {
    &__view-log {
      margin-bottom: 15px;
      text-align: right;
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
