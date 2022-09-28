/* eslint-disable */
import React from 'react';
import { Icon } from 'antd';
import Swiperone from './swiper'
import SwiperonePicture from './swiperPicture'
import Fxgk from '../echarts/fengxianguankong'
import Qsfx from '../echarts/qusgufenxi'
import Yhzl from '../echarts/yinhuanzhili'
import Znyj from '../echarts/zhinengyujing'
import Yujing from '../echarts/yujing'
import Daozha from '../echarts/daozha'
import Menjin from '../echarts/menjin'
import Fengxian from './fengxian/fengxian'
import ZnYujing from './ranking/rankingInfo'
import Yinhuan from './hiddenDanger/hiddenDangerinfo'
import Video from './video'
import Liebiao from './table';
class AlarmAlter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introduceImg: '',
            isfengxian: false,
            istypeone: false,
            isyujing: false,
            Istable: false,
            shebeileixingList: [],
            sanweiList: [],
        }
        this.timer = null
    }
    componentDidMount() {
        this.props.onRef(this)
        this.getshebei()
        this.start()
        this.domsuoxiao()
    }

    start() {
        this.timer = setInterval(() => {
            this.Fxgk.getfengxianguankong()
            this.Yhzl.getyinhuanzhili()
            this.Znyj.getpaimingfenxi()
            this.Qsfx.qusifenxi()
            this.Menjin.getBar()
            this.Daozha.getBar1()
            this.Yujing.getyujing()
        }, 60 * 1000);
    }
    // 批量接口请求结束 
    stop() {
        clearInterval(this.state.timer)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.introduceImg != undefined) {
            this.setState({
                introduceImg: nextProps.introduceImg,
            })
        }
    }
    getshebei() {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubEquipmentCategories/pageQuery",
            {
                method: 'POST',
                body: JSON.stringify({ pageNo: 1, pageSize: 100, }),
            })
            .then(r => r.json())
            .then(res => {
                if (res.data.list) {
                    let data = res.data.list
                    data.map((item, index) => {
                        if (item.isMapShow == 0) {
                            delete data[index]
                        }
                    })
                    this.setState({
                        shebeileixingList: res.data.list || []
                    })

                }
            })
    }
    getvideo(loginName) { this.setState({ loginName: loginName }) }
    open() {
        this.props.parten.openimg()
    }
    getAlarmCount(date) {
        fetch(window.BASICS_SYSTEM + "/pubAlarmSearch/alarmCount?alarmType=F&date=" + date)
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    if (b.data[0]) {
                        this.setState({
                            alarmCount: b.data[0].count
                        })

                    } else {
                        this.setState({
                            alarmCount: 0
                        })
                    }
                }
            })
    }
    onTypeChange = (event, checkedItem) => {
        const { sanweiList } = this.state
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        checkedItem.checked = value;
        let newList = [...sanweiList];
        let isHas = newList.find((it) => {
            return it.id == checkedItem.id;
        });
        if (isHas) {
            newList = newList.filter((item) => item.checked);
        } else {
            newList.push(checkedItem);
        }
        this.setState({ sanweiList: newList })
        let add = []
        newList.map(item => {
            add.push(item.equipmentCategoriesName)
        })
        if (window.PushData) {
            window.PushData && window.PushData("shebeiType" + "@" + JSON.stringify(JSON.stringify(add)));
        } else {
            window.GisMap.shebeiType(JSON.stringify(add));
        }
    }

    // 三维开始
    goback() {
        window.PushData && window.PushData('GisGoBack')
    }
    bonefangda() {
        this.setState({
            istypeone: !this.state.istypeone
        }, () => {
            this.state.istypeone == true ? this.fangdatwo() : this.suoxiaotwo()
        })
    }
    fangdatwo() {
        this.domfangda()
        let dom = document.getElementById('sanweifangda')
        dom.style.width = '100vw';
        dom.style.height = '95vh';
        dom.style.position = 'static';
        document.getElementById('fangda').style.display = 'none'
        document.getElementById('video').style.display = 'none'
        document.getElementById('header_top_L').style.display = 'none'
    }
    suoxiaotwo() {
        this.domsuoxiao()
        let dom = document.getElementById('sanweifangda')
        dom.style.width = '82%';
        dom.style.height = '65vh';
        dom.style.position = 'relative';
        document.getElementById('fangda').style.display = 'flex'
        document.getElementById('video').style.display = 'flex'
        document.getElementById('header_top_L').style.display = 'flex'
    }
    domfangda() {
        let dom = document.getElementById('cesiumContainer')
        dom.style.height = '95vh'
        dom.style.marginTop = '5vh'
        dom.style.width = '100%'
        dom.style.marginLeft = '0%'
    }
    domsuoxiao() {
        let dom = document.getElementById('cesiumContainer')
        dom.style.height = '65vh'
        dom.style.marginTop = '5vh'
        dom.style.width = '70%'
        dom.style.marginLeft = '15%'
    }

    // 三维结束
    menjindaozha = (a, b, c, d, e) => {
        this.setState({
            Istable: true,
            isimg: false,
            isyujing: false,
            isfengxian: false,
            isyinhuan: false,
        }, () => {
            setTimeout(() => {
                this.daozha.onChange1(a, b, c, d, e)
            }, 10)
        })
    }
    openImg2(src) {
        this.setState({ imgsrc: src, isimg: true, Istable: false })
    }
    isfengxian = (data) => {
        this.setState({
            isfengxian: true,
            isyujing: false,
            isyinhuan: false,
            Istable: false,
            isimg: false,
            date: data
        })
        this.getAlarmCount(data)
    }
    Isyujing = (a) => {
        this.setState({
            isyujing: true,
            isfengxian: false,
            isyinhuan: false,
            Istable: false,
            isimg: false,
            alarmComfrom: a
        })
    }
    isYinhuan = () => {
        this.setState({
            isyinhuan: true,
            isfengxian: false,
            isyujing: false,
            Istable: false,
            isimg: false,
        })
    }
    // 关闭事件
    chose() { this.setState({ Istable: false, }) }
    closeImg2() { this.setState({ isimg: false }) }
    closeyujing() { this.setState({ isyujing: false }) }
    closeYinhuan() { this.setState({ isyinhuan: false }) }
    closefengxian() { this.setState({ isfengxian: false }) }
    // 关闭事件结束
    render() {
        const { introduceImg, isfengxian, date, alarmCount, shebeileixingList, istypeone, Istable, imgsrc, isimg, isyujing, isyinhuan, alarmComfrom } = this.state
        return (
            <div className='daping-header'>
                <div className='header-top'>
                    <div className='header_top_L' id='header_top_L'>
                        <div style={{ height: '33.3%', border: '1px solid #5CA0B7' }} onClick={this.open.bind(this)}><img style={{ width: '100%', height: '100%' }} src={introduceImg} /></div>
                        <div style={{ height: '33.4%', border: '1px solid #5CA0B7' }}> <SwiperonePicture openImg={this} /> </div>
                        <div style={{ height: '33.3%', border: '1px solid #5CA0B7' }}> <Swiperone />  </div>

                        {/* 预警 */}
                        {isyujing ? <div className="menu-info" style={{ overflow: "hidden" }}>
                            <div className="cbtn" onClick={this.closeyujing.bind(this)}>
                                <Icon type="close" />
                            </div>
                            <ZnYujing date={date} alarmComfrom={alarmComfrom} />
                        </div> : null}

                        {/* 风险 */}
                        {isfengxian ?
                            <div className="menu-info" style={{ overflow: "hidden" }}>
                                <div className="cbtn" onClick={this.closefengxian.bind(this)}>
                                    <Icon type="close" />
                                </div>
                                <Fengxian date={date} alarmCount={alarmCount} />
                            </div>
                            : null}

                        {/* 隐患 */}
                        {isyinhuan ? <div className="menu-info" style={{ overflow: "hidden" }}>
                            <div className="cbtn" onClick={this.closeYinhuan.bind(this)}>
                                <Icon type="close" />
                            </div>
                            <Yinhuan date={date} alarmCount={alarmCount} />
                        </div> : null}
                    </div>
                    <div className='header_top_R' >
                        <div className='sanwei' id='sanweifangda' >
                            <div className='r_one'>
                                <div className='r_one_b'>
                                    {shebeileixingList.map((item, idx) => {
                                        return (
                                            <div key={item.id}>
                                                <input type="checkbox" checked={item.checked || ''} id={item.id} onChange={e => this.onTypeChange(e, item, idx)} style={{ display: 'none', marginRight: '5px' }} />
                                                <img style={{ marginLeft: '5px', width: '22px', height: '22px' }} src={item.resourceClassIcon} />
                                                <label htmlFor={item.id} className={item.checked ? 'weixuanzhong' : 'xuanzhog'} >{item.equipmentCategoriesName}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='r_twoone' onClick={this.goback}>
                                <div className={'dingwei'} ></div>
                            </div>
                            <div className='r_two' onClick={this.bonefangda.bind(this)}>
                                <div className={istypeone ? 'sanweiimgon' : 'sanweiimgoff'} ></div>
                            </div>
                        </div>
                        <div className='video' id='video'> <Video loginName={this.state.loginName} /></div>
                        {Istable ? <Liebiao onRef={ref => this.daozha = ref} parent={this} /> : null}
                        {isimg ? <div className='img_warpy' onClick={this.closeImg2.bind(this)}> <img src={imgsrc} alt="" /></div> : null}
                    </div>
                </div>
                <div className='header-bottom' id='fangda'>
                    {/* 风险管控 */}
                    <div className='header_bottom_div'>
                        <Fxgk parent={this} onRef={ref => this.Fxgk = ref} />
                    </div>
                    {/* 隐患治理 */}
                    <div className='header_bottom_div'>
                        <Yhzl onyh={() => { this.isYinhuan() }} onRef={ref => this.Yhzl = ref} />
                    </div>
                    {/* 智能预警 */}
                    <div className='header_bottom_div'>
                        <Znyj isyujing={(a) => { this.Isyujing(a) }} onRef={ref => this.Znyj = ref} />
                    </div>
                    {/* 趋势分析 */}
                    <div className='header_bottom_div'>
                        <Qsfx onRef={ref => this.Qsfx = ref} />
                    </div>
                    {/* 门禁 */}
                    <div className='header_bottom_div'>
                        <Menjin onRef={ref => this.Menjin = ref} onDaozha={(a, b, c, d, e) => { this.menjindaozha(a, b, c, d, e) }} />
                    </div>
                    {/* 道闸 */}
                    <div className='header_bottom_div'>
                        <Daozha onRef={ref => this.Daozha = ref}
                            onDaozha={(a, b, c, d, e) => { this.menjindaozha(a, b, c, d, e) }}
                        />
                    </div>
                    {/* 预警 */}
                    <div className='header_bottom_div'>
                        <Yujing onRef={ref => this.Yujing = ref} />
                    </div>
                </div>
            </div>
        )
    }
}
export default (AlarmAlter);
/* eslint-enable */