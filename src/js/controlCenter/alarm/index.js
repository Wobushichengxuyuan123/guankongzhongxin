import React from 'react';
import { Tabs } from 'antd';
import AreaAlarm from './areaAlarm';
import LevelAlarm from './levelAlarm';
import ClassAlarm from './classAlarm';
import './index.scss'
class AlarmInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { label: '区域', key: '1', children: <AreaAlarm /> },
                { label: '分级', key: '2', children: <LevelAlarm /> },
                { label: '分类', key: '3', children: <ClassAlarm /> }
            ]
        }
    }
    render() {
        return (<div className="alarmInfo">
            <div className="title">报警信息（{this.props.alarmCount}）</div>
            <Tabs items={this.state.items} />
        </div>);
    }
}
export default AlarmInfo;