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
			<div className="title">智能预警（{this.props.alarmCount}）</div>
			<Tabs defaultActiveKey="1">
				<TabPane tab="区域 " key="1">
					<AreaAlarm alarmComfrom={this.props.alarmComfrom} Date={this.props.Date} />
				</TabPane>
				<TabPane tab="分级" key="2">
					<LevelAlarm alarmComfrom={this.props.alarmComfrom} Date={this.props.Date} />
				</TabPane>
				<TabPane tab="分类" key="3">
					<ClassAlarm alarmComfrom={this.props.alarmComfrom} Date={this.props.Date} />
				</TabPane>
			</Tabs>
		</div>);
	}
}
export default Main;