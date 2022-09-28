import PersonItem from './personItem';
import { Input, Collapse } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import AreaPerson from './areaPerson';
import PersonAndCar from '@/js/controlCenter/container/components/personAndCar'

const Search = Input.Search;
// const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			panelList: [],
			personItems: [],
			name: "",
			openId:""
		}
	}
	componentDidMount() {
		this.getAreaPersonInfo();
	}
	getAreaPersonInfo(name) {
		let projectId =window.sessionStorage.getItem("projectId")
		if(!name) {
			name = "";
		}
		fetch(window.BASICS_SYSTEM + "/pubPersionSearch/personInfoCom?name=" + name + '&projectId=' + projectId)
			.then(r => r.json())
			.then(b => {
				if(b.data&&b.data.data) {
					this.setState({
						panelList: b.data.data
					})
				}
			})
	}
	getPersonDetailsArea(id) {
		fetch(window.BASICS_SYSTEM + "/pubPersionSearch/personDetailsCom?com_id=" + id + "&name=" + this.state.name)
			.then(r => r.json())
			.then(b => {
				if(b.data&&b.data.data) {
					this.setState({
						personItems: b.data.data
					})
				}
			})
	}
	searchFun(e) {
		this.getAreaPersonInfo(e);
		this.setState({
			name: e,
			panelList: [],
			personItems: []
		});
	}

	/* eslint-disable */
	changeCollapse(id) {
		if(id){
			this.setState({personItems:[],openId:id});
			setTimeout((()=>this.getPersonDetailsArea(id)).bind(this),200)
		  }else{
		  	this.setState({openId:""});
		  }
	}
	/* eslint-enable */

	clearTimer(){
		this.refs.personAndCar&&this.refs.personAndCar.clearTimer()
	}
	
	render() {
		let personItems = this.state.personItems.map((item, i) => {
			item.index = (i + 1);
			// return <PersonItem key={"personItem"+i} data={item}/>
			// return <AreaPerson ref="areaPerson" type='1'/>
		})
		let panels = this.state.panelList.map((item, i) => {
			return <Panel header={item.company_name+"("+item.num+")"} key={item.com_id}>
				      <div className="personList">
				      	{/* {personItems} */}
						  <PersonAndCar panelList={this.state.personItems} handleClick={this.props.handleClick} ref='personAndCar'/>
				      </div>
				    </Panel>
		})
		return(<div><div className="searchDiv">
							<Search onSearch={this.searchFun.bind(this)} className="personSearchInput searchInput" placeholder="输入姓名或车牌号"/>
						</div>
						<div>
							<Scrollbars style={{ height: (window.document.documentElement.clientHeight-200) }}>
								{panels.length?
								<Collapse accordion onChange={this.changeCollapse.bind(this)} defaultActiveKey="">
								    {panels}
								</Collapse>
								:null}
							</Scrollbars>
						</div></div>);
	}
}
export default Main;