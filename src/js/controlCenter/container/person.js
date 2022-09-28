import './css/person.scss';
import { Tabs } from 'antd';

import AreaPerson from './areaPerson';
import ComPerson from './comPerson';
import React from 'react';

// const Search = Input.Search;
const TabPane = Tabs.TabPane;
// const Panel = Collapse.Panel;
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			personCount: 0
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.personCount !== this.state.personCount) {
			this.setState({ personCount: nextProps.personCount });
			if (this.refs.areaPerson) {
				this.refs.areaPerson.getAreaPersonInfo();
				this.refs.areaPerson.getPersonDetailsArea(this.refs.areaPerson.state.openId);
			}
			if (this.refs.comPerson) {
				this.refs.comPerson.getAreaPersonInfo();
				this.refs.comPerson.getPersonDetailsArea(this.refs.comPerson.state.openId);
			}
		}
	}

	tabChange() {
		this.refs.areaPerson1 && this.refs.areaPerson1.clearTimer()
		this.refs.areaPerson2 && this.refs.areaPerson2.clearTimer()
		this.refs.ComPerson && this.refs.ComPerson.clearTimer()
	}

	render() {
		const { handleClick } = this.props;
		return (<div className="person">
			<div className="title">人员车辆定位（{this.state.personCount}）</div>
			<div>
				<Tabs defaultActiveKey="人员动态tab" onChange={this.tabChange.bind(this)}>
					<TabPane tab="人员动态" key="人员动态tab">
						<AreaPerson ref="areaPerson1" type='0' />
					</TabPane>
					<TabPane tab="车辆动态" key="车辆动态tab">
						<AreaPerson ref="areaPerson2" type='1' />
					</TabPane>
					<TabPane tab="组织信息" key="组织信息tab">
						<ComPerson ref="comPerson" ref='ComPerson' />
					</TabPane>
				</Tabs>
			</div>
		</div>);
	}
}
export default Main;