// 历史定位
import '../location.scss'
import '../alert.scss'
import { Input, Icon, DatePicker, Pagination } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment';
import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: '',
            tabSelected: "area",
            areaList: [],
            name: "",
            isMh: false,
            resultList: [],
            searchList: [],
            id: "",
            type: "",
            searchPrompt: true,
            searchResult: false,
            orgList: [],
            datetime: moment(this.props.time),
            isShow: false,
            list: '',
            pageNo: 1,
            pageSize: 10,
            totalCount: 0,
        };
    }
    // 加载时请求
    componentDidMount() {
        this.getAreaSearchDetails();  //  参建单位
        this.getOrgData();
    }
    //  选择组件
    tabHander(type) {
        this.setState({ tabSelected: type });
    }
    // 点击搜索图标 搜索
    searchFun() {
        this.getSearchDetails(this.state.name, this.state.datetime);
    }
    // 清空搜索框
    clearSearchInput() {
        this.setState({ name: "", isMh: false, type: "", id: "", searchPrompt: true, searchResult: false, resultList: [] })
    }
    // 历史定位 搜索框
    getSearch(name) {
        if (!name) {
            name = '';
        }
        fetch(window.SYSTEM_CONFIG_PPMS+'/public/ppms/personoverall/getPersonOverAll?searchItems=[{"key":"name","value":"' + name + '"}]')
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    this.setState({ searchList: b.data });
                }
            })
    }
    getSearchDetails(name, datatime) {
        let datatime1 = moment(datatime).valueOf()
        let pageNo = this.state.pageNo
        var param = [
            {
                key: 'name',
                value: name
            },
            {
                key: 'start_time',
                value: datatime1
            },
            {
                key: 'perids',
                value: ''
            }];
        // if (name) {

        // } else {
        //     let mh = false;
        //     let searchPrompt = true;
        //     let searchResult = false
        //     if (name) {
        //         mh = true;
        //         searchPrompt = false;
        //         searchResult = true;
        //     }
        //     this.setState({ isMh: mh, searchPrompt, searchResult })
        // }
        let list = JSON.stringify(param)
        fetch(window.SYSTEM_CONFIG_PPMS+'/public/personPosition/historyPosition?pageNo='+ pageNo+'&pageSize=10&searchItems=' + list + '&_=1614151820502')
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    this.setState({
                        resultList: b.data || [],
                        pageNo: Number(b.pageNo),
                        totalCount: Number(b.totalCount),
                    });
                }
            })
    }

    // 定位区域
    getAreaSearchDetails() {
        fetch(window.SYSTEM_CONFIG_PPMS+'/public/personPosition/newPersonInfo')
            .then(r => r.json())
            .then(b => {
                if (b) {
                    let key = Object.keys(b)
                    let data = key.map(item => {
                        let valueArr = b[item].map(n => {
                            return {
                                location_area_name: n.area_name,
                                location_area_id: n.area_id
                            }
                        })
                        let obj = {
                            location_area_name: item,
                            children: [...valueArr]
                        }
                        return obj
                    })
                    this.setState({ areaList: data });
                }
            })
    }

    // 参建单位
    getOrgData() {
        fetch(window.SYSTEM_CONFIG_PPMS+'/public/personPosition/personInfoCom')
            .then(r => r.json())
            .then(b => {
                if (b.data) {

                    this.setState({ orgList: b.data });
                }
            })
    }

    changeSearchInput(e) {
        let isMh = false;
        let searchPrompt = true;
        let searchResult = false;
        if (e.target.value.trim() != "") {
            isMh = true;
            searchPrompt = false;
            searchResult = false;
        }
        this.setState({
            name: e.target.value,
            isMh: isMh,
            type: "",
            id: "",
            resultList: [],
            searchList: [],
            searchPrompt,
            searchResult
        });
        this.getSearch(e.target.value);
    }

    clickMhItemHander(name, datatime) {
        this.getSearchDetails(name, datatime)
        this.setState({ name: name, isMh: false, searchPrompt: false, searchResult: true });
    }
  

    closeBox() {
        this.setState({
            isShow: false
        })
    }

    onChange(value) {
        this.setState({
            datetime: moment(value)
        })
    }

    // 详情
    details(item) {
        this.setState({
            isShow: true,
            list: item
        })
    }
    // 分页
    pageOnChange(page) {
        this.setState({
            pageNo: page
        })
        this.getSearchDetails(this.state.name, this.state.datetime, page, this.state.pageSize);
    }

    render() {
        // 区域
        let resultfun = (list = this.state.areaList, level = 1) => {
            return list.map(item => {
                let reval = <div onClick={this.clickMhItemHander.bind(this, item.location_area_name, this.state.datetime)}
                    className={"level" + level} key={item.location_area_id}>{item.location_area_name}</div>;
                let relist = [];
                if (item.children) {
                    relist = resultfun(item.children, level + 1);
                }
                relist.unshift(reval);
                return relist;
            });
        }
        // 搜索内容展示
        let mhItems = this.state.searchList.map((item, i) => {
            return <div key={"mhItems" + item.id} onClick={this.clickMhItemHander.bind(this, item.name, this.state.datetime)}
                className="mhItem">
                <div className="mh-ico">{item.categoriesicon && item.categoriesicon != "no" ?
                    <img src={item.categoriesicon} /> : null}</div>
                <div className="name" title={item.name}>{item.name}</div>
            </div>;
        })

        // 搜索后人员信息
        let resultItems = this.state.resultList.length > 0 ? this.state.resultList.map((item, i) => {
            item.index = (i + 1);
            return <div className='hist' >
                <div className='information'>{item.index}.{item.person_name}
                    <span className='inforight'>{item.company_name}</span>
                </div>
                <div className='liebiao'>
                    <div onClick={this.heandtrajectory.bind(this, item.person_name, item.position_time, item.person_id)} className='trajectory' >
                        <div className='guiji'></div><div>轨迹</div>
                    </div>
                    <div onClick={this.details.bind(this, item)} className='details'>
                        <div className='xiangqing'></div><div>详情</div>
                    </div>
                </div>
            </div>
        }) : null ;

        let orgItems = this.state.orgList.map(item => {
            return <div key={item.com_id}
                onClick={this.clickMhItemHander.bind(this, item.company_name, this.state.datetime)}
                className="level1 nobold">{item.company_name}</div>;
        })

        let searchInputButtons = <div>
            <Icon type="close-circle-o" onClick={this.clearSearchInput.bind(this)} />
            <span className="jg">︱</span>
            <Icon type="search" onClick={this.searchFun.bind(this, this.state.name)} />
        </div>

        return (
            <div className="searchInfo">
                <div className="title">搜索</div>
                <div className="searchDiv">
                    <Input className="searchInput" value={this.state.name} onChange={this.changeSearchInput.bind(this)}
                        addonAfter={searchInputButtons} placeholder="历史定位" />
                </div>
                <div className='time'>定位时间：
                            <DatePicker
                        locale={locale}
                        showTime
                        className="dataPicker"
                        defaultValue={this.state.datetime}
                        onChange={this.onChange.bind(this)}
                        onOk={this.clickMhItemHander.bind(this, this.state.name, this.state.datetime)}
                        format="YYYY-MM-DD  HH:mm:ss"
                        placeholder="开始时间"
                    />
                </div>
                <div className="mhss" style={{
                    height: (window.document.documentElement.clientHeight - 170),
                    display: this.state.isMh ? "block" : "none"
                }}>
                    {mhItems}
                </div>
                {this.state.searchPrompt ?
                    <div className="searchPrompt">
                        <div className="tabs" style={{ display: "block" }}>
                            <div className="tabs-title">
                                <div className={this.state.tabSelected == "area" ? "active" : ""}
                                    onClick={this.tabHander.bind(this, "area")}>定位区域 </div>
                                <div className={this.state.tabSelected == "org" ? "active" : ""}
                                    onClick={this.tabHander.bind(this, "org")}>参建单位 </div>
                            </div>
                            {this.state.tabSelected == "area" ?
                                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                                    <div className="item">
                                        {resultfun()}
                                    </div>
                                </div>
                                : null}
                            {this.state.tabSelected == "org" ?
                                <div className="tabs-content" style={{ height: (window.document.documentElement.clientHeight - 223) }}>
                                    <div className="item">
                                        {orgItems}
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                    : null}
                {this.state.searchResult ?
                    <div className="searchResult" style={{ display: "block" }}>
                        <Scrollbars style={{ height: (window.document.documentElement.clientHeight - 170) }}>
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
                    : null}

                {/* 详情弹窗 */}
                <div className="alterwrap"  style={{
                        display: this.state.isShow ? 'block' : 'none',
                        bottom:'auto'
                    }}>
                    <div className="alarm" style={{lineHeight: 2,position:'static'}}>
                        <div className="contentbox" style={{position:'static'}}>
                            <div className="closebtn">
                                <div className='namexinxi'>人员信息</div>
                                <div className="closeicon" onClick={this.closeBox.bind(this)}></div>
                            </div>
                            <div className="contenttext">
                                <div className="texttitle">
                                    <span className="text">姓名：</span><span className="text">{this.state.list.person_name}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">手机：</span><span className="text">{this.state.list.mobile}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">出生日期：</span><span className="text">{this.state.list.birthday}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">身份证号：</span><span className="text">{this.state.list.idcard}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">公司：</span><span className="text">{this.state.list.company_name}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">职务：</span><span className="text">{this.state.list.post}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">工种：</span><span className="text">{this.state.list.work_type_name}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">工号：</span><span className="text">{this.state.list.person_equipment_no}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">设备编号：</span><span className="text">{this.state.list.equipment_id}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">区域：</span><span className="text">{this.state.list.post}</span>
                                </div>
                                <div className="texttitle">
                                    <span className="text">定位时间：</span><span className="text">{this.state.list.position_time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main;

/* eslint-enable */