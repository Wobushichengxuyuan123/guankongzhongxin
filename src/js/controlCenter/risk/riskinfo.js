import { Tabs} from 'antd';
import './css/alarmInfo.scss'
import  AreaAlarm from './areaAlarm';
import  LevelAlarm from './levelAlarm';
import  ClassAlarm from './classAlarm';
import React from 'react';
const TabPane = Tabs.TabPane;
class Main extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
		    
		  }
	}
	componentDidMount(){
		
	}
	
	render(){
		
		return (<div className="alarmInfo">
			<div className="title">质量预警（{this.props.alarmCountone}）</div>
			<Tabs defaultActiveKey="1">
			    <TabPane tab="区域 " key="1">
			    		<AreaAlarm />
			    </TabPane>
			    <TabPane tab="分级" key="2">
			    		<LevelAlarm />
			    </TabPane>
			    <TabPane tab="分类" key="3">
			    		<ClassAlarm />
			    </TabPane>
			</Tabs>
		</div>);
	}
}
export default Main;