<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    created () {
      //
      // 写在前面：
      // 本项目有很多地方判断了登录用户类型 (financeType  1: 水滴 2: 魔方类 3: 魔方子商户)
      // 例如：路由跳转、侧边栏菜单、筛选条件、表单提交以及表格子项等
      // 请开发时多加小心 -_-！
      // 有些关键的用户数据使用localStorage存在本地
      //
    }
  };
</script>

<style lang="scss">
  @import '~styles/base/normalize';
  @import '~styles/base/global';

  .app {

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
