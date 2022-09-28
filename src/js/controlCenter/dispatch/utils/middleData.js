import { v4 as uuid4 } from 'uuid'
import { getStateByProp } from '../redux/redux_utils';
import { createTableDataSource } from './tableFun'

const str1 = 'goToPhone,video,audioConference,videoConference';
const str2 = 'audioBroadCast,fileBroadCast';
const str3 = 'tallBack';
export const initCallStatus = (initiatorId="",content=[],triggerType="") => {
  let arr = [];
  if (str1.includes(triggerType)) {
    arr = content.map(v => {
      if (initiatorId == v.personId) {
        v.callStatus = v.callStatus||"4"
      } else {
        v.callStatus = v.callStatus||"1"
      }
      return v;
    });
  } else if (str2.includes(triggerType)) {
    arr = content.map(v => {
      if (initiatorId == v.personId) {
        v.callStatus = v.callStatus||"5"
      } else {
        v.callStatus =v.callStatus|| ""
      }
      return v;
    });
  } else if (str3.includes(triggerType)) {
    arr = content.map(v => {
      v.callStatus = v.callStatus||"7"
      return v;
    });
  }
  return arr;
}
export const createNewTabPane = (persons=[],triggerInfo={},groupId="",tabId="") => {
  let iscRelationInfo = getStateByProp('iscRelationInfo')
  let initiatorId = (iscRelationInfo&&iscRelationInfo.personId)||"";
  let newTabPane = { 
    tabTitle: triggerInfo.tabTitle||(triggerInfo.txt + "组"),
    tabId: tabId||(uuid4() + 'middleTabId'), 
    groupId,
    triggerType: triggerInfo.triggerType,
    content: createTableDataSource(persons)
  };
  newTabPane.content = initCallStatus(initiatorId,newTabPane.content,triggerInfo.triggerType);
  return newTabPane
}

export const findCurrentTabPane = (paneKey,middleData) => {
  let res = middleData.find(v => {
    return v.tabId === paneKey
  })
  return res
}

export const renderCallStatus = (props) => {
  let res = ""
  props.callStatus += ""
  switch (props.callStatus) {
    // "0"：挂断，"1"：振铃，"2"：通话，"3": 挂断 ，
    // "4": 拨号中，"5": 广播中，"6": 讲话中，"7": 听讲中,
    case "0":
      res = "已挂断..."
      break;
    case "1":
      res = "振铃中..."
      break;
    case "2":
      res = "通话中..."
      break;
    case "3":
      res = "已挂断..."
      break;
    case "4":
      res = "拨号中..."
      break;
    case "5":
      res = "广播中..."
      break;
    case "6":
      res = "讲话中..."
      break;
    case "7":
      res = "听讲中..."
      break;
    default:
      res = ""
      break;
  }
  return res
}

