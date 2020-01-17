import axios from 'axios'
import store from '../store/index';
import {set_loadingStatus} from '../store/action';
import {Modal} from 'antd'

if(process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = 'http://localhost:3000'
}else if(process.env.NODE_ENV === 'production'){
  axios.defaults.baseURL = 'http://106.14.59.182:3000'
}
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(set_loadingStatus);
  store.dispatch(set_loadingStatus(false));
	Modal.error({
		title: '接口请求失败',
		content: '请求中发生错误，请稍后重试或联系管理员。',
	});
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code !== 200){
    Modal.error({
      title: '接口请求失败',
      content: response.data.message,
    });
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});