import React from 'react';
import { DatePicker, Tree, message, Modal, Table } from 'antd';
import Icon from '@ant-design/icons';
import moment from 'moment';
import Time from './time/time';
import './videoplay.scss';
import './cvr.css'
const { RangePicker } = DatePicker
const { TreeNode } = Tree;
const dateFormat = 'YYYY-MM-DD HH:mm:ss' || undefined;
var that
let ws;

/* eslint-disable */

export default class CVR extends React.Component {
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
        this.Wfs = window.Wfs
    }
    componentDidMount() {
        this.getresrulist()
        this.incave()
    }
    incave() {
        if (Wfs&&Wfs.isSupported()) {
            var video1 = document.getElementById("video");
            Wfs = new Wfs();
            Wfs.attachMedia(video1,'ch1','H264Raw', 'ws://192.168.1.112:5005/wstest/192.168.1.201_1',);
        }
    }

    componentWillUnmount() {

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

    seticneelid(value) {
        if (!value.rLoginName) {
            message.error('设备未绑定硬盘录像机')
            return false
        }
        let params = 'deviceIP=' + value.rIp + "&devicePort=" + value.rPort + '&deviceUsername=' + value.rLoginName + "&devicePassword=" + value.rPassword + "&deviceChannel=" + value.iChannelID + '&beginTime=1665213705927&endTime=1665223730927'

        fetch(window.ISCVR + "/playBackByTime?" + params,
            {
                method: 'POST',
            })
            .then(r => r.json())
            .then(b => {
                console.log(b);
            })



        // ws = new WebSocket(`ws://192.168.1.112:5005/wstest/192.168.1.201_1_1665540010282`);

        // ws.onopen = () => {
        //     console.log("Socket 已打开");
        // };
        // ws.onoffline = () => {
        //     message.error("网络已断开,请检查网络");
        // };
        // ws.ononline = () => {
        //     if (sessionStorage.getItem("detectionTimesId")) {
        //         message.success("网络已恢复");
        //     }
        // };
        // ws.onclose = function () {
        //     console.log("Socket已关闭");
        // };
        // ws.onmessage = (msg) => {
        //     console.log(msg.data.toString());
        // }


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
            value: value
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
                    <RangePicker
                        onChange={this.oncheng.bind(this)}
                        value={this.state.startTime === undefined || this.state.endTime === undefined || this.state.startTime === "" || this.state.endTime === "" ? null : [moment(this.state.startTime, dateFormat), moment(this.state.endTime, dateFormat)]}
                        showTime={{
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                        }}
                        format={dateFormat}
                        placeholder={['开始时间', '结束时间']}
                    />
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
                        <div className="wfsjs" style={{ width: this.state.width, height: this.state.height }}>
                            <video id="video" className='video1'  style={{ width: this.state.width, height: this.state.height, objectFit: "fill", background: 'black' }} ></video>
                            <div className="ratio"></div>
                        </div>

                        {/* <div id="divPlugin" style={{ width: this.state.width, height: this.state.height }}></div> */}
                        <Time className='time' startTime={startTime} endTime={endTime} iWndIndex={this.state.iWndIndex} parent={this} onRef={ref => this.child = ref} />
                    </div>
                    {mainBtn()}
                </div>
            </div>

        </div>
        );
    }
}
/* eslint-disable */