import React, { Component } from 'react'
import { message } from 'antd';
import { iconPath, IconArrow } from './css/icon'
import { PTZController } from 'ptz-core'
import Ptztable from './ptz/ptztable'
import './css/ptz.scss'
const ptz = new PTZController({
    api: '/webrtc-api/gb28181/control'
});
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: this.props.option,
            cameraId: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cameraId != this.state.cameraId) {
            this.setState({
                cameraId: nextProps.cameraId,
                option: nextProps.option,
            })
        }
    }
    // 鼠标按下事件
    onMouseDown(type) {
        let obj = this.props.option
        if (Object.keys(obj).length > 0) {
            if (['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'zoomFar', 'zoomNear'].includes(type)) {
                this.ptzPathurl(ptz[type]({ id: obj.id, channel: obj.channel }))
            }
        } else {
            message.error('请选中设备')
            return false
        }
    }
    // 鼠标抬起事件
    onMouseUp() {
        let obj = this.props.option
        if (Object.keys(obj).length > 0) {
            fetch(ptz.stop({ id: obj.id, channel: obj.channel })).then((r) => { })
        }
    }
    ptzPathurl(url) {
        if (window.ISXUNJIAN) {
            if (this.state.cameraId) {
                fetch('/nelda-inspection/redisInfoController/getEquipmentInfo?equipmentId=' + this.state.cameraId)
                    .then(r => r.json())
                    .then(b => {
                        let data = b.data.body
                        if (Object.keys(data).length > 0) {
                            if (data.status == 0) {
                                fetch(url).then((r) => { })
                            } else {
                                message.error('我正在执行任务');
                            }
                        } else {
                            fetch(url).then((r) => { })
                        }
                        if (b.code == '-1') {
                            fetch(url).then((r) => { })
                        }
                    })
            } else {
                message.error('请选中设备')
            }
        }
    }
    render() {
        const { cameraId, option } = this.state
        return (
            <div>
                <div className="control-box">
                    <div className='control'>
                        <IconArrow
                            id="topLeft"
                            path={iconPath.arrow}
                            className="arrow-top-left"
                            onMouseDown={() => this.onMouseDown('topLeft')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="top"
                            // path={iconPath.arrow}
                            className="arrow-top"
                            onMouseDown={() => this.onMouseDown('top')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="topRight"
                            // path={iconPath.arrow}
                            className="arrow-top-right"
                            onMouseDown={() => this.onMouseDown('topRight')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="left"
                            path={iconPath.arrow}
                            className="arrow-left"
                            onMouseDown={() => this.onMouseDown('left')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="center"
                            path={iconPath.arrow}
                            className="arrow-center"
                        />
                        <IconArrow
                            id="right"
                            path={iconPath.arrow}
                            className="arrow-right"
                            onMouseDown={() => this.onMouseDown('right')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="bottomLeft"
                            path={iconPath.arrow}
                            className="arrow-bottom-left"
                            onMouseDown={() => this.onMouseDown('bottomLeft')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="bottom"
                            path={iconPath.arrow}
                            className="arrow-bottom"
                            onMouseDown={() => this.onMouseDown('bottom')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="bottomRight"
                            // path={iconPath.arrow}
                            className="arrow-bottom-right"
                            onMouseDown={() => this.onMouseDown('bottomRight')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />

                    </div>
                    <div className="control-zoom-box" >
                        <IconArrow
                            id="bottomRight"
                            // path={iconPath.arrow}
                            className="arrow-zoom-out"
                            onMouseDown={() => this.onMouseDown('zoomNear')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                        <IconArrow
                            id="bottomRight"
                            // path={iconPath.arrow}
                            className="arrow-zoom-in"
                            onMouseDown={() => this.onMouseDown('zoomFar')}
                            onMouseUp={() => this.onMouseUp('stop')}
                        />
                    </div>
                </div>
                {cameraId ? < Ptztable option={option} /> : null}
            </div>

        )
    }
}
