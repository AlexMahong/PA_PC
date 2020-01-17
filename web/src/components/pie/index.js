/*******
 * 饼图组件
 * pieId dom元素ID
 * title: String 标题
 * data: Object 饼图数据 {type: number}
 ********/

import Highcharts from 'highcharts/highstock';
// 创建渐变色
Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
  return {
    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
    stops: [
      [0, color],
      [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
  };
});

class Pie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pie: null,
    }
  }

  // 数据格式处理
  /*数据格式：[
        [type,   45.0],
          {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true  //选中状态
          }
         ]
       */
  dataFormat = (data) => {
    let pieData = [];
    if(data instanceof Object){
      for (let key in data){
        pieData.push([key, data[key]]);
      }
    }
    return pieData;
  };
  // 构建图表
  CreatePie = () => {
    const pieData = this.dataFormat(this.props.data);
    const {title} = this.props;
    let pie = Highcharts.chart(this.props.pieId,{
      credits: {
        enabled: false,   //去除版权信息
      },
      title: {
        // text: title,
        text: null, // 不显示标题
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        }
      },
      colors: ['#7cb5ec', '#9ccbed', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#f0ff26'],
      // 图例
      legend: {
        enabled: true,
      },
      tooltip: {
        valueDecimals: 2, // 保留两位小数
        valuePrefix: '￥', // 前缀
        valueSuffix: ' 元', // 后缀
        // headerFormat: `<span style="font-size: 12px; font-weight: bold;">${title}</span><br/>`,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> 金额: <b>{point.y}</b><br/>'
      },
      // 数据列配置
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            },
            connectorColor: 'silver'
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: title,
        data: pieData
      }]
    });
    // 保存饼图对象
    this.setState({
      pie,
    })
  };
  componentDidMount(){
    this.CreatePie();
  }
  componentDidUpdate (){
    // 更新图表数据
    this.state.pie.series[0].setData(this.dataFormat(this.props.data));
  }
  render(){
    return (
      <div id={this.props.pieId} style={{height:'100%'}}></div>
    )
  }
}

export default Pie;