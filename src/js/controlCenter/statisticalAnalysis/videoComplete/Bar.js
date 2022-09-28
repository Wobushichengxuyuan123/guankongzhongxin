/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Style from "./Bar.module.scss";
import * as echarts from "echarts";
import Mock from "mockjs";
class Bar extends Component {
  constructor(props) {
    super(props);
    this.echartsRef = React.createRef();
    this.myChart = null;
    this.state = {
      barData: [],
    };
  }
  echartsResize = () => {
    this.myChart.resize();
  };
  backXAxis() {
    let xAxis = {
      data: [
        "分组指挥中",
        "主指挥中",
        "拆除设备",
        "镇安抽水电站",
        "待验收设备",
        "调试设备",
        "门禁",
        "设备故障",
        "演示组",
      ],
    };
    return { xAxis };
  }
  backSeries() {
    let { barData } = this.state;
    let series = [
      {
        color: "#1AA094",
        barWidth: "45%",
        type: "bar",
        data:
          barData.length === 0 ? [...new Array(10).keys()].slice(1) : barData,
      },
    ];
    return { series };
  }
  getBarData(callback) {
    let res = Mock.mock({
      "data|9": ["@natural(2, 99)"],
    });
    this.setState(
      {
        barData: res.data,
      },
      () => {
        callback && callback();
      }
    );
  }
  setEchartsOption(myChart) {
    let { xAxis } = this.backXAxis();
    let { series } = this.backSeries();
    myChart.setOption({
      title: {
        text: "录像完整率top10"
      },
      tooltip: {
        trigger: "axis",
        formatter: '{b0}: {c0}%'
      },
      xAxis,
      yAxis: {
        axisLabel: {
          formatter: '{value}%'
        },
        axisLine: {
          show: true,
        },
      },
      series,
    });
  }
  initEcharts() {
    var myChart = echarts.init(this.echartsRef.current);
    this.myChart = myChart;
    this.setEchartsOption(myChart);
  }
  componentDidMount() {
    this.getBarData(() => {
      this.initEcharts();
      window.addEventListener("resize", this.echartsResize);
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.echartsResize);
    this.myChart && !this.myChart.isDisposed() && this.myChart.dispose();
  }
  render() {
    let { comName } = this.props;
    return (
      <div className={Style.root}>
        {/* <h3>{comName}</h3> */}
        <div className={Style.content}>
          <div
            style={{ width: "100%", height: "100%" }}
            ref={this.echartsRef}
          ></div>
        </div>
      </div>
    );
  }
}

export default Bar;
