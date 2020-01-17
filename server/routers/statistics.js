const router = require('koa-router')();
const Statistics = require('../database/statistics.sql');

/* GET /statistics/yearStatisticByType 年度统计，按月分类
  query time YYYY-MM-DD HH:mm:ss
  return [{
    time: String 'YYYY-MM',
    transaction: String 'in|out',
    money: Number
  }]
*/
// 
router.get('/statistics/yearStatisticByMonth',async(ctx,next)=>{
  await Statistics.yearStatisticByMonth(ctx.query.time).then(res => {
    ctx.body = {
      code: 200,
      data: res,
      message: ''
    }
  })
})

/* GET /statistics/yearStatisticByType 年度统计，按type分类
  query time YYYY-MM-DD HH:mm:ss
  return [{
    type: String,
    transaction: String 'in|out',
    money: Number
  }]
*/
// 
router.get('/statistics/yearStatisticByType',async(ctx,next)=>{
  await Statistics.yearStatisticByType(ctx.query.time).then(res => {
    ctx.body = {
      code: 200,
      data: res,
      message: ''
    }
  })
})

module.exports = router