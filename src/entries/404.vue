<template>
  <div class="failpage">
    <img src="~images/404.png" alt="">
    <p class="failpage__text">真抱歉!您所访问的页面被UFO抢走了!</p>
    <p class="failpage__text">程序猿已经乘火箭去追赶,请返回首页等待...</p>
    <el-button type="primary" class="failpage__btn" @click="goIndex">返回首页</el-button>
  </div>
</template>

<script>
  import api from '@/api/api';

  export default {
    data() {
      return {
        financeType: '',
      };
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      goIndex() {
        // 水滴、B端商户跳转到商户列表; 魔方类子商户跳转到我的账号;   1、水滴；2、魔方类(B端)；3、魔方子商户
        let routerName = this.financeType == '3' ? 'account__myAccount' : 'merchantMgt__merchantList';
        this.$router.push({name: routerName});
      }
    },
    created() {
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  .failpage {
    text-align: center;
    &__text {
      font-size: 16px;
      color: #409EFF;
      margin: 5px 0;
    }
    &__btn {
      margin-top: 20px;
    }
  }

</style>
