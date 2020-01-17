/*******
 * 柱状图组件
 * title: String 标题
 * data: Object 数据 {time,transaction,money}
 ********/
import Highcharts from 'highcharts/highstock';

class Bar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bar: null,
    }
  }

  // 创建图表
  createBar = () => {
    let bar = Highcharts.chart('container',{
      credits: {
        enabled: false,   //去除版权信息
      },
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      colors: ['#9999ff', '#ff4b2d'],
      xAxis: {
        categories: [
          '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
        ],
        // 跟随鼠标或鼠标滑过点时的十字准星线
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: '金额 (￥)'
        }
      },
      tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.2f} ￥</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          borderWidth: 0
        }
      },
      series: [{
        name: '收入',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }, {
        name: '支出',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      }]
    });
    this.setState({
      bar
    })
  };

  // 数据处理
  dataFormat = (data) => {
    let barIn = new Array(12).fill(0),
      barOut = new Array(12).fill(0);
    data.forEach(item => {
      let index = Number(item.time.slice(-2))-1;
      if (item.transaction === 'in') {
        barIn[index] = item.money;
      }else if (item.transaction === 'out') {
        barOut[index] = item.money;
      }

    });
    return [barIn,barOut];
  };
  componentDidMount(){
    this.createBar()
  }
  componentDidUpdate (){
    // 更新图表数据
    let barData = this.dataFormat(this.props.data);
    this.state.bar.series[0].setData(barData[0]);
    this.state.bar.series[1].setData(barData[1]);
  }
  render(){
    return (
      <div id={this.props.barId || 'container'} style={{height:'100%'}}></div>
    )
  }
}

export default Bar;