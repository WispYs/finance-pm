<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>支付时间</label>
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
    <div class="filter-bar__item" v-if="financeType == '2'">
      <label>商户名称</label>
      <el-select v-model="userId" placeholder="请选择">
        <el-option key="" label="全部" value=""></el-option>
        <el-option
          v-for="merchant in parentMerchantOptions"
          :key="merchant.id"
          :label="merchant.name"
          :value="merchant.id">
        </el-option>
      </el-select>
    </div>
    <div class="filter-bar__item" v-if="financeType == '1'">
      <label>所属商户</label>
      <el-select v-model="pid" placeholder="请选择">
        <el-option key="" label="全部" value=""></el-option>
        <el-option
          v-for="merchant in parentMerchantOptions"
          :key="merchant.id"
          :label="merchant.name"
          :value="merchant.id">
        </el-option>
      </el-select>
    </div>
    <div class="filter-bar__item">
      <label>搜索</label>
      <el-input
        clearable
        suffix-icon="el-icon-search"
        placeholder="请输入商户名称/关联流水号"
        v-model="data">
      </el-input>
    </div>

    <div class="filter-bar__query">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import moment   from 'moment';
  export default {
    props: ['parentMerchantOptions'],

    data() {
      return {
        financeType: '',
        tradeDate: [],
        pid: '',
        userId: '',
        data: '',
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
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      __initFilter() {
        const nowDate = moment().format('YYYY-MM-DD');
        this.tradeDate = [nowDate, nowDate];
        this.data = '';
        this.parentMerchant = '';

      },
      __getFilter() {
        return {
          startTime: this.tradeDate ? this.tradeDate[0] : '',
          endTime: this.tradeDate ? this.tradeDate[1] : '',
          pid: this.pid,
          userId: this.userId,
          data: this.data
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
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
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
        margin-right: 10px;
        text-align: right;
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
