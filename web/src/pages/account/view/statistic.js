import { Row, Col, DatePicker, Statistic, Icon, Empty } from 'antd'
import Title from '@/components/title'
import { connect } from 'react-redux'
import moment from 'moment'
import { actions } from '../index'
const { MonthPicker } = DatePicker;

const style = {
  marginB: {
    marginBottom: 20
  }
};

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }
  // 函数请求
  request = (time) => {
    this.props.getMonthList(time);
    this.props.getYearStatisticByType(time);
    this.props.getYearStatisticByMonth(time);
  };
  // 时间修改
  onChange = (time) => {
    this.props.setTime(time);
    this.request(time);
  };
  componentWillMount() {
    this.request(this.props.time);
  }
  render() {
    const { time, monthIn=0, monthOut=0, yearIn=0, yearOut=0 } = this.props;
    // 统计组件props
    const statisticProps = {
      in: {
        precision: 2, // 小数点位数
        prefix: <Icon type="arrow-up" style={{ marginRight: 10 }} />,
        // suffix: "%",
        valueStyle: { color: '#3f8600' }
      },
      out: {
        precision: 2,
        prefix: <Icon type="arrow-down" style={{ marginRight: 10 }} />,
        // suffix: "%",
        valueStyle: { color: '#cf1322' }
      }
    };
    return (
      <div>
        <Title title={'统计'}>
          <MonthPicker
            allowClear={false}
            defaultValue={moment(time)}
            onChange={this.onChange}
          />
        </Title>
        <div className={'padding30'}>
          <Row gutter={20} style={{ display: 'flex' }}>
            <Col span={12}>
              <Row gutter={15} style={style.marginB}>
                <Col span={12}>
                  <Statistic
                    title="月收入"
                    value={monthIn}
                    {...statisticProps.in}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="月剩余"
                    value={monthIn-monthOut}
                    {...statisticProps.in}
                  />
                </Col>
              </Row>
              <Row gutter={15} style={style.marginB}>
                <Col span={12}>
                  <Statistic
                    title="年收入"
                    value={yearIn}
                    {...statisticProps.in}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="年剩余"
                    value={yearIn-yearOut}
                    {...statisticProps.in}
                  />
                </Col>
              </Row>
              {/* <Row gutter={15}>
                <Col span={12}>
                  <Statistic
                    title="个人资产"
                    value={11.28}
                    {...statisticProps.in}
                    prefix={<Icon type="pay-circle" style={{marginRight: 10}} />}
                  />
                </Col>
              </Row> */}
            </Col>
            <Col span={12}>
              <Row gutter={15} style={style.marginB}>
              <Col span={12}>
                  <Statistic
                    title="月支出"
                    value={monthOut}
                    {...statisticProps.out}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="支出占比"
                    value={monthIn?(monthOut*100/monthIn).toFixed(2):0}
                    {...statisticProps.out}
                    prefix=''
                    suffix='%'
                  />
                </Col>
              </Row>
              <Row gutter={15} style={style.marginB}>
                <Col span={12}>
                  <Statistic
                    title="年支出"
                    value={yearOut}
                    {...statisticProps.out}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="支出占比"
                    value={yearIn?(yearOut*100/yearIn).toFixed(2):0}
                    {...statisticProps.out}
                    prefix=''
                    suffix='%'
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  time: state.account.time,
  monthIn: state.account.monthIn,
  monthOut: state.account.monthOut,
  yearIn: state.account.yearIn,
  yearOut: state.account.yearOut,
});
const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(actions.set_timeSelected(time)),
  getMonthList: (time) => dispatch(actions.get_monthRecordsList(time)),
  getYearStatisticByType: (time) => dispatch(actions.get_yearStatisticByType(time)),
  getYearStatisticByMonth: (time) => dispatch(actions.get_yearStatisticByMonth(time))
});
export default connect(mapStateToProps, mapDispatchToProps)(Statistics);