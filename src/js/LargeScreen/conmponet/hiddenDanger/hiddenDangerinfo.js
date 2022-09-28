import React from 'react';
import { Tabs} from 'antd';
import  AreaAlarm from './areaAlarm';
import  LevelAlarm from './levelAlarm';
import  ClassAlarm from './classAlarm';

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
			<div className="title">隐患治理（{this.props.alarmCount}）</div>
			<Tabs defaultActiveKey="1">
			    <TabPane tab="全部" key="1">
			    		<AreaAlarm Date={this.props.date}/>
			    </TabPane>
			    <TabPane tab="已治理" key="2">
			    		<LevelAlarm Date={this.props.date}/>
			    </TabPane>
			    <TabPane tab="未治理" key="3">
			    		<ClassAlarm Date={this.props.date}/>
			    </TabPane>
			</Tabs>
		</div>);
	}
}
export default Main;