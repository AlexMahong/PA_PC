import * as types from './actionTypes'
import {set_loginIframeUrl} from "@/store/action/index";
import {user_login} from '@/request';
import hashHistory from '@/utils/history'
import Cookie from '@/utils/cookie'

// 设置用户信息
export const set_userInfo = (payload) => ({
  type: types.SET_USERINFO,
  payload: payload
});

// 登录
export const login = (account,password) => {
  return (dispatch) => {
    user_login(account,password).then(res=>{
      if(res.code === 200){
        dispatch(set_userInfo(res.data));
        Cookie.set('PA_userMessage',JSON.stringify(res.data),7);
        hashHistory.push('/')
      }
    });
  }
};
