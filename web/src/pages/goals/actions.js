import * as types from './actionTypes'
import {set_loginIframeUrl} from "@/store/action/index";
import {user_login, user_logout, user_logoutIAM} from '@/request';
import hashHistory from '@/utils/history'

// 设置用户信息
export const set_userInfo = (payload) => ({
  type: types.SET_USERINFO,
  payload: payload
});

// 登录
export const login = () => {
  return (dispatch) => {
    /*下面的return是为了解决首次进入系统登录的异步问题，普通action并不需要return*/
    return user_login().then(res=>{
      if(res.type === 'signin'){
        dispatch(set_loginIframeUrl(res.url));
      }else if(res.code === 200){
        dispatch(set_userInfo(res.data));
        // 如果当前在登录页，跳转到首页
        if(location.hash.includes('/login')){
          hashHistory.push('/')
        }
      }
    });
  }
};

// 初始化信息
const init = (dispatch) => {
  // 清空用户信息
  dispatch(set_userInfo({}));

  // 跳转到登录页
  hashHistory.push('/login');
};

// 登出
export const logout = () => {
  return (dispatch) => {
    user_logout().then(res=>{
      if(res.code === 200){
        user_logoutIAM().then(res=>{
          init(dispatch);
        }).catch(err=>{
          init(dispatch);
        })
      }
    })
  };
};
