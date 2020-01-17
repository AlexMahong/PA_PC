import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Route, Switch} from 'react-router-dom';
import Sidebar from '@/components/sidebar'
import IsLogin from '@/utils/isLogin'
import {view as Account} from "../../account";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };
  componentWillMount(){
    IsLogin();
    if(this.props.location.pathname === '/'){
      this.props.history.replace('/account')
    }
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, marginBottom: 16 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path={"/account"} exact component={Account}/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Private Domain ©2019 Created by Mr.Shen</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;