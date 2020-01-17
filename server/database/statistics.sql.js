const query = require('./index')

// 年度分类统计
let yearStatisticByType = function(time){
  return query(`
  	SELECT
		type,
		transaction,
		SUM(money) AS money
	FROM
		records
	WHERE
		YEAR (records.transactionTime) = YEAR ('${time}')
	GROUP BY
		type,
		transaction
	`)
}

// 年度每月统计
let yearStatisticByMonth = function(time){
  return query(`
  	SELECT
		DATE_FORMAT(transactionTime, '%Y-%m') as time,
		transaction,
		SUM(money) AS money
	FROM
		records
	WHERE
		YEAR (records.transactionTime) = YEAR ('${time}')
	GROUP BY
		DATE_FORMAT(transactionTime, '%Y-%m'),
		transaction
	`)
}

module.exports = {
	yearStatisticByType,
	yearStatisticByMonth
}