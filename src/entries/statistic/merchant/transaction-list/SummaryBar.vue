<template>
  <div class="summary-bar">
    <div class="summary-bar__item">
      <label>总交易笔数</label>
      <span>99999</span>
    </div>

    <div class="summary-bar__item">
      <label>总交易成功金额(元)</label>
      <span>99999.99</span>
    </div>

    <div class="summary-bar__item">
      <label>总支付机构手续费(元)</label>
      <span>99.99</span>
    </div>

    <div class="summary-bar__item">
      <label>总水滴手续费(元)</label>
      <span>99.99</span>
    </div>

    <div class="summary-bar__item">
      <label>总结算交易金额(元)</label>
      <span>99999</span>
    </div>

    <div class="summary-bar__item">
      <label>总结算手续费(元/笔)</label>
      <span>10</span>
    </div>

    <div class="summary-bar__item">
      <label>总到账金额(元）</label>
      <span>99999</span>
    </div>
  </div>
</template>

<script>
  export default {

  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .summary-bar {
    padding: 15px;
    border: 1px solid $gray-light;


    &__item {
      margin-left: -5px;
      margin-bottom: 10px;
      display: inline-block;
      width: 25%;

      label {
        display: inline-block;
        color: $gray-dark;
        font-size: $font-size-large;
      }

      span {
        margin-left: 10px;
        color: $green-light;
        font-size: $font-size-largest;
      }
    }
  }
</style>
