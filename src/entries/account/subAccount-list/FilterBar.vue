<template>
  <div class="filter-bar">
    <div class="filter-bar__row">
      <div class="filter-bar__item">
        <label>搜索</label>
        <el-input
          clearable
          suffix-icon="el-icon-search"
          placeholder="请输入商户名称/商户ID"
          v-model="idOrName">
        </el-input>
      </div>
      <div class="filter-bar__item" v-if="financeType == 1">
        <label>用户类型</label>
        <el-select v-model="userType" placeholder="请选择">
          <el-option key="" label="全部" value=""></el-option>
          <el-option
            v-for="type in userTypeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </div>
      <div class="filter-bar__item" v-if="financeType == 1">
        <label>所属商户</label>
        <el-select v-model="pid" placeholder="请选择">
          <!-- <el-option key="" label="全部" value=""></el-option> -->
          <el-option
            v-for="merchant in parentMerchantOptions"
            :key="merchant.userId"
            :label="merchant.commercialName"
            :value="merchant.userId">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="filter-bar__query">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['parentMerchantOptions'],
    data() {
      return {
        financeType: '',
        tradeDate: [],
        payChannel: '',
        userType: '',
        userTypeOptions: [{
          label: '平台用户',
          value: 2
        },{
          label: '普通用户',
          value: 3
        }],
        pid: '',
        idOrName: '',

      };
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      __initFilter() {
        this.userType = '';
        this.pid = '';
        this.idOrName = '';
      },
      __getFilter() {
        return {
          userType: this.userType,
          pid: this.pid,
          idOrName: this.idOrName
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
      margin-bottom: 10px;
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
    }

    &__query {
      margin-top: 10px;
      margin-left: 50px;
    }
  }
</style>
