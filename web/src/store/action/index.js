import * as types from '../actionTypes'

// 设置全局loading状态
export const set_loadingStatus = (payload) => ({
  type: types.SET_LOADINGSTATUS,
  payload: payload
});

