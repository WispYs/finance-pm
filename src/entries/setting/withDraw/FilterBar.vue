<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>搜索</label>
      <el-input
        clearable
        suffix-icon="el-icon-search"
        placeholder="请输入商户名称/商户ID"
        v-model="idOrName">
      </el-input>
    </div>
    <div class="filter-bar__item">
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

    <div class="filter-bar__item" style="margin-left: 20px;">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        idOrName: '',
        userType: '',
        userTypeOptions: [{
          value: 2,
          label: '平台用户'
        },{
          value: 3,
          label: '普通用户'
        }]
      };
    },

    methods: {
      __initFilter() {
        this.idOrName = '';
        this.userType = '';
      },
      __getFilter() {
        return {
          idOrName: this.idOrName,
          userType: this.userType,
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
