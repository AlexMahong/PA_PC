import {connect} from 'react-redux'
import * as actions from '../actions'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const style = {
  login: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    background: 'absolute',
    width: '100%',
    zIndex: 0
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.13)',
  },
  form: {
    position: 'absolute',
    width: 300,
    top: '42%',
    right: 250,
    zIndex: 2,
    padding: '0 20px'
  },
  input: {
    background: 'transparent',
    color: '#1890ff',
    borderColor: '#1890ff'
  },
  btn: {
    color: '#1890ff',
    background: 'transparent',
  }
};

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.username,values.password)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'login'} style={style.login}>
        <img style={style.image} src={require('../../../assets/images/loginbg.jpg')} alt=""/>
        <div style={style.mask}></div>
        <Form onSubmit={this.handleSubmit} style={style.form}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input
                prefix={<Icon type="user" style={style.input} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={style.input} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox><span style={{fontSize: 12, color: '#1890ff'}}>七天免登录</span></Checkbox>)}
            <a href="" style={{float: 'right'}}>注册</a>
            <Button block htmlType="submit" style={style.btn}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({})(Login);

const mapDispatchToProps = (dispatch) => ({
  login: (account, password) => dispatch(actions.login(account, password))
});
export default connect(null,mapDispatchToProps)(LoginForm);
