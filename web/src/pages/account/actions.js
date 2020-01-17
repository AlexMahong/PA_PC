import * as types from './actionTypes'
import {record_get, record_getByTime, statistic_yearByMonth, statistic_yearByType} from '@/request';
import moment from 'moment'

// 设置选中时间
export const set_timeSelected = (time) => ({
  type: types.SET_TIME,
  payload: moment(time).format('YYYY-MM-DD HH:mm:ss')
});
// 修改月度记录
export const set_monthRecordsList = (payload) => ({
  type: types.SET_MONTHLIST,
  payload: payload
});
// 新增月度记录后，修改store数据
export const add_record = (payload) => ({
  type: types.ADD_RECORD,
  payload: payload
});

// 删除月度记录后，修改store数据
export const del_record = (payload) => ({
  type: types.DEL_RECORD,
  payload: payload
});
// 修改月度收入
export const set_monthIn = (payload) => ({
  type: types.SET_MONTHIN,
  payload: payload
});
// 修改月度支出
export const set_monthOut = (payload) => ({
  type: types.SET_MONTHOUT,
  payload: payload
});
// 修改月度统计
export const set_monthStatistic = (payload) => ({
  type: types.SET_MONTHSTATISTIC,
  payload: payload
});

// 修改年度记录
export const set_yearList = (payload) => ({
  type: types.SET_YEARLIST,
  payload: payload
});
// 修改年度收入
export const set_yearIn = (payload) => ({
  type: types.SET_YEARIN,
  payload: payload
});
// 修改年度支出
export const set_yearOut = (payload) => ({
  type: types.SET_YEAROUT,
  payload: payload
});
// 修改年度统计
export const set_yearStatistic = (payload) => ({
  type: types.SET_YEARSTATISTIC,
  payload: payload
});


// 获取月度记录
export const get_monthRecordsList = (time) => {
  return (dispatch) => {
    record_getByTime(moment(time).format('YYYY-MM-DD HH:mm:ss')).then(res=>{
      if (res.code === 200 && res.data instanceof Array) {
        dispatch(set_monthRecordsList(res.data));

        // 计算月度收入、月度支出、分类统计
        let monthIn=0,
          monthOut=0,
          monthStatisticByType = {};
        res.data.forEach(item => {
          switch (item.transaction){
            case 'in': monthIn += item.money;
              break;
            case 'out': {
              monthOut += item.money;
              if(!monthStatisticByType[item.type]){
                monthStatisticByType[item.type] = 0;
              }
              monthStatisticByType[item.type] += item.money;
            }
          }
        })
        dispatch(set_monthIn(monthIn));
        dispatch(set_monthOut(monthOut));
        dispatch(set_monthStatistic(monthStatisticByType));
      }
    })
  }
};

// 获取年度统计--按月分类
export const get_yearStatisticByMonth = time => dispatch => {
  statistic_yearByMonth(moment(time).format('YYYY-MM-DD HH:mm:ss')).then(res => {
    if (res.code === 200) {
      dispatch(set_yearList(res.data));
    }
  });
};

//获取年度统计--按type分类
export const get_yearStatisticByType = time => dispatch => {
  statistic_yearByType(moment(time).format('YYYY-MM-DD HH:mm:ss')).then(res => {
    if (res.code === 200) {
      // 年度分类,年度收入，年度支出
      let yearIn=0,
        yearOut=0,
        yearStatisticByType = {};
      res.data.forEach(item => {
        switch (item.transaction){
          case 'in': yearIn += item.money;
            break;
          case 'out': {
            yearOut += item.money;
            if(!yearStatisticByType[item.type]){
              yearStatisticByType[item.type] = 0;
            }
            yearStatisticByType[item.type] += item.money;
          }
        }
      })
      dispatch(set_yearIn(yearIn));
      dispatch(set_yearOut(yearOut));
      dispatch(set_yearStatistic(yearStatisticByType));
    }
  });
};
