import {Button, Drawer, Icon, Tag, Input, Tooltip} from 'antd'
import {connect} from 'react-redux'
import {actions} from '../index'
import {types_add, types_delete} from '@/request'

class ExpendTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false, // 抽屉开关
      inputVisible: false, // 输入框显示
      inputValue: '', // 输入框内容
      remarks: '',  // 标签备注
    }
  }

  // 打开抽屉
  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };
  // 关闭抽屉
  closeDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  };
  // 删除标签
  handleDeleteTag = removedTagId => {
    types_delete(removedTagId).then(res=>{
      if (res.code === 200) {
        const types = this.props.types.filter(tag => tag.id !== removedTagId);
        this.props.setTypes(types);
      }
    });
  };

  // 新增输入框
  saveInputRef = input => (this.input = input);
  // 显示新增输入框，自动获取光标
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  // 新增输入框内容变更
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  // 新增标签，内容确认
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const tagName = inputValue.split("#")[0];
    const tagRemarks = inputValue.split("#")[1];
    let types = this.props.types;
    if (tagName && types.indexOf(tagName) === -1) {
      types_add({
        createBy: this.props.userId,
        type: tagName,
        remarks: tagRemarks||""
      }).then(res=> {
        if (res.code === 200) {
          types = types.concat(res.data);
          this.props.setTypes(types);
        }
      })
    }
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  // 标签生成器
  tagCreator = item => (
    <Tag
      closable
      key={item.id}
      onClose={e => {
        e.preventDefault();
        this.handleDeleteTag(item.id);
      }}
      color={item.remarks?'orange':'blue'}
      style={{marginBottom: 10}}
    >{item.type}</Tag>
  );

  componentWillMount() {
    this.props.getTypes(this.props.userId)
  }
  render() {
    const {inputValue,drawerVisible,inputVisible} = this.state;

    const tags = this.props.types.map(item => {
      if(item.remarks){
        return <Tooltip title={item.remarks} key={item.id}>{this.tagCreator(item)}</Tooltip>
      }else {
        return this.tagCreator(item);
      }
    });
    return (
      <div>
        <div onClick={this.showDrawer}>
          {this.props.children}
        </div>
        <Drawer
          title="管理消费类型"
          placement="right"
          // maskClosable={false}
          onClose={this.closeDrawer}
          visible={drawerVisible}
        >
          <div>{tags}</div>
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 150, fontSize: 12 }}
              placeholder='标签名#备注'
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" /> 新增标签
            </Tag>
          )}
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: state.user.id,
  types: state.expendTypes.data
});
const mapDispatchToProps = (dispatch) => ({
  getTypes: (creatorID) => dispatch(actions.expendTypes_get(creatorID)),
  setTypes: (types) => dispatch(actions.set_expendTypes(types))
});
export default connect(mapStateToProps,mapDispatchToProps)(ExpendTypes);
