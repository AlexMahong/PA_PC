import * as types from './actionTypes'
import {types_add, types_edit, types_delete, types_getByCreator} from '@/request';

// 设置消费类型
export const set_expendTypes = (payload) => ({
  type: types.SET_EXPENDTYPES,
  payload: payload
});

// 获取
export const expendTypes_get = (creatorID) => {
  return (dispatch) => {
    types_getByCreator(creatorID).then(res=>{
      if (res.code === 200) {
        dispatch(set_expendTypes(res.data));
      }
    })
  }
};
