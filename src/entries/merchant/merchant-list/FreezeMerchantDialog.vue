<template>
  <div class="freeze-merchant-dialog">
    <el-dialog
      title="冻结商户"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="cancel">

      <div class="freeze-merchant-dialog__main">
        <label class="freeze-merchant-dialog__label">
          <span>冻结原因</span>
          <i>*</i>
        </label>

        <el-input
          type="textarea"
          resize="none"
          :rows="4"
          placeholder="请输入冻结原因"
          v-model="reason">
        </el-input>
      </div>

      <div slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary" :disabled="reason === ''">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['merchant'],

    data() {
      return {
        reason: ''
      };
    },

    methods: {
      cancel() {
        this.$emit('cancel-freeze');
      },
      confirm() {
        // TODO: conncet freeze api
        this.$emit('freeze-done');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .freeze-merchant-dialog {
    &__label {
      display: inline-block;
      margin-bottom: 10px;

      i {
        color: $red;
      }
    }
  }
</style>
