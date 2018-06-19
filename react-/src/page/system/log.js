import { RangePicker, Input, Form, TreeSelect, Modal, Button, Select, Option,Icon, Col, Row, React, Component, Table, Header} from "../../config/router";
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
    }
   
];

class Log extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (obj,toString) =>{

    }
    render(){
        return(
                <div id={"systemCompost"}>
                   
                    <Row style={{marginTop: 20}}>
                        <Col span={1} style={{textAlign: 'center',lineHeight: "32px"}}>
                            时间
                        </Col>
                        <Col span={6} style={{lineHeight: "32px"}}>
                            <RangePicker

                                format="YYYY-MM-DD"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onChange}
                                />
                        </Col>
                        <Col span = {8} style={{paddingRight:100}}>
                            <Select placeholder="选择操作人" style={{width: "100%"}}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                        </Col>
                        <Col span = {4}>
                            <Select  placeholder="选择操作人" style={{width: "100%"}}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                            </Select>
                        </Col>
                        <Col placeholder="选择操作类型" span={3}  style={{textAlign: 'right'}}>
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
const log = () =>{
    return <Log/>
}
export default log