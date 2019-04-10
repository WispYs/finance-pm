(window.finance__webpackJsonp=window.finance__webpackJsonp||[]).push([[2],{103:function(t,e,n){"use strict";n(114),n(117);var a=n(34),r=n.n(a);r.a.interceptors.request.use(function(t){var e=localStorage.getItem("pm_token");return e&&(t.headers.Authorization="token ".concat(e)),t},function(t){return Promise.reject(t)}),r.a.interceptors.response.use(function(t){if("0"===t.data.code||"success"===t.data.status)return t.data;Promise.reject(t.data.msg)},function(t){Promise.reject(t.toString())});var i=r.a,c=n(60),o=c.a.apiRoot,u=c.a.apiJzRoot,l=function(){return"".concat(o,"/trade/order/backStageFundInQuery")},s=function(){return"".concat(o,"/trade/order/backStageFundOutQuery")},m=function(){return"".concat(o,"/commercial/view/info")},h=function(){return"".concat(o,"/basic/regions")},f=function(){return"".concat(u,"/api/picture/image_upload/")},p=function(){return"".concat(o,"/trade/account/query")};e.a={fetchMerchantTransactions:function(t){var e=l();return i.post(e,t)},fetchMerchantSettlements:function(t){var e=s();return i.post(e,t)},fetchMerchantInfo:function(t){var e=m()+"?userId="+t.userId+"&flag="+t.flag;return i.get(e,t)},getRegions:function(){var t=h();return i.get(t)},uploadImg:function(t){var e=f();return i.post(e,t)},tradeQuery:function(t){var e=p()+"?userId="+t;return i.get(e,t)}}},110:function(t,e,n){t.exports=n(210)},113:function(t,e,n){"use strict";var a=n(33);n.n(a).a},210:function(t,e,n){"use strict";n.r(e);var a=n(0),r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"app"},[e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view")],1)],1)};r._withStripped=!0;var i={created:function(){}},c=(n(113),n(63)),o=Object(c.a)(i,r,[],!1,null,null,null);o.options.__file="src/App.vue";var u=o.exports,l=[{path:"/",name:"login",component:function(t){return n.e(4).then(function(){return t(n(984))}.bind(null,n)).catch(n.oe)}},{path:"",component:function(t){return n.e(5).then(function(){return t(n(972))}.bind(null,n)).catch(n.oe)},redirect:"/merchantMgt/merchants",children:[{path:"/merchantMgt/merchants",name:"merchantMgt__merchantList",component:function(t){return Promise.all([n.e(0),n.e(15),n.e(6)]).then(function(){return t(n(966))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"商户管理"},{title:"商户列表"}]}},{path:"/merchantMgt/merchant/:merchantId",name:"merchantMgt__merchantDetail",component:function(t){return Promise.all([n.e(0),n.e(15),n.e(6)]).then(function(){return t(n(981))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"商户管理"},{title:"商户详情"}]}},{path:"merchantMgt/createMerchant",name:"merchantMgt__createMerchant",component:function(t){return Promise.all([n.e(0),n.e(15),n.e(6)]).then(function(){return t(n(980))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"商户管理"},{title:"新增商户"}]}},{path:"merchantMgt/result/:id",name:"merchantMgt__result",component:function(t){return Promise.all([n.e(0),n.e(15),n.e(6)]).then(function(){return t(n(979))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"商户管理"},{title:"提交成功"}]}},{path:"/transactionMgt/transactions",name:"transactionMgt__transactionList",component:function(t){return Promise.all([n.e(0),n.e(12)]).then(function(){return t(n(974))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"交易管理"},{title:"交易记录"}]}},{path:"/transactionMgt/settlements",name:"transactionMgt__settlementList",component:function(t){return Promise.all([n.e(0),n.e(12)]).then(function(){return t(n(975))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"交易管理"},{title:"提现记录"}]}},{path:"/account/subAccountList",name:"account__subAccountList",component:function(t){return Promise.all([n.e(0),n.e(14),n.e(1)]).then(function(){return t(n(971))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"账户管理"},{title:"子商户账户"}]}},{path:"/account/myAccount/:accountId",name:"account__myAccount",component:function(t){return Promise.all([n.e(0),n.e(14),n.e(1)]).then(function(){return t(n(976))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"账户管理"},{title:"我的账户"}]}},{path:"/setting/withDraw",name:"setting__withDraw",component:function(t){return n.e(9).then(function(){return t(n(967))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"设置中心"},{title:"支付/提现设置"}]}},{path:"/system/securityCenter",name:"system__securityCenter",component:function(t){return n.e(11).then(function(){return t(n(977))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"系统管理"},{title:"安全中心"}]}},{path:"/routing/statistic",name:"routing__statistic",component:function(t){return n.e(7).then(function(){return t(n(973))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"分账管理"},{title:"分账记录"}]}},{path:"/routing/detail/:detailId",name:"routing__detail",component:function(t){return n.e(7).then(function(){return t(n(983))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"分账管理"},{title:"分账详情"}]}},{path:"/routing/template",name:"routing__template",component:function(t){return n.e(7).then(function(){return t(n(969))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"分账管理"},{title:"分账模板"}]}},{path:"/routing/createTemplate",name:"routing__createTemplate",component:function(t){return n.e(7).then(function(){return t(n(982))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"分账管理"},{title:"添加分账模板"}]}},{path:"/system/info",name:"system__info",component:function(t){return n.e(11).then(function(){return t(n(978))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"系统管理"},{title:"我的信息"}]}},{path:"/statistic/shuidi/transactions",name:"statistic__shuidiTransactionList",component:function(t){return Promise.all([n.e(0),n.e(10)]).then(function(){return t(n(968))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"数据统计"},{title:"水滴交易管理"},{title:"交易统计"}]}},{path:"/statistic/merchant/transactions",name:"statistic__merchantTransactionList",component:function(t){return Promise.all([n.e(0),n.e(10)]).then(function(){return t(n(970))}.bind(null,n)).catch(n.oe)},meta:{levels:[{title:"数据统计"},{title:"商户交易管理"},{title:"交易统计"}]}}]}],s=n(61);a.default.use(s.a);var m=new s.a({mode:"history",routes:l,scrollBehavior:function(){return{x:0,y:0}}}),h=n(62);n(103);var f={SET_SIDEBAR_COLLAPSE:function(t,e){var n=e.collapse;t.sidebarCollapse=n},SET_ACCOUNTTYPE:function(t,e){var n=e.type;t.userType=n,sessionStorage.setItem("userType",n)},SET_USER:function(t,e){!function(t){if(null==t)throw new TypeError("Cannot destructure undefined")}(e)}};a.default.use(h.a);var p=new h.a.Store({state:{sidebarCollapse:!1,userType:0},actions:{TOGGLE_SIDEBAR:function(t,e){(0,t.commit)("SET_SIDEBAR_COLLAPSE",{collapse:e})},SAVE_ACCOUNTTYPE:function(t,e){(0,t.commit)("SET_ACCOUNTTYPE",{type:e})},SAVE_USER:function(t){t.commit}},mutations:f,strict:!1}),d=n(100),_=n.n(d);n(208);a.default.use(_.a),new a.default({el:"#app",router:m,store:p,render:function(t){return t(u)}}),p.dispatch("SAVE_ACCOUNTTYPE",0)},33:function(t,e,n){},60:function(t,e,n){"use strict";var a="financepm.shuidiguanjia.com"===window.location.host;e.a={apiRoot:a?"http://finances.shuidiguanjia.com":"http://finances.ih2ome.cn",apiJzRoot:a?"https://jz.api.shuidiguanjia.com":"http://jz.api.ih2ome.cn"}}},[[110,8,3,13]]]);