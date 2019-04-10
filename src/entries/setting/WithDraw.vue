<template>
  <div class="with-draw">
    <div class="with-draw__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            @query-click="queryWithDraw"
            @reset-click="queryWithDraw">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>

    </div>

    <!-- <div class="with-draw__view-log">
      <el-button type="text" @click="logDialogVisible = true">查看日志</el-button>
    </div> -->

    <div class="with-draw__table">
      <with-draw-table :withdraw="withDrawList" @edit-click="editWithDraw"></with-draw-table>
    </div>

    <div class="with-draw__pagination-bar" v-if="withDrawListTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="withDrawListTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
    <log-dialog
      v-if="logDialogVisible"
      @close-click="logDialogVisible = false">
    </log-dialog>
    <edit-dialog
      :withDrawDetail="editWithDrawDetail"
      v-if="editDialogVisible"
      @reload="reloadWithDraw"
      @close-click="editDialogVisible = false">
    </edit-dialog>
  </div>
</template>

<script>

  import api              from '@/api/api';

  import FilterBar        from './withDraw/FilterBar';
  import WithDrawTable    from './withDraw/WithDrawTable';
  import LogDialog        from './withDraw/LogDialog';
  import EditDialog       from './withDraw/EditDialog';

  export default {
    components: {
      FilterBar,
      WithDrawTable,
      LogDialog,
      EditDialog
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        withDrawList: [],
        withDrawListTotal: 0,
        currentFilter: {
          idOrName: '',
          userType: ''
        },
        editWithDrawDetail: null,
        currentPage: 1,
        pageSize: 10,
        logDialogVisible: false,
        editDialogVisible: false,
      };
    },

    methods: {
      __fetchWithDraw(filter) {
        let data = Object.assign({}, filter, {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        });

        api.fetchSettingWithdraw(data)
          .then(rep => {
            if(rep) {
              if(rep.data.pageData.length <= 0) {
                this.withDrawList = [];
                this.withDrawListTotal = rep.data.total;
              }
              let offset = (this.currentPage - 1)  * this.pageSize;
              this.withDrawList = rep.data.pageData.map((t, i) => Object.assign({}, t, {
                no: offset + i + 1
              }));
              this.withDrawListTotal = rep.data.total;
            }else {
              this.$message.error('暂无数据');
            }
          })
          .catch(err => this.$message.error(err))
      },

      queryWithDraw(filter) {
        console.log(filter)
        this.currentPage = 1;
        this.currentFilter = filter;
        this.__fetchWithDraw(filter);
      },

      currentPageChange(page) {
        this.currentPage = page;

        this.__fetchWithDraw(this.currentFilter);
      },

      editWithDraw(index) {
        this.editDialogVisible = true;
        this.editWithDrawDetail = {
          userId: this.withDrawList[index].userId,
          commercialName: this.withDrawList[index].commercialName,
          userType: this.withDrawList[index].userType,
          withDrawType: this.withDrawList[index].withDrawSet[0].withDrawType,
          remark: this.withDrawList[index].remark
        }
      },

      reloadWithDraw() {
        this.__fetchWithDraw(this.currentFilter);
      }
    },

    created() {
      this.__fetchWithDraw(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .with-draw {
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
