import './css/videoItem.scss';
import React from 'react';

/* eslint-disable */
class Main extends React.Component {
	jianKHander(e) {
		e.stopPropagation();
		let winInfo = {
			name: this.props.data.equipment_name,
			type: "video",
			id: this.props.data.source_equipment_id,
			area_name: this.props.data.location_area_name,
			equipment_location: this.props.data.equipment_location
		}
		window.WinContainer.addWinInfo(winInfo);
	}
	hisHander(e) {
		e.stopPropagation();
		let winInfo = {
			name: this.props.data.equipment_name,
			type: "video",
			id: this.props.data.equipment_id,
			area_name: this.props.data.location_area_name,
			equipment_location: this.props.data.equipment_location,
			isHistory: true
		}
		window.WinContainer.addWinInfo(winInfo);
	}
	dwHander() {
		// GetCorrelationInfo(this.props.data.equipment_id+"_1");
		console.log("点击基站，触发三维更改视角,事件名称 ShebeiToGis  传递参数：{id:*};", 'id:', this.props.data.equipment_id)
		// window.PushData && window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.equipment_id }));
		if(window.PushData){
			window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.equipment_id }));
		  }else{
			window.GisMap.ShebeiToGis({id: this.props.data.equipment_id})
		  }
	}
	render() {
		return (<div className="videoItem" onClick={this.dwHander.bind(this)}>
			{this.props.data.resource_class_icon ? <div className="videoIcon"><img src={this.props.data.resource_class_icon} /></div> : null}
			<div className="videoNo">{this.props.data.index}.</div>
			<div className="videoName">{this.props.data.equipment_name} <span className={"videoWz sxt" + this.props.data.status}>{this.props.data.equipment_location}</span></div>
		</div>);
	}
}
export default Main;
/* eslint-enable */