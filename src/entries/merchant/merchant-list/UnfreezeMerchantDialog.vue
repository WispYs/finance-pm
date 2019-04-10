<template>
  <div class="unfreeze-merchant-dialog">
    <el-dialog
      title="解冻商户"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="cancel">

      <div class="unfreeze-merchant-dialog__main">
        <label class="unfreeze-merchant-dialog__label">
          <span>解冻原因</span>
          <i>*</i>
        </label>

        <el-input
          type="textarea"
          resize="none"
          :rows="4"
          placeholder="请输入解冻原因"
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
        this.$emit('cancel-unfreeze');
      },
      confirm() {
        // TODO: conncet unfreeze api
        this.$emit('unfreeze-done');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .unfreeze-merchant-dialog {
    &__label {
      display: inline-block;
      margin-bottom: 10px;

      i {
        color: $red;
      }
    }
  }
</style>
