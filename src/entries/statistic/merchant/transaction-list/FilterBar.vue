<template>
  <div class="filter-bar">
    <div class="filter-bar__trade-date">
      <label>交易时间</label>
      <div class="filter-bar__trade-date__picker">
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
    </div>

    <div class="filter-bar__merchant">
      <label>商户号</label>
      <el-input v-model="merchant" placeholder="请输入商户号/公寓名称"></el-input>
    </div>

    <div class="filter-bar__pay-channel">
      <label>收单通道</label>
      <el-select v-model="payChannel" placeholder="请选择">
        <el-option
          v-for="channel in payChannelOptions"
          :key="channel.name"
          :label="channel.name"
          :value="channel.name">
        </el-option>
      </el-select>
    </div>

    <div class="filter-bar__query">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  import testData from '@/mock-data/merchants';

  export default {
    data() {
      return {
        tradeDate: [],
        merchant: '',
        payChannel: '',

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
        payChannelOptions: testData.meta.payChannels
      };
    },

    methods: {
      __initFilter() {
        const nowDate = moment().format('YYYY-MM-DD');

        this.tradeDate = [nowDate, nowDate];
        this.merchant = '';
        this.payChannel = '全部';
      },
      __getFilter() {
        return {
          tradeStartDate: this.tradeDate[0],
          tradeEndDate: this.tradeDate[1],
          merchant: this.merchant,
          payChannel: this.payChannel
        };
      },

      query() {
        console.log(this.__getFilter());

        this.$emit('query-click', this.__getFilter());
      },
      reset() {
        this.__initFilter();
        console.log(this.__getFilter());
        this.$emit('reset-click', this.__getFilter());
      }
    },

    created() {
      this.__initFilter();
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .filter-bar {
    &__trade-date {
      display: inline-block;

      label {
        margin-right: 5px;
        color: $gray-dark;
      }

      &__picker {
        display: inline-block;

        .el-range-editor.el-input__inner {
          width: 250px;
        }
      }
    }

    &__merchant,
    &__pay-channel {
      margin-left: 10px;
      display: inline-block;

      label {
        margin-right: 5px;
        color: $gray-dark;
      }
    }

    &__merchant {
      .el-input {
        width: auto;
      }
    }

    &__query {
      margin-left: 20px;
      display: inline-block;
    }
  }
</style>
