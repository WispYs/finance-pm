<template>
  <div class="layout">
    <div class="layout__left">
      <sidebar></sidebar>
    </div>

    <div class="layout__right" :class="{'is-wider': isWider}">
      <div class="layout__right__header">
        <header-bar></header-bar>
      </div>

      <div class="layout__right__breadcrumb">
        <i class="el-icon-tickets"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(level, index) in $route.meta.levels" :key="index">
            {{ level.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="layout__right__content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from './main-layout/HeaderBar';
  import Sidebar   from './main-layout/Sidebar';

  export default {
    components: {
      HeaderBar,
      Sidebar
    },

    computed: {
      isWider() {
        return this.$store.state.sidebarCollapse;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .layout {
    &__left {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: $z-index-high;
    }

    &__right {
      margin-left: 180px;
      transition: margin-left .3s ease-in-out;

      &.is-wider {
        margin-left: 64px;
      }

      &__breadcrumb {
        margin: 10px;

        i {
          vertical-align: middle;
        }

        .el-breadcrumb {
          display: inline-block;
          vertical-align: middle;
        }
      }

      &__content {
        margin-top: 10px;
        padding: 10px 10px 30px 10px;
        background-color: $white;
      }
    }
  }
</style>
