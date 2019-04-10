<template>
  <div class="merchant-result">
    <i class="merchant-result__icon el-icon-success "></i>
    <p>提交成功，请等待审核</p>
    <p>商户号：{{this.$route.params.id}}</p>
    <el-button
      type="primary"
      @click="$router.push({
        name: 'merchantMgt__merchantList'
      })">
      返回商户列表
    </el-button>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    created(){

    }
  }
</script>

<style lang="scss">
  @import '~styles/base/variable';
  html,body {
    height: 100%;
  }
  .merchant-result {
    padding:80px 0;
    text-align: center;
    font-size: 16px;
    &__icon {
      font-size: 80px;
      color: $blue;
    }
  }
</style>
