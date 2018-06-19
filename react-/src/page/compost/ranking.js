import { React, SearchRanking, Table, Component, Tabs, TabPane, Modal, Button, echarts, ajax, qs, Pagination, Spin, Row, Col, Switch } from "../../config/router.js"

var searchData = {}, compostingHouseId = '' ,vm = null
function getSearchData (data) {
	searchData = data
	vm.getUserListByMonth()


}
const getALineData = (text,vm) => {
	compostingHouseId = text.compostingHouseId
	ajax({
		url: 'getCheckCompostingDetail',
		type: "post",
		data: qs.stringify({
			compostingHouseId:text.compostingHouseId,
			startTime: searchData.startTime ? searchData.startTime : null,
			endTime: searchData.endTime ? searchData.endTime : null
		}),
		success: (res)=>{
			ajax({
				url: "getCheckCompostingTrend",
				type: 'post',
				data: qs.stringify({
						compostingHouseId:text.compostingHouseId,
						startTime: searchData.startTime ? searchData.startTime : null,
						endTime: searchData.endTime ? searchData.endTime : null
				}),
				success: (res)=> {
					console.log(res)
					res = res.data
					
					//日期需要的格式
					const date = [];
					//数据需要的格式
					const data = [];
					
					//平均值折现图
					const avg = [];
					console.log(res)
					res.some(item=>{
						if(item.dataTime){
							date.push(item.dataTime+"月份")
						}else{
							date.push(item.createTime)
						}
						if(""+item.avg){
							avg.push(item.avg)
						}
						data.push(item.total)
					})
			
					var option = {
						color: ['#3398DB'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: date,
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value',
							name: "总分"
						},{
							type: 'value',
							name: "平均分",
							min: 0,
        					max: 15,
						}],
						series: [{
								
								type: 'bar',
								name: "总分",
								data: data
							},{
								
								type: 'line',
								name: "平均分",
								data: avg,
								lineStyle:{
									color:"#d14a61"
								},
								 yAxisIndex: 1,
							},
			
						]
					};

					var myChart = echarts.init(document.getElementById('barDetail'));
					myChart.setOption(option);
				}
				})

			for(let item in vm.state.compostRankingAlertData){
				if(text[item]){
					vm.state.compostRankingAlertData[item] = text[item]
				}else{
					vm.state.compostRankingAlertData[item] = res.data[item];
				}
				
				
			}
			vm.setState({visible: true})
			
		}
	})
	
	
}

class CompostRankingTable extends Component{
	getUserListByMonth() {
			const data = {
				condition: "",
				pageSize: this.state.pageSize,
				pageNum: this.state.pagination.current
			}
		if(JSON.stringify(searchData) !== "{}"){
				for(let item in searchData){
						data[item] = searchData[item]
				}
		}
		
		

		ajax({
			url: "getCompostingRank",
			data: qs.stringify(data),
			type: "post",
			success: (res) => {
				res = res.data
				res.list.some(function(item, index) {
					item.key = index
				})
				
				const compostRankingTableData = res.list
						
				
					this.setState({

						 pagination: {
							compostRankingTableData,
							total: res.total,
							current: res.pageNum,
							loading: false
						}
					})
			
				

			}
		})
	}
	componentDidMount() {
		this.getUserListByMonth();
		vm = this

	}
	state = {
	
		compostRankingColumns: [{
			title:"堆肥房名称",
			dataIndex:"compostingName",
			key:"compostingName"
		},
		{
			title:"房主姓名",
			dataIndex:"responsibleName",
			key:"responsibleName"
		},
		{
			title: '联系电话',
			dataIndex: 'responsiblePhone',
			key: 'responsiblePhone',
		}, {
			title: '总分',
			dataIndex: 'total',
			key: 'total',

		}, {
			title: "平均分",
			dataIndex: "avg",
			key: "avg"
		}, {
			title: "次数",
			dataIndex: "number",
			key: "number"
		}, {
			title: "排名",
			dataIndex: "rank",
			key: "rank"
		}, {
			title: "操作",
			render: (text) => {
				return(<div style={{cursor:"pointer"}} onClick={()=>getALineData(text,this)}>查看详情</div>)
			}
		}],
		
		//弹出框
		visible: false,
		//弹出框需要数据
		compostRankingAlertData:{
			//垃圾桶编号
			id: 0,
			//住户姓名
			realname: "",
			//人口数
			familyNums: "",
			phone: "",
			//联系党员
			connect: "",
			//是否常住
			aways: "",
			//是否党员
			partyMember: "",
			//月总分
			totalMonth:"",
			totalQuarter:"",
			totalYear:""
		},
		pagination: {
			total: 10,
			compostRankingTableData: [],
			current: 1,
			loading:true
		},
		
		pageSize: 10,
		visible: false,
		compostRankingAlertData:{
			rank:0,
			compostingName:'',
			responsibleName: '',
			responsiblePhone: 0,
			total: 0,
			avg: 0,
			number: 0,
			compostingModel: '',
			servicePopulation: 0
		},
		monthDay: false
	}
	render(){
		const {compostRankingAlertData} = this.state
		return (
			<div className="tableBox">
				<Spin spinning={this.state.pagination.loading}>
						    	<Table pagination={{
						    		total:this.state.pagination.total,
						    		pageSize:this.state.pageSize,
						    		defaultCurrent:1,
						    		current:this.state.pagination.current,
						    		onChange:(current)=>{
						    			
						    			this.setState({
						    				pagination:Object.assign(this.state.pagination,{current:current})
						    			},()=>{
						    				this.getUserListByMonth()
						    			})
						    		}
						    		
						    	}} 
						    	
						    	dataSource={ this.state.pagination.compostRankingTableData} columns={this.state.compostRankingColumns} />
					</Spin>
					 <Modal
			          title="查看详情"
			         visible={this.state.visible}
			         onCancel = {(e) => {this.setState({visible: false,monthDay:false});}}
			         footer={null}
			         bodyStyle={{width:"100%",padding:"0 12px"}}
			        >
			        <div>
			        	
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>堆肥房名称:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {compostRankingAlertData.compostingName}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>房长姓名:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {compostRankingAlertData.responsibleName}</span>
			        			</Col>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>服务人口:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {compostRankingAlertData.servicePopulation}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>联系电话:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {compostRankingAlertData.responsiblePhone}</span>
			        			</Col>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>服务模式:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {compostRankingAlertData.compostingModel}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={6}>
			        				总分<span style={{color:"red"}}>  {compostRankingAlertData.total+"分"} </span>
			        			</Col>
			        			<Col span={6}>
			        				平均分<span style={{color:"red"}}>  {compostRankingAlertData.avg+"分"} </span>
			        			</Col>
			        			<Col span={6}>
			        				检查次数<span style={{color:"red"}}>  {compostRankingAlertData.number+"次"} </span>
			        			</Col>
			        			<Col span={6}>
			        				排名<span style={{color:"red"}}>  {compostRankingAlertData.rank+"名"} </span>
			        			</Col>
			        		</Row>
			        	</div>
			        	<Switch checked={this.state.monthDay}  style={{marginTop:10}} checkedChildren="月" onChange={(boolean)=>{
			        	 	//true月 false 天 默认展示的是天
			        	 	let data = null
			        	 	if(boolean){
			        	 		data = {
										compostingHouseId: compostingHouseId,
										startTime: searchData ? searchData.startTime : null,
										endTime: searchData ? searchData.endTime : null,
										rankType: 1,
									}
			        	 	}else{
			        	 		data = {
										compostingHouseId: compostingHouseId,
										startTime: searchData ? searchData.startTime : null,
										endTime: searchData ? searchData.endTime : null,
										rankType: 0,
									}
			        	 	}
			        	 	ajax({
									url: `getCheckCompostingTrend`,
									type: "post",
									data:qs.stringify(data),
									success: (res)=>{
										res = res.data
										//日期需要的格式
										const date = [];
										//数据需要的格式
										const data = [];
										
										//平均值折现图
										const avg = [];
										
										res.some(item=>{
											if(item.dataTime){
												date.push(item.dataTime+"月份")
											}else{
												date.push(item.createTime)
											}
											if(""+item.avg){
												avg.push(item.avg)
											}
											data.push(item.total)
										})
								
										var option = {
											color: ['#3398DB'],
											tooltip: {
												trigger: 'axis',
												axisPointer: { // 坐标轴指示器，坐标轴触发有效
													type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
												}
											},
											grid: {
												left: '3%',
												right: '4%',
												bottom: '3%',
												containLabel: true
											},
											xAxis: [{
												type: 'category',
												data: date,
												axisTick: {
													alignWithLabel: true
												}
											}],
											yAxis: [{
												type: 'value',
												name: "总分"
											}],
											series: [{
													
													type: 'bar',
													name: "总分",
													data: data
												},{
													
													type: 'line',
													name: "平均分",
													data: avg,
													lineStyle:{
														color:"#d14a61"
													}
												},
								
											]
										};
										
										var myChart = echarts.init(document.getElementById('barDetail'));
										myChart.setOption(option);
									}
								})
			        	 	this.setState({
			        	 		monthDay:!this.state.monthDay
			        	 	})
			        	 	

			        	 }} unCheckedChildren="天"  />
			        	 <div id="barDetail" style={{width:"100%",height:"400px",padding:12}}>
							
				        </div>
			     </Modal>
			</div>
		)
	}
}
 const compostRanking = ()=>{
	return (<div>
			<SearchRanking onlyAreaTown={true} isTree={true} getSearchData={getSearchData}/>
			<CompostRankingTable />
	</div>)
}
export default compostRanking