// #
export const weekUSA = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
/**
 *
 * @param {数字} str
 * @returns 将数字补成双位数字，返回：1=>01
 */
export function repair0(str) {
  str += "";
  return str.length >= 2 ? str : "0" + str;
}
/**
 *
 * @param {年份} year
 * @param {月份} month
 * @returns 该月有多少天
 */
export function getMonthDays(year, month) {
  const day31 = "1,3,5,7,8,10,12";
  let isRunNian = false;
  let days = 29;
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    isRunNian = true;
  } else {
    isRunNian = false;
  }
  if (isRunNian && month == 2) {
    days = 29;
  } else if (day31.includes(month)) {
    days = 31;
  } else {
    days = 30;
  }
  return days;
}
/**
 *
 * @param {起始日期} startDate
 * @param {结束日期} endDate
 * @returns 两个日期之间的所有星期一
 */
export function getAmongMonday(startDate = "", endDate = "") {
  let defaultDate = getCurrentDayInfo("", true);
  let defaultStartDate =
    defaultDate.year + "-" + defaultDate.month + "-" + defaultDate.currentDay;
  let defaultEndDate =
    defaultDate.year + "-" + defaultDate.month + "-" + defaultDate.monthDays;
  let s = getCurrentDayInfo(startDate || defaultStartDate);
  let e = getCurrentDayInfo(endDate || defaultEndDate);
  let end = "";
  let among = [];
  end = getAllMonday(endDate);
  // let startMonthAllMondays = getAllMonday(
  //   `${s.year}-${s.month}-${s.currentDay}`
  // );  
  for (let i = s.month; i <= e.month; i++) {
    let day01 = '01'
    if (i === s.month) {
      day01 = s.currentDay
    }
    let date = s.year + "-" + i + "-"+day01;
    let arr = getAllMonday(date).mondays;
    among = among.concat(arr);
  }
  if (end.isCrossMonth) {
    among = among.concat([end.nextMonday.type3]);
  }
  let eIndex = among.indexOf(end.nextMonday.type3);
  among = among.slice(0, eIndex + 1);
  return among;
}
export function diff(todayInfo) {
  let diffVal = 1;
  if (todayInfo.weekNum === 0) {
    diffVal = 1;
  } else if (todayInfo.weekNum === 1) {
    diffVal = 0;
  } else {
    diffVal = 7 - Math.abs(todayInfo.weekNum - 1);
  }
  return diffVal;
}
/**
 *
 * @param {日期} date
 * @returns 该日期之后的所有星期一
 */
export function getAllMonday(date = "") {
  function getMondays(firstMondayNum, todayInfo) {
    let mondays = [];
    let mondaysNum = [];
    let month2 = repair0(todayInfo.month);
    for (let i = firstMondayNum; i < todayInfo.monthDays; ) {
      mondaysNum.push(i);
      let date = todayInfo.year + "-" + month2 + "-" + repair0(i);
      mondays.push(date);
      i = i + 7;
    }
    return { mondays, mondaysNum };
  }
  let now = new Date();
  if (date) {
    now = new Date(date);
  }
  let isCrossMonth = false;
  let mondays = [];
  let mondaysNum = [];
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let monthDays = now.getDate();
  let param1 = year + "-" + month + "-" + "01";
  let param = year + "-" + month + "-" + monthDays;
  let todayInfo1 = {};
  let firstMondayNum1 = "";
  let todayInfo = {};
  todayInfo = getCurrentDayInfo(param);
  let diffVal = diff(todayInfo);
  let firstMondayNum = todayInfo.currentDay + diffVal;
  let nextMonday = {};
  if (firstMondayNum > todayInfo.monthDays) {
    let _year = year;
    let _month = todayInfo.month + 1;
    if (_month > 12) {
      _month = 1;
      _year += 1;
    }
    // 跨月
    todayInfo1 = getCurrentDayInfo(param1);
    firstMondayNum1 = todayInfo1.currentDay + diff(todayInfo1);
    mondays = getMondays(firstMondayNum1, todayInfo1).mondays;
    // mondaysNum = getMondays(firstMondayNum1,todayInfo1).mondaysNum;
    let nextMonthMonday =
      _year + "-" + repair0(_month) + "-" + repair0(diffVal);
    mondays.push(nextMonthMonday);
    nextMonday = { type3: nextMonthMonday };
    isCrossMonth = true;
  } else {
    mondays = getMondays(firstMondayNum, todayInfo).mondays;
    mondaysNum = getMondays(firstMondayNum, todayInfo).mondaysNum;
    nextMonday = {
      type3:
        year + "-" + repair0(todayInfo.month) + "-" + repair0(mondaysNum[0]),
    };
  }
  // console.log(mondays,nextMonday,diffVal,isCrossMonth,127);
  return { mondays, todayInfo, nextMonday, isCrossMonth };
}
/**
 *
 * @param {日期} date
 * @param {是否获得当月第一天的信息} isFirstDay - 获取条件=>(date为空，且该值为true)
 * @returns 该日期的，年[2022]，月[5]，日[8]，周索引[0]，周文字[星期日]，该月的天数[31]
 */
export function getCurrentDayInfo(date = "", isFirstDay = false) {
  let now = new Date();
  if (date) {
    now = new Date(date);
  }
  if (!date && isFirstDay) {
    let str =
      new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + "01";
    now = new Date(str);
  }
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let currentDay = now.getDate();
  let weekNum = now.getDay();
  let weekTxt = weekUSA[weekNum];
  let monthDays = getMonthDays(year, month);
  return {
    year,
    month,
    currentDay,
    weekNum,
    weekTxt,
    monthDays,
  };
}
/**
 * getAmongDay
 * @param {日期数组} date 
 * @returns 两个日期之间的所有天数
 */
export function getAmongDay(date=['2022-11-01','2022-11-01']) {
  
  let data = [];
  if (date.length==1) {
    date[1] = date[0]
  }
  let s = getCurrentDayInfo(date[0]);
  let e = getCurrentDayInfo(date[1]);
  for (let year = s.year; year <= e.year; year++) {
    if (s.year===e.year) {
      for (let month = s.month; month <= e.month; month++) {
        if (s.month === e.month) {
          for (let day = s.currentDay; day <= e.currentDay; day++) {
            data.push(year + "-" + repair0(month) + "-" + repair0(day));
          }
        } else {
          let startDay = 1;
          let endDay = getMonthDays(year,month);          
          if (month === s.month) {
            startDay = s.currentDay;
          }
          if (month === e.month) {
            endDay = e.currentDay;
          }
          for (let day = startDay; day <= endDay; day++) {
            data.push(year + "-" + repair0(month) + "-" + repair0(day));
          }
        }
      }
    } else {
      let start = year + '-01-01';
      let end = `${s.year}-12-31`;
      if (year === s.year) {
        start = `${s.year}-${s.month}-${s.currentDay}`
      }
      if (year === e.year) {
        end = `${e.year}-${e.month}-${e.currentDay}`
      }
      let r = getAmongDay([start,end]);
      data.push(...r);
    }
  }
  return data;
}