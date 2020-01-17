import * as actionTypes from '../actionTypes'

const initState = {
  loading_global: false,   //全局loading
};

/*payload支持传入Boolean和Object
* 传入Boolean默认更改loading_global
* 传入Object根据key来更改
* */
const loading = (state = initState, action) => {
  let key='loading_global',value=false;
  if(action.payload && typeof action.payload === 'object'){
    key = action.payload.key;
    value = action.payload.value;
  }
  switch (action.type) {
    // 设置全局loading状态
    case actionTypes.SET_LOADINGSTATUS:
      return {
        ...state,
        [key]: value
      };
    default: {
      return state;
    }
  }
};

export default loading;