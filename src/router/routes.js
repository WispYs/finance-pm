export default [
  {
    path: '/',
    name: 'login',
    component: resolve => require.ensure([], () => resolve(require('@/entries/Login')), 'login')
  },
  {
    path: '',
    component: resolve => require.ensure([], () => resolve(require('@/components/MainLayout')), 'mainLayout'),
    redirect: '/merchantMgt/merchants',
    children: [
      // 商户管理
      {
        path: '/merchantMgt/merchants',
        name: 'merchantMgt__merchantList',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/MerchantList')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '商户列表' }]
        }
      },
      // 审核成功
      {
        path: '/merchantMgt/merchant/S/:merchantId',
        name: 'merchantMgt__merchantDetailSuccess',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/MerchantDetailSuccess')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '商户详情' }]
        }
      },
      // 审核失败
      {
        path: '/merchantMgt/merchant/:status/:merchantId',
        name: 'merchantMgt__merchantDetailFail',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/MerchantDetailFail')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '商户详情' }]
        }
      },
      // 审核中(页面同审核失败)
      {
        path: '/merchantMgt/merchant/:status/:merchantId',
        name: 'merchantMgt__merchantDetailProcess',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/MerchantDetailFail')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '商户详情' }]
        }
      },
      {
        path: 'merchantMgt/createMerchant',
        name: 'merchantMgt__createMerchant',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/CreateMerchant')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '新增商户' }]
        }
      },
      {
        path: 'merchantMgt/result/:id',
        name: 'merchantMgt__result',
        component: resolve => require.ensure([], () => resolve(require('@/entries/merchant/result')), 'merMgt'),
        meta: {
          levels: [{ title: '商户管理' }, { title: '提交成功' }]
        }
      },

      // 交易管理
      {
        path: '/transactionMgt/transactions',
        name: 'transactionMgt__transactionList',
        component: resolve => require.ensure([], () => resolve(require('@/entries/transaction/TransactionList')), 'tranMgt'),
        meta: {
          levels: [{ title: '交易管理' }, { title: '交易记录' }]
        }
      },
      {
        path: '/transactionMgt/settlements',
        name: 'transactionMgt__settlementList',
        component: resolve => require.ensure([], () => resolve(require('@/entries/transaction/SettlementList')), 'tranMgt'),
        meta: {
          levels: [{ title: '交易管理' }, { title: '提现记录' }]
        }
      },

      // 账户管理
      {
        path: '/account/subAccountList',
        name: 'account__subAccountList',
        component: resolve => require.ensure([], () => resolve(require('@/entries/account/SubAccountList')), 'account'),
        meta: {
          levels: [{ title: '账户管理' }, { title: '子商户账户' }]
        }
      },
      {
        path: '/account/detail/:accountId',
        name: 'account__detail',
        component: resolve => require.ensure([], () => resolve(require('@/entries/account/Detail')), 'account'),
        meta: {
          levels: [{ title: '账户管理' }, { title: '账户详情' }]
        }
      },
      {
        path: '/account/myAccount',
        name: 'account__myAccount',
        component: resolve => require.ensure([], () => resolve(require('@/entries/account/MyAccount')), 'account'),
        meta: {
          levels: [{ title: '账户管理' }, { title: '我的账户' }]
        }
      },

      // 支付设置
      {
        path: '/setting/pay',
        name: 'setting__pay',
        component: resolve => require.ensure([], () => resolve(require('@/entries/setting/Pay')), 'setting'),
        meta: {
          levels: [{ title: '设置中心' }, { title: '支付设置' }]
        }
      },

      // 提现设置
      {
        path: '/setting/withDraw',
        name: 'setting__withDraw',
        component: resolve => require.ensure([], () => resolve(require('@/entries/setting/WithDraw')), 'setting'),
        meta: {
          levels: [{ title: '设置中心' }, { title: '提现设置' }]
        }
      },

      // 安全中心
      {
        path: '/system/securityCenter',
        name: 'system__securityCenter',
        component: resolve => require.ensure([], () => resolve(require('@/entries/system/securityCenter')), 'system'),
        meta: {
          levels: [{ title: '系统管理' }, { title: '安全中心' }]
        }
      },

      // 分账记录
      {
        path: '/routing/statistic',
        name: 'routing__statistic',
        component: resolve => require.ensure([], () => resolve(require('@/entries/routing/statistic')), 'routing'),
        meta: {
          levels: [{ title: '分账管理' }, { title: '分账记录' }]
        }
      },
      // 分账详情
      {
        path: '/routing/detail/:detailId',
        name: 'routing__detail',
        component: resolve => require.ensure([], () => resolve(require('@/entries/routing/detail')), 'routing'),
        meta: {
          levels: [{ title: '分账管理' }, { title: '分账详情' }]
        }
      },
      // 分账模板
      {
        path: '/routing/template',
        name: 'routing__template',
        component: resolve => require.ensure([], () => resolve(require('@/entries/routing/template')), 'routing'),
        meta: {
          levels: [{ title: '分账管理' }, { title: '分账模板' }]
        }
      },
      // 添加分账模板
      {
        path: '/routing/createTemplate',
        name: 'routing__createTemplate',
        component: resolve => require.ensure([], () => resolve(require('@/entries/routing/createTemplate')), 'routing'),
        meta: {
          levels: [{ title: '分账管理' }, { title: '添加分账模板' }]
        }
      },

      // 我的信息
      {
        path: '/system/info',
        name: 'system__info',
        component: resolve => require.ensure([], () => resolve(require('@/entries/system/info')), 'system'),
        meta: {
          levels: [{ title: '系统管理' }, { title: '我的信息' }]
        }
      },

      // 数据统计
      {
        path: '/statistic/merchant/transactions',
        name: 'statistic__merchantTransactionList',
        component: resolve => require.ensure([], () => resolve(require('@/entries/statistic/merchant/TransactionList')), 'statistic'),
        meta: {
          levels: [{ title: '数据统计' }, { title: '商户交易管理' }, { title: '交易统计' }]
        }
      }
    ]
  },
  // 404
  {
    path: '/404',
    component: resolve => require.ensure([], () => resolve(require('@/entries/404')), '404'),
    meta: {
      levels: [{ title: '404' }]
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
];
