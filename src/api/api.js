import axiosJz from '@/api/axiosJz';
import axiosFinance from '@/api/axiosFinance';
import urls  from './urls';

export default {
  // 用户登录
  fetchUserLogin (data) {
    const url = urls.userLogin();
    return axiosFinance.post(url, data);
  },

  // 交易记录
  fetchMerchantTransactions (data) {
    const url = urls.merchantTransactions();
    return axiosFinance.post(url, data);
  },

  // 结算记录
  fetchMerchantSettlements (data) {
    const url = urls.merchantSettlements();
    return axiosFinance.post(url, data);
  },

  // 商户列表
  fetchMerchantList (data) {
    const url = urls.merchantList();
    return axiosFinance.post(url, data);
  },

  // 商户基本信息
  fetchMerchantBasicInfo (id) {
    const url = urls.merchantBasicInfo() + '?userId=' + id;
    return axiosFinance.get(url, id);
  },

  // 商户详情
  fetchMerchantInfo (data) {
    const url = urls.merchantInfo() + '?userId=' + data.userId + '&flag=' + data.flag;
    return axiosFinance.get(url, data);
  },

  // 商户支付设置，账号设置，提现设置
  fetchAccountSetting(id) {
    const url = urls.getAccountSetting() + '?userId=' + id;
    return axiosFinance.get(url, id);
  },

  // 入网生成后台账号
  createUser (token) {
    const url = urls.createUser() + '?loginToken=' + token;
    return axiosFinance.get(url, token);
  },

  // 企业入网，个人入网，个体入网
  registerCommercial (data) {
    const url = urls.registerCommercial(data);
    return axiosFinance.post(url, data);
  },

  // 商户入网-支付，账号，提现设置
  setAccountSetting (data) {
    const url = urls.setAccountSetting(data);
    return axiosFinance.post(url, data);
  },

  // 省市地区联动
  getRegions () {
    const url = urls.regions();
    return axiosFinance.get(url);
  },

  // 搜索银行列表
  searchBank (data) {
    const url = urls.searchBank() + '?type=' + data.type + '&bankName=' + data.keyword;
    return axiosFinance.get(url, data);
  },

  // 上传图片
  uploadImg (data) {
    const url = urls.uploadImg();
    return axiosJz.post(url, data);
  },

  // 子商户所属商户下拉列表
  merchantAccountBelongList () {
    const url = urls.merchantAccountBelongList();
    return axiosFinance.get(url);
  },

  // 子商户账户列表
  fetchMerchantAccountList (data) {
    const url = urls.merchantAccountList();
    return axiosFinance.post(url, data);
  },

  // 账户余额
  getAccountBanlance (id) {
    const url = urls.accountBanlance() + '?userId=' + id;
    return axiosFinance.get(url, id);
  },

  // 入账记录
  tradeInRecord (data) {
    const url = urls.tradeInRecord();
    return axiosFinance.post(url, data);
  },

  // 对账单
  tradeQuery (id) {
    const url = urls.tradeQuery() + '?userId=' + id;
    return axiosFinance.get(url, id);
  },

  // 获取提现信息
  getFundOutCardBinInfo (id) {
    const url = urls.fundOutCardBinInfo() + '?userId=' + id;
    return axiosFinance.get(url, id);
  },

  // 提现
  fundOutPay (data) {
    const url = urls.fundOutPay();
    return axiosFinance.post(url, data);
  },

  // 分账
  getRoutingRecord (data) {
    const url = urls.routingRecord();
    return axiosFinance.post(url, data);
  },

  // 分账详情
  routingRecordDetail (id) {
    const url = urls.routingRecordDetail() + '?routingId=' + id;
    return axiosFinance.get(url, id);
  },

  // 分账模板
  getRoutingTemplates (data) {
    const url = urls.routingTemplates();
    return axiosFinance.post(url, data);
  },

  // 添加分账模板
  createRoutingTemplates (data) {
    const url = urls.createRoutingTemplates();
    return axiosFinance.post(url, data);
  },

  // 删除分账模块
  deleteRoutingTemplates (id) {
    const url = urls.deleteRoutingTemplates() + '?routingId=' + id;
    return axiosFinance.post(url, id);
  },

  // 支付设置列表
  fetchSettingPay (data) {
    const url = urls.settingPayList();
    return axiosFinance.post(url, data);
  },

  // 支付设置编辑
  editSettingPay (data) {
    const url = urls.settingPayEdit();
    return axiosFinance.post(url, data);
  },

  // 提现设置列表
  fetchSettingWithdraw (data) {
    const url = urls.settingWithdraw();
    return axiosFinance.post(url, data);
  },

  // 提现设置编辑
  editSettingWithdraw (data) {
    const url = urls.settingWithdrawEdit();
    return axiosFinance.post(url, data);
  },

  // 系统管理 修改密码
  updatePassword (data) {
    const url = urls.updatePassword();
    return axiosFinance.post(url, data);
  },

  // 系统管理 我的信息
  userInfo () {
    const url = urls.userInfo();
    return axiosFinance.get(url);
  },

};
