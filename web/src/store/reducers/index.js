import {combineReducers} from 'redux';

import common from './common-reducer'
import loading from './loading-reducer'
import {reducer as user} from '@/pages/login'
import {reducer as account} from '@/pages/account'
import {reducer as expendTypes} from '@/components/expendTypes'

// 组合reducer
var index = combineReducers({
  common,
  loading,
  user,
  account,
  expendTypes
});

export default index;