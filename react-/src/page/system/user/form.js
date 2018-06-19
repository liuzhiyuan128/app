import {
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
    Icon
} from "../../../config/router";
import  VMObj  from "./userVm";
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class AddUser extends React.Component {
    constructor(props) {
        super(props)
       VMObj.addUserVm = this
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.props.handleSubmit}>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label='账号'
                            labelCol={{
                                span: 6
                            }}
                            wrapperCol = {{
                                span: 12
                            }}
                        >
                           {
                               getFieldDecorator('username',{
                                   rules: [
                                        {
                                            required: true,
                                            message: '请输入账号'
                                        }
                                    ]
                               })(<Input />)
                           } 
                        </FormItem>
                   </Col>
                   <Col span={12}>
                      <FormItem
                            label='密码'
                            labelCol={{
                                span: 6
                            }}
                            wrapperCol = {{
                                span: 12
                            }}
                        >
                           {
                               getFieldDecorator('password',{
                                   rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ]
                               })(<Input type="password" />)
                           } 
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                       <FormItem label="角色" 
                          labelCol={{
                                span: 6
                            }}
                            wrapperCol = {{
                                span: 12
                            }}
                       >
                            {
                                getFieldDecorator("roleid",{
                                    rules: [{
                                        required: true,
                                        message: '选择角色'
                                    }]
                                })(<Select>
                                    <Option value="1">
                                        管理员
                                    </Option>
                                    <Option value="2">
                                        用户
                                    </Option>
                                </Select>)
                            }
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
                        确认
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const AddUserConment = Form.create()(AddUser);
export default AddUserConment;