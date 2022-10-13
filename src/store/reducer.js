// import {reducer as alterReducer1} from '../js/alert/store'
import {reducer as alterReducer} from '../js/controlCenter/container/store'
// import dispatchReducer from '../js/controlCenter/dispatch/redux/dispatch_reducer';
import {dispatchReducer} from 'nelda-bj-dispatch';
import {combineReducers} from 'redux'

const reducer = combineReducers({
  alter: alterReducer,
  dispatchReducer
});
export default reducer