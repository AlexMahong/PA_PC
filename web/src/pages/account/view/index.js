import {Row, Col} from 'antd'
import AccountAdd from './accountAdd'
import Statistic from './statistic'
import YearBar from './year-bar'
import YearPie from './year-pie'
import MonthPie from './month-pie'
import RecordList from './recordList'

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row gutter={16} style={{display: 'flex', marginBottom: 16}}>
          <Col span={12}>
            <div className={'bgWhite borderRadius'} style={{height: '100%'}}>
              <Statistic/>
            </div>
          </Col>
          <Col span={12}>
            <div className={'bgWhite borderRadius'}>
              <AccountAdd/>
            </div>
          </Col>
        </Row>
        {/*月度统计*/}
        <Row gutter={16} style={{display: 'flex', marginBottom: 16}}>
          <Col span={12}>
            <div className={'bgWhite borderRadius'} style={{height: '100%'}}>
              <MonthPie/>
            </div>
          </Col>
          <Col span={12}>
            <div className={'bgWhite borderRadius'} style={{height: '100%'}}>
              <RecordList/>
            </div>
          </Col>
        </Row>
        {/*年度统计*/}
        <Row gutter={16} style={{display: 'flex'}}>
          <Col span={12}>
            <div className={'bgWhite borderRadius'} style={{height: '100%'}}>
              <YearBar/>
            </div>
          </Col>
          <Col span={12}>
            <div className={'bgWhite borderRadius'} style={{height: '100%'}}>
              <YearPie/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Account;
