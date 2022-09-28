import PersonItem from './personItem';
import { Input, Collapse } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import PersonAndCar from '@/js/controlCenter/container/components/personAndCar'


/* eslint-disable */
const Search = Input.Search;
const Panel = Collapse.Panel;
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			panelList: [],
			personItems: [],
			name: "",
			openId: ""
		}
	}
	componentDidMount() {
		this.getAreaPersonInfo()
	}

	getAreaPersonInfo(name, type) {
		let projectId =window.sessionStorage.getItem("projectId")
		if (!name) {
			name = "";
		}
		fetch(window.BASICS_SYSTEM + "/pubPersionSearch/areaPersonInfo?name=" + name + '&type=' + this.props.type + '&projectId=' + projectId)
			.then(r => r.json())
			.then(b => {
				if (b && b.data) {
					this.setState({ panelList: b.data||[] })
				}
			})
	}
	getPersonDetailsArea(area_id) {
		fetch(window.BASICS_SYSTEM + "/pubPersionSearch/personDetailsArea?area_id=" + area_id + "&name=" + this.state.name)
			.then(r => r.json())
			.then(b => {
				if (b.data.data) {
					this.setState({ personItems: b.data.data })
				}
			})
	}
	searchFun(e) {
		this.getAreaPersonInfo(e);
		this.setState({ name: e, panelList: [], personItems: [] });
	}
	changeCollapse(id) {
		if (id) {
			this.setState({ personItems: [], openId: id });
			setTimeout((() => this.getPersonDetailsArea(id)).bind(this), 200)
		} else {
			this.setState({ openId: "" });
		}
	}

	clearTimer(){
		this.refs.personAndCar&&this.refs.personAndCar.clearTimer()
	}

	render() {
		let panels = this.state.personItems.map((item, i) => {
			return <Panel header={item.persons != -1 && item.persons < item.max_level ? <span style={{ color: "red" }}>{item.area_name + "(" + item.max_level + "/" + (item.persons == -1 ? "-" : item.persons) + ")"}</span> : item.area_name + "(" + item.max_level + "/" + (item.persons == -1 ? "-" : item.persons) + ")"} key={item.area_id}>
				<div className="personList">
					{personItems}
				</div>
			</Panel>
		})
		return (<div><div className="searchDiv">
			<Search onSearch={this.searchFun.bind(this)} className="personSearchInput searchInput" placeholder={`输入${this.props.type==0?'姓名':'车牌号'}`} />
		</div>
			<div>
				<Scrollbars style={{ height: (window.document.documentElement.clientHeight - 200) }}>
						<Collapse accordion onChange={this.changeCollapse.bind(this)}>
							<PersonAndCar panelList={this.state.panelList} handleClick={this.props.handleClick} ref='personAndCar'/>
						</Collapse>
				</Scrollbars>
			</div>
		</div>);
	}
}
export default Main;
/* eslint-enable */