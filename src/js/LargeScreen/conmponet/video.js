import React, { Component } from 'react'
import { message } from 'antd';
import SullivanVideoMultiple from 'sullivan-multiple';
import { PTZController } from 'ptz-core'

const ptz = new PTZController({
    api: '/webrtc-api/gb28181/control'
});
let that;
class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerRef: React.createRef(),
            videoids: '',
        }
        that = this
    }
    componentDidMount() {
        this.controlVideoCon()
    }
    /**
     *  获取伏组件传过来的id
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.loginName != nextProps.loginName) {
            this.setState({
                loginName: nextProps.loginName
            }, () => {
                this.getvideo(this.state.loginName)
            })
        }
    }
    controlVideoCon = () => {
        window.controlVideoCon = (data) => {
            this.setState({ videoids: data })
            this.loadVideo(data)
            let { status } = JSON.parse(data);
            if (status != '1') {
                this.videostatus(data)
            }
        };
    };
    // 获取当前存储视频
    getvideo(loginName) {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubUserCamera/pagination",
            {
                method: 'POST',
                body: JSON.stringify({ loginName, pageSize: 10, pageNo: 1 }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(r => r.json())
            .then(b => {
                let data = b.data.list
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        (function (i) {
                            setTimeout(function () {
                                var videodata = JSON.stringify({
                                    cameraId: data[i].cameraId,
                                    deleteid: data[i].id,
                                    status: data[i].status,
                                    port: data[i].eqPort,
                                    serial: data[i].serial,
                                    code: data[i].code
                                })
                                that.loadVideo(videodata)
                            }, i * 100);
                        })(i);
                    }
                }
            })
    }
    videostatus = (data) => {
        let { loginname, password, ip, port, cameraId, code, serial } = JSON.parse(data);
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubUserCamera/insert",
            {
                method: 'POST',
                body: JSON.stringify({
                    loginName: this.state.loginName,
                    cameraId,
                    code,
                    serial,
                    eqLoginName: loginname,
                    eqPass: password,
                    eqIp: ip,
                    eqPort: port,
                    status: 1
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(r => r.json())
            .then(b => { })
    }
    loadVideo(videoids) {
        if (videoids) {
            let { cameraId, deleteid, code, serial } = JSON.parse(videoids);
            fetch('/webrtc-api/gb28181/invite?id=' + code + "&channel=" + serial)
                .then(r => r.json())
                .then()
            let url = code + "/" + serial
            this.setPlayingVideo(url, cameraId, deleteid)
        }
    }
    setPlayingVideo(url, id, deleteid,) {
        const $videos = this.state.containerRef.current
        if ($videos) {
            $videos.setPlayingVideo({ url: url, id, deleteid: deleteid })
        }
    }
    removeVideo(obj) {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubUserCamera/delete?id=" + obj.deleteid,
            {
                method: 'GET',
            })
            .then(r => r.json())
            .then(b => {
                console.log(b)
            })
    }
    direction(url) {
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
        } else {
            fetch(url).then((r) => { })
        }
    }
    itemClick(config, id) {
        if (config) {
            let data = config.split('/')
            this.setState({
                id: data[0],
                channel: data[1],
                cameraId: id
            })
        }
    }
    render() {
        const { containerRef, id, channel } = this.state
        const onPlayerListener = {
            play() {
                console.log('视频加载完成，已经开始播放！')
            },
            error(error) {
                console.error('error：', error)
            },
            itemClick(options) {
                if (options) {
                    that.itemClick(options.url, options.deviceId)
                }
            },
            destroy(obj) {
                console.log(obj);
            },
            close(data) {
                that.removeVideo(data)
            },
            movement(arg) {
                let data = arg.url.split('/')
                if (arg.direction && arg.url) {
                    if (['left', 'right', 'top', 'bottom'].includes(arg.direction)) {
                        that.direction(ptz[arg.direction]({ id: data[0], channel: data[1] }))
                    }
                    setTimeout(() => {
                        that.direction(ptz.stop({ id: data[0], channel: data[1] }))
                    }, 500);
                } else {
                    message.warning('请选择摄像头')
                }
            },
        }
        return (
            <SullivanVideoMultiple
                className="video-multiple-container"
                ref={containerRef}
                defaultActivated={0}
                screenSize={10}
                column={2}
                row={5}
                recording={true}
                movement={true}
                useWebRTC={true}
                transform="3d"
                style={{ width: '100%', height: '40.3%' }}
                on={onPlayerListener}
            />
        )
    }
}
export default Video
