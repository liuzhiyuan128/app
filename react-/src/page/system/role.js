import {Form, Input, Modal, Select, Option, Tabs, TabPane, Button, Route, Table, Row, Col, Icon,React, Component} from '../../config/router';
const FormItem = Form.Item;

const roleStyle = {
    height: window.innerHeight - 45 - 10 - 10
}
let userListVM = null, ChoiceUserListVM = null;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>
    }
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
    })
};
const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
    })
};
const rowSelection2 = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
    })
};
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    }, {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park'
    }
];
class AddForm extends React.Component {
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
        const {getFieldDecorator,formItemLayout } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
                
                 
                <FormItem
                    label="角色名称"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('role', {
                        rules: [
                            {
                                required: true,
                                message: '请输入角色名称'
                            }
                        ]
                    })(<Input onBlur = {(e)=>{
                            
                            var div = document.createElement("div");
                            div.className = 'ant-form-explain';
                            div.innerHTML = "角色名已存在";
                            div.style.color = 'red'
                            document.querySelector(".ant-row").className = "ant-row ant-form-item ant-form-item-with-help";
                            var is = document.querySelector(".ant-form-item-control").querySelector(".ant-form-explain")
                            if(is){
                               return false;
                            }
                            document.querySelector(".ant-form-item-control").appendChild(div)


                            
                    }} />)}
                </FormItem>
                <FormItem
                    label="备注"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('remarks', {
                        rules: [
                            {
                                required: false,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem
                    wrapperCol={{
                    span: 12,
                    offset: 5,
                    style: {
                        textAlign: 'right'
                    }
                }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const AddFormConment = Form.create()(AddForm);
class UserList extends Component {
    constructor(props){
        super(props)
        this.state={
            userList: [
                    {
                        key: 0,
                        name: 'admin'
                    },
                    {
                        key: 1,
                        name: 'user'
                    },
                    {
                        key: 2,
                        name: 'admin'
                    },
                    {
                        key: 3,
                        name: 'user'
                    }
                ]
        }
       
        userListVM = this
        
    }
    
    userList = (userListItem) => {
        userListItem.isActive = !userListItem.isActive;
        this.setState({})
    }
    render(){
        return <div style={{
                    padding: "0 20px"
                }}>
                    <div style={{
                        border: '1px solid rgb(241, 241, 241)'
                    }}>
                        <Select
                            allowClear={true}
                            style={{
                            width: "100%",
                            background: 'rgb(241, 241, 241)'
                        }}
                            placeholder="待选用户列表">
                            <Option value="1" key="1">1</Option>
                            <Option value="2" key="2">2</Option>
                        </Select>
                        <div
                            style={{
                            marginTop: 10,
                            textAlign: 'center'
                        }}>
                            <Icon
                                type="double-right"
                                style={{
                                background: 'rgb(241, 241, 241)',
                                padding: '15px 100px',
                                marginRight: 10
                            }} onClick={()=>{
                                let key = ChoiceUserListVM.state.userList.length;
                                this.state.userList.some((item)=>{
                                    key++
                                    var newItem = JSON.parse(JSON.stringify(item));
                                    newItem.key = key;
                                    newItem.isActive = false
                                  ChoiceUserListVM.state.userList.push(newItem)  
                                })
                               
                               
                                ChoiceUserListVM.setState({});
                              
                                this.setState({
                                    userList:[]
                                })
                            }} />
                            <Icon
                                type="right"
                                style={{
                                background: 'rgb(241, 241, 241)',
                                padding: '15px 100px',
                                marginRight: 10
                            }} onClick={()=>{
                                    let key = ChoiceUserListVM.state.userList.length, k = 0;
                                    const {userList} = this.state;

                                    
                                    var newUserList = JSON.parse(JSON.stringify(userList));
                                    newUserList.some((item, i)=>{
                                        key++
                                        item.key = key;
                                        if(item.isActive == true){
                                            
                                            item.isActive = false
                                            ChoiceUserListVM.state.userList.push(item);
                                            userList.splice(i-k,1)
                                            k++
                                        }
                                         
                                    })
                                    console.log(userList)
                                    ChoiceUserListVM.setState({});
                              
                                    this.setState({})
                            }}/>
                        </div>

                        {this
                            .state
                            .userList
                            .map((item) => {
                                if (item.isActive) {
                                    return <div
                                        key={item.key}
                                        onClick={() => {
                                        this.userList(item)
                                    }}
                                        className={`userList active`}>{item.name}</div>
                                } else {
                                    return <div
                                        key={item.key}
                                        onClick={() => {
                                        this.userList(item)
                                    }}
                                        className='userList'>{item.name}</div>
                                }
                            })
                }
                    </div>
                </div>
    }
}
class ChoiceUserList extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            userList: [
                {
                    key: 0,
                    name: 'admin'
                }, {
                    key: 1,
                    name: 'user'
                }
            ]
        }
        ChoiceUserListVM = this
    }
    userList = (userListItem) => {
        userListItem.isActive = !userListItem.isActive;
        this.setState({})
    }
    render() {
        return <div style={{
            padding: "0 20px"
        }}>
            <div
                style={{
                border: '1px solid rgb(241, 241, 241)'
            }}>

                <div style={{
                    width: "100%",
                    background: 'rgb(241, 241, 241)',
                    textAlign: 'center',
                    height: '30px',
                    lineHeight: '30px',
                    cursor: 'default',
                    fontWeight: '700'
                    
                }}>已选择用户列表</div>
                <div
                    style={{
                    marginTop: 10,
                    textAlign: 'center',
                    cursor: 'pointer'
                }}>
                    <Icon
                        type="left"
                        style={{
                        background: 'rgb(241, 241, 241)',
                        padding: '15px 100px',
                        marginRight: 10
                    }}
                    onClick={()=>{
                                    let key = userListVM.state.userList.length, k=0;
                                    const {userList} = this.state
                                    
                                    var newUserList = JSON.parse(JSON.stringify(userList));
                                    newUserList.some((item, i)=>{
                                        key++
                                        item.key = key;
                                        if(item.isActive == true){
                                            item.isActive = false
                                            userListVM.state.userList.push(item);
                                            userList.splice(i-k,1)
                                            k++
                                        }
                                         
                                    })
                                    userListVM.setState({});
                              
                                    this.setState({})
                            }}/>
                    <Icon
                        type="double-left"
                        style={{
                        background: 'rgb(241, 241, 241)',
                        padding: '15px 100px',
                        marginRight: 10,
                        
                    }}
                    onClick={()=>{
                                let key = userListVM.state.userList.length;
                                this.state.userList.some((item)=>{
                                    key++
                                    var newItem = JSON.parse(JSON.stringify(item));
                                    newItem.key = key;
                                    newItem.isActive = false
                                  userListVM.state.userList.push(newItem)  
                                })
                               
                               
                                userListVM.setState({});
                              
                                this.setState({
                                    userList:[]
                                })
                            }}
                    />
                    
                </div>

                {this
                    .state
                    .userList
                    .map((item) => {
                        if (item.isActive) {
                            return <div
                                key={item.key}
                                onClick={() => {
                                this.userList(item)
                            }}
                                className={`userList active`}>{item.name}</div>
                        } else {
                            return <div
                                key={item.key}
                                onClick={() => {
                                this.userList(item)
                            }}
                                className='userList'>{item.name}</div>
                        }
                    })
}
            </div>
        </div>
    }
}
class Role extends Component {
    constructor(props){
        super(props)
        this.state = {
            rolesData: [
                {
                key: 1,
                name: "产品管理员"
                
                },
                {
                key: 2,
                name: "订单管理员"
                }
                
        ],
        chooseActive:1,
        clickKey: -1,
        userListVm: null,
        visible: false
        }
    }
    getRolesfn = (data) => {
       this.setState({
           clickKey: data.key
       },()=>{
           this.props.history.push(`${this.props.match.path}/${data.key}`)
       })

    }
 
   
    
    render(){
      
        return (
                <div id="role" style={roleStyle}>
                        <Modal 
                            title = "新增角色"
                            visible={this.state.visible}
                            onCancel = {()=>{
                                this.setState({
                                    visible: false
                                })
                            }}
                            footer={false}
                            >
                            <AddFormConment/>
                        </Modal>
                        <div className={"left"} >
                            <div
                                style={{
                                fontWeight: 700,
                                paddingLeft: 18,
                                cursor: "pointer"
                            }}>
                                角色列表
                                <Icon
                                    style={{
                                    color: '#578afb'
                                }}
                                    type="plus"
                                     onClick ={()=>{
                                        this.setState({
                                            visible: true
                                        })  
                                    }}/>
                                
                            </div>
                            {
                                this.state.rolesData.map((item)=>{
                                     
                                  if(item.key == this.state.clickKey){
                                  
                                      return <div key={item.key} className={"roles active"} onClick={()=>{
                                                        this.getRolesfn(item)
                                                    }}>
                                                    <Row>
                                                        <Col span={9}>
                                                            {item.name}
                                                        </Col>
                                                        <Col span={15} style={{textAlign: "right"}}>
                                                             {<Icon style={{marginRight: 10}} type='delete'/>}
                                                            {<Icon style={{marginRight: 10}} type='edit'/>}
                                                        </Col>
                                                     </Row>
                                              </div>
                                  }else{
                                        return <div key={item.key} className={"roles"} onClick={()=>{
                                                    this.getRolesfn(item)
                                                    }}>{item.name}</div>
                                  }
                                })
                            }
                        </div>
                        <div className="right">
                            <Route exact={true}  to={`${this.props.match.path}/${this.state.clickKey}` } component = {
                                ()=>{
                                  if(this.state.clickKey === -1 ) return '' 
                                    return (
                                        <div>
                                            <Tabs>
                                                <TabPane key="1" tab="角色与权限">
                                                    <Row>
                                                        <Col span={8}>
                                                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                                                        </Col>
                                                        <Col span={8}>
                                                            <Table rowSelection={rowSelection1} columns={columns} dataSource={data} />
                                                        </Col>
                                                        <Col span={8}>
                                                            <Table rowSelection={rowSelection2} columns={columns} dataSource={data} />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: 10}}>
                                                        <Col span={24} style={{textAlign: "right",paddingRight:12}}>
                                                            <Button type='primary'>保存</Button>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane key={2} tab="角色与用户">
                                                    <Row>
                                                        <Col span={12}>
                                                            <UserList />
                                                        </Col>
                                                        <Col span={12}>
                                                            <ChoiceUserList />
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop: 10}}>
                                                        <Col span={24} style={{textAlign: "right",paddingRight:12}}>
                                                            <Button type='primary'>保存</Button>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                        )
                                }
                            }/>
                           
                        </div>
                        
                    </div>
            )
    }
}
const role = ({match,history})=>{

    return <Role history={history} match={match}/>
}
export default role