/* eslint-disable */
import React, { Component, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Radio, Tree, Icon, message } from 'antd';
import SullivanVideoMultiple from 'sullivan-multiple';
import './css/contain.css'
import './css/cameraList.css'
import Ptz from './ptz'
const { Panel } = Collapse;
const { TreeNode } = Tree;
var that;

export default class PTZControlPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lWidth: 20,
            treeData: [],
            containerRef: React.createRef(),
            screenSize: 1,
            column: '',
            showVideoCon: 'none',
            editWidth: 80,
            url: '',
            cameraId: '',
            yuzhiList: [],
            type: '0',
            visible: false,
            visibleLx: false,
            loading: false,
            lunxunList: [],
            count: 0,
            timer: null,
            isSw: true,
            option: {}
        }
        that = this
    }
    componentDidMount() {
        this.getresrulist()
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
    /**
     * 通过拖拽来播放
     */
    onMenuDragStartHandle(event) {
        let { id, serial, code } = JSON.parse(event.target.dataset.obj)
        fetch('/webrtc-api/gb28181/invite?id=' + code + "&channel=" + serial)
            .then((r) => { })
        let url = code + "/" + serial
        event.dataTransfer.effectAllowed = 'copy'
        event.dataTransfer.dropEffect = 'copy'
        event.dataTransfer.setData('video:url', JSON.stringify({ url: url, deviceId: id }))
    }
    /**
     * 双击加载视频
     */
    setActiveVideo(event) {
        let { id, serial, code } = JSON.parse(event.target.dataset.obj)
        fetch('/webrtc-api/gb28181/invite?id=' + code + "&channel=" + serial)
            .then((r) => { })

        let url = code + "/" + serial
        const $videos = this.state.containerRef.current;
        if (!url) {
            message.warning('摄像头未配置通道号或序列号')
            return false
        }
        if ($videos) {
            $videos.setPlayingVideo({ url: url, deviceId: id, code, serial })
            // 西安测试
            // $videos.setPlayingVideo({ url: 'streamPath=34020000001420000123/34020000001320000001', deviceId: id, code, serial })
        }
    }
    // 自适应屏幕
    onWrapResize() {
        this.state.containerRef.current.resizeHandle()
    }
    // 左侧菜单显示隐藏
    editWidth() {
        this.setState({
            editWidth: this.state.editWidth === 80 ? 100 : 80,
            lWidth: this.state.editWidth === 80 ? 0 : 20
        }, function () {
            this.onWrapResize()
        });
    }
    // 视频内部调用云台
    direction(url) {
        fetch(url).then((r) => { })
    }
    itemClick(config, id) {
        if (config) {
            let data = config.split('/')
            this.setState({
                id: data[0],
                channel: data[1],
                cameraId: id,
                option: {
                    id: data[0],
                    channel: data[1],
                    cameraId: id
                }
            })
        }
    }
    closeAll() {
        this.state.containerRef.current.closeAll()
    }
    render() {
        const { lWidth, screenSize, containerRef, editWidth } = this.state;
        const loop = (node) => {
            let res = [];
            node.forEach((v, k) => {
                let obj = JSON.parse(JSON.stringify(v, k));
                delete obj.children;
                if (v.children != null) {
                    res.push(<TreeNode icon={<Icon type="bars" />} title={<span draggable="true">{v.name}</span>} key={v.id + k}>
                        {loop(v.children)}
                    </TreeNode>)
                } else {
                    res.push(<TreeNode icon={<Icon type="video-camera" />} className="drag" title={<span draggable="true" onDragStart={this.onMenuDragStartHandle.bind(this)} onDoubleClick={this.setActiveVideo.bind(this)} data-obj={JSON.stringify(obj)} >{v.name}</span>} key={v.id + k} />);
                }
            });
            return res;
        };
        const btn = () => {
            return <Radio.Group defaultValue="a" size="small">
                <Radio.Button value="a" onChange={(e) => {
                    this.checkRadio(e);
                }}>云台</Radio.Button>
                {/* <Radio.Button value="b" onChange={(e) => {
              this.checkRadio(e);
          }}>视频参数</Radio.Button> */}
            </Radio.Group>
        };
        const onPlayerListener = {
            play() { },
            // 监听错误信息
            error(error = {}) {
                if (typeof error === 'object') {
                    const { code, errorMsg, target, data, index } = error

                    function onReload() {
                        containerRef.current.setActivated(index)
                        containerRef.current.setPlayingVideo(data)
                    }
                    const ErrorDom = () => {
                        const domRef = useRef()
                        useEffect(() => {
                            target.appendChild(domRef.current)
                            const $reload = target.querySelector('#videoReload')
                            $reload.addEventListener('click', onReload, false)
                            return () => {
                                $reload.removeEventListener('click', onReload, false)
                            }
                        }, [])

                        return (
                            <div ref={domRef}>
                                <div className="sullivan-video-reload">
                                    <span id="videoReload">重新加载</span>
                                </div>
                                <div className="sullivan-video-error">
                                    <span>{errorMsg}</span>
                                </div>
                            </div>
                        )
                    }
                    if (code === 5015) {
                        // 流不存在，错误处理。
                        ReactDOM.render(<ErrorDom />, document.createElement('div'))
                    }
                }
                console.error('error：', error)
            },
            itemClick(options) {
                if (options) {
                    that.itemClick(options.url, options.deviceId)
                }
            },
            screenshot(arg) {
                console.log('screenshot: => ', arg)
            },
            destroy(obj) {
                console.log(obj);
            },
            close(data) {
                that.setState({ cameraId: '' })
                // console.log('close', data)
            },
            videoTransform(arg) {
                console.log('videoTransform: => ', arg)
            },
            movement(arg) {
                let data = arg.url.split('/')
                fetch('/nelda-inspection/redisInfoController/getEquipmentInfo?equipmentId=' + arg.deviceId)
                    .then(r => r.json())
                    .then(b => {
                        let databody = b.data.body
                        if (Object.keys(databody).length > 0) {
                            if (databody.status == 0) {
                                if (arg.direction && arg.url) {
                                    if (['left', 'right', 'top', 'bottom'].includes(arg.direction)) {
                                        that.direction(Ptz[arg.direction]({ id: data[0], channel: data[1] }))
                                    }
                                    setTimeout(() => {
                                        that.direction(Ptz.stop({ id: data[0], channel: data[1] }))
                                    }, 500);
                                } else {
                                    message.warning('请选择摄像头')
                                }
                            } else {
                                message.error('正在执行巡检任务');
                            }
                        } else {
                            message.warning('正在执行巡检任务')
                            return false
                        }
                    })
            },
            transform(arg) { },
            /**
             * 鼠标滚轮控制摄像头 放大缩小
             *
             * 1. 滚轮开始滚动时，判定为开始滚动，摄像头开始放大或缩小。
             * 2. 滚轮停止滚动超过 200 毫秒，判断为一次滚动结束，停止本次放大缩小。
             * 3. 摄像头放大缩小只与滚动时长相关，与滚动速度无关。
             */
            // wheel(arg) {
            //     if (!arg?.url) {
            //         console.error('arg.url is not find!')
            //         return
            //     }

            //     const timer = Date.now()
            //     let { code, serial } = arg
            //     let data = { id: code, channel: serial }
            //     const url = `/webrtc-api/gb28181/control?id=${code}&channel=${serial}&ptzcmd=`

            //     if (stopZoomTimer) {
            //         clearTimeout(stopZoomTimer)
            //         stopZoomTimer = null;
            //     }
            //     function startCmd(error, ptzUrl, { type, cmd, index }) {
            //         fetch(url + cmd)
            //     }

            //     if (!zoomTimer) {
            //         // 向下滚动 缩小
            //         if (arg.deltaY > 0) {
            //             Ptz.zoomNear(data, startCmd);
            //         }
            //         // 向上滚动 放大
            //         if (arg.deltaY < 0) {
            //             Ptz.zoomFar(data, startCmd);
            //         }
            //     }

            //     zoomTimer = timer
            //     stopZoomTimer = setTimeout(() => {
            //         Ptz.stop(data, startCmd);
            //         zoomTimer = null;
            //     }, 200)
            // },
        }
        const temp_videoScreen = () => {
            let con = [];
            for (let i = 1; i < 7; i++) {
                let img = require('./img/videoIcon/temp_video' + i + '.png').default;
                con.push(<div className="videoChangScreen pointer" key={img + i}
                    onClick={() => {
                        let num = 1;
                        let column = ''
                        if (i == 2) { num = 4 }
                        if (i == 3) { num = 9 }
                        if (i == 4) { num = 16 }
                        if (i == 5) { num = 25 }
                        if (i == 6) { num = 36 }
                        if (i == 3) { column = 3 }
                        if (i == 5) { column = 5 }
                        this.setState({ screenSize: num, column: column, showVideoCon: 'none' });
                    }}><img src={img} /></div>);
            }
            return con;
        };
        const mainBtn = () => {
            return <div className="mainBtn r_flex jc_sb" style={{ width: `calc(${this.state.editWidth}% - 50px) ` }}>
                <div className="r_flex">
                    <div className="showCameraBtn as_c margin_lr15 pointer mainBtnSize" title="侧边栏"
                        onClick={() => {
                            this.editWidth();
                        }}></div>
                    <div className="border_right_line"></div>
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
                            this.editWidth();
                        }}></div>
                    <div className='stopall margin_lr15 pointer as_c' titie='暂停所有窗口' onClick={this.closeAll.bind(this)}></div>
                </div>
                <div className="videoFlex c_flex" style={{ display: this.state.showVideoCon }}>
                    <div className="r_flex fw_w jc_sb" style={{ width: '100%', lineHeight: 'normal' }}>
                        {temp_videoScreen()}
                    </div>
                </div>
            </div>
        };
        return (
            <div className="r_flex contain">
                <div style={{ width: `calc(100% - 59px)`, display: 'flex', flexDirection: 'row', overflowY: 'scroll', background: ' #073938' }}>
                    <div style={{
                        width: `${lWidth}%`,
                        height: `calc(100vh - 64px)`,
                        overflow: 'hidden',
                        display: `${lWidth == 0 ? 'none' : 'block'}`,
                        overflowY: 'auto',
                        background: '#fff'
                    }}>
                        <Collapse className="cannotSelectText" defaultActiveKey={['1', '3']} expandIconPosition={'right'} >
                            <Panel header="区域" key="1">
                                <Tree showIcon>{loop(this.state.treeData)}</Tree>
                            </Panel>
                            <Panel header={btn()} key="3">
                                <Ptz option={this.state.option} cameraId={this.state.cameraId}></Ptz>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className="demo-blend" style={{ width: `${editWidth}%` }}>
                        <div className="video-multiple-main">
                            <SullivanVideoMultiple
                                className="video-multiple-container"
                                style={{ width: '100%', height: '100%' }}
                                childClass="video-item"
                                childStyle={{ boxShadow: '0 0 5px #ccc' }}
                                ref={containerRef}
                                defaultActivated={0}
                                screenSize={screenSize}
                                useWebRTC={true}
                                timeRefresh={1000 * 60 * 10}
                                record={true}
                                recording={true}
                                movement={true}
                                screenshot={true}
                                zoom={true}
                                transform="3d"
                                on={onPlayerListener}
                            />
                        </div>
                        {mainBtn()}
                    </div>
                </div>
            </div>
        )
    }
}
/* eslint-enable */