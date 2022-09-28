/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { Carousel, Input, Form, message, Icon, Modal } from 'antd';
import { actionCreators } from './store'
import { connect } from "react-redux";
import VideoPlayer from '../videoplayback/VideoPlayer';
import Style from './alarmAlter.module.scss';
import 'video.js/dist/video-js.min.css';
import './css/alter.css'
const { TextArea } = Input;
class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: '',
            isplayvideo: false,
            isShow: true,
            isFadz: true,
            result: '',
            alterData: {},
            isImgWrap: false,
            imgUrl: '',
            ddldList: [],
            ljclType: true,
            isdate: false,
            actionList: [],
        }
    }

    componentDidMount() {
        this.getAlterData(this.props.alterId)
        if (!this.props.isAoTuAlter) {
            if (this.props.info == 1) {
                // window.MapContainer.changeWidth(document.getElementById("unityPlayer").childNodes[0].width - 330);
            }
        }
    }


    getAlterData(id) {
        if (id != 0 && !id) {
            return true
        }
        fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmInfoDetailsById?id=" + id, {
            method: "GET",
        }).then(r => r.json())
            .then(b => {
                if (b.code == "0") {
                    this.setState({ alterData: b.data })
                    let data = b.data
                    let param = {
                        X: data.x_coordinate,
                        Y: data.y_coordinate,
                        Z: data.z_coordinate,
                        alarmLevelIcon: data.alarmLevelIcon
                    }      
                    if (window.PushData) {
                        window.PushData("PoliceCall" + "@" + JSON.stringify(param));
                    } else {
                        window.GisMap.PoliceCall((param));
                    }

                } else {
                    message.error(b.msg)
                }
            })
    }

    closeBox() {
        this.setState({ isShow: false })
        this.props.pfn(false)
        this.props.changeInfo(0)
        document.getElementById('centerVideoCon').style.width = 'calc(100% - 382px)';
        document.getElementById('centerVideoCon').style.right = '0';
    }

    onChange(e) {
        this.setState({ result: e.target.value })
    }
    okBtn(id, e) {
        e.stopPropagation();
        if (!this.state.result.trim()) {
            message.error('处理过程不能为空')
        } else {
            fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/releaseWarnStatus", {
                method: "POST",
                body: JSON.stringify({
                    id,
                    result: this.state.result.trim()
                })
            }).then(r => r.json())
                .then(b => {
                    if (b.code == "0") {
                        message.success("解除成功！");
                        this.props.parent.jcbj()
                        this.closeBox()
                    } else {
                        message.error('解除失败!')
                    }
                })
        }
    }
    noBtn(id, e) {
        e.stopPropagation();
        this.props.parent.bclHander(id)
        this.closeBox()
    }
    openVideo(video) {
        const w = window.open('about:blank');
        w.location.href = 'video.html?video=' + video
    }
    noVideo() {
        message.error('暂无视频!')
    }

    hfBtn(SourceEquipmentId, HValue, e) {
        e.stopPropagation();
        const { isplayvideo, alterData } = this.state;
        if (alterData.Video) {
            this.toggleChose(true, alterData.Video)
        }
    }
    jianKHander(e) {
        let data = JSON.stringify({
            cameraId: this.state.alterData.EquipmentId,
            ip: this.state.alterData.equipmentIp,
            loginname: this.state.alterData.equipmentLoginName,
            password: this.state.alterData.equipmentPassword,
            port: this.state.alterData.equipmentPort,
            serial: this.state.alterData.channelNum,
            code: this.state.alterData.equimentCode
        })
        window.controlVideoCon && window.controlVideoCon(data)
    }
    
    ddldHander(e) {
        e.stopPropagation();
        fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/planList?alarmId=" + this.state.alterData.Id)
            .then(r => r.json())
            .then(b => {
                if (b.data.list && b.data.list.length != 0) {
                    let data = b.data.list
                    let actionListA = []
                    data.map(item => {
                        actionListA.push({
                            actionList: item.actionList
                        })
                    })
                    this.setState({
                        actionList: data
                    })
                    this.setState({ ddldList: b.data.list, ljclType: !this.state.ljclType });
                } else {
                    message.error("未设置对应的多点联动方案！", 3);
                }
            })
        // this.liebiao()
    }

    showFaItem(list) {
        this.setState({ isFadz: true });
    }

    hideFaItem(e) {
        e.stopPropagation();
        this.setState({ isFadz: true });
    }

    yjtz(e) {
        e.stopPropagation();
        fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/sendNoticeMsgByOnly?id=" + this.state.alterData.Id)
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    message.success('通知成功')
                    // this.closeBox()
                } else {
                    message.error('通知失败')
                }
            })
    }

    openImg(url) {
        this.setState({
            isImgWrap: true,
            imgUrl: url
        })
    }

    closeImg() {
        this.setState({
            isImgWrap: false,
        })
    }

    handerDoor(type, id) {
        const data = {
            doorUuid: id,
            command: type
        }
        fetch(window.SYSTEM_NELDA_OUTAPI + "/event/doControl?doorIndexCodes=" + id + "&controlType=" + type)
            // fetch(SYSTEM_NELDA_OUTAPI + "/entranceguard/synControl?doorUuid", {
            //   method: 'POST',
            //   body: JSON.stringify(data)
            // })
            .then(r => r.json())
            .then(b => {
                if (b.msg == "success") {
                    message.success("操作成功！")

                } else {
                    message.error("操作失败！")
                }
            })
    }

    chedaoDoor(command, sourceEquipmentId) {
        const data = { sourceEquipmentId, command }
        fetch(window.SYSTEM_NELDA_OUTAPI + "/event/deviceControl?roadwaySyscode=" + sourceEquipmentId + "&command=" + command)
            // fetch(SYSTEM_NELDA_OUTAPI + "/entranceguard/controlBarrierByRoadwayUuid", {
            //   method: 'POST',
            //   body: JSON.stringify(data)
            // })
            .then(r => r.json())
            .then(b => {
                if (b.msg == "success") {
                    message.success("操作成功！")
                } else {
                    message.error("操作失败！")
                }
            })
    }

    guangBoHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
        const data = {
            prePlanningActionId: id,
            command: type,
            numbers: equipmentNumber,
            equipmentActionId: equipmentActionId,
            cycleTimes: cycleTimes,
            voiceUrl: voiceUrl,
        }
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/broadcast/broadcast?prePlanningActionId=${id}&command=${type}&numbers=${equipmentNumber}&equipmentActionId=${equipmentActionId}&cycleTimes=${cycleTimes}&voiceUrl=${voiceUrl}`)
            // fetch(`${SYSTEM_NELDA_OUTAPI}/broadcast/broadcast`, {
            //   method: "POST",
            //   body: JSON.stringify(data)
            // })
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    message.success('操作成功')
                } else {
                    message.error('操作失败')
                }
            })
    }

    huJiaoHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/xCall?number=${equipmentNumber}`, {
            method: "GET",
        })
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    message.success('操作成功')
                } else {
                    message.error('操作失败')
                }
            })
    }

    hanHuaHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
        const data = {
            locationAreaId: id,
            numbers: equipmentNumber
        }
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/areaCall`, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    message.success('操作成功')
                } else {
                    message.error('操作失败')
                }
            })
    }

    guangBoFangYinHander(id, equipmentNumber, equipmentActionId, type, cycleTimes, voiceUrl) {
        const data = {
            locationAreaId: id,
            numbers: equipmentNumber,
            equipmentActionId: equipmentActionId,
            cycleTimes: cycleTimes,
            filePath: voiceUrl
        }
        fetch(`${window.SYSTEM_NELDA_OUTAPI}/public/broadcast/areaSoundCall`, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    message.success('操作成功')
                } else {
                    message.error('操作失败')
                }
            })
    }
    liebiao(id, sign) {
        console.log(this.state.alterData);
        fetch(window.SYSTEM_CONFIG_BASICS + '/smccMulActPlanning/portal/getPlanDoDetailList?alarmId=' + this.state.alterData.Id + '&planId=' + id)
            .then(r => r.json())
            .then(b => {
                if (b.code == 0) {
                    let data = b.data.list;
                    let dataA = []
                    data.map(item => {
                        dataA.push({
                            equipmentId_Name: item.equipmentName,
                            equipmentActionId_Name: item.actionName,
                            status: item.status,
                            doTime: item.doTime,
                        })
                    })
                    this.setState({
                        datalist: this.state.actionList[sign].actionList = dataA
                    })
                } else {
                    message.error('操作失败')
                }
            })
    }
    actionHanderClick(id, sign, e) {
        e.stopPropagation();
        if (id) {
            fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/doPlanList?alarmId=" + this.state.alterData.Id)
                .then(r => r.json())
                .then(b => {
                    if (b.code == 0) {
                        message.success('执行成功')
                        fetch(window.SYSTEM_CONFIG_BASICS + "/smccMulActPlanning/portal/panlExeParams?planId=" + id)
                            .then(r => r.json())
                            .then(b => {
                                if (b.data) {
                                    console.log(b.data);
                                    b.data.list.map((item, index) => {
                                        if (item.equipmentCategoriesCode == "9004") {
                                            (function (index) {
                                                setTimeout(function () {
                                                    let data = JSON.stringify({
                                                        cameraId: item.equipmentNum,
                                                        title: item.equipmentName,
                                                        serial: item.equipmentNum,
                                                        code: item.channelNum
                                                    })

                                                    window.controlVideoCon && window.controlVideoCon(data)
                                                }, index * 2000);
                                            })(index);
                                        }
                                        if (item.equipmentCategoriesCode == "9005") {
                                            window.WinContainer.addWinInfo({
                                                locationAreaId: item.locationAreaId,
                                                name: item.equipmentName,
                                                type: "radio",
                                                id: item.equipmentId,
                                                area_name: item.locationAreaName,
                                                equipment_location: item.equipmentLocation
                                            });
                                        }
                                        if (item.equipmentCategoriesCode == "9006") {
                                            window.WinContainer.addWinInfo({
                                                locationAreaId: item.locationAreaId,
                                                name: item.equipmentName,
                                                type: "entrance",
                                                id: item.equipmentId,
                                                area_name: item.locationAreaName,
                                                equipment_location: item.equipmentLocation
                                            });
                                        }
                                        if (item.equipmentCategoriesCode == "9007") {
                                            window.WinContainer.addWinInfo({
                                                locationAreaId: item.locationAreaId,
                                                name: item.equipmentName,
                                                type: "lane",
                                                id: item.equipmentId,
                                                area_name: item.locationAreaName,
                                                equipment_location: item.equipmentLocation,
                                                sourceEquipmentId: item.sourceEquipmentId,
                                            });
                                        }
                                        if (item.equipmentCategoriesCode == "S1010") {
                                            (function (index) {
                                                setTimeout(function () {
                                                    let data = JSON.stringify({
                                                        serial: item.equipmentNum,
                                                        code: item.channelNum,
                                                        cameraId: item.equipmentId,
                                                        loginname: item.equipmentLoginName,
                                                        password: item.equipmentPassword,
                                                        ip: item.equipmentIp,
                                                        port: item.equipmentPort,
                                                    })
                                                    console.log(data)
                                                    window.controlVideoCon && window.controlVideoCon(data)
                                                }, index * 2000);
                                            })(index);
                                        }
                                    })
                                }
                            })
                        this.liebiao(id, sign)
                    } else {
                        message.error('执行失败')
                    }
                })
        }

    }
    toggleChose(flag, url = '') {
        this.setState({
            isplayvideo: flag,
            videoUrl: url
        })
    }
    render() {
        let format = "yyyy/MM/dd hh:mm:ss";
        const settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const { alterData } = this.state
        let Pic = ''
        if (alterData.Pic) {
            Pic = alterData.Pic.map((item, index) => {
                return <div>
                    <img src={item} key={index} alt="" onClick={this.openImg.bind(this, item)}
                        style={{ cursor: 'pointer', width: '100%', height: '200px' }} />
                </div>
            })
        }
        let ldfa = this.state.ddldList.map((item, index) => {
            let key = index + 1;
            let fadzList = this.state.actionList[index].actionList.map((item, index) => {
                return <tr key={item.id}>
                    <td style={{ width: '25px' }}>{index + 1}</td>
                    <td style={{ width: '80px' }}>{item.equipmentId_Name}</td>
                    <td style={{ width: '80px' }}>{item.equipmentActionId_Name}</td>
                    <td style={{ width: '80px' }}>{item.status == 1 ? "是" : "否"}</td>
                    {item.doTime == undefined ? <td style={{ width: '80px' }}></td> : <td style={{ width: '80px' }}>{new Date(item.doTime).Format(format)}</td>}
                    {item.equipmentCategoriesCode == '9007' ? <td> {/*道闸*/}
                        <span className="sBtn" onClick={this.chedaoDoor.bind(this, 1, item.sourceEquipmentId)}>开闸</span>
                        <span className="sBtn" onClick={this.chedaoDoor.bind(this, 0, item.sourceEquipmentId)}>关闸</span>
                        <span className="sBtn" onClick={this.chedaoDoor.bind(this, 3, item.sourceEquipmentId)}>常开</span>
                    </td> : null}
                    {item.equipmentCategoriesCode == '9006' ? <td> {/*门禁*/}
                        <span className="sBtn" onClick={this.handerDoor.bind(this, 2, item.sourceEquipmentId)}>开门</span>
                        <span className="sBtn" onClick={this.handerDoor.bind(this, 1, item.sourceEquipmentId)}>关门</span>
                        <span className="sBtn" onClick={this.handerDoor.bind(this, 0, item.sourceEquipmentId)}>常开</span>
                        <span className="sBtn" onClick={this.handerDoor.bind(this, 3, item.sourceEquipmentId)}>常关</span>
                    </td> : null}
                    {item.equipmentCategoriesCode == '9005' ? <td>
                        <span className="sBtn"
                            onClick={this.huJiaoHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 1, item.cycleTimes, item.voiceUrl)}>呼叫</span>
                        <span className="sBtn"
                            onClick={this.hanHuaHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 2, item.cycleTimes, item.voiceUrl)}>喊话</span>
                        <span className="sBtn"
                            onClick={this.guangBoFangYinHander.bind(this, item.id, item.equipmentNumber, item.equipmentActionId, 3, item.cycleTimes, item.voiceUrl)}>广播放音</span>
                    </td> : null}
                    {item.equipmentCategoriesCode == '9004' ? <td>
                        <span className="sBtn" onClick={this.jianKHander.bind(this, item.sourceEquipmentId)}>监控</span>
                        <span className="sBtn"
                            onClick={e => this.jianKHander(item.equipmentId, item.equipmentId_Name, e, item.alarmId, undefined, item.equimentCode, item.channel_num)}>监控</span>
                    </td> : null}
                </tr>
            })
            return <div key={"ldfaItem" + key} className="ldfaItem"
                onMouseEnter={this.showFaItem.bind(this)}
                onMouseLeave={this.hideFaItem.bind(this)}><span>方案{key}</span>: {item.prePlanningName}
                <div className="zxBtn" onClick={this.actionHanderClick.bind(this, item.id, index)}>执行</div>
                {this.state.isFadz ?
                    <div className="fadzList">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: '40px' }}>次序</td>
                                    <td>设备名称</td>
                                    <td style={{ width: '60px' }}>设备动作</td>
                                    <td style={{ width: '40px' }}>成功 </td>
                                    <td style={{ width: '40px' }}>时间</td>
                                </tr>
                                {fadzList}
                            </tbody>
                        </table>
                    </div> : null}
            </div>
        })
        return (
            <div className={`${Style.root} alarm-alter-wrap`} ref="alarmAlterWrap" onClick={e => e.stopPropagation()}>
                <div className={`videoplay`} style={{
                    display: this.state.isplayvideo ? 'block' : 'none'
                }}>
                    <div className="chose" onClick={this.toggleChose.bind(this, false)}></div>
                    {this.state.isplayvideo ? <VideoPlayer rootClassName="videoPalyerDiv" src={this.state.videoUrl} /> : ''}
                </div>
                <div className="alarmAlterBox" style={{
                    display: this.state.isShow ? 'block' : 'none',
                    lineHeight: 2
                }}>
                    <div className="content-box">
                        <div id='videoWrap'></div>
                        <div className="close-btn">
                            <span className="close-icon" onClick={this.closeBox.bind(this)}></span>
                        </div>
                        <div className="alter-title"
                            style={{ marginBottom: '5px' }}>{alterData.AlarmTypeName}详细信息</div>
                        {alterData.AlarmComfrom == 'environ' ? '' : <div className="Carousel-wrap">
                            <Carousel autoplay>
                                {Pic}
                            </Carousel>
                        </div>}
                        <div className="content-text">
                            <div className="text-title">
                                <span className="s1">{alterData.DetectionItemsName}</span><span
                                    className="s2">{alterData.AlarmLevel}</span>
                            </div>
                            <div className="text-title">
                                <span className="text">变电站名称：</span><span className="text">{sessionStorage.getItem('projectName')}</span>
                            </div>
                            <div className="text-title">
                                <span className="text">报警名称：</span><span className="text">{alterData.N0}</span>
                            </div>
                            <div className="text-title">
                                <span className="text">设备名称：</span><span className="text">{alterData.EquipmentName}</span>
                            </div>
                            <div className="text-title">
                                <span className="text">部件名称：</span><span className="text">{alterData.equipmentComponentName}</span>
                            </div>
                            <div className="text-title">
                                <span className="text">间隔名称：</span><span className="text">{alterData.spacingName}</span>
                            </div>
                            <div className="text-title text-flex">
                                <div className="left">
                                    <span className="text">发生区域：</span><span
                                        className="text">{alterData.LocationAreaName}</span>
                                </div>
                                <div className="right">
                                    <span className="text">持续时间：</span><span
                                        className="text">{alterData.KeepTime}</span>
                                </div>
                            </div>
                            {alterData.AlarmComfrom == 'environ' ? <div className="text-title text-flex">
                                <div className="left">
                                    <span className="text">监测时间：</span><span className="text">{alterData.HValue}</span>
                                </div>
                                <div className="right">
                                    <span className="text">实测值：</span><span className="text">{alterData.number0}</span>
                                </div>
                            </div> : ''}
                            {alterData.AlarmComfrom == 'environ' ? '' : <div className="text-title">
                                <span className="text">发生时间：</span><span className="text">{alterData.HValue}</span>
                            </div>}
                            {alterData.AlarmComfrom == 'environ' ? <div className="text-title text-flex">
                                <div className="left">
                                    <span className="text">上限指标：</span><span className="text">{alterData.number1}</span>
                                </div>
                                <div className="right">
                                    <span className="text">上上限指标：</span><span
                                        className="text">{alterData.number2}</span>
                                </div>
                            </div> : ''}
                            {alterData.AlarmComfrom == 'environ' ? <div className="text-title text-flex">
                                <div className="left">
                                    <span className="text">下限指标：</span><span className="text">{alterData.number3}</span>
                                </div>
                                <div className="right">
                                    <span className="text">下下限指标：</span><span
                                        className="text">{alterData.number4}</span>
                                </div>
                            </div> : ''}
                            <div className="text-title">
                                <span className="text">预警状态：</span><span className="text">{alterData.status}</span>
                            </div>
                            {alterData.AlarmComfrom == 'F' ? <div className="text-title">
                                <span className="text">摘要：</span><span className="text">{this.state.desc}</span>
                            </div> : ''}
                            <div className="text-title solidId">
                                <span className="text">实物ID：</span>
                                <img src={alterData.qrCode} alt="实物ID" />
                            </div>
                        </div>
                        <div className="text-flex" style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <div className="left" style={{ marginTop: '5px' }}>
                                <span className="label">处理过程：</span>
                            </div>
                            <div className="right" style={{ flex: 1 }}>
                                <TextArea rows={4} placeholder="处理过程" style={{ resize: 'none' }}
                                    onChange={this.onChange.bind(this)} />
                            </div>
                        </div>
                        {alterData.AlarmComfrom == 'violation' || 'F' ? <div>
                            <div className="btn-wrap">

                                <div className="btn-group">
                                    <div className="btn">
                                        <span className="icon06"></span>
                                        <span className="s" onClick={e => this.hfBtn(alterData.SourceEquipmentId, alterData.HValue, e)}>回放</span>
                                    </div>
                                </div>
                                <div className="btn-group btn-group-border">
                                    <div className="btn">
                                        <span className="icon06"></span><span className="s"
                                            onClick={e => this.noBtn(alterData.Id, e)}>误警</span>
                                    </div>
                                </div>
                                {/* <div className="btn-group">
                                    <div className="btn">
                                        <span className="icon01"></span><span className="s"
                                            onClick={this.yjtz.bind(this)}>一键通知</span>
                                    </div>
                                </div> */}
                                <div className="btn-group">
                                    <div className="btn">
                                        <span className="icon05"></span><span className="s"
                                            onClick={e => this.okBtn(alterData.Id, e)}>报警处理</span>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <div className="btn-group">
                                    {/* <div className="btn" onClick={this.jianKHander.bind(this, alterData.SourceEquipmentId)}> */}
                                    <div className="btn"
                                        onClick={e => this.jianKHander(alterData.EquipmentId, alterData.EquipmentName, e)}>
                                        <span className="icon03"></span><span className="s">监控</span>
                                    </div>
                                </div>
                                <div className="btn-group btn-group-border">
                                    <div className="btn">
                                        <span className="icon04"></span><span className="s"
                                            onClick={this.ddldHander.bind(this)}>多点联动</span>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                            :
                            <div>
                                <div className="btn-wrap-space-between">
                                    <div className="btn-group-hjjk btn-group-border-right">
                                        <div className="btn">
                                            <span className="icon06"></span><span className="s"
                                                onClick={e => this.noBtn(alterData.Id, e)}>误警</span>
                                        </div>
                                    </div>
                                    <div className="btn-group-hjjk">
                                        <div className="btn">
                                            <span className="icon01"></span><span className="s"
                                                onClick={this.yjtz.bind(this)}>一键通知</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-wrap-space-between btn-wrap-margin">
                                    <div className="btn-group-hjjk btn-group-border-right">
                                        <div className="btn">
                                            <span className="icon04"></span><span className="s"
                                                onClick={this.ddldHander.bind(this)}>多点联动</span>
                                        </div>
                                    </div>
                                    <div className="btn-group-hjjk">
                                        <div className="btn">
                                            <span className="icon05"></span><span className="s"
                                                onClick={e => this.okBtn(alterData.Id, e)}>报警处理</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {!this.state.ljclType ? <div className="ldfaList">{ldfa}</div> : null}
                    </div>
                </div>
                {this.state.isImgWrap ? <div className="img-wrap">
                    {/* <iframe className="iframe-box" src="" /> */}
                    <img className='alter-img' src={this.state.imgUrl} alt="" onClick={this.closeImg.bind(this)} />
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.alter.info,
        infoZ: state.alter.infoZ,
        isAoTuAlter: state.alter.isAoTuAlter
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeInfo: (data) => {
            dispatch(actionCreators.info(data))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AlarmAlter);
/* eslint-enable */