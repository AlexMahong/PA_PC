import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  };

  // 控制侧边栏的收起
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const logo = () => {
      if(this.state.collapsed){
        return <img src={require('../../assets/images/logo2.png')} style={{height: '100%'}}/>
      }else {
        return <img src={require('../../assets/images/logo.png')} style={{height: '100%'}}/>
      }
    }
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" style={{height: 64, marginBottom: 16, background: '#fff', textAlign: 'center'}}>
          {logo()}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="account-book" />
            <span>流水账簿</span>
          </Menu.Item>
          {/*<Menu.Item key="2">*/}
            {/*<Icon type="alert" />*/}
            {/*<span>自我养成</span>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item key="2">*/}
            {/*<Icon type="crown" />*/}
            {/*<span>目标&愿望</span>*/}
          {/*</Menu.Item>*/}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;