import Title from '@/components/title'
import {connect} from "react-redux";
import Bar from '@/components/bar'

class YearBar extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <Title title={'年度收支统计'}/>
        <Bar title={'年度收支统计'} data={this.props.yearList}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  yearList: state.account.yearList
});
export default connect(mapStateToProps)(YearBar);