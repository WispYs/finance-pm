<template>
  <div class="filter-bar">
    <div class="filter-bar__row">
      <div class="filter-bar__item">
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

      <div class="filter-bar__item">
        <label>状态</label>
        <el-select v-model="reviewStatus" placeholder="请选择" >
          <el-option key="" label="全部" value=""></el-option>
          <el-option
            v-for="statu in statusOptions"
            :key="statu.value"
            :label="statu.label"
            :value="statu.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter-bar__item" v-if="financeType == '1'">
        <label>用户类型</label>
        <el-select v-model="type" placeholder="请选择" >
          <el-option key="" label="全部" value=""></el-option>
          <el-option
            v-for="type in userTypeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter-bar__item" v-if="financeType == '1'">
        <label>所属商户</label>
        <el-select v-model="pid" placeholder="请选择">
          <el-option key="" label="全部" value=""></el-option>
          <el-option
            v-for="type in parentMerchantOptions"
            :key="type.id"
            :label="type.name"
            :value="type.id">
          </el-option>
        </el-select>
      </div>
      <div class="filter-bar__item">
        <label>搜索</label>
        <el-input
          clearable
          placeholder="请输入商户名称/商户ID"
          prefix-icon="el-icon-search"
          v-model="data">
        </el-input>
      </div>
    </div>
    <div>

    </div>
    <div class="filter-bar__query">
        <el-button type="primary" @click="query">搜索</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button
          class="filter-bar__query-create"
          type="primary"
          @click="$router.push({name: 'merchantMgt__createMerchant'})">
          <i class="fa fa-user-plus create-user-icon" aria-hidden="true"></i>
          添加平台用户
        </el-button>
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
        reviewStatus: '',
        type: '',
        parentMerchant: '',
        pid: '',
        data: '',
        tradeDate: [],
        statusOptions: [
          {
            value: 'S',
            label: '审核成功'
          },{
            value: 'P',
            label: '审核中'
          },{
            value: 'F',
            label: '审核失败'
          }
        ],
        userTypeOptions: [
          {
            value: 2,
            label: '平台用户'
          },{
            value: 3,
            label: '普通用户'
          },
        ],
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
        this.reviewStatus = '';
        this.type = '';
        this.parentMerchant = '';
        this.pid = '';
        this.data = '';
      },
      __getFilter() {
        return {
          startTime: this.tradeDate ? this.tradeDate[0] : '',
          endTime: this.tradeDate ? this.tradeDate[1] : '',
          reviewStatus: this.reviewStatus,
          type: this.type,
          parentMerchant: this.parentMerchant,
          pid: this.pid,
          data: this.data
        };
      },
      query() {
        this.$emit('query-click', this.__getFilter());
      },
      reset() {
        this.__initFilter();
        this.$emit('reset-click', this.__getFilter());
      },
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
    &__item{
      margin-right: 10px;
      display: inline-block;
      margin-bottom: 10px;
      label {
        width: 80px;
        text-align:right;
        margin-right: 10px;
        display:inline-block;
        color: $gray-dark;
      }
      .el-input{
        width: 217px;
      }
    }
    &__query {
      margin-top: 10px;
      margin-left: 23px;
      &-create {
        margin-left: 40px;
        .create-user-icon {
          margin-right: 5px;
        }
      }
    }
  }
</style>
