let isProductionEnv = (window.location.host === 'financepm.shuidiguanjia.com');

export default {
  apiRoot: isProductionEnv ? 'http://finances.shuidiguanjia.com' : 'http://finances.ih2ome.cn',
  apiJzRoot: isProductionEnv ? 'https://jz.api.shuidiguanjia.com' : 'http://jz.api.ih2ome.cn'
};
