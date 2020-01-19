import { Row, Col, Form, Icon, Input,Divider, DatePicker, Button, Select, Radio } from 'antd';
import {connect} from 'react-redux'
import moment from 'moment'
import {view as ExpendTypes} from '@/components/expendTypes'
import Title from '@/components/title'
import {record_add} from '@/request'
import {actions} from "../index";

const { Option } = Select;
const style = {
  inputStyle: {
    width: 165
  }
};
class AccountAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOutTypeSelectable: true,  // 支出类型是否可选
    }
  }
  // 提交表单
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        record_add({
          userID: this.props.userID,
          transaction: values.transaction,
          transactionTime: new Date(values.transactionTime),
          money: values.money,
          type: values.transaction === 'out' ? values.type : '收入',
          notes: values.nodes || ''
        }).then(res => {
          if (res.code === 200) {
            // 添加完成后，修改store中相关数据
            this.props.editStoreAfterAdd(res.data[0]);
          }
        })
      }
    });
  };

  // 交易类型改变，控制支出类型是否可选
  handleTransactionChange = e => {
    this.setState({
      isOutTypeSelectable: e.target.value === 'out'
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {isOutTypeSelectable} = this.state;
    const outTypeSelectOptions = this.props.expendTypes.map(item => <Option key={item.id} value={item.type}>{item.type}</Option>);
    // 表单布局
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };

    return (
      <div style={style.accountAdd}>
        <Title title={'添加'}/>
        <div className={'padding30'}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item label="金额">
                  {getFieldDecorator('money', {
                    rules: [{ required: true, message: '请输入金额' }],
                  })(
                    <Input
                      suffix="RMB"
                      style={style.inputStyle}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="交易时间">
                  {getFieldDecorator('transactionTime', {
                    initialValue: moment(new Date())
                  })(
                    <DatePicker allowClear={false} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Col span={12}>
                <Form.Item label="交易类型">
                  {getFieldDecorator('transaction', {
                    initialValue: 'out'
                  })(
                    <Radio.Group onChange={this.handleTransactionChange}>
                      <Radio value="out">支出</Radio>
                      <Radio value="in">收入</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="消费类型">
                  {getFieldDecorator('type', {
                    initialValue: '食'
                  })(
                    <Select
                      disabled={!isOutTypeSelectable}
                      style={style.inputStyle}
                      dropdownRender={menu => (
                        <div onMouseDown={e => e.preventDefault()}>
                          {menu}
                          <Divider style={{ margin: '4px 0' }} />
                          <ExpendTypes>
                            <Button type="link" block onClick={this.showDrawer}>
                              <Icon type="edit" />
                            </Button>
                          </ExpendTypes>
                        </div>
                      )}
                    >
                      {outTypeSelectOptions}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={15}>
              <Form.Item label="备注" labelCol={{sm: 3}}>
                {getFieldDecorator('nodes', {})(
                  <Input allowClear/>,
                )}
              </Form.Item>
            </Row>
            <Row style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" style={{width: 150}}>
                提交
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
const AccountAddForm = Form.create({})(AccountAdd);
const mapStateToProps = (state) => ({
  userID: state.user.id,
  expendTypes: state.expendTypes.data
});
const mapDispatchToProps = (dispatch) => ({
  editStoreAfterAdd: (payload) => dispatch(actions.add_record(payload)),
});
export default connect(mapStateToProps,mapDispatchToProps)(AccountAddForm);