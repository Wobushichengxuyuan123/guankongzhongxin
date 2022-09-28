import './css/areaInfo.scss';
import { Input, Icon } from 'antd';
import React from 'react';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tabSelected: "area", historyList: [], areaList: [], name: "", isMh: false, resultList: [], id: "", parentId: "" };
	}
	componentDidMount() {
		this.getHistory();
		this.searchFun();
	}
	tabHander(type) {
		this.setState({ tabSelected: type });
	}
	getHistory() {
		let loginName =window.sessionStorage.getItem("loginName")
		fetch("/nelda-smcc/pubUserSearchHistory/list", {
			method: "post",
			body: JSON.stringify({
				loginName : loginName,
				searchPath : 'quyu',
			})
		})
			.then(r => r.json())
			.then(b => {
				let list = b.data.slice(0, 5)
        this.setState({ historyList: list });
			})
	}
	getAreaSearch(name) {
		let projectId = window.sessionStorage.getItem("projectId")
		if (!name) {
			name = "";
		}
		fetch(window.BASICS_SYSTEM + "/pubSearch/areaSearch?area_name=" + name + "&projectId=" + projectId)
			.then(r => r.json())
			.then(b => {
				if (b.data) {
					this.setState({ areaList: b.data });
				}
			})
	}
	getAreaSearchDetails(id, parentId) {
		let projectId = window.sessionStorage.getItem("projectId")
		if (!projectId) {
			projectId = ''
		}
		let param = "";
		if (id) {
			param += "&location_area_id=" + id + "&parent_id=" + parentId;
		}
		fetch(window.BASICS_SYSTEM + "/pubSearch/areaSearchDetails?projectId=" + projectId + param)
			.then(r => r.json())
			.then(b => {
				if (b.data) {
					this.setState({ resultList: b.data });
				} else {
					this.setState({ resultList: [] });
				}
			})
	}
	storage(e){
		let loginName =window.sessionStorage.getItem("loginName")
		fetch("/nelda-smcc/pubUserSearchHistory/insert", {
			method: "post",
			body: JSON.stringify({
			  loginName : loginName,
			  searchPath : 'quyu',
			  searchValue : e
			})
		  })
			.then(r => r.json())
			.then(b => {
			  this.getHistory();
			})
	  }
	searchFun(e) {
		this.storage(e)
		this.getAreaSearchDetails(this.state.id, this.state.parentId);
	}
	changeSearchInput(e) {
		let isMh = false;
		if (e.target.value.trim() !== "") {
			isMh = true;
		}
		this.setState({ name: e.target.value, isMh: isMh, id: "", parentId: "" });
		this.getAreaSearch(e.target.value);
	}
	clearSearchInput() {
		this.setState({ name: "", isMh: false, id: "", parentId: "" })
		this.getAreaSearchDetails("", "");
	}
	clickMhItemHander(id, parentId, name, item) {
		this.storage(name);
		if( window.PushData){
			window.PushData && window.PushData("LonLatToGis" + "@" + JSON.stringify({ id: item.location_area_id, map_json: item.map_json|| '' }));
        }else{
            window.GisMap.LonLatToGis(JSON.stringify({ id: item.location_area_id, map_json: item.map_json|| '' }));
        }
		this.setState({ name: name, isMh: false, id, parentId });
		this.getAreaSearchDetails(id, parentId);
	}
	clickMhItemHanderS(name,id){
		let isMh = false;
		if (name.trim() !== "") {
			isMh = true;
		}
		this.setState({ name: name, isMh: isMh, id: "", parentId: "", isShow: false });
		this.getAreaSearch(name);
	}
	render() {
		let resultfun = (list = this.state.resultList, level = 1) => {
			return list.map(item => {
				let reval = <div onClick={this.clickMhItemHander.bind(this, item.location_area_id, item.parent_id, item.location_area_name,item)} className={"level" + level} key={item.location_area_id}>{item.location_area_name}</div>;
				let relist = [];
				if (item.children) {
					relist = resultfun(item.children, level + 1);
				}
				relist.unshift(reval);
				return relist;
			});
		}
		let mhItems = this.state.areaList.map((item, i) => {
			return <div key={item.location_area_id} onClick={this.clickMhItemHander.bind(this, item.location_area_id, item.parent_id, item.location_area_name)} className="mhItem"><div className="mh-area"></div><div className="name">{item.location_area_name}</div></div>;
		})

		let historyDivs = this.state.historyList.map((item, i) => {
			return <div className="historyDivstyle" onClick={this.clickMhItemHanderS.bind(this, item.searchValue, item.id)} key={"historyDiv" + i}>{item.searchValue}</div>;
		})
		let searchInputButtons = <div>
			<Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
			<span className="jg">︱</span>
			<Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
		</div>
		return (
			<div className="searchInfo areaInfo">
				<div className="title">施工区域</div>
				<div className="searchDiv">
					<Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)} addonAfter={searchInputButtons} onPressEnter={this.searchFun.bind(this)} placeholder="区域" />
				</div>
				<div className="mhss" style={{ height: (window.document.documentElement.clientHeight - 170), display: this.state.isMh ? "block" : "none" }}>
					{mhItems}
				</div>
				<div className="searchPrompt">
				<div className='searchPromptone'>
					<div className='historyleft'>历史搜索：</div>
					<div className="history">{historyDivs}</div>
            	</div>
					<div className="tabs" >
						<div className="tabs-title">
							<div className={this.state.tabSelected === "area" ? "active" : ""} onClick={this.tabHander.bind(this, "area")}>区域 {this.state.tabSelected === "area" ? <Icon type="caret-up" /> : <Icon type="caret-down" />}</div>
						</div>
						{this.state.tabSelected === "area" ?
							<div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
								<div className="item">
									{resultfun()}
								</div>
							</div>
							: null}
					</div>
				</div>
			</div>
		);
	}
}
export default Main;
