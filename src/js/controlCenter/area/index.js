import React from 'react';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import History from '../components/history';
import './index.scss';
const { TreeNode } = Tree;

class AreaInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: [],
            areaList: [],
            name: "",
            isMh: false,
            id: "",
            parentId: "",
            loginName: sessionStorage.getItem("loginName"),
            isSearch: true
        };
    }
    componentDidMount() {
        this.history.getHistory('quyu', this.state.loginName);
        this.getAreaSearchDetails();
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
    storage(e) {
        let loginName = window.sessionStorage.getItem("loginName")
        fetch("/nelda-smcc/pubUserSearchHistory/insert", {
            method: "post",
            body: JSON.stringify({
                loginName: loginName,
                searchPath: 'quyu',
                searchValue: e
            })
        })
            .then(r => r.json())
            .then(b => {
                this.history.getHistory('quyu', this.state.loginName);
            })
    }
    searchFun(e) {
        this.storage(e)
        this.getAreaSearchDetails(this.state.id, this.state.parentId);
    }
    changeSearchInput(e) {
        let isSearch = false;
        if (e.target.value.trim() !== "") {
            isSearch = false;
        }
        this.setState({ name: e.target.value, isSearch: isSearch, id: "", parentId: "" });
        this.getAreaSearch(e.target.value);
    }
    clearSearchInput() {
        this.setState({ name: "", isSearch: true, id: "", parentId: "" })
        this.getAreaSearchDetails("", "");
    }
    clickMhItemHander(id, parentId, name, item) {
        this.setState({ name: name, isSearch: false, id, parentId });
        this.getAreaSearchDetails(id, parentId);
        this.storage(name);
        // if (window.PushData) {
        //     window.PushData && window.PushData("LonLatToGis" + "@" + JSON.stringify({ id: item.location_area_id, map_json: item.map_json || '' }));
        // } else {
        //     window.GisMap.LonLatToGis(JSON.stringify({ id: item.location_area_id, map_json: item.map_json || '' }));
        // }
    }
    clickMhItemHanderS(name, id) {
        let isSearch = false;
        if (name.trim() !== "") {
            isSearch = true;
        }
        this.setState({ name: name, isSearch: true, id: "", parentId: "", });
        this.getAreaSearch(name);
    }
    renderTreeNodes(data) {
        return data.map((item, i) => {
            if (item.children) {
                return (
                    <TreeNode title={<span onClick={this.clickMhItemHander.bind(this, item.location_area_id, item.parent_id, item.location_area_name, item)} >{item.location_area_name}</span>} key={item.location_area_id + i} >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={<span onClick={this.clickMhItemHander.bind(this, item.location_area_id, item.parent_id, item.location_area_name, item)} >{item.location_area_name}</span>} key={item.location_area_id + i} />;
        });
    }
    render() {
        const { isSearch } = this.state
        let mhItems = this.state.areaList && this.state.areaList.map((item, i) => {
            return <div key={item.location_area_id}
                onClick={this.clickMhItemHander.bind(this, item.location_area_id, item.parent_id, item.location_area_name)}
                className="mhItem">
                <div className="mh-area"></div>
                <div className="name">{item.location_area_name}</div>
            </div>;
        })
        let searchInputButtons = <div>
            <CloseCircleOutlined onClick={this.clearSearchInput.bind(this)} />
            <span className="jg">︱</span>
            <SearchOutlined onClick={this.searchFun.bind(this, this.state.name)} />
        </div>

        return (
            <div className="area_Info">
                <div className="area_title">施工区域</div>
                <div className="area_input">
                    <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)} addonAfter={searchInputButtons} onPressEnter={this.searchFun.bind(this)} placeholder="区域" />
                </div>
                {isSearch ? <div >
                    <History onRef={ref => this.history = ref} onHistory={(a, b) => { this.clickMhItemHanderS(a, b) }} />
                    <div className="area_table">
                        <div className='area_table_title'>区域</div>
                        <div className="areat_table_List" >
                            {this.state.resultList.length > 0 ? <Tree defaultExpandAll={true} showIcon>{this.renderTreeNodes(this.state.resultList)}</Tree> : ''}
                        </div>
                    </div>
                </div> : <div className="areat_mhss" >
                    {mhItems}
                </div>}
            </div>
        );
    }
}
export default AreaInfo;
