import {  Input, Pagination } from 'antd';
import Icon from '@ant-design/icons';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: "area",
            historyList: [],
            areaList: [],
            searchList: [],
            name: "",
            isMh: false,
            resultList: [],
            id: "",
            parentId: "",
            list: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
            isMh: false
        };
    }
    componentDidMount() {
        this.getHistory();
        this.getAreaSearchDetails()

    }
    tabHander(type) {
        this.setState({ tabSelected: type });
    }
    getAreaSearch(locationAreaName) {
        if (!locationAreaName) {
            locationAreaName = "";
        }
        fetch(window.SYSTEM_CONFIG_BASICS+"/pubLocationArea/listQuery", {
            method: "post",
            body: JSON.stringify({ locationAreaName })
        })
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    this.setState({ searchList: b.data || [], resultList: [] });
                }
            })
    }
    getAreaSearchDetails(name) {
        var params = { pageNo: this.state.pageNo, pageSize: this.state.pageSize, locationAreaName: name }
        fetch(window.SYSTEM_CONFIG_BASICS+"/pubLocationArea/pageQuery", {
            method: "post",
            body: JSON.stringify(params)
        })
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    this.setState({
                        resultList: b.data.list || [],
                        totalCount: Number(b.data.totalCount)
                    });
                }
            })
    }
    // 历史记录搜索
    getHistory() {
        let loginName = window.sessionStorage.getItem("loginName")
        fetch("/nelda-smcc/pubUserSearchHistory/list", {
            method: "post",
            body: JSON.stringify({
                loginName: loginName,
                searchPath: 'quyu',
            })
        })
            .then(r => r.json())
            .then(b => {
                let list = b.data.slice(0, 5)
                this.setState({ historyList: list });
            })
    }
    searchFun(e) {
        this.storage(e)
        this.getAreaSearchDetails()
    }
    changeSearchInput(e) {
        let isMh = false;
        if (e.target.value.trim() !== "") {
            isMh = true;
        }
        this.setState({ name: e.target.value, isMh: isMh, id: "", parentId: "", });
        this.getAreaSearch(e.target.value);
    }
    clearSearchInput() {
        this.setState({ name: "", isMh: false, id: "", parentId: "", })
        this.getAreaSearchDetails();
    }
    storage(e) {
        let loginName = window.sessionStorage.getItem("loginName")
        fetch("/nelda-smcc/pubUserSearchHistory/insert", {
            method: "post",
            body: JSON.stringify({
                loginName: loginName,
                searchPath: 'xiangmu',
                searchValue: e
            })
        })
            .then(r => r.json())
            .then(b => {
                this.getHistory();
            })
    }
    clickMhItemHander(name) {
        this.storage(name)
        this.setState({ name: name, isMh: false, pageNo: 1 }, () => {
            this.getAreaSearchDetails(name);
        });
    }
    clickMhItemHanderS(name) {
        let isMh = false;
        if (name.trim() !== "") {
            isMh = true;
        }
        this.setState({ name: name, isMh: isMh, id: "", parentId: "" });
        this.getAreaSearch(name);
    }
    details(item, e) {
        window.open(
            "http://192.168.3.247:9302/daping/daping.html?parkName=" + item.locationAreaName + "&locationAreaId=" + item.id + '&token=' + sessionStorage.getItem('token')
        );
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.pageNo != this.state.pageNo) {
    //         this.getAreaSearchDetails()
    //     }
    // }
    // 分页
    pageOnChange(page) {
        this.setState({
            pageNo: page
        })
    }

    render() {
        // 历史搜索
        let historyDivs = this.state.historyList.map((item, i) => {
            return <div className="historyDivstyle" onClick={this.clickMhItemHanderS.bind(this, item.searchValue, item.id)} key={"historyDiv" + i}>{item.searchValue}</div>;
        })
        let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
            item.index = (this.state.pageNo - 1) * this.state.pageSize + 1 + i;
            return <div className='hist' key={item.id} >
                <div className='information'>{item.index}.{item.locationAreaName}
                    {/* <span className='inforight'>{item.company_name}</span> */}
                </div>
                <div className='liebiao'>
                    <div onClick={e => this.details(item, e)} className='details'>
                        <div className='xiangqing'></div><div>详情</div>
                    </div>
                </div>
            </div>
        }) : null;
        // 搜索显示结果
        let mhItems = this.state.searchList.map((item, i) => {
            return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.locationAreaName, item.id)}
                className="mhItem">
                <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
                    <img src={item.categoriesicon} /> : null}</div>
                <div className="name" title={item.locationAreaName}>{item.locationAreaName}</div>
            </div>;
        })
        let searchInputButtons = <div>
            <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
            <span className="jg">︱</span>
            <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
        </div>
        return (
            <div className="searchInfo areaInfo">
                <div className="title">人员车辆预警</div>
                <div className="searchDiv">
                    <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)} addonAfter={searchInputButtons} onPressEnter={this.searchFun.bind(this)} placeholder="人员车辆搜索" />
                </div>
                <div className="mhss" style={{
                    height: (window.document.documentElement.clientHeight - 170),
                    display: this.state.isMh ? "block" : "none"
                }}>
                    {mhItems}
                </div>

                <div className="searchPrompt">
                    <div className='searchPromptone'>
                        <div className='historyleft'>历史搜索：</div>
                        <div className="history">{historyDivs}</div>
                    </div>
                    <div className="tabs" >
                        <div className="tabs-title">
                            <div className={this.state.tabSelected === "area" ? "active" : ""} onClick={this.tabHander.bind(this, "area")}>人员车辆 {this.state.tabSelected === "area" ? <Icon type="caret-up" /> : <Icon type="caret-down" />}</div>
                        </div>
                    </div>
                </div>
                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                    <div className="item">
                        <div className="searchResult" style={{ display: "block" }}>
                            <Scrollbars style={{ height: (window.document.documentElement.clientHeight - 250) }}>
                                {resultItems}
                                {this.state.resultList.length != 0 ?
                                    <div className='page-wrap' style={{ textAlign: 'center' }}>
                                        <Pagination
                                            size="small"
                                            pageSize={this.state.pageSize}
                                            current={this.state.pageNo}
                                            onChange={this.pageOnChange.bind(this)}
                                            total={this.state.totalCount}
                                        />
                                    </div> : null}
                            </Scrollbars>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default Main;
