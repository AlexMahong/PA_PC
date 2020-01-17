import Title from '@/components/title'
import {connect} from "react-redux";
import Pie from '@/components/pie'

class MonthPie extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    const {monthStatisticByType} = this.props;
    return (
      <div>
        <Title title={'月度支出分布'}/>
        <Pie pieId={'monthPie'} title={'月度支出分布'} data={monthStatisticByType}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  monthStatisticByType: state.account.monthStatisticByType
});
export default connect(mapStateToProps)(MonthPie);