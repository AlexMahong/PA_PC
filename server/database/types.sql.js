// transaction类型sql

const query = require('./index');
const moment = require('moment');

// 增
let add = function({createBy,type,remarks}){
  let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let sql = `INSERT INTO types (type,createBy,createTime,remarks) VALUES ('${type}',${createBy},'${createTime}','${remarks}')`
  return query(sql)
}
// 删
let del = function($id){
  return query(`DELETE FROM types WHERE id=${$id}`)
}

// 改
let edit = function({id,createBy,type,remarks}){
  let sql = `UPDATE types SET createBy=${createBy},type='${type}',remarks='${remarks}' WHERE id=${id}`;
  return query(sql);
}

// 查
let get = function($createBy){
  return query(`SELECT * FROM types WHERE createBy=${$createBy} ORDER BY createTime DESC`)
}

// 查询最新一条数据
let getNewest = function(){
	return query(`SELECT * FROM types ORDER BY id DESC LIMIT 0,1`)
}

module.exports = {add,del,edit,get,getNewest}