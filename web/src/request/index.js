import './config'
import Axios from 'axios';

export const user_login = (account,password) => Axios.post('/user/login',{account:account,password: password});

/* 添加分类
* createBy 用户ID
* type String 类型名称
* remarks String 备注
* */
export const types_add = (params) => Axios.post('/types',params);

/*修改分类
* id
* createBy
* type
* remarks
* */
export const types_edit = (params) => Axios.put('/types',params);

/*删除分类
* id
* */
export const types_delete = (id) => Axios.delete('/types?id='+id);

/*获取分类列表
* createBy 用户ID
* */
export const types_getByCreator = (createBy) => Axios.get('/types?createBy='+createBy);

/*添加记录
* userID 用户ID
* transaction String 交易类型 in/out=收入|支出
* transactionTime Date 交易时间
* type String 支出类型，transaction==in时为""
* money 金额
* notes 备注 String
* */
export const record_add = (param) => Axios.post('/records',param);

/*查询记录--条件查询
* userID,transaction,transactionTime,type,page,pagesize*/
export const record_get = (param) => Axios.post('/records/search',param);

/*查询记录--按月查询
* time Date 查询时间
* */
export const record_getByTime = (time) => Axios({
  url: '/records/searchByMonth',
  params: {
    time: time
  }
});

// 删除记录
export const record_delete = ($id) => Axios.delete('/records?id='+$id);

/*年度统计--按月分类
* time Date 查询时间
* */
export const statistic_yearByMonth = (time) => Axios({
  url: '/statistics/yearStatisticByMonth',
  params: {
    time: time
  }
});

/*年度统计--按type分类
* time Date 查询时间
* */
export const statistic_yearByType = (time) => Axios({
  url: '/statistics/yearStatisticByType',
  params: {
    time: time
  }
});