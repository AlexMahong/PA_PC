/*******
 * 柱状图组件
 * title: String 标题
 * data: Object 数据 {time,transaction,money}
 ********/
import Highcharts from 'highcharts/highstock';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: null,
    }
  }

  // 创建图表
  createBar = () => {
    let bar = Highcharts.chart('container', {
      credits: {
        enabled: false,   //去除版权信息
      },
      title: {
        text: null
      },
      colors: ['#9999ff', '#52c41a', '#ff4b2d', '#52c41a', '#ff4b2d'],
      xAxis: {
        categories: [
          '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        // 跟随鼠标或鼠标滑过点时的十字准星线
        crosshair: true
      },
      yAxis: [{
          min: 0,
          title: {
            text: '金额 (￥)'
          }
        },{ 
        // Secondary yAxis
        title: {
          text: '占比（%）',
        },
        labels: {
          format: '{value} %',
        },
        opposite: true
      }],
      tooltip: {
        shared: true,
      },
      series: [{
        name: '收入',
        type: 'column',
        data: [],
        tooltip: {
          valueSuffix: ' ￥'
        }
      }, {
        name: '剩余',
        type: 'column',
        data: [],
        tooltip: {
          valueSuffix: ' ￥'
        }
      }, {
        name: '支出',
        type: 'column',
        data: [],
        tooltip: {
          valueSuffix: ' ￥'
        }
      }, {
        name: '剩余占比',
        type: 'spline',
        yAxis: 1,
        data: [],
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        name: '支出占比',
        type: 'spline',
        yAxis: 1,
        data: [],
        tooltip: {
          valueSuffix: ' %'
        }
      }]
    });
    this.setState({
      bar
    })
  };

  // 数据处理
  dataFormat = (data) => {
    let barIn = new Array(12).fill(0),  // 收入
      barOut = new Array(12).fill(0), // 支出
      barRemainder = new Array(12).fill(0), // 剩余
      lineRemainderRatio = new Array(12).fill(0), // 剩余占比
      lineOutRatio = new Array(12).fill(0); // 支出占比
    data.forEach(item => {
      let index = Number(item.time.slice(-2)) - 1;
      if (item.transaction === 'in') {
        barIn[index] = item.money;
      } else if (item.transaction === 'out') {
        barOut[index] = item.money;
      }
    });
    barIn.forEach((item, index) => {
      let income = barIn[index];
      let out = barOut[index];
      let remainder = Number((income - out).toFixed(2));
      barRemainder[index] = remainder;
      if(income){
        lineRemainderRatio[index] = Number((remainder*100/income).toFixed(2));
        lineOutRatio[index] = Number((out*100/income).toFixed(2));
      }
    })
    return { barIn, barOut, barRemainder, lineRemainderRatio, lineOutRatio };
  };
  componentDidMount() {
    this.createBar()
  }
  componentDidUpdate() {
    // 更新图表数据
    let barData = this.dataFormat(this.props.data);
    // 收入
    this.state.bar.series[0].setData(barData.barIn);
    // 剩余
    this.state.bar.series[1].setData(barData.barRemainder);
    // 支出
    this.state.bar.series[2].setData(barData.barOut);
    // 剩余占比
    this.state.bar.series[3].setData(barData.lineRemainderRatio);
    // 支出占比
    this.state.bar.series[4].setData(barData.lineOutRatio);
  }
  render() {
    return (
      <div id={this.props.barId || 'container'} style={{ height: '100%' }}></div>
    )
  }
}

export default Bar;