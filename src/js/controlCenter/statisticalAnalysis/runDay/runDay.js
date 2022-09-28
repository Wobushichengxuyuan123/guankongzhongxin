import React, { Component } from "react";
import Style from "./runDay.module.scss";
import * as echarts from "echarts";
import Mock from "mockjs";
class runDay extends Component {
  constructor(props) {
    super(props);
    this.echartsRef = React.createRef();
    this.myChart = null;
    this.state = {
      xAxis: {
        name: "(设备)",
        data: [
          "无人机",
          "机器人",
          "高清摄像机",
          "红外热成像摄像机",
          "挂轨机器人",
          "轮式机器人",
          "硬盘录像机",
        ],
      },
      series: [],
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
      sourceBtnActiveKey: "statistics",
      sourceBtnList: [
        { key: "statistics", name: "统计分析" },
        { key: "inspection", name: "巡检出勤率" },
      ],
    };
  }
  echartsResize = () => {
    this.myChart.resize();
  };
  backXAxis() {
    let xAxis = {};
    if (this.state.xAxis) {
      xAxis = this.state.xAxis;
    }
    return { xAxis };
  }
  backSeries() {
    let { sourceBtnActiveKey, monthData, weekData, dayData, btnActiveKey } =
      this.state;
    let series = [
      {
        color: "orange",
        smooth: true,
        barGap: 0,
        barWidth: "20%",
        name: "连续正常天数",
        type: "bar",
        data: [...new Array(8).keys()].slice(1),
      },
      {
        color: "#1AA094",
        smooth: true,
        barGap: 0,
        barWidth: "20%",
        name: "自检正常天数",
        type: "bar",
        data: [...new Array(8).keys()].slice(1),
      },
      {
        color: "skyblue",
        smooth: true,
        barGap: 0,
        barWidth: "20%",
        name: "巡检天数",
        type: "bar",
        data: [...new Array(8).keys()].slice(1),
      },
    ];
    let res = {};
    switch (btnActiveKey) {
      case "day":
        res = dayData;
        break;
      case "week":
        res = weekData;
        break;
      case "month":
        res = monthData;
        break;
      default:
        break;
    }
    console.log(sourceBtnActiveKey, monthData, weekData, dayData, 98);
    if (sourceBtnActiveKey == "statistics") {
      series[0].data = res.continuousData;
      series[1].data = res.selfTestData;
      series[2].data = res.inspectionData;
    } else {
      series = [
        {
          color: "#1AA094",
          smooth: true,
          barGap: 0,
          barWidth: "45%",
          name: "巡检出勤率",
          type: "bar",
          data: res.data,
        },
      ];
    }

    return { series };
  }
  getDayData(callback) {
    let res = Mock.mock({
      "continuousData|7": ["@natural(20, 300)"],
      "selfTestData|7": ["@natural(20, 300)"],
      "inspectionData|7": ["@natural(20, 300)"],
    });
    if (this.state.sourceBtnActiveKey !== "statistics") {
      res = Mock.mock({
        "data|7": ["@natural(20, 300)"],
      });
    }
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
      "continuousData|7": ["@natural(20, 300)"],
      "selfTestData|7": ["@natural(20, 300)"],
      "inspectionData|7": ["@natural(20, 300)"],
    });
    if (this.state.sourceBtnActiveKey !== "statistics") {
      res = Mock.mock({
        "data|7": ["@natural(20, 300)"],
      });
    }
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
    let res = Mock.mock({
      "continuousData|7": ["@natural(20, 300)"],
      "selfTestData|7": ["@natural(20, 300)"],
      "inspectionData|7": ["@natural(20, 300)"],
    });
    if (this.state.sourceBtnActiveKey !== "statistics") {
      res = Mock.mock({
        "data|7": ["@natural(20, 300)"],
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
    console.log(series, "series");
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
    },{ notMerge: true });
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
  setSourceBtnActiveKey(v) {
    this.setState({ sourceBtnActiveKey: v.key }, () => {
      this.getDayData(() => {
        if (!this.myChart) {
          return true;
        }
        this.setEchartsOption(this.myChart);
      });
    });
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
    let { sourceBtnActiveKey, sourceBtnList, btnList, btnActiveKey } =
      this.state;
    let backClassName = (v, btnActiveKey) => {
      let className =
        Style.btn + " " + (btnActiveKey === v.key ? Style.active : "");
      return className;
    };
    return (
      <div className={Style.root}>
        <h3>{"巡视设备自检和巡检统计"}</h3>
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
        <div className={Style.toggleSourceData}>
          {sourceBtnList.map((v) => {
            return (
              <div
                key={v.key}
                className={backClassName(v, sourceBtnActiveKey)}
                onClick={this.setSourceBtnActiveKey.bind(this, v)}
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

export default runDay;
