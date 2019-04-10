<template>
  <div class="withdraw-table">
    <el-table :data="withdraw" border empty-text="没有符合查询条件的数据">
      <el-table-column label="序号" width="50" show-overflow-tooltip fixed="left">
        <template slot-scope="scope">{{ scope.row.no }}</template>
      </el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="模板名称" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.templateName }}</template>
      </el-table-column>
      <el-table-column label="模板ID" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.routingId }}</template>
      </el-table-column>
      <el-table-column label="分账详情" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.routingSet }}</template>
      </el-table-column>
      <el-table-column label="通道费承担方" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.bearPerson }}</template>
      </el-table-column>
      <el-table-column label="所属商户" show-overflow-tooltip v-if="financeType == '1'">
        <template slot-scope="scope">{{ scope.row.commercialName }}</template>
      </el-table-column>
      <el-table-column fixed="right" width='100' v-if="financeType == '2'">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="deleteTemplate(scope.row.routingId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ['withdraw'],
    data() {
      return{
        financeType: '',
      }
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      deleteTemplate(id) {
        this.$emit('delete-template', id);
      }
    },
    created(){
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .withdraw-table {
    overflow-x: auto;

  }
</style>
