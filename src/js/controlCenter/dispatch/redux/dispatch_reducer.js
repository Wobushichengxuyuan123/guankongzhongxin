/* eslint-disable no-lone-blocks */
import {
  SetAcceptTheCallInfo,
  SetMidTableData,
  SetMidTabActive,
  SetMiddleTabData,
  AddStatus,
  UpdateStatus,
	SetIscRelationInfo,
  SetTreeData
} from "./constant";
import update from "react-addons-update";

let allState = {
  acceptTheCallInfo: null,
  isOnlineAlready: false,
  treeData: [],
  middleTableDataSource: [],
  middleTabPaneActiveKey: "",
  middleTabData: [],
  iscRelationInfo: null,
  onlineAlready: [],
  sumSipNumStatus: [],
  group: [],
};

export default function dispatchReducer(preState = allState, action) {
  const { type, data } = action;
  // console.log(action,'action-redux');
  let { sumSipNumStatus } = preState;
  switch (type) {
    case AddStatus: {
      let { redux_sumSipNumStatus, isOnlineAlready } = data;
      if (isOnlineAlready) {
        return update(preState, {
          sumSipNumStatus: {
            $set: [...redux_sumSipNumStatus],
          },
          isOnlineAlready: {
            $set: isOnlineAlready,
          },
        });
      } else {
        return update(preState, {
          sumSipNumStatus: {
            $set: [...redux_sumSipNumStatus],
          }
        });
      }
    }
    case UpdateStatus: {
      let { type: type2, data: data2 } = data;
      if (sumSipNumStatus.length !== 0) {
        data2.forEach((v) => {
          let flag = false;
          flag = sumSipNumStatus.some((v2) => {
            if (v2.sip == v.sip) {
              v2.online = v.online;
              return true;
            }
          });
        });
      }
      if (type2 !== "onlineAlready") {
        return update(preState, {
          sumSipNumStatus: {
            $set: [...sumSipNumStatus],
          },
        });
      } else {
        return update(preState, {
          sumSipNumStatus: {
            $set: [...sumSipNumStatus],
          },
          onlineAlready: {
            $set: [...data2],
          },
        });
      }
    }
		case SetIscRelationInfo: {
			return update(preState, {
				iscRelationInfo: {
					$set: data,
				},
			});
		}
		case SetMiddleTabData: {
			return update(preState, {
				middleTabData: {
					$set: [...data],
				},
			});
		}
    case SetMidTabActive: {
      console.log(data,'SetMidTabActive');
			return update(preState, {
				middleTabPaneActiveKey: {
					$set: data,
        }
			})
		}
    case SetMidTableData: {
			return update(preState, {
				middleTableDataSource: {
					$set: [...data],
        }
			})
		}
    case SetTreeData: {
      return update(preState, {
				treeData: {
					$set: [...data],
        }
			})
      break;
    }
    case SetAcceptTheCallInfo: {
      return update(preState, {
				acceptTheCallInfo: {
					$set: data,
        }
			})
    }
    default:
      return preState;
  }
}
