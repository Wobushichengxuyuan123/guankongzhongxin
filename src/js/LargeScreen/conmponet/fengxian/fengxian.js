import React from 'react';
import { Tabs } from 'antd';
import AreaAlarm from './areaAlarm';
import LevelAlarm from './levelAlarm';
import ClassAlarm from './classAlarm';
const TabPane = Tabs.TabPane;
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<div className="alarmInfo">
            <div className="title">风险管控（{this.props.alarmCount}）</div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="区域 " key="1">
                    <AreaAlarm data={this.props.date} />
                </TabPane>
                <TabPane tab="分级" key="2">
                    <LevelAlarm data={this.props.date} />
                </TabPane>
                <TabPane tab="分类" key="3">
                    <ClassAlarm data={this.props.date} />
                </TabPane>
            </Tabs>
        </div>);
    }
}
export default Main;