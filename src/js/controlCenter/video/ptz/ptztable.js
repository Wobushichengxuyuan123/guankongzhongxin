/* eslint-disable */
import React, { Component } from 'react'
import { message, Tabs, Select, Modal, Button } from 'antd';
import { PTZController } from 'ptz-core'
import AddYt from "./Yzw";
import Showwang from './sw'
import Lunxun from './Lx'
const ptz = new PTZController({
    api: '/webrtc-api/gb28181/control'
});
const { TabPane } = Tabs;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
            cameraId: '',
            type: '0',
            isyuntai: false,
            lunxunList: [],
            yuzhiList: [],
            ShowList: [],
            loading: false,
            count: 0,
        }
    }
    componentDidMount() {
        if (this.props.option) {
            this.setState({
                option: this.props.option
            }, () => {
                this.yuzhiwei()
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            option: nextProps.option
        }, () => {
            this.yuzhiwei()
        })
    }
    ptzPathurl(url) {
        if (window.ISXUNJIAN) {
            fetch('/nelda-inspection/redisInfoController/getEquipmentInfo?equipmentId=' + this.state.option.cameraId)
                .then(r => r.json())
                .then(b => {
                    let data = b.data.body
                    if (Object.keys(data).length > 0) {
                        if (data.status == 0) {
                            fetch(url).then((r) => { })
                        } else {
                            message.error('正在执行巡检任务');
                        }
                    }
                    if (b.code == '-1') {
                        fetch(url).then((r) => { })
                    }
                })

        } else {
            fetch(url).then((r) => { })
        }
    }
    callback(key) {
        this.setState({
            type: key
        }, () => {
            this.yuzhiwei()
        })
    }
    Change = (value, option) => {
        let data = this.state.yuzhiList[option.key - 1]
        this.setState({
            yuzhiindex: value,
            YzwId: option.key,
            data: option.props.children[2],
            presetCode: data.presetCode,
            presetName: data.presetName,
            iorder: data.iorder,
        })
    }
    // 关闭弹窗
    handleyuntai() {
        this.setState({
            visible: false
        })
    }
    // 打开预置位弹窗
    setops() {
        if (!this.state.YzwId) {
            message.warning('请选择要设置的预置位')
            return false
        }
        this.setState({
            visible: true,
            data: this.state.yuzhiList[this.state.YzwId - 1].presetName
        })
    }
    // 修改预置位
    edit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.refs.addyt.validateFields((err, values) => {
            if (!err) {
                values.id = this.state.YzwId;
                values.type = this.state.type;
                values.cameraId = this.state.option.cameraId;
                values.presetCode = this.state.presetCode;
                values.iorder = this.state.iorder;
                fetch(window.SYSTEM_CONFIG_BASICS + "/pubCameraPreset/update", {
                    method: "POST",
                    body: JSON.stringify(values)
                }).then(r => r.json())
                    .then(b => {
                        if (b.code == "0") {
                            message.success("保存成功！");
                            this.setState({ visible: false, loading: false });
                            this.yuzhiwei()
                        } else {
                            message.error(b.msg);
                        }
                    })
                fetch(ptz.setPos({ id: this.state.option.id, channel: this.state.option.channel, index: this.state.yuzhiindex })).then()
            } else {
                this.setState({ loading: false })
            }
        })
    }
    yuzhiwei() {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubCameraPreset/list",
            {
                method: 'POST',
                body: JSON.stringify({
                    type: this.state.type,
                    cameraId: this.state.option.cameraId
                })
            })
            .then(r => r.json())
            .then(b => {
                let data = b.data
                if (data) {
                    if (this.state.type == 0) {
                        this.setState({
                            yuzhiList: data,
                        })
                    }
                    if (this.state.type == 1) {
                        this.setState({
                            lunxunList: data
                        })
                    }
                    if (this.state.type == 2) {
                        this.setState({
                            ShowList: data
                        })
                    }
                }

            })
    }
    // 预置位
    call() {
        if (!this.state.YzwId) {
            message.warning('请选择需要调用的预置位')
            return false
        }
        this.ptzPathurl(ptz.calPos({ id: this.state.option.id, channel: this.state.option.channel, index: this.state.yuzhiindex }))
    }
    // 守望位
    showwang(index) {
        this.ptzPathurl(ptz.calPos({ id: this.state.option.id, channel: this.state.option.channel, index: index }))
    }
    shouwanglist(swlist) {
        let va = {
            type: this.state.type,
            cameraId: this.state.option.cameraId,
            dataJson: JSON.stringify(swlist)
        }
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubCameraPreset/update", {
            method: "POST",
            body: JSON.stringify(va)
        }).then(r => r.json())
            .then(b => {
                if (b.code == "0") {
                    message.success("设置成功！");
                } else {
                    message.error(b.msg);
                }
            })

    }
    // 守望结束

    // 轮训任务
    handlelunxun() {
        this.setState({ visibleLx: false })
    }
    // 轮训
    handselect = (value, evt) => {
        let data = this.state.lunxunList[value]
        this.setState({
            lunxunId: value + 1,
            lunxunrenwuList: data,
            cameraId: data.cameraId,
            iorder: data.iorder,
            presetCode: data.presetCode,
            presetName: data.presetName,
            type: data.type,
        })
        if (data.dataJson != '') {
            this.setState({
                playlist: JSON.parse(data.dataJson)
            })
        }
    }
    editlx(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.refs.lunxun.validateFields((err, values) => {
            if (!err) {
                values.cameraId = this.state.cameraId;
                values.presetCode = this.state.presetCode;
                values.type = this.state.type;
                values.iorder = this.state.iorder;
                values.dataJson = JSON.stringify(values.dataJson);
                fetch(window.SYSTEM_CONFIG_BASICS + "/pubCameraPreset/update", {
                    method: "POST",
                    body: JSON.stringify(values)
                }).then(r => r.json())
                    .then(b => {
                        if (b.code == "0") {
                            message.success("保存成功！");
                            this.setState({ visible: false, loading: false });
                            this.yuzhiwei()
                        } else {
                            message.error(b.msg);
                        }
                    })
                this.setState({ loading: false, visibleLx: false })
            } else {
                this.setState({ loading: false, visibleLx: false })
            }
        })
    }
    lunxun() {
        if (!this.state.lunxunId) {
            message.warning('请选择需要编辑的轮训任务')
            return false
        }
        this.setState({
            lunxunrenwuList: this.state.lunxunList[this.state.lunxunId - 1],
        })
        this.setState({
            visibleLx: true
        })
    }
    lunxunplay = (id, channel) => {
        if (!this.state.lunxunId) {
            message.warning('请选择需要执行的轮训任务')
            return false
        }
        if (this.state.lunxunList[this.state.lunxunId - 1].dataJson != '') {
            let value = JSON.parse(this.state.lunxunList[this.state.lunxunId - 1].dataJson)
            this.lxcall(id, channel, value[0].yuzhiwei)
            let timer = setInterval(() => {
                this.setState(() => {
                    this.setState({
                        count: this.state.count + 1
                    }, () => {
                        this.lxcall(id, channel, value[this.state.count].yuzhiwei)
                    })
                    if (this.state.count == value.length - 1) {
                        this.setState({
                            count: 0
                        })
                    }
                });
            }, parseInt(value[this.state.count].time) * 1000);
            clearInterval(this.state.timer)
            this.setState({ timer: timer });
        } else {
            message.warning('任务为空，请先编辑轮训任务')
        }
    }
    lunxunstop() {
        clearInterval(this.state.timer)
        this.setState({ timer: null },()=>{
            // message.success('停止成功')
        })
    }
    lxcall(id, channel, index) {
        this.ptzPathurl(ptz.calPos({ id: id, channel: channel, index: index }))
    }
    render() {
        const { yuzhiList, lunxunList, ShowList, lunxunrenwuList } = this.state
        return (
            <div>
                <Tabs onChange={this.callback.bind(this)} type="card">
                    <TabPane tab="预置位" key="0">
                        <div className='r_flex jc_sb ai_c yuzhiwei'>
                            <Select
                                placeholder="预置位"
                                onChange={this.Change.bind(this)}
                                defaultValue={yuzhiList}
                                options={yuzhiList}
                            >
                                {yuzhiList.map((item, index) => {
                                    return (
                                        <Select.Option key={item.id} value={item.id}>
                                            {index + 1}-{item.presetName}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                            <div className='r_flex jc_sb '>
                                <div className='setpos setIcon margin_r15' onClick={this.setops.bind(this)}></div>
                                <div className='setpos gotoIcon' onClick={this.call.bind(this)}></div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="轮巡" key="1">
                        <div className='r_flex jc_sb ai_c yuzhiwei'>
                            <Select
                                placeholder="轮巡"
                                onChange={e => this.handselect(e)}
                            >
                                {lunxunList.map((item, index) => {
                                    return (
                                        <Select.Option key={index + 1} value={index} dataJson={item} >
                                            {index + 1}-{item.presetName}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                            <div className='r_flex jc_sb '>
                                <div className='setpos setIcon margin_r15' onClick={this.lunxun.bind(this)}></div>
                                <div className='setpos gotoIcon' onClick={this.lunxunplay.bind(this, this.state.option.id, this.state.option.channel)} ></div>
                                <div className='setpos stopIcon' onClick={this.lunxunstop.bind(this)} ></div>
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="守望" key="2">
                        <Showwang parent={this} ShowList={ShowList} yuzhiList={yuzhiList}></Showwang>
                    </TabPane>
                </Tabs>
                <Modal
                    title={"设置预置点"}
                    visible={this.state.visible}
                    className="add_modal01"
                    width={'300px'}
                    onCancel={this.handleyuntai.bind(this)}
                    footer={[
                        <Button key='btn2' onClick={this.edit.bind(this)}
                            className="ant-btn ant-btn-primary ant-btn-lg" loading={this.state.loading}>保存</Button>,
                    ]}
                >
                    {this.state.visible ?
                        <AddYt ref="addyt" data={this.state.data} /> : null}
                </Modal>
                <Modal
                    title={"设置轮训路径"}
                    visible={this.state.visibleLx}
                    className="add_modal01 lunxuntable"
                    width={'400px'}
                    onCancel={this.handlelunxun.bind(this)}
                    footer={[
                        <Button key='btn2' onClick={this.editlx.bind(this)}
                            className="ant-btn ant-btn-primary ant-btn-lg" loading={this.state.loading}>保存</Button>,
                    ]}
                >
                    {this.state.visibleLx ?
                        <Lunxun ref="lunxun" lunxunList={lunxunrenwuList} yuzhiList={yuzhiList} /> : null}
                </Modal>
            </div>
        )
    }
}
/* eslint-enable */
