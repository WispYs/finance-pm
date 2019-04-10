<template>
  <div class="footer-bar" :class="{ 'is-fixed': isFixed, 'is-wider': isWider }">
    <!-- <div class="footer-bar__left">
      <el-checkbox v-model="isSelectAll" @change="selectAllChange">全选</el-checkbox>
      <el-button
        type="mini"
        round
        plain
        :disabled="!editFeeEnable"
        @click="$emit('batch-edit-fee-click', true)">
        批量修改费率
      </el-button>
    </div> -->

    <div class="footer-bar__right">
      <span class="footer-bar__total">共 {{ total }} 项</span>
      <span class="footer-bar__page-size">
        <el-dropdown trigger="click" @command="selectPageSize">
          <span>
            每页 {{ pageSize }} 项
            <i class="el-icon-caret-bottom"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="10"  :disabled="pageSize === 10">10</el-dropdown-item>
            <el-dropdown-item command="20"  :disabled="pageSize === 20">20</el-dropdown-item>
            <el-dropdown-item command="50"  :disabled="pageSize === 25">50</el-dropdown-item>
            <el-dropdown-item command="60"  :disabled="pageSize === 30">60</el-dropdown-item>
            <el-dropdown-item command="70"  :disabled="pageSize === 35">70</el-dropdown-item>
            <el-dropdown-item command="80"  :disabled="pageSize === 40">80</el-dropdown-item>
            <el-dropdown-item command="90"  :disabled="pageSize === 45">90</el-dropdown-item>
            <el-dropdown-item command="100" :disabled="pageSize === 50">100</el-dropdown-item>
            <el-dropdown-item command="200" :disabled="pageSize === 200">200</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>

      <span class="footer-bar__switch-page">
        <span
          class="el-icon-d-arrow-left first-btn"
          :class="{ disabled: currentPage === 1 }"
          @click="toPage(1)">
        </span>

        <span
          class="el-icon-arrow-left prev-btn"
          :class="{ disabled: currentPage === 1 }"
          @click="toPage(currentPage - 1)">
        </span>

        <span>{{ currentPage }}/{{ pageCount }}</span>

        <span
          class="el-icon-arrow-right next-btn"
          :class="{ disabled: currentPage === pageCount }"
          @click="toPage(currentPage + 1)">
        </span>

        <span
          class="el-icon-d-arrow-right last-btn"
          :class="{ disabled: currentPage === pageCount }"
          @click="toPage(pageCount)">
        </span>
      </span>
    </div>
  </div>
</template>

<script>
  import eventHub from '@/services/event-hub';

  export default {
    props: ['isFixed', 'editFeeEnable', 'pagination'],

    data() {
      return {
        isSelectAll: false
      };
    },

    computed: {
      isWider() {
        return this.$store.state.sidebarCollapse;
      },

      pageSize() {
        return this.pagination.pageSize;
      },
      pageCount() {
        return this.pagination.pageCount;
      },
      currentPage() {
        return this.pagination.currentPage;
      },
      total() {
        return this.pagination.total;
      }
    },

    methods: {
      selectAllChange() {
        eventHub.$emit('footer-bar-selection-change', this.isSelectAll);
      },

      selectPageSize(pageSize) {
        this.$emit('page-size-change', parseInt(pageSize));
      },
      toPage(page) {
        const isValid = page !== this.currentPage && page >= 1 && page <= this.pageCount;
        if (isValid) this.$emit('current-page-change', page);
      }
    },

    created() {
      eventHub.$on('merchant-table-selection-change', isSelectAll => {
        this.isSelectAll = isSelectAll;
      });
    },

    beforeDestroy() {
      eventHub.$off('merchant-table-selection-change');
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .footer-bar {
    @include clearfix;

    padding: 0 14px;
    height: 40px;
    line-height: 40px;
    color: $gray-dark;
    transition: width .3s ease-in-out;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      z-index: $z-index-medium;
      width: calc(100% - 220px);
      background: rgba(0,0,0,.7);
      border-radius: 0 0 4px 4px;
      color: $white;

      .el-checkbox, .el-dropdown {
        color: $white;
      }

      &.is-wider {
        width: calc(100% - 104px);
      }
    }

    &__left {
      float: left;

      .el-button {
        margin-left: 15px;
      }
    }

    &__right {
      float: right;
    }

    &__total,
    &__page-size {
      margin-right: 10px;
      cursor: pointer;
    }

    &__switch-page {
      cursor: pointer;

      .first-btn,
      .prev-btn,
      .next-btn,
      .last-btn {
        &.disabled {
          color: $gray;
          opacity: .7;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
