<template>
  <div class="log-dialog">
    <el-dialog
      title="日志记录"
      width="60%"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">

      <div class="log-dialog__main">
        <div class="log-dialog__search-box">
          <el-input
            clearable
            placeholder="商户号,时间"
            v-model="keyword"
            @clear="search"
            @keyup.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>

        <div class="log-dialog__table">
          <el-table :data="logs" resizable border max-height="350" empty-text="没有符合查询条件的数据">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{ scope.row.no }}</template>
            </el-table-column>

            <el-table-column label="商户号" width="70">
              <template slot-scope="scope">{{ scope.row.merchantId }}</template>
            </el-table-column>

            <el-table-column label="商户名称">
              <template slot-scope="scope">{{ scope.row.merchantName }}</template>
            </el-table-column>

            <el-table-column label="修改时间">
              <template slot-scope="scope">{{ scope.row.modifiedAt }}</template>
            </el-table-column>

            <el-table-column label="修改内容">
              <template slot-scope="scope">{{ scope.row.content }}</template>
            </el-table-column>

            <el-table-column label="修改原因" width="100">
              <template slot-scope="scope">{{ scope.row.reason }}</template>
            </el-table-column>

            <el-table-column label="操作员" width="70">
              <template slot-scope="scope">{{ scope.row.operator }}</template>
            </el-table-column>
          </el-table>
        </div>

        <div class="log-dialog__pagination-bar" v-if="1000 > 0">
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
    </el-dialog>
  </div>
</template>

<script>
  import logs from '@/mock-data/logs';

  export default {
    data() {
      return {
        logs: [],
        keyword: '',
        currentPage: 1
      };
    },

    methods: {
      __fetchLogs() {
        // TODO: connect api
        this.logs = logs;
      },

      search() {
        // TODO: update data
        console.log(this.keyword);
      },

      currentPageChange() {
        // TODO: update data
        console.log(this.currentPage);
      }
    },

    created() {
      this.__fetchLogs();
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .log-dialog {
    &__search-box {
      text-align: right;

      .el-input {
        width: 300px;
      }
    }

    &__table {
      margin-top: 20px;
    }

    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
