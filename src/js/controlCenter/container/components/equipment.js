import '../css/person.scss';
import { Button, Tabs, Input, Collapse, Spin, Tree } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import EqRight from './eqRight.js'
import React from 'react';

import TabItem from './common/box';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

/* eslint-disable */

class Equipment extends React.Component {
    constructor(props) {
        super(props);
        this.SearchInputRef = React.createRef()
        this.state = {
            collapseKey: '',
            rightBoxData:  null,
            openRightBox: false,
            personCount: 0,
            areaList: [//列表数据
            ],
            videoList: [//子集数据
            ],
            isLoding: true,
            tabKey: 1,
            treeData: []
        }
    }

    componentDidMount() {
        this.searchHandle()
    }
    setCollapseKey(key) {
        this.setState({
            collapseKey: key
        })
    }
    //折叠面板click
    changeCollapse(id) {
        this.setCollapseKey(id)
        this.setState({ videoList: [] });
        setTimeout((() => {
            this.getIdInfo(id);
        }).bind(this), 200);
    }

    //获取折叠面板内信息
    getIdInfo(id) {
        if (id) {
            this.setState({ isLoding: true, resNum: this.state.resNum + 1 })
            this.state.areaList.some(item => {
                let _id = item.locationAreaId;
                if (this.state.tabKey == "2") {
                    _id = item.equipmentCategoriesId
                }
                if ( _id == id) {
                    if (item.equipmentList && item.equipmentList.length > 0) {
                        item.equipmentList.map(n => {
                            n.equipment_name = n.equipmentName
                            if (!n.typeName) {
                                n.typeName = n.equipmentCategoriesName||n.equipmentCategoriesId_Name
                            }
                        })
                        this.setState({ videoList: item.equipmentList, isLoding: false });
                    } else {
                        this.setState({ isLoding: false });
                    }
                }
            })
        }
    }

    //Tab chang
    tabChange(key) {
        this.toggleRightBox(false,null)
        this.setState({
            tabKey: key,
            areaList: []
        },() => {
            this.searchHandle()
        })
    }
    treeNodeHander(e, b) {
        let data = b.node.props.title
        let datalist = b.selectedNodes[0].key
        let datalist1 = b.selectedNodes[0].props.title.props.children
    }
    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            if (item.actionList) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodesChilde(item.actionList)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} />;
        });
    }
    renderTreeNodesChilde(data) {
        // item.dictName
        return data.map((item) => {
            return <TreeNode className="first-level" title={
                item.dictName
            } key={item.id} />;
        });
    }
    toggleRightBox(flag,data) {
        this.setState({
            rightBoxData: data,
            openRightBox: flag
        })
    }
    searchHandle() {
        let type = "0";
        if (this.state.tabKey == "2") {
            type = "1"
        }
        let projectId = window.sessionStorage.getItem("projectId")
        let searchV = this.SearchInputRef.current.state.value;
        let fetchUrl = window.SYSTEM_CONFIG_BASICS + '/pubEquipment/getEquipmentInfoByStatusOrName'
        let fetchBody = { projectId: projectId,equipmentName:searchV, type }
        fetch(fetchUrl, {
            method: "POST",
            body: JSON.stringify(fetchBody)
        }).then(r => r.json())
        .then(res => {
            this.setCollapseKey('')
            if (res.msg === "success") {
                this.setState({ areaList: res.data });
            }
        }).catch(err => {
            console.log(err,'err');
        })
    }
    render() {
        let { tabKey } = this.state
        let items = this.state.videoList.map((item, i) => {
            item.index = i + 1;
            return <TabItem parent={this} key={"tabItem" + i} data={item} />
        })

        let panels = this.state.areaList.map(item => {
            let _key = item.locationAreaId;
            if (tabKey == "2") {
                _key = item.equipmentCategoriesId
            }
            item.count = item.equipmentList ? item.equipmentList.length : 0
            return <Panel header={(item.name) + "(" + item.count + ")"} key={_key}>
                <div className="videoList">
                    {this.state.isLoding ? <div style={{ textAlign: 'center', margin: '10px 0' }}><Spin tip="加载中..." />
                    </div> : items}
                </div>
            </Panel>
        })

        return (<div className="person equipment">
            <div className="title">设备信息</div>
            <div>
                <div className="search base_search">
                    <Input ref={this.SearchInputRef} allowClear placeholder={`请输入关键字`} 
                        prefix={<Icon type="search"/>} 
                    />
                    <Button type="primary" onClick={this.searchHandle.bind(this)}>搜索</Button>
                </div>
                <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)}>
                    <TabPane tab="区域" key="1">
                        <div style={{ height: (window.document.documentElement.clientHeight - 200) }}>
                        <Scrollbars>
                                {panels ?
                                    <Collapse activeKey={this.state.collapseKey} accordion onChange={this.changeCollapse.bind(this)}>
                                        {panels}
                                    </Collapse>
                                    : null}
                            </Scrollbars>
                            
                        </div>
                    </TabPane>
                    <TabPane tab="类别" key="2">
                        <div style={{ height: (window.document.documentElement.clientHeight - 200) }}>
                            <Scrollbars>
                                {panels ?
                                    <Collapse accordion onChange={this.changeCollapse.bind(this)}>
                                        {panels}
                                    </Collapse>
                                    : null}
                            </Scrollbars>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            {
                this.state.openRightBox
                    ?   <div className='right_box'>
                            <EqRight parent={this} data={this.state.rightBoxData}></EqRight>
                        </div>
                    :   null
            }
        </div>);
    }
}
export default Equipment;

/* eslint-enable */
