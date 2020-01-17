// 修改消费类型
import * as actionTypes from "./actionTypes";

function expendTypes(state={data: []}, action) {
  switch (action.type) {
    case actionTypes.SET_EXPENDTYPES:{
      return {
        ...state,
        data: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default expendTypes;