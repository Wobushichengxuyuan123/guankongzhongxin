// 示例
import { Route } from 'react-router-dom';
import VideoMonitoring from '../js/controlCenter/video/index'
import Videoplayback from '../js/controlCenter/videoplayback/VideoPlayback'
import CVR from '../js/controlCenter/videoplayback/cvr';


export default [
    <Route key={'VideoMonitoring'} exact path="/VideoMonitoring" component={VideoMonitoring}/>,
    <Route key={'Videoplayback'} exact path="/Videoplayback" component={Videoplayback}/>,
    <Route key={'CVR'} exact path="/CVR" component={CVR}/>,

];
