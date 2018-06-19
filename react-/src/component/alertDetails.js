import {DatePicker, Input, Modal, React, Component, Row, Col, Switch, Rate, TextArea,Button} from "../config/router";
const onChange = (date, dateString) => {
    console.log(dateString)
}

class AlertDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible:true
        }
    }
confirm =  ()=> {
    const vm = this;
    Modal.confirm({
        title: '重办',
        content: (
            <div>
                <Input  onChange={(e)=>{
                    vm.setState({
                        value:e.target.value
                    })
                }} placeholder="整改意见"/>
                <DatePicker
                    placeholder = "限定时间"
                    style={{
                    width: "100%",
                    marginTop: "10px"
                }}
                    onChange={(value,tostring)=>{
                       
                        vm.setState({
                            tostring:tostring
                        })
                       
                    }}/>
            </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
            this.props.cb(this.state.tostring,this.state.value)
            this.setState(
                {
                    tostring:null,
                    value: null
                }
            )
        }
    });
}
    
    render() {
        const {faVm} = this.props
        let closIndex = -1;
        return (
            <Modal
                title="查看详情"
                visible={this.props.visible}
                onCancel=
                { this.props.closeAlertDetails  }
                footer={null}
                bodyStyle={{
                width: "100%",
                padding: "12px"
            }}>
                 {
                    this.props.rows.map((item, i)=>{
                        return (<Row key={i} style={{marginTop:"10px"}}>
                                    {
                                        item.cols.map((colItem, index) => {
                                            closIndex++;
                                          
                                            return (
                                                <Col key={index} span={item.span}>
                                                     {colItem.key}<span style={{color: item.color}}>{this.props.alertMsg.closVal[closIndex]}</span>
                                                </Col>
                                            )
                                        })
                                    }
                                 </Row>) 
                    })
                   
                
                 }
                 <div id="aaa" style={{marginTop: "15px"}}>评分</div>
                 <Row  style={{marginTop: "15px"}}>
                    {
                        (()=>{
                            let key = 0
                            let arr = []
                            for(let item in this.props.alertMsg.score){
                                var oneItem = this.props.alertMsg.score[item]
                                arr.push(<div className="score" choosenum={oneItem.choosenum} style={{height:30, marginTop: 10}}  key={key++}> <Col  style={{  height:"30px",lineHeight:"30px",minWidth:"60px"}} span={4}>{oneItem.name}</Col><Col span={18}><div className="icontBox" style={{height:"30px",lineHeight:"30px",minWidth:"60px"}}><i   className="iconfont">&#xe627;</i><i  className="iconfont">&#xe7ab;</i><i   className="iconfont" >&#xe602;</i></div></Col> </div>)
                            }
                            
                            return arr
                             
                        })()                      
                        
                    }
                    
                 </Row>
                 <Row style={{fontSize: "16px", marginTop: 10,  display: this.props.hasOwnProperty("showDFXQ") ? "block" : "none"}}>
                     <Col span={4}>
                        出肥情况
                     </Col>
                     <Col span={20}>
                        <Row>
                            <Col span={4}>日期</Col>
                            <Col span={20}>{this.props.alertMsg.cfsj}</Col>
                        </Row>
                         <Row>
                            <Col span={4}>重量</Col>
                            <Col span={20}>{this.props.alertMsg.weight}顿</Col>
                        </Row>
                         <Row>
                            <Col span={4}>去向</Col>
                            <Col span={20}>{this.props.alertMsg.cfqs}</Col>
                        </Row>
                     </Col>
                 </Row>
                
                <div style={{marginTop: "15px"}}>文字/图片信息</div>
                <TextArea placeholder="" disabled autosize={{ minRows: 2, maxRows: 6 }} />
                <div style={{marginTop: "12px"}}>
                    {
                        this.props.alertMsg.image && this.props.alertMsg.image.map((item)=>{
                            return  <img width="260" alt="logo" src={item}/>
                        })
                    }
                    {/*<img width="210" style={{marginRight: "12px"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
                    <img width="210" style={{marginRight: "12px"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
                    <img width="210" style={{marginRight: "12px"}} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/> */}
                </div>
                <div style={{display:this.props.alertMsg.zgyj ? "block":"none"}}>
                    <div>整改意见</div>
                    <TextArea placeholder="" disabled autosize={{ minRows: 2, maxRows: 6 }} value={this.props.alertMsg.zgyj}></TextArea>
                </div>
                <div style={{display:this.props.alertMsg.fkyj ? "block":"none"}}>
                    <div>反馈意见</div>
                    <TextArea placeholder="" disabled autosize={{ minRows: 2, maxRows: 6 }} value={this.props.alertMsg.fkyj}></TextArea>
                </div>
                <Row>
                    <Col span={8} style={{textAlign:"center", marginTop: "12px",display:this.props.alertMsg.cb ? "block" : 'none'}}><Button type="primary" onClick= {this.confirm}>重办</Button></Col>
                    <Col span={8} style={{textAlign:"center", marginTop: "12px",display:this.props.alertMsg.db ? "block" : 'none'}}><Button type="primary" onClick={this.props.dbjs}>督办结束</Button></Col>
                    <Col span={8} style={{textAlign:"center", marginTop: "12px",display:this.props.alertMsg.hurry ? "block" : 'none'}}><Button type="primary" onClick = {this.props.hurry}>催办</Button></Col>
                </Row>
                
            </Modal>
            
             
        )
    }
}

export default AlertDetails