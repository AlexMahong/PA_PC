import Title from '@/components/title'
import {connect} from "react-redux";
import Pie from '@/components/pie'

class YearPie extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    const {yearStatisticByType} = this.props;
    return (
      <div>
        <Title title={'年度支出分布'}/>
        <Pie pieId={'yearPie'} title={'年度支出分布'} data={yearStatisticByType}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  yearStatisticByType: state.account.yearStatisticByType
});
export default connect(mapStateToProps)(YearPie);