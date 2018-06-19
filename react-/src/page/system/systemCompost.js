import { Input, Form, TreeSelect, Modal, Button, Select, Option,Icon, Col, Row, React, Component, Table, Header} from "../../config/router";
  const FormItem = Form.Item;
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '操作',
        render(text){
            return <div><Icon type="form" style={{color:"#888888", fontSize: '20px', marginRight: 20}} /><Icon type="edit" style={{color:"#888888", fontSize: '20px'}}/></div>
        }
    }
];
class AddCompost extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {

                    console.log('Received values of form: ', values);
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="所在村镇"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                                }}>
                                    {getFieldDecorator('department', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入村镇'
                                    }
                                ]
                            })(
                                ( <TreeSelect
                                            showSearch
                                            dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                            placeholder="请选者村或镇"
                                            allowClear
                                            treeDefaultExpandAll={true}
                                            treeData={this.props.treeData}
                                        >
                                        </TreeSelect>)
                            )}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="堆肥房编号"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('trashId', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入堆肥房编号'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col span={12}>
                        <FormItem
                            label="堆肥房名称"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入堆肥房名称'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="服务人口"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入服务人口'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="堆肥房模式"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('party', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入堆肥房模式'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="房长姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入房长姓名'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="房长电话"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('accountNumber', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入房长电话'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   
               </Row>
                <FormItem
                    wrapperCol={{
                    span: 14,
                    offset: 5,
                    style: {
                        textAlign: 'right'
                    }
                }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const AddCompostConment = Form.create()(AddCompost);
class SystemCompost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render(){
        return(
                <div id={"systemCompost"}>
                    <Modal 
                    onCancel={()=>{this.setState({visible: false})}}
                    footer = {null}
                    title="新增堆肥房"
                    
                    visible={this.state.visible}>
                        <AddCompostConment/>
                    </Modal>
                    <Row style={{marginTop: 20}}>
                        <Col span={4} style={{textAlign: 'center',lineHeight: "32px"}}>
                            添加堆肥房 
                            <Icon onClick={()=>{this.setState({visible: true})}} type='plus' style={{color: "rgb(87, 138, 251)"}} />
                        </Col>
                        <Col span={2} style={{lineHeight: "32px"}}>
                            选择村/镇 
                        </Col>
                        <Col span = {4}>
                            <Select style={{width: "100%"}}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                        </Col>
                        <Col span={3}  style={{textAlign: 'right'}}>
                            <Button type='primary'>查询</Button>
                        </Col>
                    </Row>
                   <div style={{marginTop: 20}}>
                       <Table dataSource={dataSource} columns={columns}/>
                   </div>
                </div>
        )
    }
}
const systemCompost = ()=> {
    return <SystemCompost/>
}
export default systemCompost