/*暴露出history对象，用于非组件js进行路由跳转*/
let createHashHistory = require('history').createHashHistory;

const hashHistory = createHashHistory();
export default hashHistory;