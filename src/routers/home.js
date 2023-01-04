// 示例
import { Route } from 'react-router-dom';
import Project from "../js/controlCenter/project/index";
import Point from '../js/controlCenter/point/index';
import SearchInfo from "../js/controlCenter/search/index";
import AreaInfo from "../js/controlCenter/area/index";
import Equipment from "../js/controlCenter/container/components/equipment";
import AlarmInfo from '../js/controlCenter/alarm';

export default [
    <Route key={'Project'} exact path="/Project" component={Project}/>,
    <Route key={'Point'} exact path="/Point" component={Point}/>,
    <Route key={'SearchInfo'} exact path="/SearchInfo" component={SearchInfo}/>,
    <Route key={'AreaInfo'} exact path="/AreaInfo" component={AreaInfo}/>,
    <Route key={'AlarmInfo'} exact path="/AlarmInfo" component={AlarmInfo}/>,
    <Route key={'Equipment'} exact path="/Equipment" component={Equipment}/>,
];
