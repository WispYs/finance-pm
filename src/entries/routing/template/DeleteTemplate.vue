<template>
  <div class="delete-template">
    <el-dialog
      title="删除分账模板"
      center
      width="350px"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">
      <span class="delete-template__text">确定删除智能硬件分账（{{deleteId}}）</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => $emit('close-click')">取 消</el-button>
        <el-button type="primary" @click="() => $emit('delete-template')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['deleteId'],
    data() {
      return{

      }
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .delete-template {
    overflow-x: auto;
    &__text {
      display: block;
      text-align: center;
    }
  }
</style>
