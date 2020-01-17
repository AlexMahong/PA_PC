// 账簿信息
import * as actionTypes from "./actionTypes";
import moment from 'moment'

const initState = {
  time: new Date(),
  monthList: [],  // 月度记录列表
  monthIn: 0, // 月度收入
  monthOut: 0, // 月度支出
  monthStatisticByType: {}, // 月度支出分类统计
  yearList: [], // 年度每月收支信息
  yearIn: 0, // 年度收入
  yearOut: 0, // 年度支出
  yearStatisticByType: {}, // 年度支出分类统计
};

function account(state=initState, action) {
  switch (action.type) {
    case actionTypes.SET_TIME:{
      return {
        ...state,
        time: action.payload
      }
    }
    case actionTypes.SET_MONTHLIST:{
      return {
        ...state,
        monthList: action.payload
      }
    }
    case actionTypes.ADD_RECORD: {
      let payload = action.payload;
      // 创建局部变量
      let {monthList,monthIn, monthOut, yearList, yearIn, yearOut} = state;
      let newMonthList = JSON.parse(JSON.stringify(monthList));
      let newYearList = JSON.parse(JSON.stringify(yearList));
      let newMonthStatisticByType = {...state.monthStatisticByType};
      let newYearStatisticByType = {...state.yearStatisticByType};

      // 是否是当前年份
      let isThisYear = moment(payload.transactionTime).format('YYYY') === moment(state.time).format('YYYY');
      // 月份
      let whichMonth = moment(payload.transactionTime).format('MM');
      // 是否是当前月份
      let isThisMonth = whichMonth === moment(state.time).format('MM');
      if(isThisYear){
        if(payload.transaction === 'in'){
          // 收入
          yearIn += payload.money;
        }else {
          // 支出
          yearOut += payload.money;
          if(!newYearStatisticByType[payload.type]){
            newYearStatisticByType[payload.type] = 0;
          }
          newYearStatisticByType[payload.type] += payload.money;
        }
        // 判断yearList中是否有当前月份数据
        let indexInYearList = null;
        newYearList.forEach((item,index) => {
          if(item.transaction === payload.transaction && moment(new Date(item.time)).format('MM')===whichMonth){
            indexInYearList = index;
          }
        });
        if(indexInYearList !== null) {
          newYearList[indexInYearList].money += payload.money;
        }else {
          newYearList.push({
            transaction: payload.transaction,
            money: payload.money,
            time: moment(payload.transactionTime).format('YYYY-MM')
          })
        }
        // 修改月份相关数据
        if (isThisMonth) {
          newMonthList.unshift(payload);
          if(payload.transaction === 'in'){
            // 收入
            monthIn += payload.money;
          }else {
            // 支出
            monthOut += payload.money;
            if(!newMonthStatisticByType[payload.type]){
              newMonthStatisticByType[payload.type] = 0;
            }
            newMonthStatisticByType[payload.type] += payload.money;
          }
        }
      }
      return {
        ...state,
        monthList: newMonthList,
        monthIn,
        monthOut,
        monthStatisticByType: newMonthStatisticByType,
        yearList: newYearList,
        yearIn,
        yearOut,
        yearStatisticByType: newYearStatisticByType
      }
    }
    case actionTypes.DEL_RECORD:{
      let payload = action.payload;
      // 创建局部变量
      let {monthList,monthIn, monthOut, yearList, yearIn, yearOut} = state;
      let newMonthList = JSON.parse(JSON.stringify(monthList));
      let newYearList = JSON.parse(JSON.stringify(yearList));
      let newMonthStatisticByType = {...state.monthStatisticByType};
      let newYearStatisticByType = {...state.yearStatisticByType};

      // 是否是当前年份
      let isThisYear = moment(payload.transactionTime).format('YYYY') === moment(state.time).format('YYYY');
      // 月份
      let whichMonth = moment(payload.transactionTime).format('MM');
      // 是否是当前月份
      let isThisMonth = whichMonth === moment(state.time).format('MM');
      if(isThisYear){
        if(payload.transaction === 'in'){
          // 收入
          yearIn -= payload.money;
        }else {
          // 支出
          yearOut -= payload.money;
          newYearStatisticByType[payload.type] -= payload.money;
          if(newYearStatisticByType[payload.type] === 0){
            delete newYearStatisticByType[payload.type]
          }
        }
        newYearList.forEach((item,index) => {
          if(item.transaction === payload.transaction && moment(new Date(item.time)).format('MM')===whichMonth){
            item.money -= payload.money;
          }
        });
        // 修改月份相关数据
        if (isThisMonth) {
          newMonthList = newMonthList.filter(item => item.id !== payload.id);
          if(payload.transaction === 'in'){
            // 收入
            monthIn -= payload.money;
          }else {
            // 支出
            monthOut -= payload.money;
            newMonthStatisticByType[payload.type] -= payload.money;
            if(newMonthStatisticByType[payload.type] === 0){
              delete newMonthStatisticByType[payload.type]
            }
          }
        }
      }
      return {
        ...state,
        monthList: newMonthList,
        monthIn,
        monthOut,
        monthStatisticByType: newMonthStatisticByType,
        yearList: newYearList,
        yearIn,
        yearOut,
        yearStatisticByType: newYearStatisticByType
      }
    }
    case actionTypes.SET_MONTHIN:{
      return {
        ...state,
        monthIn: action.payload
      }
    }
    case actionTypes.SET_MONTHOUT:{
      return {
        ...state,
        monthOut: action.payload
      }
    }
    case actionTypes.SET_MONTHSTATISTIC:{
      return {
        ...state,
        monthStatisticByType: action.payload
      }
    }
    case actionTypes.SET_YEARLIST:{
      return {
        ...state,
        yearList: action.payload
      }
    }
    case actionTypes.SET_YEARIN:{
      return {
        ...state,
        yearIn: action.payload
      }
    }
    case actionTypes.SET_YEAROUT:{
      return {
        ...state,
        yearOut: action.payload
      }
    }
    case actionTypes.SET_YEARSTATISTIC:{
      return {
        ...state,
        yearStatisticByType: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default account;