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