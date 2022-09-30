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
            isactive:'1'
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
    daozhajinchu = (value, type, isAll) => {
        this.setState({
            isactive:value
        })
        let id = this.props.equipmentid
        this.props.getList(id,type, isAll)
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
    carinfo=(item)=>{
        let {carCallback} = this.props
        carCallback(item)
    }
    render() {
        return (
            <div className='ceShiTable'>
                <div className='ceShiTable-title'>
                    <span className='ceShiTable-text1' style={{width:"10%"}}>道闸</span>
                    <span className='ceShiTable-text1'>车牌号</span>
                    <span className='ceShiTable-text1' style={{width:"10%"}}>车辆类型</span>
                    <span className='ceShiTable-text1'>组织</span>
                    <span className='ceShiTable-text1' style={{width:"10%"}}>驾驶员</span>
                    <span className='ceShiTable-text1' style={{width:"10%"}}>进/出</span>
                    <span className='ceShiTable-text1'>进入时间</span>
                    <span className='ceShiTable-text1' style={{width:"10%"}}>时长</span>
                    <span className='ceShiTable-text1'>联系方式</span>
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
                                return (
                                    <li key={index} onClick={this.carinfo.bind(this, item)}>
                                        <span className='ceShiTable-text1' style={{width:"10%"}}>
                                            {item.locationAreaName}
                                        </span>
                                        <span className='ceShiTable-text1'>
                                            {item.carNo}
                                        </span>
                                        <span className='ceShiTable-text1' style={{width:"10%"}}>
                                            {item.carType}
                                        </span>
                                        <span className='ceShiTable-text1'>
                                            {item.deptName}
                                        </span>
                                        <span className='ceShiTable-text1' style={{width:"10%"}}>
                                            {item.personName}
                                        </span>
                                        <span className='ceShiTable-text1' style={{width:"10%"}}>
                                            {item.state}
                                        </span>
                                        <span className='ceShiTable-text1'>
                                            {item.time}
                                        </span>
                                        <span className='ceShiTable-text1' style={{width:"10%"}}>
                                            {item.duration}
                                        </span>
                                        <span className='ceShiTable-text1'>
                                            {item.phone}
                                        </span>
                                    </li>
                                );
                            })
                            : <span className='noData'>暂无数据</span>
                        }
                    </ul>
                </div>
                <div className='menjingBtn' style={{textAlign:'left'}}>
                    <div style={{ width: '30px', height: "26px", cursor: "pointer" }} title={"进出"} className={this.state.isactive == 1 ? 'dzjcactive' : 'dzjc'} onClick={this.daozhajinchu.bind(this, 1, 1, 'all')}></div> 
                    <div style={{ width: '30px', height: "26px", cursor: "pointer" }} title={"逗留"} className={this.state.isactive == 2 ? 'dzdlactive' : 'dzdl'} onClick={this.daozhajinchu.bind(this, 2, 1, '')}></div>
                </div>
            </div>
        );
    }


}
const EditableFormTable = (EditableTable);
export default EditableFormTable;
