<template>
  <div class="header-bar">
    <div class="header-bar__left">
      <span class="header-bar__collapse-sidebar-btn" @click="collapseSidebar">
        <i class="fas fa-bars fa-2x" :class="{'is-rotated': isRotated}"></i>
      </span>
    </div>

    <div class="header-bar__right">
      <span class="header-bar__logout-btn" @click="logout">退出登录</span>
    </div>
    <div class="header-bar__right" v-if="userId == '800000000'">
      <img class="header-bar__avatar" src="~images/mf.jpg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: '',
      }
    },
    computed: {
      isRotated() {
        return this.$store.state.sidebarCollapse;
      }
    },

    methods: {
      collapseSidebar() {
        this.$store.dispatch('TOGGLE_SIDEBAR', !this.$store.state.sidebarCollapse);
      },

      logout() {
        this.$router.push({ name: 'login' });
      }
    },

    created() {
      this.userId = localStorage.getItem('FINANCE_USERID');
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .header-bar {
    @include clearfix;

    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    background-color: $white;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

    &__left {
      float: left;
    }

    &__right {
      float: right;
    }
    &__avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-top: 10px;
      margin-right: 10px;
    }
    &__collapse-sidebar-btn {
      cursor: pointer;

      i {
        line-height: 50px;
        transition: transform .3s ease-in-out;;

        &.is-rotated {
          transform: rotate(90deg);
        }
      }
    }

    &__logout-btn {
      opacity: .6;
      font-size: $font-size-smaller;
      cursor: pointer;

      &:hover {
        color: $blue;
      }
    }
  }
</style>
