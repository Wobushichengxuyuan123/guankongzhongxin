/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import MyBar from "../MyBar/MyBar";
import Style from "./workCloseLoop.module.scss";
import Mock from "mockjs";
import { DatePicker, message, Spin } from "antd";
import { getData } from "../config";
class workCloseLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sourceBtnActiveKey: "statistics",
      sourceBtnList: [
        { key: "statistics", name: "统计分析" },
        { key: "inspection", name: "巡检出勤率" },
      ],
      day31: "1,3,5,7,8,10,12",
      btnActiveKey: "day",
      btnList: [
        { key: "day", name: "按日统计" },
        { key: "week", name: "按周统计" },
        { key: "month", name: "按月统计" },
      ],
      echartsData: [],
      dateData: '',
      dayData: [],
      weekData: [],
      monthData: [],
      xAxis: {
        data: [],
      },
      series: [],
    };
  }


  // maybe abandon
  backXAxis() {
    let xAxis = {};
    if (this.props.xAxis) {
      xAxis = this.props.xAxis;
    } else {
      switch (this.state.btnActiveKey) {
        case "day":
          {
            xAxis = {
              // name: "(小时)",
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
  backSeries(echartsData) {
    // let { echartsData, dayData, weekData, monthData } = this.state;
    let series = [];
    if (this.props.series) {
      series = this.props.series;
    } else {
      let name = "录像完整率";
      if (this.props.comKey == "workCloseLoop") {
        name = "巡视告警人工审核完成率";
      }
      switch (this.state.btnActiveKey) {
        case "day":
          {
            series = [
              {
                color: "#1AA094",
                barWidth: "45%",
                name,
                type: "bar",
                data:
                  echartsData.length === 0
                    ? [...new Array(25).keys()].slice(1)
                    : echartsData,
              },
            ];
          }
          break;
        case "week":
          {
            series = [
              {
                color: "#1AA094",
                barWidth: "45%",
                name,
                type: "bar",
                data:
                  echartsData.length === 0
                    ? [...new Array(7).keys()].slice(1)
                    : echartsData,
              },
            ];
          }
          break;
        case "month":
          {
            series = [
              {
                color: "#1AA094",
                barWidth: "45%",
                name,
                type: "bar",
                data:
                  echartsData.length === 0
                    ? [...new Array(31).keys()].slice(1)
                    : echartsData,
              },
            ];
          }
          break;
        default:
          break;
      }
    }
    return { series };
  }
  getDayData(callback) {
    let res = Mock.mock({
      "data|24": ["@natural(20, 300)"],
    });
    this.setState(
      {
        dayData: res.data,
      },
      () => {
        callback && callback();
      }
    );
  }
  getWeekData(callback) {
    let res = Mock.mock({
      "data|7": ["@natural(20, 300)"],
    });
    this.setState(
      {
        weekData: res.data,
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
        "data|29": ["@natural(20, 300)"],
      });
    } else if (this.state.day31.includes(month)) {
      res = Mock.mock({
        "data|31": ["@natural(20, 300)"],
      });
    } else {
      res = Mock.mock({
        "data|30": ["@natural(20, 300)"],
      });
    }
    this.setState(
      {
        monthData: res.data,
      },
      () => {
        callback && callback();
      }
    );
  }
  setBtnActiveKey(v) {
    this.setState({ btnActiveKey: v.key });
    switch (v.key) {
      case "day":
        this.getDayData(() => {
          this.setEchartsOption();
        });
        break;
      case "week":
        this.getWeekData(() => {
          this.setEchartsOption();
        });
        break;
      case "month":
        this.getMonthData(() => {
          this.setEchartsOption();
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
  setEchartsOption() {
    let { xAxis } = this.backXAxis();
    let { series } = this.backSeries();
    this.setState((state, props) => {
      return {
        xAxis,
        series,
        loading: false,
      };
    });
  }

  
  updateEcharts(comKey1='',btnActiveKey1='',dateData1='') {
    let comKey = comKey1||this.props.comKey;
    let btnActiveKey = btnActiveKey1||this.state.btnActiveKey;
    let dateData = dateData1;
    this.setState({
      loading: true,
    });
    getData(comKey, btnActiveKey, dateData)
      .then((res) => {
        let {series} = this.backSeries(res.data)
        this.setState(
          {
            xAxis: res.xAxis,
            echartsData: res.data,
            series,
            loading: false,
            dateData: dateData1
          },
        );
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
  dateOnChange(date, dateString) {
    let year1 = dateString[0].substr(0,4);
    let year2 = dateString[1].substr(0,4);
    if (year1!=year2) {
      message.error('暂不支持跨年统计')
      return true;
    }
    if (!dateString[0]) {
      dateString = ''
    }
    this.updateEcharts('','',dateString)
  }
  componentDidMount() {
    // let r = new Date().Format("yyyy年MM月dd日");
    // console.log(r, "r");
    this.updateEcharts();
  }
  render() {
    let {
      loading,
      sourceBtnActiveKey,
      sourceBtnList,
      xAxis,
      series,
      btnList,
      btnActiveKey,
    } = this.state;
    let { isShowControlBtn, comKey, comName } = this.props;
    let option = {
      xAxis,
      series,
      tooltip: {
        trigger: "axis",
      },
      yAxis: {
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value, index) {
            return (value) + '%';
        }
        }
      },
      legend: {
        show: true,
        bottom: 0,
      },
    };
    let backClassName = (v, btnActiveKey) => {
      let className =
        Style.btn + " " + (btnActiveKey === v.key ? Style.active : "");
      return className;
    };
    return (
      <div className={Style.root}>
        <h3>{comName}</h3>
        <div className={Style.dataControl}>
          <div className={Style.time}>
            <DatePicker.RangePicker
              onChange={this.dateOnChange.bind(this)}
              format={"YYYY-MM-DD"}
              className="search_ipt04"
            />
          </div>
          {isShowControlBtn ? (
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
          ) : null}
        </div>

        {comKey === "runDay" ? (
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
        ) : null}

        <div className={Style.content}>
          <Spin size="large" spinning={loading}>
            <MyBar option={option}></MyBar>
          </Spin>
        </div>
      </div>
    );
  }
}

export default workCloseLoop;
