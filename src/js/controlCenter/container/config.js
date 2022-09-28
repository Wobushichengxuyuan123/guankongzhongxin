import './css/config.scss';
import { Icon } from 'antd';
import React from 'react';

/* eslint-disable */
class Main extends React.Component{
	infoCanelHander(){
		this.props.parent.setState({configVisiable:false});
	}
	handerTagClick(e){
		let tag=e.target;
		if(e.target.tagName=="i"){
			tag=e.target.parentElement;
		}
		let className=tag.className;
		if(className.indexOf(" active")!=-1){
			tag.className=tag.className.replace(" active","");
		}else{
			tag.className+=" active";
		}
	}
	render(){
		return (<div className="configDiv">
			<div className="cbtn" onClick={this.infoCanelHander.bind(this)}><Icon type="close" /></div>
			<div className="title">显示</div>
			<div>
				<div className="left">
					<div className="shipin" onClick={this.handerTagClick.bind(this)}>视频<i className="logo"></i></div>
					<div className="guangbo" onClick={this.handerTagClick.bind(this)}>广播<i className="logo"></i></div>
					<div className="menjin" onClick={this.handerTagClick.bind(this)}>门禁<i className="logo"></i></div>
				</div>
				<div className="right">
					<div className="jizhan" onClick={this.handerTagClick.bind(this)}>基站<i className="logo"></i></div>
					<div className="renyuan" onClick={this.handerTagClick.bind(this)}>人员<i className="logo"></i></div>
				</div>
			</div>
		</div>);
	}
}
export default Main;

/* eslint-enable */