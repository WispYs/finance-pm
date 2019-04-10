<template>
  <div class="edit-fee-payer-dialog">
    <el-dialog
      title="修改费率承担方"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="cancel">

      <div class="edit-fee-payer-dialog__main">
        <div class="edit-fee-payer-dialog__merchant-info">
          <span>商户号: {{ merchant.merchantId }}</span>
          <span>公寓名称: {{ merchant.apartment }}</span>
          <span>会员类型: {{ merchant.vipType }}</span>
        </div>

        <div class="edit-fee-payer-dialog__payer">
          <label class="edit-fee-payer-dialog__payer__label">承担方</label>
          <div class="edit-fee-payer-dialog__payer__radio">
            <el-radio v-model="feePayer" label="apartment">公寓</el-radio>
            <el-radio v-model="feePayer" label="tenant">租客</el-radio>
          </div>
        </div>

        <div class="edit-fee-payer-dialog__reason">
          <label class="edit-fee-payer-dialog__reason__label">
            <span>修改原因</span>
            <i>*</i>
          </label>

          <div class="edit-fee-payer-dialog__reason__input">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入修改原因"
              v-model="reason">
            </el-input>
          </div>
        </div>
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
        feePayer: this.merchant.feePayer,
        reason: ''
      };
    },

    methods: {
      cancel() {
        this.$emit('cancel-edit');
      },
      confirm() {
        // TODO: validate
        // TODO: conncet api
        this.$confirm('确定修改费率承担方？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let submitData = {
            feePayer: this.feePayer,
            reason: this.reason
          };
          console.log(submitData);
          this.$emit('edit-done');
        })
        .catch(() => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .edit-fee-payer-dialog {
    &__merchant-info {
      padding-bottom: 5px;
      border-bottom: 1px solid $gray-lighter;
      color: $gray-dark;

      span {
        margin-right: 20px;
      }
    }

    &__payer {
      margin-top: 20px;

      &__label {
        display: inline-block;
        width: 70px;
      }

      &__radio {
        display: inline-block;
      }
    }

    &__reason {
      margin-top: 20px;

      &__label {
        margin-bottom: 10px;
        display: inline-block;
        width: 70px;

        i {
          color: $red;
        }
      }

      &__input {
        display: inline-block;
        width: calc(100% - 74px);
        vertical-align: top;
      }
    }
  }
</style>
