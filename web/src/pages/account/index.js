// 对外暴露接口
import loadable from '@/utils/loadable'
import * as actions from './actions'
import reducer from './reducer'
const view = loadable(()=>import(/* webpackChunkName: "page-account" */'./view/index')); //配置webpackChunkName，打包出来的异步chunk的名称

export {actions, reducer, view};