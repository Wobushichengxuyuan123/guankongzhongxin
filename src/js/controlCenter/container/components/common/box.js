/* eslint-disable */
import React from 'react';
import VideoItem from '../../videoItem';
import EntranceItem from '../../entranceItem';//门禁
import RadioItem from '../../radioItem';//广播
import LaneItem from '../../laneItem';//道闸
import '../../css/videoItem.scss';
class Main extends React.Component {
    //摄像头-监控
    jianKHander(e) {
        e.stopPropagation();
        // window.controlVideoCon(this.props.data.id)
    }
    //其他操作
    demo(e) {
        e.stopPropagation();
    }

    hisHander(e) {
        e.stopPropagation();
        let winInfo = {
            name: this.props.data.equipment_name,
            type: "video",
            id: this.props.data.src_equipment_id,
            area_name: this.props.data.location_area_name,
            equipment_location: this.props.data.equipment_location,
            isHistory: true
        }
        window.WinContainer.addWinInfo(winInfo);
    }

    dwHander() {
        let { parent, data } = this.props;
        if (parent) {
            parent.toggleRightBox(true, data)
        }
        if (window.PushData) {
            window.PushData("ShebeiToGis" + "@" + JSON.stringify({ id: this.props.data.equipment_id }));
        } else {
            GisMap.ShebeiToGis({ id: this.props.data.equipment_id });
        }
    }
    render() {
        let { typeName } = this.props.data
        let propsData = this.props.data
        propsData.id ? '' : propsData.id = propsData.equipmentId
        propsData.equipment_id = propsData.id
        let btnDom = () => {
            let dom
            switch (typeName) {
                case '视频设备': case '摄像机':
                    dom = <VideoItem dwHander={this.dwHander} data={propsData} key={propsData.id} />
                    break
                case '道闸':
                    dom = <LaneItem dwHander={this.dwHander} data={propsData} key={propsData.id} />
                    break
                case '门禁': case '人脸识别一体机': case '门禁控制主机':
                    dom = <EntranceItem dwHander={this.dwHander} data={propsData} key={propsData.id} />
                    break
                case '广播':
                    dom = <RadioItem dwHander={this.dwHander} data={propsData} key={propsData.id} />
                    break
                default:
                    dom = <div className="videoItem " onClick={this.dwHander.bind(this)}>
                        {
                            propsData.resourceIcon
                                ? <div className="videoIcon">
                                    <img className={propsData.status == "0" ? 'offlineImg' : ''} src={propsData.resourceIcon} />
                                </div>
                                : null
                        }
                        <div className="videoNo">{propsData.index}.</div>
                        <div className="videoName">{propsData.equipment_name} <span
                            className={"videoWz"}>{propsData.equipment_location}</span></div>
                    </div>
            }
            return dom
        }
        return btnDom();
    }
}

export default Main;

/* eslint-enable */