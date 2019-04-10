import axios from 'axios';
let axiosJz = axios.create();       // Saas集中式接口

axiosJz.interceptors.response.use(
  rep => (rep.data.status === 'success') ? rep.data : Promise.reject(rep.data.msg),
  err => Promise.reject(err.toString())
);

export default axiosJz;
