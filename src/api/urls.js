import config from 'config';

const baseUrl = config.apiRoot;
const baseJzUrl = config.apiJzRoot;

export default {

  // 用户登录
  userLogin () {
    return `${baseUrl}/basic/user/login`
  },

  // 交易记录
  merchantTransactions () {
    return `${baseUrl}/trade/order/backStageFundInQuery`;
  },

  // 结算记录
  merchantSettlements () {
    return `${baseUrl}/trade/settlement/query`;
  },

  // 商户列表
  merchantList() {
    return `${baseUrl}/basic/user/commercialDetails`
  },

  // 商户基本信息
  merchantBasicInfo () {
    return `${baseUrl}/basic/back/commercialManager/basicInfo`
  },

  // 商户详情
  merchantInfo () {
    return `${baseUrl}/commercial/view/info`;
  },

  // 商户支付设置，账号设置，提现设置
  getAccountSetting() {
    return `${baseUrl}/basic/payWithdrawAcc/get`;
  },

  // 入网生成后台账号
  createUser () {
    return `${baseUrl}/basic/basicUser/create`
  },

  // 企业入网，个人入网，个体入网
  registerCommercial () {
    return `${baseUrl}/commercial/register`
  },

  // 商户入网-支付，账号，提现设置
  setAccountSetting () {
    return `${baseUrl}/basic/payWithdrawAcc/set`
  },

  // 搜索银行列表
  searchBank () {
    return `${baseUrl}/basic/banks`
  },

  // 省市地区联动
  regions () {
    return `${baseUrl}/basic/regions`;
  },

  // 上传图片
  uploadImg () {
    return `${baseJzUrl}/api/picture/image_upload/`;
  },

  // 子商户所属商户下拉列表
  merchantAccountBelongList () {
    return `${baseUrl}/basic/merchantAccount/belongList`
  },

  // 子商户账户列表
  merchantAccountList () {
    return `${baseUrl}/basic/merchantAccount/list`
  },

  // 账户金额
  accountBanlance () {
    return `${baseUrl}/trade/query/accountBanlance`;
  },

  // 入账记录
  tradeInRecord () {
    return `${baseUrl}/trade/in/record`;
  },

  // 对账单
  tradeQuery () {
    return `${baseUrl}/trade/account/query`
  },

  // 获取提现信息
  fundOutCardBinInfo () {
    return `${baseUrl}/trade/get/fundOutCardBinInfo`
  },

  // 提现
  fundOutPay () {
    return `${baseUrl}/trade/single/fundOutPay`
  },

  // 分账
  routingRecord () {
    return `${baseUrl}/routing/get/records`
  },

  // 分账详情
  routingRecordDetail () {
    return `${baseUrl}/routing/record/details`
  },

  // 分账模板
  routingTemplates () {
    return `${baseUrl}/routing/routing/templates`
  },

  // 添加分账模板
  createRoutingTemplates () {
    return `${baseUrl}/routing/add/template`
  },

  // 删除分账模板
  deleteRoutingTemplates () {
    return `${baseUrl}/routing/del/template`
  },

  // 支付设置列表
  settingPayList () {
    return `${baseUrl}/basic/setCenter/paySet/get`
  },

  // 支付设置编辑
  settingPayEdit () {
    return `${baseUrl}/basic/setCenter/paySet/set`
  },

  // 提现设置列表
  settingWithdraw () {
    return `${baseUrl}/basic/setCenter/withdraw/get`
  },

  // 提现设置编辑
  settingWithdrawEdit () {
    return `${baseUrl}/basic/setCenter/withdraw/set`
  },

  // 系统管理 修改密码
  updatePassword () {
    return `${baseUrl}/basic/update/password`
  },

  // 系统管理 我的信息
  userInfo () {
    return `${baseUrl}/basic/systemManag/myinfo`
  },

};
