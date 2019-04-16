<template>
  <div class="with-draw-dialog">
    <el-dialog
      title="提现金额"
      width="500px"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="cancel">

      <el-form :model="withDrawData">
        <el-form-item label="收款银行账号" label-width="120px">
          <el-input v-model="withDrawData.withDrawAccount" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="提现金额" label-width="120px">
          <el-input class="count-input" type="number" v-model="withDrawData.withDrawMoney" placeholder="请输入提现金额" autocomplete="off" @change="formatWithDrawMoney"></el-input>
          <span class="actual-money">可提现金额<b>{{ withDrawData.actualMoney }}</b>元</span>
          <p class="draw-tip">最低5.01元，最高提现金额不能大于账户可提现金额</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          :disabled="withDrawLoading"
          type="primary"
          @click="confirm" >确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import format from '@/services/format';
  export default {
    props: ['withDrawData', 'withDrawLoading'],

    data() {
      return {

      };
    },

    methods: {
      cancel() {
        this.$emit('close-dialog');
      },
      confirm() {
        this.$emit('with-draw');
      },
      formatWithDrawMoney() {
        this.withDrawData.withDrawMoney = this.withDrawData.withDrawMoney ? parseFloat(this.withDrawData.withDrawMoney).toFixed(2) : '';
      },

    },
  };
</script>

<style lang="scss">
  @import '~styles/base/variable';

  .with-draw-dialog {
    .el-dialog__body{
      padding-bottom: 0;
    }
    .el-form-item__content{
      width: calc(100% - 150px);
      .count-input{
        width: 140px;
        margin-right: 5px;
      }
      .actual-money{
        display:inline-block;
        font-size: 13px;
        b{
          font-weight: normal;
          margin: 0 2px;
          color: $red;
        }
      }
      .draw-tip {
        font-size: 12px;
        color: $gray-dark;
        margin-top: 8px;
        line-height: 20px;
      }
    }
  }
</style>
