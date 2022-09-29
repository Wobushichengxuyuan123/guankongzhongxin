/* eslint-disable */
import React from 'react';
// import './css/videoItem.scss';


class Main extends React.Component {
    jianKHander(e) {
        e.stopPropagation();
        if (this.props.data.channel_num) {
            this.props.data.channelNum = this.props.data.channel_num
        }
        if (this.props.data.equiment_code) {
            this.props.data.equimentCode = this.props.data.equiment_code
        }
        let data = JSON.stringify({
            cameraId: this.props.data.equipment_id,
            serial: this.props.data.channelNum,
            code: this.props.data.equimentCode
        })
        window.controlVideoCon && window.controlVideoCon(data)
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
    render() {
        return (<div className="videoItem" >
            {this.props.data.resource_class_icon ? <div className="videoIcon"><img src={this.props.data.resource_class_icon} /></div> : null}
            <div className="videoNo">{this.props.data.index}.</div>
            <div className="videoName">{this.props.data.equipment_name} <span className={"videoWz sxt" + this.props.data.status}>{this.props.data.equipment_location}</span></div>
            <div className="videoOperation">
                <div className="jiankong" onClick={this.jianKHander.bind(this)}>监控</div>
                <div className="huifang" style={{ display: "none" }} onClick={this.hisHander.bind(this)}>回放</div>
            </div>
        </div>);
    }
}

export default Main;

/* eslint-enable */