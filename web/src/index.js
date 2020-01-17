import {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import {HashRouter, Route, Switch} from 'react-router-dom';
import {ConfigProvider, Icon, Empty} from 'antd';

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// 使用中文语言包
moment.locale('zh-cn');

// 引入样式文件
import './assets/less/antd-self.less'
import './assets/less/common.less'

/*引入组件*/
import loadable from '@/utils/loadable'
import {view as App} from './pages/app/index'
import {view as Login} from './pages/login'
const NotFoundPage = loadable(()=>import(/* webpackChunkName: "page-notFound" */'./pages/errorPage/notFoundPage')); //配置webpackChunkName，打包出来的异步chunk的名称


/*引入登录*/
import {actions as user} from './pages/login'

// antd全局配置
const antdConfig = {
  autoInsertSpaceInButton: false,  // 移除按钮中 2 个汉字之间的空格
  locale: zhCN,   // 国际化语言包
  renderEmpty: () => <Empty description={'暂无数据'}/>,  // 自定义组件空状态
};

// async function init() {
  // await store.dispatch(user.login());
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider {...antdConfig}>
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={App}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </HashRouter>
      </ConfigProvider>
    </Provider>
    ,
    document.getElementById('app')
  );
// }
//
// init();