import axios from 'axios';
let axiosFinance = axios.create();  // 金融接口

axiosFinance.interceptors.request.use(
  config => {
    let token = localStorage.getItem('FINANCE_TOKEN') || '';
    config.headers.Authorization = `${token}`;
    return config;
  },
  err => {
    return Promise.reject(err);
});

axiosFinance.interceptors.response.use(
  rep => (rep.data.code === '0') ? rep.data : Promise.reject(rep.data.msg),
  err => Promise.reject(err.toString())
);

export default axiosFinance;
