<template>
  <div class="withdraw-table">
    <el-table :data="withdraw" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="商户ID" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="商户名称" width='250' show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.commercialName }}</template>
      </el-table-column>
      <el-table-column label="用户类型" show-overflow-tooltip>
        <template slot-scope="scope">{{ formatUserType(scope.row.userType) }}</template>
      </el-table-column>

      <el-table-column label="提现通道费" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.withDrawCharge }}元/笔</template>
      </el-table-column>
      <el-table-column label="提现模式" width='200' show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.withDrawSet[0].withDrawType == '0' ? '手动提现' : '自动提现（固定时间）T+1日' }}</template>
        <template slot-scope="scope">
          <!-- withDrawSet[1]是编辑后尚未生效的值 -->
          <p>{{ scope.row.withDrawSet[0].withDrawType == '0' ? '手动提现' : '自动提现（固定时间）T+1日' }}</p>
          <p v-if="scope.row.withDrawSet[1]" class="edited-item">{{ scope.row.withDrawSet[1].withDrawType == '0' ? '手动提现' : '自动提现（固定时间）T+1日' }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column label="通道状态" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.channelStatus }}</template>
      </el-table-column> -->
      <el-table-column fixed="right" width='140'>
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.withDrawSet[1] ? true : false"
            @click="edit(scope.$index)">
            编辑
          </el-button>
          <p v-if="scope.row.withDrawSet[1]" class="edited-item">{{ scope.row.withDrawSet[1].effectiveTime }}生效</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import format   from '@/common/format';

  export default {
    props: ['withdraw'],
    data() {
      return{

      }
    },
    methods: {

      formatUserType(type) {
        return format.formatUserType(type);
      },
      edit(id) {
        this.$emit('edit-click', id);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .withdraw-table {
    margin: 20px auto;
    overflow-x: auto;
    p {
      margin: 4px 0;
    }
    .edited-item {
      color: $red;
    }
  }
</style>
