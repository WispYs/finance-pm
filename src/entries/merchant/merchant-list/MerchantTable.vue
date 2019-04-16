<template>
  <div class="merchant-table">
    <el-table :data="merchants" ref="merchantTable" @selection-change="selectionChange" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column label="商户Id" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="商户名称" width="250" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="证件号" width="160" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.businessLicenseNo }}</template>
      </el-table-column>
      <el-table-column label="用户类型" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatType(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column label="所属商户" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.parentName }}</template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatStatus(scope.row.reviewStatus) }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="100">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
          <!-- <span class="merchant-table__setting-icon" @click="toSetTableField">
            <i class="fas fa-cog"></i>
          </span> -->
        </template>

        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push({
              name: formatDetailRoute(scope.row.reviewStatus),
              params: { status: scope.row.reviewStatus, merchantId: scope.row.id }
            })">
            详情
          </el-button>

          <!-- <el-button
            class="merchant-table__unfreeze-btn"
            v-if="scope.row.isFreezed"
            type="text"
            size="small"
            @click="toUnfreezeMerchant(scope.row)">
            解冻
          </el-button>
          <el-button
            v-else
            class="merchant-table__freeze-btn"
            type="text"
            size="small"
            @click="toFreezeMerchant(scope.row)">
            冻结
          </el-button>

          <el-button
            class="merchant-table__edit-fee-btn"
            type="text"
            size="small"
            @click="toEditFee(scope.row)">
            修改费率
          </el-button>

          <el-button
            class="merchant-table__edit-fee-payer-btn"
            type="text"
            size="small"
            @click="toEditFeePayer(scope.row)">
            修改费率承担方
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import eventHub from '@/services/event-hub';
  import format   from '@/services/format';

  export default {
    props: ['merchants'],

    methods: {
      selectionChange(selectedMerchants) {
        eventHub.$emit('merchant-table-selection-change', selectedMerchants.length === this.merchants.length);
        this.$emit('selection-change', selectedMerchants);
      },

      toSetTableField() {
        this.$emit('set-table-field-click');
      },

      toFreezeMerchant(merchant) {
        this.$emit('freeze-click', merchant);
      },
      toUnfreezeMerchant(merchant) {
        this.$emit('unfreeze-click', merchant);
      },
      toEditFee(merchant) {
        this.$emit('edit-fee-click', false, merchant);
      },
      toEditFeePayer(merchant) {
        this.$emit('edit-fee-payer-click', merchant);
      },
      formatType(type) {
        return format.formatUserType(type);
      },
      formatStatus(type) {
        return format.formatReviewStatus(type);
      },
      formatDetailRoute(status) {
        switch (status) {
          case 'S' : return 'merchantMgt__merchantDetailSuccess';
          case 'F' : return 'merchantMgt__merchantDetailFail';
          case 'P' : return 'merchantMgt__merchantDetailProcess';
        }
      },

    },

    created() {
      eventHub.$on('footer-bar-selection-change', isSelectAll => {
        if (isSelectAll) {
          this.$refs.merchantTable.toggleAllSelection();
        } else {
          this.$refs.merchantTable.clearSelection();
        }
      });
    },

    beforeDestroy() {
      eventHub.$off('footer-bar-selection-change');
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .merchant-table {
    margin: 20px auto;
    &__setting-icon {
      float: right;
      padding: 2px 5px;
      cursor: pointer;

      &:hover {
        background-color: $gray-light;
        border-radius: 4px;
        color: $black-light;
      }
    }

    &__freeze-btn {
      margin-left: 0;
      color: $green-light;

      &:hover {
        opacity: .8;
      }
    }

    &__unfreeze-btn {
      margin-left: 0;
      color: $red;

      &:hover {
        opacity: .8;
      }
    }

    &__edit-fee-btn {
      margin-left: 0;
      color: $yellow;

      &:hover {
        opacity: .8;
      }
    }

    &__edit-fee-payer-btn {
      margin-left: 0;
    }
  }
</style>
