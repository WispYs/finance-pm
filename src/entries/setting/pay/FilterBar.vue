<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>搜索</label>
      <el-input
        clearable
        suffix-icon="el-icon-search"
        placeholder="请输入商户名称/商户ID"
        v-model="condition">
      </el-input>
    </div>

      <el-button type="primary" @click="query" style="margin-left: 20px;">查询</el-button>
      <el-button @click="reset">重置</el-button>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        condition: '',
      };
    },

    methods: {
      __initFilter() {
        this.condition = '';
      },
      __getFilter() {
        return {
          data: this.condition,
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
