import {
    qs,
    Radio,
    TreeSelect,
    Input,
    Button,
    Select,
    Form,
    Modal,
    Table,
    ajax,
    dataFilter,
    Tree,
    React,
    Component,
    Row,
    Col,
    Icon,
    message
} from "../../config/router";
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import AddUserConment from "./user/form"
import VMObj from "./user/userVm";
let userVM = null;
const userStyle = {
    height: window.innerHeight - 45 - 10 - 10
}

const dataSource = [
 
];
const deleteUser = (text) => {
   
    ajax({
        module: 'system',
        url: 'deleteUser/'+text.userid,
        success: (res)=>{
            message.info(res.msg);
            userVM.getList()
        }
    })
}
const columns = [
    {
        title: 'userid',
        dataIndex: 'userid',
        key: 'userid'
    }, {
        title: '账号',
        dataIndex: 'username',
        key: 'username'
    }, {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        render (text,Row){
            var roleid = JSON.parse(sessionStorage.userMsg).roleid;
           
           if(roleid == 2){
               return "***"
           }else if(roleid == 1){
               return text
           }else{
               return ""
           }
        }
    },
    {
        title:'角色',
        dataIndex: 'roleid',
        key: 'roleid',
        render (text) {
            if(text == 1){
                return "管理员"
            }else{
                return "用户"
            }
        }
    },
    {
        title: '操作',
        render(text){
            
            return <Icon onClick = {()=>{
                deleteUser(text)
            }} type="delete" style={{color:"#888888", fontSize: '20px'}}/>
        }
    }
];

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false,
            dataSource: []
        }
        userVM = this
    }
    

    getList = () => {
        ajax(
            {
                url: 'getUserList',
                module: 'system',
                success: (res) => {
                    res.some((item,i)=>{
                        item.key = i;
                    })
                    this.setState({
                        dataSource: res
                    })
                }
            }
        )
    }
    componentWillMount = () => {
        this.getList()
    }
    handleSubmit = (e) => {
      
         e.preventDefault();
         VMObj.addUserVm.props.form.validateFields((err, values) => {
             if(err){

             }else{
                ajax({
                    module: 'system',
                    url: 'addUser',
                    type: 'post',
                    data: qs.stringify(values),
                    success: (res) => {
                        message.info(res.msg)
                        this.getList()
                        this.setState({
                                 addUser: false
                             })
                    }
                })
             }
             
         })
       
        // this
        //     .props
        //     .form
        //     .validateFields((err, values) => {
               
        //     });
    }
    render(){
        
        return (
            <div id="user" >
                
                <div className="right">
                    <div
                        style={{
                        fontWeight: 700,
                        paddingLeft: 18,
                        cursor: "pointer"
                    }}>
                        用户列表
                        <Icon onClick={()=>{
                          
                            this.setState({addUser:true})}}
                            style={{
                            color: '#578afb'
                        }}
                            type="plus"/>
                        <div style={{
                            marginTop: 20
                        }}>
                            <Table dataSource={this.state.dataSource} columns={columns}/>
                        </div>

                    </div>
                </div>
                <div className='add-user'>
                    <Modal title="新增用户"
                         visible={this.state.addUser}
                         onCancel = {()=>{
                             this.setState({
                                 addUser: false
                             })
                         }}
                        
                         footer={null}
                         >
                         <AddUserConment handleSubmit = {this.handleSubmit}/>
                    </Modal>
                </div>
            </div>
        )
    }
}

const user = () => {
    return <User/>
}
export default user