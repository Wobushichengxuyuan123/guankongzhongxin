import React from "react";
import { Input, Form, message, Switch, Select } from 'antd';
import './index.scss'
const FormItem = Form.Item;
var that = null;

class Addpoint extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            readonly: false,
            quyuList: [],
            locationAreaId_Name: ''
        };
        that = this;

    }
    componentDidMount() {
        if (this.props.viewId) {
            this.getDataById(this.props.viewId);
        }
        this.quyu()
        this.update()
    }
    componentWillReceiveProps(nextProps) {
        this.formRef.current.resetFields()
        if (nextProps.viewId != this.props.viewId) {
            this.getDataById(nextProps.viewId);
        }
    }
    quyu() {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubLocationArea/listQueryAll", {
            method: "Post",
            body: JSON.stringify({
                projectId: sessionStorage.getItem('projectId')
            })
        })
            .then(r => r.json())
            .then(b => {
                this.setState({
                    quyuList: b.data
                })
            })
    }
    update() {
        window.WebLonLatpoints = (data) => {
            let list = JSON.parse(data)
            this.formRef.current.setFieldsValue({
                "xcoordinate": list.Lon,
                "ycoordinate": list.Lat,
                "zcoordinate": list.Hei
            });

        }
    }
    getDataById(id) {
        fetch(window.SYSTEM_CONFIG_BASICS + "/pubPointPosition/getDataById?id=" + id, {
            method: "get",
        })
            .then(r => r.json())
            .then(b => {
                if (b.data) {
                    let data = b.data;
                    data.status = data.status == 1 ? true : false
                    this.formRef.current.setFieldsValue(data);
                }
            })
    }
    onFinish() {
        console.log(1);
    }
    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className="addDepartment">
                <Form onFinish={this.onFinish} ref={this.formRef}  >
                    <FormItem {...formItemLayout} label="点位名称" name='pointName' rules={[{ required: true, message: '请输入点位名称！' }, { max: 50, message: '长度超出限制' }]}>
                        <Input disabled={this.state.readonly} placeholder="点位名称" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="点位编码" name='pointCode'
                        rules={[
                            { required: true, message: '请输入点位编码！' }, { max: 30, message: '长度超出限制' },
                            { pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/, message: '仅支持字母数字和特殊字符格式编码 不能以_开头或结尾' }
                        ]}>
                        <Input disabled={this.state.readonly} placeholder="点位编码" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属项目" name='projectName' rules={[{ required: true, message: '请输入所属项目！' }]}>
                        <Input disabled={true} placeholder="请输入所属项目" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属项目" name='projectId' rules={[{ required: true, message: '请输入所属项目！' }]} style={{ display: 'none' }}>
                        <Input disabled={true} placeholder="请输入所属项目" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属区域" name='locationAreaId' initialValue={this.state.locationAreaId_Name} rules={[{ required: false, message: '请输入区域！' }]} >
                        <Select placeholder="请选择所属区域" disabled={this.state.readonly} className="search_ipt01">
                            {this.state.quyuList.map((item, index) => {
                                return <option key={index} value={item.id}>{item.locationAreaName}</option>
                            })}
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout} label="X坐标" name='xcoordinate'
                        rules={[{ required: false, message: '请输入X坐标！' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '请输入正确的X坐标' }]}>
                        <Input disabled={this.state.readonly} placeholder="X坐标" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Y坐标" name='ycoordinate'
                        rules={[{ required: false, message: '请输入Y坐标！' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '请输入正确的Y坐标' }]}>
                        <Input disabled={this.state.readonly} placeholder="Y坐标" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Z坐标" name='zcoordinate'
                        rules={[{ required: false, message: '请输入Z坐标！' }, { pattern: /^-?[0-9]{1,10}([.][0-9]{1,10})?$/, message: '请输入正确的Z坐标' }]}>
                        <Input disabled={this.state.readonly} placeholder="Z坐标" className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述" name='description' rules={[{ required: false, message: '请输入描述！' }, { max: 200, message: '长度超出限制' }]}>
                        <Input.TextArea disabled={this.state.readonly} placeholder="描述" rows={4} className="search_ipt01" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="启用/禁用" name='status' initialValue={true} rules={[{ required: true, message: '请输入状态！' }]}>
                        <Switch checkedChildren="启用" unCheckedChildren="禁用" disabled={this.state.readonly} />
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Addpoint;
