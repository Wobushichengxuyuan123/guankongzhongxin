import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SullivanVideo from 'sullivan-player';
import { PTZController } from 'ptz-core'
import { message } from 'antd';
import './css/index.css';
let that;
let index = 0

const ptz = new PTZController({
    api: '/webrtc-api/gb28181/control'
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            address: '',
            user: '',
            pass: '',
        };
        that = this
    }
    componentDidMount() {
        this.controlVideoCon()
    }

    setVideoToArray(url, index, cameraId) {
        const { urls } = this.state;
        urls.push({ url, index, cameraId, containerRef: React.createRef() });
        this.setState({ urls })
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
            if (this.state.cameraId) {
                fetch(url).then((r) => { })
            } else {
                message.error('请选中设备')
            }
        }
    }
    controlVideoCon() {
        window.controlVideoCon = (data) => {
            const { urls } = this.state;
            let { cameraId, code, serial } = JSON.parse(data);
            this.setState({
                cameraId: cameraId
            })
            let flag = true;
            if (!code) {
                message.warning('未绑定设备序列号')
                return false;
            }
            if (!serial) {
                message.warning('未绑定设备通道号')
                return false;
            }
            if (urls.length > 32) {
                message.warning('摄像头数量超出规定限制');
                flag = false;
                return false;
            }
            urls.forEach(v => {
                if (v.cameraId == cameraId) {
                    message.warning('摄像头视频已存在');
                    flag = false;
                }
            });
            if (!flag) return false;
            if (code && serial) {
                fetch('/webrtc-api/gb28181/invite?id=' + code + "&channel=" + serial,
                    {
                        method: 'GET',
                    })
                    .then(r => r.json())
                    .then(b => {
                    })
                let url = code + "/" + serial
                this.setVideoToArray(url, index++, cameraId)
            }
        };

    }


    // ptzMove(move = {}) {
    //     ptz.ptzMove({ x: 0, y: 0, z: 0, ...move }, 30);
    //     setTimeout(ptz.ptzStop, 200)
    // }
    playerItemClick(config) {
        if (config) {
            this.setState({
                address: config.ip,
                user: config.loginname,
                pass: config.password,
            })
        }
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~render~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    render() {
        const { urls, address, user, pass } = this.state;
        let addressBarHash = window.location.hash
        let zhddFlag = /dispatch/ig.test(addressBarHash) ? true : false;

        const ErrorDom = ({ message, target, item, data }) => {
            const domRef = useRef();
            useEffect(() => {
                target.appendChild(domRef.current);
                const $reload = target.querySelector('#videoReload');

                function onReload() {
                    item.containerRef.current.setPlayingVideo(data)
                }

                $reload.addEventListener('click', onReload, false);
                return () => {
                    $reload.removeEventListener('click', onReload, false)
                }
            }, []);

            return (
                <div ref={domRef}>
                    <div className="sullivan-video-reload">
                        <span id="videoReload">重新加载</span>
                    </div>
                    <div className="sullivan-video-error">
                        <span>{message}</span>
                    </div>
                </div>
            )
        };
        return (
            <div className={zhddFlag ? "home zhddHome" : "home"}>
                <div className="centerVideoConFather">
                    <div className="centerVideoCon" id="centerVideoCon"
                        style={{ display: urls.length > 0 ? "-webkit-box" : "none" }}>
                        <div className="r_flex fd_rr"
                            style={{ minWidth: "100%", display: urls.length > 0 ? "flex" : "none" }}>
                            {urls.map(((item, index) => {
                                const onPlayerListener = {
                                    play() {
                                        console.log('视频加载完成，已经开始播放！')
                                    },
                                    // 监听错误信息
                                    error(error = {}) {
                                        if (typeof error === 'object') {
                                            const $div = document.createElement('div')
                                            const { code, errorMsg, ...props } = error

                                            if (code === 5015) {
                                                // 流不存在，错误处理。
                                                ReactDOM.render((
                                                    <ErrorDom
                                                        {...props}
                                                        item={item}
                                                        message={errorMsg}
                                                    />
                                                ), $div)
                                            }
                                        }
                                    },
                                    itemClick(options) {
                                        console.log('itemClick：', options)
                                    },
                                    destroy(arg) {
                                        console.log('destroy: => ', arg)
                                    },
                                    close(data) {
                                        urls.splice(urls.findIndex(item => item.cameraId === data.cameraId), 1)
                                        that.setState({ urls });
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
                                    transform(arg) {
                                        console.log('transform: => ', arg)
                                    },
                                    zoom(arg) {
                                        console.log('zoom: => ', arg)
                                    },
                                };
                                return (
                                    <SullivanVideo
                                        key={index}
                                        className="video-multiple-container"
                                        style={{ width: '200px', height: '200px' }}
                                        ref={item.containerRef}
                                        data={item}
                                        logger={console.log}
                                        record={true}
                                        timeRefresh={1000 * 60 * 10}
                                        movement={true}
                                        zoom={true}
                                        useWebRTC={true}
                                        transform="3d"
                                        on={onPlayerListener}
                                    >
                                    </SullivanVideo>
                                )
                            }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
