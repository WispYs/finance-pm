<template>
  <div class="filter-bar">
    <div class="filter-bar__row">
      <div class="filter-bar__item">
        <label>创建时间</label>
        <div class="filter-bar__item__picker">
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

      <div class="filter-bar__item">
        <label>支付通道</label>
        <el-select v-model="payChannel" placeholder="请选择">
          <el-option key="" label="全部" value=""></el-option>
          <el-option
            v-for="channel in payChannelOptions"
            :key="channel.pay_channel_3rd"
            :label="channel.pay_channel_name"
            :value="channel.pay_channel_3rd">
          </el-option>
        </el-select>
      </div>

      <div class="filter-bar__item">
        <label>交易状态</label>
        <el-select v-model="tradeStatus" placeholder="请选择">
          <el-option
            v-for="status in tradeStatusOptions"
            :key="status.key"
            :label="status.name"
            :value="status.key">
          </el-option>
        </el-select>
      </div>

      <div class="filter-bar__item">
        <label>搜索</label>
        <el-input
          clearable
          suffix-icon="el-icon-search"
          placeholder="请输入支付流水号/商户名称"
          v-model="keyword">
        </el-input>
      </div>
    </div>

    <div class="filter-bar__query">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['payChannelOptions'],

    data() {
      return {
        tradeDate: [],
        payChannel: '',
        tradeStatus: '',
        keyword: '',

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
        tradeStatusOptions: [
          { key: '', name: '全部' },
          { key: 'S', name: '成功' },
          { key: 'F', name: '失败' },
          { key: 'P', name: '未支付'}
        ]
      };
    },

    methods: {
      __initFilter() {
        const nowDate = moment().format('YYYY-MM-DD');

        this.tradeDate = [nowDate, nowDate];
        this.payChannel = '';
        this.tradeStatus = '';
        this.keyword = '';
      },
      __getFilter() {
        return {
          startTime: this.tradeDate[0],
          endTime: this.tradeDate[1],
          payWay: this.payChannel,
          tradeStatus: this.tradeStatus,
          data: this.keyword
        };
      },

      query() {
        this.$emit('query-click', this.__getFilter());
      },
      reset() {
        this.__initFilter();
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

    &__row {
      margin-bottom: 12px;
    }

    &__item {
      margin-right: 10px;
      margin-bottom: 10px;
      display: inline-block;

      label {
        display: inline-block;
        width: 80px;
        color: $gray-dark;
        text-align: right;
        margin-right: 10px;
      }
      .el-input, .el-select {
        width: 250px;
      }
      &__picker {
        display: inline-block;

        .el-range-editor.el-input__inner {
          width: 250px;
        }
      }
    }

    &__query {
      margin-top: 10px;
      margin-left: 23px;
    }
  }
</style>
