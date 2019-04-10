<template>
  <div class="log-dialog">
    <el-dialog
      title="日志记录"
      width="60%"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">

      <div class="log-dialog__main">

        <!-- <div class="log-dialog__search-box">
          <el-input
            clearable
            placeholder="商户号,时间"
            v-model="keyword"
            @clear="search"
            @keyup.enter.native="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div> -->
        <div class="log-dialog__main-filter">
          <div class="log-dialog__main-filter__item">
            <label>创建时间</label>
              <el-date-picker
                v-model="tradeDate"
                type="daterange"
                align="left"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
          </div>
          <div class="log-dialog__main-filter__item">
            <label>搜索</label>
            <el-input
              clearable
              placeholder="请输入商户名称/商户ID"
              prefix-icon="el-icon-search"
              v-model="keyword">
            </el-input>
          </div>
        </div>
        <div class="log-dialog__main-content">
          <ul>
            <li class="log-list">1、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
            <li class="log-list">2、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
            <li class="log-list">3、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
            <li class="log-list">4、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
            <li class="log-list">5、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
            <li class="log-list">6、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
            <li class="log-list">7、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
            <li class="log-list">8、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
            <li class="log-list">9、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
            <li class="log-list">10、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
          </ul>
        </div>

        <!-- <div class="log-dialog__table">
          <el-table :data="logs" resizable border max-height="350">
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
        </div> -->

        <div class="log-dialog__pagination-bar" v-if="100 > 0">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page.sync="currentPage"
            :page-size="10"
            :total="100"
            @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import logs     from '@/mock-data/logs';
  import moment   from 'moment';

  export default {
    data() {
      return {
        logs: [],
        tradeDate: [],
        keyword: '',
        currentPage: 1,
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const nowDate = moment().format('YYYY-MM-DD');
                picker.$emit('pick', [nowDate, nowDate]);
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
                picker.$emit('pick', [yesterday, yesterday]);
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const nowDate = moment().format('YYYY-MM-DD');
                const dateBeforeOneWeek = moment().subtract(6, 'days').format('YYYY-MM-DD');
                picker.$emit('pick', [dateBeforeOneWeek, nowDate]);
              }
            }
          ]
        },
      };
    },

    methods: {
      __initFilter() {
        const nowDate = moment().format('YYYY-MM-DD');
        this.tradeDate = [nowDate, nowDate];
        this.keyword = '';
      },

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
    &__main-filter {
      overflow: hidden;
      margin-bottom: 20px;
      &__item {
        float:left;
        margin-bottom: 10px;
        margin-right: 20px;
        label {
          width: 80px;
          text-align:right;
          margin-right: 10px;
          display:inline-block;
          color: $gray-dark;
        }
        .el-input {
          width: 220px;
        }
      }
    }



    &__main-content {
      ul {
        .log-list{
          padding-left: 60px;
          line-height: 40px;
        }
      }
    }
    &__pagination-bar {
      text-align: right;
      margin: 20px auto;
    }
  }
</style>
