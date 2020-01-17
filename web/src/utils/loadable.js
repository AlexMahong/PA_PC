import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

/*异步加载组件*/

function Loading(props) {
  if (props.error) {
    return <div>组件加载失败! <a href='javascript:;' onClick={ props.retry }>点击重试</a></div>;
  } else if (props.timedOut) {
    return <div>组件加载超时...  <a href='javascript:;' onClick={ props.retry }>点击重试</a></div>;
  } else if (props.pastDelay) {
    return <div style={{textAlign: 'center', height: '100%', paddingTop: '15%'}}><Spin/></div>;
  } else {
    return null;
  }
}

export default (loader,loading = Loading)=>{
  return Loadable({
    loader,
    loading,
    timeout: 10000, // 允许的最大加载时间
    delay: 300,   // 延迟范围内，不会显示loading，避免Loading组件闪屏
  });
}