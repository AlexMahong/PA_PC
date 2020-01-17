import {connect} from 'react-redux'
import store from '@/store'
import {login} from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  // 消息监控回调
  loginHandle = (event) => {
    if (event.data !== "IAMSuccess") {
    } else {
      if (window.IAMSigninIFrameIndex){
        window.IAMSigninIFrameIndex = null;
      }
      store.dispatch({type: 'SET_LOGINIFRAMEURL', payload: ''});
      // 再次调用登录接口，获取用户信息
      this.props.login();
    }
  };
  componentWillMount(){
    //注册消息监控事件
    if (window.addEventListener) {
      addEventListener("message", this.loginHandle);
    }else {
      attachEvent('onmessage',this.loginHandle)
    }
    // 如果已存在登录地址，不需要再次调用
    if (!this.props.loginIframeUrl) {
      this.props.login();
    }
  }
  render() {
    return (
      <div>
        <iframe src={this.props.loginIframeUrl} frameBorder="0" style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}/>
      </div>
    );
  }
}
const mapStateToProps = (state)=>({
  loginIframeUrl: state.common.loginIframeUrl
});
const mapDispatchToProps = {
  login
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);
