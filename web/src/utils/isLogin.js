import hashHistory from './history'
import Cookie from './cookie'
import store from '@/store'
import {actions as loginActions} from '@/pages/login'

const IsLogin = () => {
  let userMessage = Cookie.get('PA_userMessage');
  if(userMessage){
    Cookie.set('PA_userMessage',userMessage,7);
    store.dispatch(loginActions.set_userInfo(JSON.parse(userMessage)))
  }else {
    hashHistory.push('/login')
  }

};

export default IsLogin;