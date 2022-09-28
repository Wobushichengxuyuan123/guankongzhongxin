/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Style from "./inspectionAndResult.module.scss";
import * as echarts from "echarts";
import Mock from "mockjs";
class inspectionAndResult extends Component {
  constructor(props) {
    super(props);
    this.echartsRef = React.createRef();
    this.myChart = null;
    this.state = {
      dayData: [],
      weekData: [],
      monthData: [],
      echartsOption: null,
      btnActiveKey: "day",
      day31: "1,3,5,7,8,10,12",
      btnList: [
        { key: "day", name: "当日实时统计" },
        { key: "week", name: "最近7日统计" },
        { key: "month", name: "最近30天统计" },
      ],
    };
  }
  echartsResize = () => {
    this.myChart.resize();
  };
  backXAxis() {
    let xAxis = {};
    if (this.props.xAxis) {
      xAxis = this.props.xAxis;
    } else {
      switch (this.state.btnActiveKey) {
        case "day":
          {
            xAxis = {
              name: "(小时)",
              type: "category",
              data: [...new Array(25).keys()].slice(1),
            };
          }
          break;
        case "week":
          {
            xAxis = {
              name: "(天)",
              data: new Array(6).fill(1).map((v, i) => {
                v = new Date(
                  new Date().getTime() - (6 - i) * 1000 * 60 * 60 * 24
                ).Format("yyyy/MM/dd");
                return v;
              }),
            };
          }
          break;
        case "month":
          {
            let data = [];
            let month = new Date().getMonth() + 1;
            let year = new Date().getFullYear();
            let isRunNian = false;
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
              isRunNian = true;
            } else {
              isRunNian = false;
            }
            if (isRunNian && month == 2) {
              data = [...new Array(30).keys()].slice(1);
            } else if (this.state.day31.includes(month)) {
              data = [...new Array(32).keys()].slice(1);
            } else {
              data = [...new Array(31).keys()].slice(1);
            }
            xAxis = {
              name: "(天)",
              data,
            };
          }
          break;

        default:
          break;
      }
    }
    return { xAxis };
  }
  backSeries() {
    let { dayData, weekData, monthData } = this.state;
    let series = [
      {
        smooth: true,
        color: "orange",
        // barWidth: "45%",
        name: "巡视告警人工审核完成率",
        type: "line",
        data: [...new Array(25).keys()].slice(1),
      },
      {
        smooth: true,
        color: "#1AA094",
        // barWidth: "45%",
        name: "巡视告警准确率",
        type: "line",
        data: [...new Array(25).keys()].slice(1),
      },
      {
        smooth: true,
        color: "green",
        // barWidth: "45%",
        name: "巡视结果人工审核完成率",
        type: "line",
        data: [...new Array(25).keys()].slice(1),
      },
    ];
    switch (this.state.btnActiveKey) {
      case "day":
        {
          series[0].data = dayData.policeData;
          series[1].data = dayData.accuracyData;
          series[2].data = dayData.resultData;
        }
        break;
      case "week":
        {
          series[0].data = weekData.policeData;
          series[1].data = weekData.accuracyData;
          series[2].data = weekData.resultData;
        }
        break;
      case "month":
        {
          series[0].data = monthData.policeData;
          series[1].data = monthData.accuracyData;
          series[2].data = monthData.resultData;
        }
        break;
      default:
        break;
    }
    return { series };
  }
  getDayData(callback) {
    let res = Mock.mock({
      "policeData|24": ["@natural(20, 300)"],
      "accuracyData|24": ["@natural(20, 300)"],
      "resultData|24": ["@natural(20, 300)"],
    });
    this.setState(
      {
        dayData: res,
      },
      () => {
        callback && callback();
      }
    );
  }
  getWeekData(callback) {
    let res = Mock.mock({
      "policeData|24": ["@natural(20, 300)"],
      "accuracyData|24": ["@natural(20, 300)"],
      "resultData|24": ["@natural(20, 300)"],
    });
    this.setState(
      {
        weekData: res,
      },
      () => {
        callback && callback();
      }
    );
  }
  getMonthData(callback) {
    let res = {};
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let isRunNian = false;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      isRunNian = true;
    } else {
      isRunNian = false;
    }
    if (isRunNian && month == 2) {
      res = Mock.mock({
        "policeData|29": ["@natural(20, 300)"],
        "accuracyData|29": ["@natural(20, 300)"],
        "resultData|29": ["@natural(20, 300)"],
      });
    } else if (this.state.day31.includes(month)) {
      res = Mock.mock({
        "policeData|31": ["@natural(20, 300)"],
        "accuracyData|31": ["@natural(20, 300)"],
        "resultData|311": ["@natural(20, 300)"],
      });
    } else {
      res = Mock.mock({
        "policeData|30": ["@natural(20, 300)"],
        "accuracyData|30": ["@natural(20, 300)"],
        "resultData|30": ["@natural(20, 300)"],
      });
    }
    this.setState(
      {
        monthData: res,
      },
      () => {
        callback && callback();
      }
    );
  }
  setEchartsOption(myChart) {
    let { xAxis } = this.backXAxis();
    let { series } = this.backSeries();
    console.log(series,'series');
    myChart.setOption({
      legend: {
        show: true,
        bottom: 0,
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis,
      yAxis: {
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
  setBtnActiveKey(v) {
    this.setState({ btnActiveKey: v.key });
    if (!this.myChart) {
      return true;
    }
    switch (v.key) {
      case "day":
        this.getDayData(() => {
          this.setEchartsOption(this.myChart);
        });
        break;
      case "week":
        this.getWeekData(() => {
          this.setEchartsOption(this.myChart);
        });
        break;
      case "month":
        this.getMonthData(() => {
          this.setEchartsOption(this.myChart);
        });
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.getDayData(() => {
      this.initEcharts();
      window.addEventListener("resize", this.echartsResize);
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.echartsResize);
    this.myChart && !this.myChart.isDisposed() && this.myChart.dispose();
  }
  render() {
    let { btnList, btnActiveKey } = this.state;
    let { comName } = this.props;
    let backClassName = (v, btnActiveKey) => {
      let className =
        Style.btn + " " + (btnActiveKey === v.key ? Style.active : "");
      return className;
    };
    return (
      <div className={Style.root}>
        <h3>{comName}</h3>
        <div className={Style.toggleData}>
          {btnList.map((v) => {
            return (
              <div
                key={v.key}
                className={backClassName(v, btnActiveKey)}
                onClick={this.setBtnActiveKey.bind(this, v)}
              >
                {v.name}
              </div>
            );
          })}
        </div>
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

export default inspectionAndResult;
