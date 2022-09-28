import React from 'react';
import { DatePicker, Tree, Icon, message, Modal, Table } from 'antd';
import moment from 'moment';
import Time from './time/time';
import './videoplay.scss';
const { RangePicker } = DatePicker
const { TreeNode } = Tree;
const dateFormat = 'YYYY-MM-DD HH:mm:ss' || undefined;
var that
/* eslint-disable */

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),//开始时间
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            treeData: [],
            lWidth: 20,
            editWidth: 80,
            showVideoCon: "none",
            szDeviceIdentify: '',
            szStartTime: '',
            szEndTime: '',
            HKlist: {
                szIP: '',
                iPort: '',
                szUserName: '',
                szPassword: '',
            },
            iChannelID: '',
            iWndIndex: 0,
            height: window.document.documentElement.clientHeight - 158,
            width: window.document.documentElement.clientWidth - 385,
            plsylist: [],
            isvideotable: false,
            nvrplayList: []
        }
        that = this
        this.WebVideoCtrl = window.WebVideoCtrl
    }
    componentDidMount() {
        this.getresrulist()
        this.init()
    }

    componentWillUnmount() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus();
        if (oWndInfo != null) {
            var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
            for (let i = 0, iLen = allWndInfo.length; i < iLen; i++) {
                WebVideoCtrl.I_Stop(allWndInfo[i].iIndex);
            }
            return false
        }
        this.clickLogout()
    }
    getresrulist() {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubLocationArea/getLocationAreaList?state=3&projectId=" + sessionStorage.getItem('projectId'),
            {
                method: 'POST',
            })
            .then(r => r.json())
            .then(b => {
                let data = b.data
                if (b.data && b.data.length > 0) {
                    this.setState({ treeData: data });
                }
            })
    }
    // 海康sdk开始
    init() {
        WebVideoCtrl.I_InitPlugin(this.state.width, this.state.height, {
            iWndowType: 1,
            iPackageType: 1,
            bWndFull: true,
            cbSelWnd: function (xmlDoc) {
                that.qiehuan(parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10))
            },
            success: function (xmlDoc) { },
            cbInitPluginComplete: function () {
                WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
            }
        });
    }
    qiehuan(iWndIndex) {
        if (this.state.iWndIndex != iWndIndex) {
            if (this.state.plsylist[iWndIndex] != undefined) {
                console.log(iWndIndex);
                let iChannelID = this.state.plsylist.find(o => o.iWndIndex == iWndIndex).iChannelID
                this.child.isvideo(this.state.plsylist[iWndIndex])
                this.setState({
                    iChannelID: iChannelID
                })
            } else {
                this.child.isvideoOne()
            }
            this.setState({
                iWndIndex: iWndIndex,
            })
        }
    }
    seticneelid(value) {
        if (!value.rLoginName) {
            message.error('设备未绑定硬盘录像机')
            return false
        }
        this.setState({
            iChannelID: value.iChannelID,
            HKlist: {
                szIP: value.rIp,
                iPort: value.rPort,
                szUserName: value.rLoginName,
                szPassword: value.rPassword,
            }
        }, () => {
            this.HKlogin()
        })

        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {// 已经在播放了，先停止
            message.warning('请先停止当前窗口的回放')
            return false
        }
        if (value.iChannelID == null) {
            this.setState({
                iChannelID: ''
            })
            message.warning('设备未绑定通道号')
            return false
        }
    }
    // 登录
    HKlogin() {
        const { HKlist } = this.state
        if ("" == HKlist.szIP || "" == HKlist.iPort) {
            return;
        }
        let szDeviceIdentify = HKlist.szIP + "_" + HKlist.iPort;
        this.setState({
            szDeviceIdentify: szDeviceIdentify
        })
        var iRet = WebVideoCtrl.I_Login(HKlist.szIP, 1, HKlist.iPort, HKlist.szUserName, HKlist.szPassword, {
            success: function (xmlDoc) { },
            error: function (status, xmlDoc) { }
        });
        if (-1 == iRet) {
            console.log(szDeviceIdentify + " 已登录过！");
        }
    }
  
    isplay(value) {
        this.setState({
            isanniu: true
        })
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {// 已经在播放了，先停止
            WebVideoCtrl.I_Stop({
                success: function () {
                    that.startPlayback(value);
                }
            });
        } else {
            that.startPlayback(value);
        }
    }
    // 开始回放
    startPlayback(value) {
        console.log(value,1);
        let szStartTime = moment(value.stateTime).format('YYYY-MM-DD HH:mm:ss')
        let szEndTime = moment(value.endTime).format('YYYY-MM-DD HH:mm:ss')
        if (!this.state.iChannelID) {
            message.warning('请选择需要回放的视频设备')
            return false
        }
        if (null == this.state.szDeviceIdentify) {
            return;
        }
        WebVideoCtrl.I_StartPlayback(this.state.szDeviceIdentify, {
            iWndIndex: this.state.iWndIndex,
            szStartTime, szEndTime,
            iChannelID: this.state.iChannelID,
            iPort: this.state.HKlist.iPort,
            iStreamType: 1,
            success: function () {
                that.playList(value)
            },
            error: function (status, xmlDoc) {
                console.log(status, xmlDoc);
                if (403 === status) {
                    console.log("设备不支持Websocket取流");
                } else {
                    console.log("开始回放失败！");
                }
            }
        });
    }
    playList(value) {
        const { plsylist } = this.state
        if ('' != plsylist) {
            if (plsylist[this.state.iWndIndex] != undefined && value.iWndIndex == plsylist[this.state.iWndIndex].iWndIndex) {
                this.setState(({ plsylist }) => ({
                    plsylist: plsylist.map((item, i) => value.iWndIndex === i ? {
                        stateTime: value.stateTime,
                        endTime: value.endtime,
                        showTime: value.showTime,
                        left: value.unit,
                        iWndIndex: this.state.iWndIndex,
                        iChannelID: this.state.iChannelID
                    } : item)
                }
                ))
                return
            }
        }
        plsylist.push({ stateTime: value.stateTime, endTime: value.endtime, showTime: value.showTime, left: value.unit, iWndIndex: this.state.iWndIndex, iChannelID: this.state.iChannelID });
        this.setState({ plsylist })
    }
    // 暂停
    clickPause() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {
            WebVideoCtrl.I_Pause({
                success: function () {
                    console.log('暂停成功');
                },
                error: function () {
                    console.log('暂停失败');
                }
            });
        }
    }
    // 恢复
    clickResume() {
        WebVideoCtrl.I_Resume({
            success: function (xml) {
                console.log('恢复成功');
            },
            error: function () {
                console.log('恢复失败');
            }
        });
    }
    // 快放
    clickPlayFast() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)

        if (oWndInfo != null) {
            WebVideoCtrl.I_PlayFast({
                success: function () {
                    console.log('1');
                },
                error: function () {
                    console.log('2');
                }
            });
        }
    }
  
    // 开启电子放大
    clickEnableEZoom() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {
            var iRet = WebVideoCtrl.I_EnableEZoom();
            if (0 == iRet) {
                console.log("启用电子放大成功！");
            } else {
                console.log("启用电子放大失败！");
            }
        }
    }
    // 禁用电子放大
    clickDisableEZoom() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)

        if (oWndInfo != null) {
            var iRet = WebVideoCtrl.I_DisableEZoom();
            if (0 == iRet) {
                console.log("禁用电子放大成功！");
            } else {
                console.log("禁用电子放大失败！");
            }
        }
    }
    // 抓图
    clickCapturePic() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)

        if (oWndInfo != null) {
            let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
            var szCaptureFileFormat = "0";
            if (xmlDoc != null) {
                szCaptureFileFormat = $(xmlDoc).find("CaptureFileFormat").eq(0).text();
            }

            var szChannelID = $("#channels").val();
            var szPicName = oWndInfo.szDeviceIdentify + "_" + szChannelID + "_" + new Date().getTime();

            szPicName += ("0" === szCaptureFileFormat) ? ".jpg" : ".bmp";

            WebVideoCtrl.I2_CapturePic(szPicName, {
                bDateDir: true  //是否生成日期文件
            }).then(function () {
                szInfo = "抓图成功！";
                showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
            }, function () {
                szInfo = "抓图失败！";
                showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
            });
        }
    }

    // 停止回放
    clickStopPlayback() {
        this.setState({ isanniu: false })
        const { plsylist } = this.state
        plsylist.splice(plsylist.findIndex(item => item.iWndIndex === this.state.iWndIndex + 1), 1)
        this.setState({ plsylist });
        that.child.isvideoOne()
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex);
        if (oWndInfo != null) {
            WebVideoCtrl.I_Stop({
                success: function () {
                    // that.child.stop()
                    console.log('停止回放成功');
                },
                error: function () {
                    console.log('停止回放失败');
                }
            });
        }
    }
    // 窗口分割
    changeWndNum(iType) {
        iType = parseInt(iType, 10);
        WebVideoCtrl.I_ChangeWndNum(iType);
    }
    // 全屏
    clickFullScreen() {
        WebVideoCtrl.I_FullScreen(true);
    }
    // 退出
    clickLogout() {
        const { szDeviceIdentify } = this.state
        if (null == szDeviceIdentify) {
            return;
        }
        var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify);
        if (0 == iRet) {
            console.log('退出成功！');
        } else {
            console.log('退出失败！');
        }
    }

    // 剪辑开始
    clickStartRecord() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {
            let szFileName = oWndInfo.szDeviceIdentify + "_" + this.state.iWndIndex + "_" + new Date().getTime();
            WebVideoCtrl.I_StartRecord(szFileName, {
                bDateDir: true, //是否生成日期文件
                success: function () {
                    console.log('1');
                },
                error: function () {
                    // if ('realplay' === szType) {
                    //     szInfo = "开始录像失败！";
                    // } else if ('playback' === szType) {
                    //     szInfo = "开始剪辑失败！";
                    // }
                    // showOPInfo(oWndInfo.szDeviceIdentify + " " + szInfo);
                }
            });
        }
    }

    // 剪辑结束
    clickStopRecord() {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {
            WebVideoCtrl.I_StopRecord({
                success: function () { },
                error: function () { }
            });
        }
    }
    // 海康sdk结束
    // 电子放大开关
    disabledDate(current) {
        let result = false;
        if (current >= moment().add(0, 'days')) {
            result = true;
        }
        return result;
    }
    oncheng(value, dateString) {
        let startTime = dateString[0]
        let endTime = dateString[1]
        this.setState({
            startTime: startTime,
            endTime: endTime
        })
    }
    timeGo(value) {
        that.isplay(value)
        this.setState({
            value:value
        })
    }
    stopAll() {
        this.setState({ isanniu: false })
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus();
        if (oWndInfo != null) {
            var allWndInfo = WebVideoCtrl.I_GetWindowStatus();
            for (let i = 0, iLen = allWndInfo.length; i < iLen; i++) {
                WebVideoCtrl.I_Stop(allWndInfo[i].iIndex);
            }
        }
    }
    jietu() {
        let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.state.iWndIndex)
        if (oWndInfo != null) {
            let xmlDoc = WebVideoCtrl.I_GetLocalCfg();
            var szCaptureFileFormat = "0";
            if (xmlDoc != null) {
                szCaptureFileFormat = $(xmlDoc).find("CaptureFileFormat").eq(0).text();
            }
            var szPicName = oWndInfo.szDeviceIdentify + "_" + this.state.iChannelID + "_" + new Date().getTime();
            szPicName += ("0" === szCaptureFileFormat) ? ".jpg" : ".bmp";
            WebVideoCtrl.I2_CapturePic(szPicName, {
                bDateDir: true  //是否生成日期文件
            }).then(function () {
                console.log('抓图成功！');
            }, function () {
                console.log('抓图失败！');
            });
        }

    }
    isDianzi() {
        this.setState({
            isfangda: !this.state.isfangda
        }, () => {
            if (this.state.isfangda) {
                this.clickEnableEZoom()
            } else {
                this.clickDisableEZoom()
            }
        })
    }
    isjianji() {
        this.setState({
            isjianji: !this.state.isjianji
        }, () => {
            if (this.state.isjianji) {
                this.clickStartRecord()
            } else {
                this.clickStopRecord()
            }
        })
    }
    handleCancel() { this.setState({ isvideotable: false }) }
    isliebiao() {
        this.clickRecordSearch()
        this.setState({ isvideotable: true })
    }
    // 获取列表
    clickRecordSearch() {
        WebVideoCtrl.I_RecordSearch(this.state.szDeviceIdentify, this.state.iChannelID, this.state.startTime, this.state.endTime, {
            iStreamType: 1,
            iSearchPos: 0 * 40,
            success: function (xmlDoc) {
                if ("OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
                    var iLength = $(xmlDoc).find("searchMatchItem").length;
                    let list = []
                    for (var i = 0; i < iLength; i++) {
                        var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
                        var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
                        var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
                        var name = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="))
                        list.push({
                            starttime: moment(szStartTime).format('YYYY-MM-DD  HH:mm:ss'),
                            endTime: moment(szEndTime).format('YYYY-MM-DD  HH:mm:ss'),
                            url: szPlaybackURI,
                            name: name

                        })
                    }
                    that.setState({
                        nvrplayList: list
                    })
                    console.log('搜索录像文件成功！', list);
                } else if ("NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
                    console.log(' 没有录像文件！');

                }
            },
            error: function (status, xmlDoc) {
                console.log(status, xmlDoc);
            }
        });
    }
    // 下载录像
    clickStartDownloadRecord(i) {
        var g_iDownloadID = -1;
        let szPlaybackURI = i.url
        let szFileName = i.name
        g_iDownloadID = WebVideoCtrl.I_StartDownloadRecord(this.state.szDeviceIdentify, szPlaybackURI, szFileName, {
            bDateDir: true  //是否生成日期文件
        });
        if (g_iDownloadID < 0) {
            var iErrorValue = WebVideoCtrl.I_GetLastError();
            if (34 == iErrorValue) {
                console.log(' 已下载！');
            } else if (33 == iErrorValue) {
                console.log('  空间不足！');
            } else {
                console.log('  下载失败！');
            }
        } else {

        }
    }
    // 快进
    kuaijin() {
        let value = this.state.value
        let startTime = value.stateTime + (1000 * 15)
        if(value){
            value.stateTime= startTime 
        }
        this.setState({
            value:value
        })
        that.isplay(value)
        // this.child.iskuaijin(value)
    }

    // 快退
    kuaitui() {
        let value = this.state.value
        let startTime = value.stateTime - (1000 * 15)
        if(value){
            value.stateTime= startTime 
        }
        this.setState({
            value:value
        })
        that.isplay(value)
    }
    render() {
        const { startTime, endTime, lWidth, editWidth } = this.state
        const loop = (node) => {
            let res = [];
            node.forEach((v, k) => {
                let obj = JSON.parse(JSON.stringify(v, k));
                delete obj.children;
                if (v.children != null) {
                    res.push(<TreeNode icon={<Icon type="bars" />} title={<span >{v.name}</span>} key={v.id + k}>
                        {loop(v.children)}
                    </TreeNode>)
                } else {
                    res.push(<TreeNode icon={<Icon type="video-camera" />} title={<span onClick={this.seticneelid.bind(this, v)} data-obj={JSON.stringify(obj)} >{v.name}</span>} key={v.id + k} />);
                }
            });
            return res;
        };
        const createTree = (treeData) => {
            return <Tree showIcon>{loop(treeData)}
            </Tree>;
        };
        const temp_videoScreen = () => {
            let con = [];
            for (let i = 1; i < 5; i++) {
                let img = require('./img/videoIcon/temp_video' + i + '.png').default;
                con.push(<div className="videoChangScreen pointer" key={img + i}
                    onClick={() => {
                        let num = 1;
                        if (i == 1) { num = 1 }
                        if (i == 2) { num = 2 }
                        if (i == 3) { num = 3 }
                        if (i == 4) { num = 4 }
                        this.setState({ screenSize: num, showVideoCon: 'none' }, () => {
                            this.changeWndNum(num)
                        });
                    }}><img src={img} /></div>);
            }
            return con;
        };
        const mainBtn = () => {
            return <div className="mainBtncopy r_flex jc_sb" style={{ width: `calc(${this.state.editWidth}% - 50px) ` }}>
                <div className="r_flex">
                </div>
                <div className=' videotime' >
                    {this.state.isanniu ? <>
                        <div className={this.state.isjianji ? 'jianjiactive' : 'jianji'} title='裁剪' onClick={this.isjianji.bind(this)}></div>
                        <div className='jietu' title='截图' onClick={this.jietu.bind(this)}></div>
                        <div className={this.state.isfangda ? 'fangdaactive' : 'dianzifangda'} title='电子放大' onClick={this.isDianzi.bind(this)}></div></>
                        : <>
                            <div className='jianji' style={{ opacity: '0.4' }} ></div>
                            <div className='jietu' style={{ opacity: '0.4' }} ></div>
                            <div className='dianzifangda' style={{ opacity: '0.4' }} ></div>
                        </>
                    }
                    <div className='' title='停止' onClick={this.kuaitui.bind(this)}>快退</div>
                    <RangePicker
                        onChange={this.oncheng.bind(this)}
                        value={this.state.startTime === undefined || this.state.endTime === undefined || this.state.startTime === "" || this.state.endTime === "" ? null : [moment(this.state.startTime, dateFormat), moment(this.state.endTime, dateFormat)]}
                        showTime={{
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                        }}
                        format={dateFormat}
                        placeholder={['开始时间', '结束时间']}
                    />
                    <div className='' title='停止' onClick={this.kuaijin.bind(this)}>快进</div>
                    <div className='stop' title='停止' onClick={this.clickStopPlayback.bind(this)}></div>
                    <div className='stopall' titie='暂停所有窗口' onClick={this.stopAll.bind(this)}></div>
                    <div className='kuaijin' titie='快放' onClick={this.clickPlayFast.bind(this)}></div>
                    <div className='kuaijin' titie='liebia' onClick={this.isliebiao.bind(this)}></div>
                </div>

                <div className="r_flex">
                    <div className="r_flex margin_lr15 as_c pointer" onClick={() => {
                        this.setState({ showVideoCon: this.state.showVideoCon === 'none' ? 'block' : 'none' });
                    }}>
                        <div className="splitIcon mainBtnSize"></div>
                        <div className="downArrowIcon as_c"></div>
                    </div>
                    <div title="自适应" className="autoIcon as_c margin_r15 pointer mainBtnSize"
                        onClick={() => {
                            this.clickFullScreen();
                        }}></div>
                </div>
                <div className="videoFlex c_flex" style={{ display: this.state.showVideoCon }}>
                    <div className="r_flex fw_w jc_sb" style={{ width: '100%', lineHeight: 'normal' }}>
                        {temp_videoScreen()}
                    </div>
                </div>
            </div>
        };
        const data = this.state.nvrplayList.map((item, i) => {
            item.key = "item" + i;
            return item;
        });
        const columns = [
            {
                title: '文件名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '开始时间',
                dataIndex: 'starttime',
                key: 'starttime'
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime'
            },
            {
                title: '操作',
                dataIndex: 'url',
                width: '200px',
                key: 'opertion',
                render: (text, obj) => (
                    <div> <span className="action_btn01" onClick={this.clickStartDownloadRecord.bind(this, obj)}>下载</span>

                    </div>)
            }
        ]
        return (<div className="r_flex contain">
            <div style={{ width: `calc(100% - 59px)`, display: 'flex', flexDirection: 'row', overflowY: 'scroll', }}>
                <div style={{
                    width: `${lWidth}%`,
                    height: `calc(100vh - 64px)`,
                    overflow: 'hidden',
                    display: `${lWidth == 0 ? 'none' : 'block'}`,
                    overflowY: 'auto',
                    background: '#fff'
                }}>
                    <div className="videotitle">视频回放</div>
                    {createTree(this.state.treeData)}
                </div>
                <div className="demo-blend" style={{ width: `${editWidth}%` }}>
                    <div className="videowrap" >
                        <div id="divPlugin" style={{ width: this.state.width, height: this.state.height }}></div>
                        <Time className='time' startTime={startTime} endTime={endTime} iWndIndex={this.state.iWndIndex} parent={this} onRef={ref => this.child = ref} />
                    </div>
                    {mainBtn()}
                </div>
            </div>
            <Modal
                width={800}
                title='列表'
                visible={this.state.isvideotable}
                onCancel={this.handleCancel.bind(this)}
                footer={[]}
            >
                <Table dataSource={data} columns={columns} pagination={false} bordered />
            </Modal>
        </div>
        );
    }
}
/* eslint-disable */