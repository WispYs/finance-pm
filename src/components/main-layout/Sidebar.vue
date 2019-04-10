<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" :collapse="collapse" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" router>
      <template v-for="menu in menus" v-if="powerIndexOf(menu.power, financeType)">
        <template v-if="menu.submenus">
          <el-submenu :index="menu.index" :key="menu.index">
            <template slot="title">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </template>

            <template v-for="submenu in menu.submenus">
              <!-- <el-submenu v-if="submenu.submenus" :index="submenu.index" :key="submenu.index">
                <template slot="title">{{ submenu.title }}</template>
                <el-menu-item v-for="(item, i) in submenu.submenus" :key="i" :index="item.index">
                  {{ item.title }}
                </el-menu-item>
              </el-submenu> -->

              <el-menu-item v-if="powerIndexOf(submenu.power, financeType)" :index="submenu.index" :key="submenu.index" :data-index="submenu.power">
                {{ submenu.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>

        <template v-else>
          <el-menu-item :index="menu.index" :key="menu.index">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        financeType: '',
        menus: [
          {
            icon: 'el-icon-date',
            index: '1',
            // index: '/merchantMgt/merchants',
            title: '商户管理',
            power: '1,2',
            submenus: [
              {
                index: '/merchantMgt/merchants',
                title: '商户列表'
              },
              // {
              //   index: '/merchantMgt/createMerchant',
              //   title: '新增商户'
              // }
            ]
          },
          {
            icon: 'el-icon-news',
            index: '2',
            // index: '/merchantMgt/merchants',
            title: '账户管理',
            submenus: [
              {
                index: '/account/subAccountList',
                title: '子商户账户',
                power: '1,2'
              },
              {
                index: '/account/myAccount',
                title: '我的账户'
              }
            ]
          },
          {
            icon: 'el-icon-document',
            index: '3',
            title: '交易管理',
            submenus: [
              {
                index: '/transactionMgt/transactions',
                title: '交易记录',
                power: '1,2'
              },
              {
                index: '/transactionMgt/settlements',
                title: '提现记录'
              }
            ]
          },
          {
            icon: 'el-icon-tickets',
            index: '4',
            title: '分账管理',
            power: '1,2',
            submenus: [
              {
                index: '/routing/statistic',
                title: '分账记录'
              },
              {
                index: '/routing/template',
                title: '分账模板'
              },
              // {
              //   index: '/routing/createTemplate',
              //   title: '添加分账模板',
              //   power: '2'
              // }
            ]
          },
          {
            icon: 'el-icon-setting',
            index: '5',
            title: '设置中心',
            power: '1',
            submenus: [
              {
                index: '/setting/pay',
                title: '支付设置'
              },
              {
                index: '/setting/withDraw',
                title: '提现设置'
              }
            ]
          },
          {
            icon: 'el-icon-menu',
            index: '6',
            title: '系统管理',
            submenus: [
              {
                index: '/system/securityCenter',
                title: '安全中心'
              },
              {
                index: '/system/info',
                title: '我的信息'
              }
            ]
          },


          // {
          //   icon: 'el-icon-tickets',
          //   index: '3',
          //   title: '数据统计',
          //   submenus: [
          //     {
          //       index: '3-1',
          //       title: '水滴数据统计',
          //       submenus: [
          //         {
          //           index: '/statistic/shuidi/transactions',
          //           title: '交易统计'
          //         }
          //       ]
          //     },
          //     {
          //       index: '3-2',
          //       title: '商户数据统计',
          //       submenus: [
          //         {
          //           index: '/statistic/merchant/transactions',
          //           title: '交易统计'
          //         }
          //       ]
          //     }
          //   ]
          // }
        ]
      }
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      // 菜单栏查看权限
      powerIndexOf(power, type) {
        if(power == undefined) {
          return true
        }else {
          return power.indexOf(type) > -1;
        }
      }
    },
    computed: {
      collapse() {
        return this.$store.state.sidebarCollapse;
      }
    },
    created() {
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    },
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .sidebar {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }

    .el-menu {
      height: 100%;
    }

    .el-menu:not(.el-menu--collapse) {
      width: 180px;
    }

    .el-submenu .el-menu-item {
      min-width: 180px;
    }
  }
</style>
