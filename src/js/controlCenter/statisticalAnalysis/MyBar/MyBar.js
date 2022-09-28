import React, { Component } from 'react';
import Style from './MyBar.module.scss'
import * as echarts from "echarts";
import echartsUtils from '../../../utils/echarts_util'
let baseEchartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    show: true,
    bottom: 0,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: true,
    },
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    }
  ]
}

class MyBar extends Component {
  constructor(props) {
    super(props)
    this.echartsDomRef = React.createRef()
    this.myChart = null;
    this.state = {
      
    }
  }
  initEcharts(echartsOption) {
    var chartDom = this.echartsDomRef.current;
    var myChart = echarts.init(chartDom);
    this.myChart = myChart;
    let events = this.props.events;
    myChart.on('click', function (params) {
      events({
        type: 'click',
        params
      })
    });
    this.updateEchartsOption()
    this.echartsResize(myChart)
  }
  updateEchartsOption(props=this.props) {
    let { option } = props;
    let echartsOption = {};
    if (option) {
      echartsOption = echartsUtils.mergeOption(option,baseEchartsOption)
    } else {
      echartsOption = baseEchartsOption;
    }
    echartsOption && this.myChart.setOption(echartsOption);
  }
  shouldComponentUpdate(nextProps, nextState) {
    this.updateEchartsOption(nextProps)
    return true
  }
  echartsResize = (myChart) => {
    myChart.resize();
  }
  componentDidMount() {
    console.log('柱形图组件-componentDidMount');
    this.initEcharts()
  }
  componentWillUnmount() {
    console.log('柱形图组件-componentWillUnmount');
    window.removeEventListener('resize',this.echartsResize)
    this.myChart && !this.myChart.isDisposed() && this.myChart.dispose();
  }
  render() {
    console.log('柱形图组件-render');
    let { rootClassName } = this.props;
    rootClassName = rootClassName?rootClassName:''
    return (
      <div className={`${Style.root} ${rootClassName}`}>
        <div className={Style.echartsDom} ref={this.echartsDomRef}></div>
      </div>
    );
  }
}

export default MyBar;