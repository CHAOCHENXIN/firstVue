import axios from "axios"
import store from '../../store'

const axiosObj = axios.create({
  timeout:15000
})

axiosObj.interceptors.request.use(function (config) {
  if(config.headers.isToken) {
    config.headers.Authorization = store.state.myToken
  }
  
  return config;
}, function (error) {
  return Promise.reject(error);
});


axiosObj.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export default axiosObj
