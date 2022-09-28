import React from 'react';
// import { observer } from 'mobx-react';
import { Form } from 'antd';
import '../renyuanmenjin/index.scss';

// @ observer
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [],
            isactive: '1',
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.List != nextProps.tableList) {
            this.setState({
                List: nextProps.tableList,
                
            })
        }
    }
    componentDidMount() {
        //文字无缝滚动
        // this.industryNews = setInterval(this.taskIndustryNews, 200);
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
        // this.industryNews = setInterval(this.taskIndustryNews, 200);
    }
    componentWillUnmount = () => {
        clearInterval(this.industryNews);
    }
    menjinjinchu = (value, type, isAll) => {
        this.setState({
            isactive: value
        })
        let id = this.props.equipmentid
        this.props.getList(id, type, isAll)
    }
    acc(data) {
        let { isalert } = this.props
        isalert(data)
    }
    render() {
        return (
            <div className='ceShiTable'>
                <div className='ceShiTable-title'>
                    <span className='ceShiTable-text2' style={{ width: "7.5%" }}>门禁</span>
                    <span className='ceShiTable-text2' style={{ width: "7.5%" }}>人员</span>
                    <span className='ceShiTable-text2' >所属单位</span>
                    <span className='ceShiTable-text2'>编号</span>
                    <span className='ceShiTable-text2' style={{ width: "7.5%" }}>职务</span>
                    <span className='ceShiTable-text2' style={{ width: "7.5%" }}>进/出</span>
                    <span className='ceShiTable-text2'>时间（入/出）</span>
                    <span className='ceShiTable-text2'>联系方式</span>
                </div>
                <div
                    ref='newDiv'
                    className='ceShiTable-body'
                    // onMouseEnter={this.handleIndustryNewsEnter.bind(this)}
                    // onMouseLeave={this.handleIndustryNewsLeave.bind(this)}
                >
                    <ul ref='newDivUI'>
                        {this.props.tableList && this.props.tableList.length > 0
                            ?
                            this.props.tableList.map((item, index) => {
                                return (
                                    <li key={index} onClick={this.acc.bind(this, item)}>
                                        <span className='ceShiTable-text2' style={{ width: "7.5%" }}>
                                            {item.locationAreaName}
                                        </span>
                                        <span className='ceShiTable-text2' style={{ width: "7.5%" }}>
                                            {item.personName}
                                        </span>
                                        <span className='ceShiTable-text2'>
                                            {item.deptName}
                                        </span>
                                        <span className='ceShiTable-text2'>
                                            {item.personCode}
                                        </span>
                                        <span className='ceShiTable-text2' style={{ width: "7.5%" }}>
                                            {/* 职务  */}
                                            {item.postName}
                                        </span>
                                        <span className='ceShiTable-text2' style={{ width: "7.5%" }}>
                                            {/* 进出  */}
                                            {item.state}
                                        </span>
                                        <span className='ceShiTable-text2'>
                                            {/* 时间 */}
                                            {item.time}
                                        </span>
                                        <span className='ceShiTable-text2'>
                                            {/* 电话 */}
                                            {item.mobile_phone}
                                        </span>
                                    </li>
                                );
                            })
                            : <span className='noData'>暂无数据</span>
                        }
                    </ul>
                </div>
                <div className='menjingBtn' style={{ textAlign: 'left' }}>
                    <div style={{ width: '30px', height: "30px", cursor: "pointer" }} title={"进出"} className={this.state.isactive == 1 ? 'mjjcactive' : 'mjjc'} onClick={this.menjinjinchu.bind(this, 1, 0, 'all')}></div>
                    <div style={{ width: '30px', height: "30px", cursor: "pointer" }} title={"逗留"} className={this.state.isactive == 2 ? 'mjdlactive' : 'mjdl'} onClick={this.menjinjinchu.bind(this, 2, 0, '')}></div>
                </div>
            </div>

        );
    }


}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;
