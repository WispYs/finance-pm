export  default {
  // 格式化日期(YYYY-MM-DD)
  getDate(timestamp) {
    if(timestamp !== '') {
      let date = new Date(timestamp);
      let o = {
        Y : date.getFullYear(),
        M : date.getMonth()+1,
        D : date.getDate(),
      }
      let formatDate = o.Y + '-' + this.preZero(o.M) + '-' + this.preZero(o.D);
      return formatDate;
    }else {
      return '';
    }
  },

  // 格式化日期+时间(YYYY-MM-DD hh:mm:ss)
  getDateTime(timestamp) {
    if (timestamp !== '') {
      let date = new Date(timestamp);
      let o = {
        Y : date.getFullYear(),
        M : date.getMonth()+1,
        D : date.getDate(),
        h : date.getHours(),
        m : date.getMinutes(),
        s : date.getSeconds()
      }
      let formatDateTime = o.Y + '-' + this.preZero(o.M) + '-' + this.preZero(o.D) + ' ' + this.preZero(o.h) + ':' + this.preZero(o.m) + ':' + this.preZero(o.s);
      return formatDateTime;
    }else {
      return '';
    }
  },

  // 补零函数
  preZero(str) {
    return ('00' + str).slice(-2);
  },

  // 保留小数点后两位
  formatDecimals(num) {
    return num ? parseFloat(num).toFixed(2) : '';
  },

  // 格式化金额(逗号隔开)
  formatMoney(num) {
    return num ? parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  },

  // 商户类型
  formatCommercialType(type) {
    switch(Number(type)) {
      case 1: return '个人商户';break;
      case 2: return '个体商户';break;
      case 3: return '企业商户';break;
      default: return '';
    }
  },

  // 审核状态
  formatReviewStatus(type) {
    switch(type) {
      case 'S': return '审核成功';break;
      case 'P': return '审核中';break;
      case 'F': return '审核失败';break;
      default: return '';
    }
  },

  // 用户类型
  formatUserType(type) {
    switch(Number(type)) {
      case 1: return '水滴用户';break;
      case 2: return '平台用户';break;
      case 3: return '普通用户';break;
      default: return '';
    }
  },


  // 交易记录资金流向
  formatFundFlow(fundFlow) {
    switch (fundFlow) {
      case 'IN' : return '收入';break;
      case 'OUT': return '支出';break;
      default: return '';
    }
  },

  // 交易记录资金流向
  formatTradeStatus(tradeStatus) {
    switch (tradeStatus) {
      case 'S': return '成功';break;
      case 'F': return '失败';break;
      case 'P': return '未支付';break;
      default: return '';
    }
  },

  // 提现记录类型
  formatSettlementType(settlementType) {
    switch (settlementType) {
      case '0': return '补账';break;
      case '1': return '手动结算';break;
      case '2': return 'T+1自动结算';break;
      default: return '';
    }
  },

  // 提现记录状态
  formatSettlementStatus(settlementStatus) {
    switch (settlementStatus) {
      case 'S': return '成功';break;
      case 'F': return '失败';break;
      case 'P': return '处理中';break;
      default: return '';
    }
  },


}



