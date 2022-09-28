/* eslint-disable */

import { Carousel, Input, Form, message, Icon } from 'antd';
import { connect } from "react-redux";
import { actionCreators } from './store'
import React from 'react';
const { TextArea } = Input;
class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            isFadz: true,
            result: '',
            alterData: [],
            isImgWrap: false,
            imgUrl: '',
            ddldList: [],
            ljclType: true,
            isdate: false,
            actionList: [],
            desc: ''
        }
    }
    componentDidMount() {
        if (this.props.alterId) {
            this.getAlterData(this.props.alterId)
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
                    let data = b.data
                    this.setState({ alterData: data })
                    data.desc = data.desc.replaceAll("\n", "。");
                    let desc = JSON.parse(data.desc).desc
                    this.setState({
                        desc: desc
                    })
                } else {
                    message.error(b.msg)
                }
            })
    }
    closeBox() {
        this.setState({ isShow: false })
        this.props.pfn(false)
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

        fetch(window.SYSTEM_CONFIG_BASICS + "/smccAlarmInfo/portal/updateDefaultStatus", {
            method: "post",
            body: JSON.stringify({ id: id })
        })
            .then(r => r.json())
            .then(b => {
                if (b.msg == "success") {
                    message.success("更改状态成功！");
                    this.closeBox()
                    this.getAlterData(this.props.alterId)
                } else {
                    message.error("更改状态失败！");
                    this.closeBox()
                }
            })
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
        sessionStorage.setItem('hf-HValue', HValue) // 用于回放历史监控结束时间
        let winInfo = {
            name: this.state.alterData.EquipmentName,
            type: "video",
            id: SourceEquipmentId,
            area_name: this.state.alterData.EquipmentLocation,
            equipment_location: this.state.alterData.LocationAreaName,
            isHistory: true,
            isClass: 1
        }
        window.WinContainer.addWinInfo(winInfo);
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
        window.controlVideoCon2 && window.controlVideoCon2(data)
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
                        actionList: actionListA
                    })
                    this.setState({ ddldList: b.data.list, ljclType: !this.state.ljclType });
                } else {
                    message.error("未设置对应的多点联动方案！");
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
    huJiaoHander(equipmentNumber) {
        fetch(window.SYSTEM_NELDA_OUTAPI + '/public/broadcast/xCall?number=' + equipmentNumber, {
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
    hanHuaHander(id, equipmentNumber) {
        const data = {
            locationAreaId: id,
            numbers: equipmentNumber
        }
        fetch(window.SYSTEM_NELDA_OUTAPI + '/public/broadcast/areaCall', {
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
                                    b.data.list.map((item, index) => {
                                        if (item.equipmentCategoriesCode == "9004") {
                                            (function (index) {
                                                setTimeout(function () {
                                                    let data = JSON.stringify({
                                                        cameraId: item.equipmentId,
                                                        loginname: item.equipmentLoginName,
                                                        password: item.equipmentPassword,
                                                        ip: item.equipmentIp,
                                                        port: item.equipmentPort,
                                                    })
                                                    window.controlVideoCon2 && window.controlVideoCon2(data)
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
                                                        code: item.equimentCode,
                                                        cameraId: item.equipmentId,
                                                        loginname: item.equipmentLoginName,
                                                        password: item.equipmentPassword,
                                                        ip: item.equipmentIp,
                                                        port: item.equipmentPort,
                                                    })
                                                    window.controlVideoCon2 && window.controlVideoCon2(data)
                                                }, index * 1000);
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
    render() {
        let format = "yyyy/MM/dd hh:mm:ss";
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
            var fadzList = this.state.actionList[index].actionList.map((item, index) => {
                return <tr key={item.id}>
                    <td style={{ width: '50px' }}>{index + 1}</td>
                    <td style={{ width: '100px' }}>{item.equipmentId_Name}</td>
                    <td style={{ width: '100px' }}>{item.equipmentActionId_Name}</td>
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
            <div className="alarm-alter-wrap2" ref="alarmAlterWrap" onClick={e => e.stopPropagation()}>
                <div className="alarmAlterBox" style={{
                    display: this.state.isShow ? 'block' : 'none',
                    lineHeight: 2
                }}>
                    <div className="content-box" style={{ maxHeight: '65vh' }}>
                        <div id='videoWrap'></div>
                        <div className="close-btn">
                            <span className="close-icon" onClick={this.closeBox.bind(this)}></span>
                        </div>
                        <div className="alter-title"
                            style={{ marginBottom: '5px' }}>{alterData.AlarmComfrom == 'environ' ? '环境监测预警详细信息' : alterData.AlarmComfrom == 'F' ? '风险预警详细信息' : '违章识别预警详细信息'}</div>
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
                                <span className="text">报警简题：</span><span className="text">{alterData.N0}</span>
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
                                <span className="text">预警状态：</span><span className="text">未处理</span>
                            </div>
                            {alterData.AlarmComfrom == 'F' ? <div className="text-title">
                                <span className="text">摘要：</span><span className="text">{this.state.desc}</span>
                            </div> : ''}
                        </div>
                        <div className="text-flex" style={{ marginTop: '15px', marginBottom: '12px' }}>
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
                                        {/*onClick={alterData.Video !== 'None' ? this.openVideo.bind(this, alterData.Video) : this.noVideo.bind(this)}>*/}
                                        {/*<span className={alterData.Video !== 'none' ? 'icon02' : 'icon02-no'}></span><span*/}
                                        {/*className="s">视频</span>*/}
                                        {/* <span className="icon06"></span><span className="s"
                                                            onClick={this.hfBtn.bind(this, alterData.SourceEquipmentId, alterData.HValue)}>回放</span> */}
                                        <span className="icon06"></span><span className="s"
                                            onClick={e => this.hfBtn(alterData.SourceEquipmentId, alterData.HValue, e)}>回放</span>
                                    </div>
                                </div>
                                <div className="btn-group btn-group-border">
                                    <div className="btn">
                                        <span className="icon06"></span><span className="s"
                                            onClick={e => this.noBtn(alterData.Id, e)}>误警</span>
                                    </div>
                                </div>
                                <div className="btn-group">
                                    <div className="btn">
                                        <span className="icon01"></span><span className="s"
                                            onClick={this.yjtz.bind(this)}>一键通知</span>
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
                                <div className="btn-group">
                                    <div className="btn">
                                        <span className="icon05"></span><span className="s"
                                            onClick={e => this.okBtn(alterData.Id, e)}>报警处理</span>
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