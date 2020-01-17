const query = require('./index');
const moment = require('moment');

// 增
let add = function({userID,money,transaction,type,transactionTime,notes}){
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	transactionTime = moment(transactionTime).format('YYYY-MM-DD HH:mm:ss');
  return query(`INSERT INTO records (createTime,money,transaction,type,transactionTime,notes,userID) VALUES ('${createTime}',${money},'${transaction}','${type}','${transactionTime}','${notes}',${userID})`)
}

// 删
let del = function({id}){
  return query(`DELETE FROM records WHERE id=${id}`)
}

// 改
let edit = function({id,money,transaction,type,transactionTime,notes}){
	transactionTime = moment(transactionTime).format('YYYY-MM-DD HH:mm:ss');
  let sql = `UPDATE records SET money=${money},transaction='${transaction}',type='${type}',transactionTime='${transactionTime}',notes='${notes}' WHERE id=${id}`;
  return query(sql);
}

// 查
// 查询条件 userID,transaction,transactionTime,type,page,pagesize
let get = function(options){
  var optionString = '';
  Object.keys(options).forEach((key,index)=>{
    if(key !== 'page' && key!== 'pagesize'){
      optionString += key + "='" + options[key] + "'"
      if(index < Object.keys(options).length - 3){
        optionString += ','
      }
    }
  })
  return query(`SELECT * FROM records WHERE ${optionString} ORDER BY transactionTime DESC,money DESC LIMIT ${(options.page-1)*options.pagesize},${options.pagesize}`)
}

// 按月查询
let getByMonth = function(time){
  return query(`
    SELECT
      *
    FROM
      records
    WHERE
      YEAR (records.transactionTime) = YEAR ('${time}')
    AND MONTH (records.transactionTime) = MONTH ('${time}')
    ORDER BY transactionTime DESC,createTime DESC
  `
  )
}

// 查询最新一条数据
let getNewest = function(){
	return query(`SELECT * FROM records ORDER BY id DESC LIMIT 0,1`)
}

module.exports = {add,del,edit,get,getByMonth, getNewest}