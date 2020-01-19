import {Table, Tag, Button, Tooltip} from 'antd'
import Title from '@/components/title'
import {connect} from 'react-redux'
import moment from 'moment'
import {record_delete} from '@/request'
import {actions} from '../index'

class RecordList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        current: 1,
        pageSize: 5,
        // total: 1
      },
      filters: [],  // 用于表格类型筛选
    }
  }
  // 表格分页、排序、筛选变化时触发
  handleTableChange = (pagination, filters, sorter, data) => {
    // console.log(pagination, filters, sorter, data);
    this.setState({
      pagination: pagination
    })
  };
  // 删除记录
  handleDelete = (record) => {
    record_delete(record.id).then(res => {
      if (res.code === 200) {
        this.props.editStoreAfterDelete(record)
      }
    })
  };
  render(){
    const {monthList = []} = this.props;
    // 收集表格中类型
    const typeArr = new Set(monthList.map(item => item.type?item.type:'收入'));
    const filters = Array.from(typeArr).map(item => ({
      text: item,
      value: item
    }));
    const columns = [
      {
        title: '时间',
        dataIndex: 'transactionTime',
        align: 'center',
        sorter: (a, b) => new Date(a.transactionTime).getTime() - new Date(b.transactionTime).getTime(),
        render: text => <span>{moment(text).format("YYYY-MM-DD")}</span>
      },
      {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        filters: filters,
        filterMultiple: false,
        onFilter: (value, record) => record.type.indexOf(value) === 0,
        render: (text, record) => record.transaction === 'in'?<Tag color='green' style={{margin: 0}}>收入</Tag>:<Tag style={{margin: 0}} color='red'>{text}</Tag>
      },
      {
        title: '金额',
        dataIndex: 'money',
        align: 'center',
        sorter: (a, b) => a.money - b.money,
        render: (text, record) => record.transaction === 'in'
          ?<span style={{color: 'green'}}>+{text}</span>
          :<span style={{color: 'red'}}>-{text}</span>
      },
      {
        title: '备注',
        dataIndex: 'notes',
        align: 'center',
        render: (text, record) => (
          <Tooltip title={text}>
            <span style={{maxWidth: 200}} className={'showEllipsis'}>{text}</span>
          </Tooltip>
        )
      },
      {
        title: '操作',
        dataIndex: 'id',
        align: 'center',
        render: (text, record) => (
          <div>
            <Button type="link" style={{color: '#f23838'}} onClick={()=>{this.handleDelete(record)}}>删除</Button>
          </div>
        ),
      }
    ];
    return (
      <div>
        <Title title={'交易列表'}/>
        <div className={'paddingLR30'}>
          <Table
            columns={columns}
            dataSource={monthList}
            rowKey={record=>record.id}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  monthList: state.account.monthList
});
const mapDispatchToProps = (dispatch) => ({
  editStoreAfterDelete: (record) => dispatch(actions.del_record(record)),
});
export default connect(mapStateToProps,mapDispatchToProps)(RecordList);