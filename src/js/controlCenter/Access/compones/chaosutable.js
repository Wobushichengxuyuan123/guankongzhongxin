import React from 'react';
// import { observer } from 'mobx-react';
import { Form } from 'antd';
import '../renyuanmenjin/index.scss';

// @ observer
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: this.props.tableList || [],
        }
    }
    componentDidMount() {
        //文字无缝滚动
        this.industryNews = setInterval(this.taskIndustryNews, 200);
    }

    taskIndustryNews = () => {
        if (this.refs.newDiv.scrollTop >= this.refs.newDivUI.offsetHeight - this.refs.newDiv.clientHeight) {
            this.refs.newDiv.scrollTop = 0;
        }
        else {
            this.refs.newDiv.scrollTop += 1;
        }
    }
    handleIndustryNewsEnter = () => {
        clearInterval(this.industryNews);
    }
    handleIndustryNewsLeave = () => {
        this.industryNews = setInterval(this.taskIndustryNews, 200);
    }
    componentWillUnmount = () => {
        clearInterval(this.industryNews);
    }
    carcesu=(item)=>{
        let {carcesuCallback} = this.props
        carcesuCallback(item)
    }
    render() {
        return (
            <div className='ceShiTable'>
                <div className='ceShiTable-title'>
                    <span className='ceShiTable-text3'>序号 </span>
                    <span className='ceShiTable-text3'>道闸</span>
                    <span className='ceShiTable-text3'>车牌号</span>
                    <span className='ceShiTable-text3'>车辆类型</span>
                    <span className='ceShiTable-text3'>所属单位</span>
                    <span className='ceShiTable-text3'>驾驶员</span>
                    <span className='ceShiTable-text3'>速度</span>
                    <span className='ceShiTable-text3'>超速时间</span>
                    <span className='ceShiTable-text3'>超速地点</span>
                    <span className='ceShiTable-text3'>联系方式</span>
                </div>
                <div
                    ref='newDiv'
                    className='ceShiTable-body'
                    onMouseEnter={this.handleIndustryNewsEnter.bind(this)}
                    onMouseLeave={this.handleIndustryNewsLeave.bind(this)}
                >
                    <ul ref='newDivUI'>
                        {this.props.tableList && this.props.tableList.length > 0
                            ?
                            this.props.tableList.map((item, index) => {
                                if(index==0){ 
                                    index=1;
                                }else{
                                    index++
                                }
                                return (
                                    <li key={index} onClick={this.carcesu.bind(this, item)}>
                                        <span className='ceShiTable-text3'>
                                            {index}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.locationAreaName}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.carNo}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.carType}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.deptName}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.personName}
                                        </span>
                                        <span className='ceShiTable-text3'  style={{color: (item.speed >= '30') ? "red" : "#000"}}>
                                            {item.speed}KM/H
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.time}
                                        </span>
                                        <span className='ceShiTable-text3'  style={{color: (item.speed >= '30') ? "red" : "#000"}}>
                                            {item.areaName}
                                        </span>
                                        <span className='ceShiTable-text3'>
                                            {item.mobile_phone}
                                        </span>
                                    </li>
                                );
                            })
                            : <span className='noData'>暂无数据</span>
                        }
                    </ul>
                </div>
            </div>
        );
    }


}
const EditableFormTable =(EditableTable);
export default EditableFormTable;
