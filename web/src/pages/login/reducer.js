// 修改用户信息
import * as actionTypes from "./actionTypes";

function user(state={}, action) {
  switch (action.type) {
    case actionTypes.SET_USERINFO:{
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default user;