/* eslint-disable */
import {constants} from "./index";
import update from 'react-addons-update';

const defaultState = {
  test: '',
  info: 0,
  infoZ: 0,
  isAoTuAlter: false,
  alarmCount: 0
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TEST:
      return update(state, {
        test: {$set: action.data}
      })
    case constants.INFO:
      return update(state, {
        info: {$set: action.data}
      })
    case constants.INFOZ:
      return update(state, {
        infoZ: {$set: action.data}
      })
    case constants.ISAOTUALTER:
      return update(state, {
        isAoTuAlter: {$set: action.data}
      })
    case constants.ALARMCOUNT:
      return update(state, {
        alarmCount: {$set: action.data}
      })
  }
  return state
};

export default reducer

/* eslint-enable */