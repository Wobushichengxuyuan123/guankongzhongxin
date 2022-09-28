/* eslint-disable no-lone-blocks */
import { message } from "antd";
import Mock from "mockjs";
import { getAmongMonday, getCurrentDayInfo, getMonthDays, getAmongDay, repair0 } from './week'
export const videoComplete = "videoComplete";
export const onlineDuration = "onlineDuration";
export const runDay = "runDay";
export const inspectionOmit = "inspectionOmit";
export const workCloseLoop = "workCloseLoop";
export const inspectionAndResult = "inspectionAndResult";
export const patrolTask = "patrolTask";
let leftMenu = {
  videoComplete: {
    key: videoComplete,
    name: "录像完整率统计",
  },
  onlineDuration: {
    key: onlineDuration,
    name: "在线时长统计",
  },
  runDay: {
    key: runDay,
    name: "运行天数统计",
  },
  inspectionOmit: {
    key: inspectionOmit,
    name: "巡视漏检率统计",
  },
  workCloseLoop: {
    key: workCloseLoop,
    name: "任务闭环率统计",
  },
  inspectionAndResult: {
    key: inspectionAndResult,
    name: "巡视告警和结果统计",
  },
  patrolTask: {
    key: patrolTask,
    name: "巡视任务统计",
  },
};
function handleTimes(dataType, times) {
  times += "";
  switch (dataType) {
    case 'day':
      return times.slice(0, 4) + '-' + times.slice(4, 6) + '-' + times.slice(6, 8)
    case 'week':
      return times
    case 'month':
      return times.slice(0, 4) + '-' + times.slice(4, 6)
    default:
      return times.slice(0, 4) + '-' + times.slice(4, 6) + '-' + times.slice(6, 8)
      break;
  }
}
function getNumByDataType(dataType, txt = false) {
  switch (dataType) {
    case "day":
      return txt ? '天' : "1";
    case "week":
      return txt ? '周' : "2";
    case "month":
      return txt ? '月' : "3";
    default:
      return txt ? '天' : "1";
  }
}
function promise(callback, isMock = false, response) {
  if (isMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
    });
  } else {
    return new Promise((resolve, reject) => {
      if (callback) {
        callback(resolve, reject)
      }
    });
  }
}
function backWeeks(dataTime) {
  let res = getAmongMonday(dataTime[0], dataTime[1]);
  return res;
}
function backMonths(dataTime = []) {
  if (Array.isArray(dataTime) && dataTime.length === 0) {
    dataTime = ''
  }
  let data = [];
  if (dataTime) {
    let S = getCurrentDayInfo(dataTime[0]);
    let E = getCurrentDayInfo(dataTime[1]);
    for (let year = S.year; year <= E.year; year++) {
      let sMonth = 1;
      let eMonth = 12;
      if (year === S.year) {
        sMonth = S.month;
      }
      if (year === E.year) {
        eMonth = E.month;
      }
      for (let month = sMonth; month <= eMonth; month++) {
        data.push(year + '-' + repair0(month))
      }
    }

  } else {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    data.push(year + '-' + repair0(month))
  }
  console.log(data, '183');
  return data
}
function backXAxis(dataType, dataTime) {
  let xAxis = {};
  switch (dataType) {
    case "day":
      {
        let data = getAmongDay(dataTime);
        xAxis = {
          name: "(天)",
          data,
        };
      }
      break;
    case "week":
      {
        // let data = backWeeks(dataTime);
        let s = getCurrentDayInfo(dataTime[0]);
        let e = getCurrentDayInfo(dataTime[1]);
        let data = [];
        if (s.year === e.year) {
          data = backWeeks(dataTime);
        } else {
          let r = [];
          for (let i = s.year; i <= e.year; i++) {
            if (i === s.year) {
              console.log([dataTime[0], `${i}-12-31`], '===s.year');
              r = backWeeks([dataTime[0], `${i}-12-31`])
            } else if (i === e.year) {
              console.log([`${i}-01-01`, dataTime[1]], '===e.year');
              r = backWeeks([`${i}-01-01`, dataTime[1]])
            } else {
              r = backWeeks([`${i}-01-01`, `${i}-12-31`])
            }
            // console.log(r,'周返回的结果');
            data.push(...r)
          }
        }
        data = Array.from(new Set(data))
        console.log(data, '周结果');
        xAxis = {
          name: "(周)",
          data,
        };
      }
      break;
    case "month":
      {
        let s = getCurrentDayInfo(dataTime[0]);
        let e = getCurrentDayInfo(dataTime[1]);
        let data = [];
        if (s.year === e.year) {
          data = backMonths(dataTime);
        } else {
          let r = [];
          for (let i = s.year; i <= e.year; i++) {
            if (i === s.year) {
              r = backMonths([dataTime[0], `${i}-12-31`])
            } else if (i === e.year) {
              r = backMonths([`${i}-01-01`, dataTime[1]])
            } else {
              r = backMonths([`${i}-01-01`, `${i}-12-31`])
            }
            data.push(...r)
          }
        }
        xAxis = {
          name: "(月)",
          data,
        };
        console.log(xAxis, 'xAxis');
      }
      break;
    default:
      break;
  }
  return xAxis;
}
function getVideoCompleteData(dataType, dataTime) {
  let res = Mock.mock({
    "data|60": ["@natural(5, 80)"],
  });
  res["xAxis"] = backXAxis(dataType, dataTime);
  res["series"] = [
    {
      color: "#1AA094",
      name: "录像完整率",
      barWidth: "45%",
      type: "bar",
      data: res.data,
    },
  ];
  return promise(null, true, res);

  // let res = {
  //   data: []
  // };
  // res["xAxis"] = [];
  // res["series"] = [
  //   {
  //     color: "#1AA094",
  //     name: "录像完整率",
  //     barWidth: "45%",
  //     type: "bar",
  //     data: [],
  //   },
  // ];
  // return promise((reso,reje) => {
  //   reso(res)
  // });
}
function getOnlineDurationData(dataType, dataTime) {
  let res = { data1: [], data2: [] };
  res["xAxis"] = {
    name: '设备',
    data: []
  };
  res['yAxis'] = {
    axisLine: {
      show: true,
    },
    axisLabel: {
      formatter: function (value, index) {
        return value;
      },
    },
  }
  res["series"] = [
    {
      color: "skyblue",
      name: "累计在线时长",
      barWidth: "36%",
      type: "bar",
      barGap: "5%",
      data: res.data1,
    },
    {
      color: "#B03A5B",
      name: "离线次数",
      barWidth: "36%",
      barGap: "5%",
      type: "bar",
      data: res.data2,
    },
  ];
  let fetchUrl = 'nelda-smcc/public/analysis/getOnlineDurationTJ';
  let fetchData = {
    startTime: new Date(dataTime[0]).Format('yyyy-MM-dd'),
    endTime: new Date(dataTime[1]).Format('yyyy-MM-dd')
  };
  return promise((reso, reje) => {
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
      .then(result => {
        if (result.code === "0" && result.data) {
          let eqList = result.data.equipmentList;
          let daList = result.data.dataList;
          if (eqList.length !== 0) {
            eqList.forEach(v => {
              res.xAxis.data.push(v.patroldeviceName)
            })
          }
          if (daList.length !== 0) {
            daList.forEach(v => {
              res.data1.push(v.cumulativeTime);
              res.data2.push(v.num);
            })
            res.series[0].data = res.data1;
            res.series[1].data = res.data2;
          }
        }
        reso(res);
      })
      .catch(err => {
        reje(err)
      })
  });
}
function getRunDayData(dataType, dataTime, sourceBtnActiveKey) {
  let res = {
    data1: [],
    data2: [],
    data3: [],
    data4: []
  };
  res["xAxis"] = {
    name: '设备',
    data: []
  };
  res['yAxis'] = {
    axisLine: {
      show: true,
    },
    axisLabel: {
      formatter: function (value, index) {
        return value;
      },
    },
  }
  res["series"] = [
    {
      color: "skyblue",
      name: "累计连续正常运行天数",
      barWidth: "20%",
      barGap: "2.5%",
      // barGap: '-100%',
      type: "bar",
      data: res.data1,
    },
    {
      color: "#1AA094",
      name: "投运期间累计自检结果正常天数",
      barWidth: "20%",
      barGap: "2.5%",
      // barGap: '-100%',
      type: "bar",
      data: res.data2,
    },
    {
      color: "#B03A5B",
      name: "正常巡检天数",
      barWidth: "20%",
      barGap: "2.5%",
      // barGap: '-100%',
      type: "bar",
      data: res.data3,
    },
    {
      color: "#FDCD78",
      name: "巡检出勤率",
      barWidth: "20%",
      barGap: "2.5%",
      // barGap: '-100%',
      type: "bar",
      data: res.data4,
    },
  ];
  let fetchUrl = 'nelda-smcc/public/analysis/getDeviceOperationTJ';
  let fetchData = {
    startTime: new Date(dataTime[0]).Format('yyyy-MM-dd'),
    endTime: new Date(dataTime[1]).Format('yyyy-MM-dd')
  };
  return promise((reso, reje) => {
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
      .then(result => {
        if (result.code === "0" && result.data) {
          let eqList = result.data.equipmentList;
          let daList = result.data.dataList;
          if (eqList.length !== 0) {
            eqList.forEach(v => {
              res.xAxis.data.push(v.patroldeviceName)
            })
          }
          if (daList.length !== 0) {
            daList.forEach(v => {
              res.data1.push(v.continuousOperationDays);
              res.data2.push(v.selfDays);
              res.data3.push(v.inspectionDays);
              res.data4.push(v.attendance);
            })
            res.series[0].data = res.data1;
            res.series[1].data = res.data2;
            res.series[2].data = res.data3;
            res.series[3].data = res.data4;
          }
        }
        reso(res);
      })
      .catch(err => {
        reje(err)
      })
  });
  /*
    sourceBtnActiveKey
      statistics：统计分析
      inspection: 巡检出勤率
  */
}
function gerInspectionOmitData(dataType, dataTime) {
  let res = { data: [] };
  let _status = 'error';
  res["xAxis"] = {
    name: getNumByDataType(dataType, true),
    data: []
  };
  res["series"] = [
    {
      color: "#1AA094",
      name: "录像完整率",
      barWidth: "45%",
      type: "bar",
      data: res.data,
    },
  ];
  let fetchUrl = 'nelda-inspection/taskHistoryPoint/getMissedInspection';
  let fetchData = {
    statisticType: getNumByDataType(dataType),
    startTime: new Date(dataTime[0]).Format('yyyy-MM-dd hh:mm:ss'),
    endTime: new Date(dataTime[1]).Format('yyyy-MM-dd hh:mm:ss')
  };
  return promise((reso, reje) => {
    fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
      .then(result => {
        console.log(result, 'then');
        let series = []
        if (result.code === "0") {
          let arr = result.data.body;
          if (arr && arr.length !== 0) {
            arr.forEach(v => {
              res.xAxis.data.push(handleTimes(dataType, v.times))
              series.push((v.missedInspectionRate * 100).toFixed(2))
            })
          }
        }
        res.data = series;
        res.series[0].data = series;
        _status = 'success';
        reso(res);
      })
      .catch(err => {
        console.log(err, 'err');
        reje(err)
      }).finally(last => {
        console.log(_status, 394);
        if (_status === 'error') {
          message.error('获取数据出现错误');
        }
        console.log(last, 'finally');
      })
  });
}
function getWorkCloseLoopData(dataType, dataTime) {
  let res = {
    dataAlarmConfirm: [],
    dataAlarm: [],
    dataResultConfirm: [],
    dataTask: [],
  };
  res["xAxis"] = backXAxis(dataType, dataTime);
  res["series"] = [
    {
      color: "#1AA094",
      name: "录像完整率",
      barWidth: "45%",
      type: "bar",
      data: res.data,
    },
  ];
  return promise(res);
}
function getInspectionAndResultData(dataType, dataTime) {
  let res = {
    dataAlarmConfirm: [],
    dataAlarm: [],
    dataResultConfirm: [],
    dataTask: [],
  };
  res["xAxis"] = {
    name: getNumByDataType(dataType, true),
    data: []
  };
  res["series"] = [
    {
      // color: "#1AA094",
      name: "巡视告警人工审核完成率",
      // barWidth: "45%",
      // barGap: '-100%',
      type: "bar",
      // type: 'line',
      data: res.dataAlarmConfirm,
    },
    {
      // color: "#1AA094",
      name: "巡视告警准确率",
      // barWidth: "45%",
      // barGap: '-100%',
      type: "bar",
      // type: 'line',
      data: res.dataAlarm,
    },
    {
      // color: "#1AA094",
      name: "巡视结果人工审核完成率",
      // barWidth: "45%",
      // barGap: '-100%',
      type: "bar",
      // type: 'line',
      data: res.dataResultConfirm,
    },
    {
      // color: "#1AA094",
      name: "任务闭环率",
      // barWidth: "45%",
      // barGap: '-100%',
      type: "bar",
      // type: 'line',
      data: res.data3,
    },
  ];
  let fetchUrl1 = 'nelda-inspection/taskHistoryPoint/getInspectionResult';
  let fetchUrl2 = 'nelda-inspection/taskHistoryPoint/getReportRateResponse';
  let fetchData = {
    statisticType: getNumByDataType(dataType),
    startTime: new Date(dataTime[0]).Format('yyyy-MM-dd hh:mm:ss'),
    endTime: new Date(dataTime[1]).Format('yyyy-MM-dd hh:mm:ss')
  };
  return promise((reso, reje) => {
    fetch(fetchUrl1, {
      method: 'POST',
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
      .then(result => {
        if (result.code === "0") {
          let arr = result.data.body;
          if (arr && arr.length !== 0) {
            arr.forEach(v => {
              res.dataAlarmConfirm.push((v.alarmRate * 100).toFixed(2))
              res.dataAlarm.push((v.confirmRate * 100).toFixed(2))
            });
          }
          res.series[0].data = res.dataAlarmConfirm;
          res.series[1].data = res.dataAlarm;
          fetch(fetchUrl2, {
            method: 'POST',
            body: JSON.stringify(fetchData)
          }).then(r => r.json())
            .then(result => {
              let series = []
              if (result.code === "0") {
                let arr = result.data.body;
                if (arr && arr.length !== 0) {
                  arr.forEach(v => {
                    res.xAxis.data.push(handleTimes(dataType, v.times))
                    res.dataResultConfirm.push((v.approvalRate * 100).toFixed(2))
                    res.dataTask.push((v.taskRate * 100).toFixed(2))
                  })
                }
              }
              res.series[2].data = res.dataResultConfirm;
              res.series[3].data = res.dataTask;
              reso(res);
            })
            .catch(err => {
              reje(err)
            })
        }
      })
      .catch(err => {
        reje(err)
      })
  });
}
function backSeriesItemArr(res = []) {
  let typeObj = {};
  let lastObj = [];
  res.forEach((v1, i1) => {
    v1.dataDefectType.forEach((v2, i2) => {
      let key = v2.type;
      if (!typeObj[key]) {
        typeObj[key] = [];
      }
      typeObj[key][i1] = v2["typeNumber"] * 1;
    });
  });
  let objKey = Object.keys(typeObj); //['type1','type2']
  objKey.forEach((v1, i1) => {
    let arr = typeObj[v1];
    for (let index = 0; index <= res.length; index++) {
      if (arr[index] != 0 && !arr[index]) {
        arr[index] = 0;
      }
    }
    lastObj.push({
      name: v1,
      data: arr,
      type: "bar",
    });
  });
  return lastObj;
}
function getPatrolTaskData(dataType, dataTime) {
  let res = {
    dataPatrolTimes: [],
    dataPatrolTime: [],
    dataDefectNum: [],
    dataDefectType: [],
  };
  res["xAxis"] = {
    name: getNumByDataType(dataType, true),
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    data: backXAxis(dataType, dataTime)['data']
  };
  res['yAxis'] = {
    axisLine: {
      show: true,
    },
    axisLabel: {
      formatter: function (value, index) {
        return value;
      },
    },
  };
  res["series"] = [
      {
        // color: "#1AA094",
        name: "巡视次数",
        // barWidth: "45%",
        // barGap: '-100%',
        type: "bar",
        // type: 'line',
        data: res.dataPatrolTimes,
      },
      {
        // color: "#1AA094",
        name: "巡视时长",
        // barWidth: "45%",
        // barGap: '-100%',
        type: "bar",
        // type: 'line',
        data: res.dataPatrolTime,
        // label: {        
        //   formatter: function(param) {
        //     console.log(param,'param');
        //     return param.value + '时'
        //   }
        // }
      },
      {
        // color: "#1AA094",
        name: "巡视数量",
        // barWidth: "45%",
        // barGap: '-100%',
        type: "bar",
        // type: 'line',
        data: res.dataDefectNum,
      },
      // {
      //   // color: "#1AA094",
      //   name: "巡视类型0",
      //   // barWidth: "45%",
      //   // barGap: '-100%',
      //   type: "bar",
      //   // type: 'line',
      //   data: res.dataDefectType,
      // },
  ];
  let fetchUrl1 = 'nelda-inspection/patrolDutyStatistics/getTaskData';
  let fetchData = {
    dateType: getNumByDataType(dataType),
    startTime: new Date(dataTime[0]).Format('yyyy-MM-dd hh:mm:ss'),
    endTime: new Date(dataTime[1]).Format('yyyy-MM-dd hh:mm:ss')
  };

  return promise((reso, reje) => {
    fetch(fetchUrl1, {
      method: 'POST',
      body: JSON.stringify(fetchData)
    }).then(r => r.json())
      .then(result => {
        let isMock = true;
        if (isMock) {
          let arr2 = Mock.mock({
            "data|22": [{
              type: '类型' +1+ "@natural(5, 9)",
              typeNumber: "@natural(5, 30)"
            }],
          });
          let array = Mock.mock({
            "data|22": [{
              taskNumber: "@natural(5, 30)",
              touringTime: "@natural(5, 30)",
              defectsNumber: "@natural(5, 30)",
              dataDefectType: arr2.data,
            }],
          })
          result = {
            code: "0",
            data: {
              body: array.data
            }
          }
        }
        if (result.code == "0") {
          let seriesItemArr = [];
          let arr = result.data.body;
          if (arr && arr.length !== 0) {
            arr.forEach(v => {
              res.dataPatrolTimes.push((v.taskNumber * 1))
              res.dataPatrolTime.push((v.touringTime * 1))
              res.dataDefectNum.push((v.defectsNumber * 1))
            });
          }
          seriesItemArr = backSeriesItemArr(arr);
          res.series[0].data = res.dataPatrolTimes;
          res.series[1].data = res.dataPatrolTime;
          res.series[2].data = res.dataDefectNum;
          res.series.push(...seriesItemArr);
          reso(res);
        }
      })
      .catch(err => {
        reje(err)
      })
  });
}
export function exportEcharts({ url, exportFileName, fetchBody } = { url: '', exportFileName: '报表' }) {
  let objectUrl = null;
  let link = null;
  fetch(url,{
    method: 'POST',
    body: JSON.stringify({
      dateType: getNumByDataType(fetchBody.dataType),
      startTime: new Date(fetchBody.dataTime[0]).Format('yyyy-MM-dd hh:mm:ss'),
      endTime: new Date(fetchBody.dataTime[1]).Format('yyyy-MM-dd hh:mm:ss')
    })
  }).then(r => r.blob())
    .then(res => {
      objectUrl = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }))
      link = document.createElement('a')
      link.style.display = 'none'
      link.href = objectUrl;
      link.setAttribute('download', exportFileName)
      link.click()
      message.success('导出成功')
    }).catch(err => {
      message.success('导出失败')
    })
    .finally(() => {
      window.URL.revokeObjectURL(objectUrl);
      objectUrl = null;
      link = null;
    })
}

/**
 *
 * @param {String} componentKey - 左侧menu的key
 * @param {String} dataType - (日/周/月/年)
 * @param {String} dataTime - 统计时间端
 * @returns Promise
 */
export function getData(componentKey, dataType, dataTime, sourceBtnActiveKey) {
  console.log(componentKey, dataType, dataTime, 358);
  switch (componentKey) {
    case videoComplete:
      return getVideoCompleteData(dataType, dataTime);
    // break;
    case onlineDuration:
      return getOnlineDurationData(dataType, dataTime);
    // break;
    case runDay:
      return getRunDayData(dataType, dataTime, sourceBtnActiveKey);
    // break;
    case inspectionOmit:
      return gerInspectionOmitData(dataType, dataTime);
    // break;
    case workCloseLoop:
      return getWorkCloseLoopData(dataType, dataTime);
    // break;
    case inspectionAndResult:
      return getInspectionAndResultData(dataType, dataTime);
    // break;
    case patrolTask:
      return getPatrolTaskData(dataType, dataTime);
    // break;
    default:
      break;
  }
}
let statisticsConfig = {
  leftMenu,
};
export default statisticsConfig;
