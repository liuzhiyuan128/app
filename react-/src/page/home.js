import { role, systemCompost, user, log, comostResult, trashResult, compostSupervise, Header, Layout, Content, Footer, Sider, Menu, Breadcrumb, SubMenu, Component, React, Icon, Router, Route, Link, TrashRanking, compostRanking, Redirect, BrowserRouter, createHistory, supervise } from "../config/router.js"

let defaultSub = sessionStorage.defaultSub || JSON.stringify(['sub1']);
let defaultKeys = sessionStorage.defaultKeys || '0'
const selectFn = ({key}) => {
	sessionStorage.defaultKeys = key;
	sessionStorage.selected = '';
}
const titleClcik = (select) => {
	sessionStorage.defaultSub = JSON.stringify(select)
}

const Home = (router) => {
	var listMap  = {
			user,
			role
}
	var power =  JSON.parse(sessionStorage.userMsg).data
	return(<div id="home">
				<Layout>
				    <Layout>
				      <Sider width={160} style={{ background: '#fff',position:"relative" }}>
				      <div id="logo"  style={{width:"160px",position:"absolute",top:0,left:0, height:"109px"}}></div>
				        <Menu
				       	  theme="dark"
				          mode="inline"
				          defaultSelectedKeys={[defaultKeys]}
				          defaultOpenKeys={JSON.parse(defaultSub)}
				          onSelect = {selectFn}
				          style={{ height: '100%', borderRight: 0 }}
				         onOpenChange = {titleClcik}
				        >
								{
									power.map((item, i)=>{
										
										return <Menu.Item style={{marginTop:i == 0 ? 109 : 0}} key={i}><Link to={item.url}>{item.name}</Link></Menu.Item>
									})
								}
				   			 
				          {/* {<SubMenu style={{marginTop:"109px"}} key="sub1" title={<span>垃圾桶管理</span>}>
				            <Menu.Item key="1"><Link to="/home/trashSupervise">考核督办</Link></Menu.Item>
				            <Menu.Item key="2"><Link to="/home/trashResult">考核结果</Link></Menu.Item>
				            <Menu.Item key="3"><Link to={`/home/trashRanking`}>考核排行</Link></Menu.Item>
				          </SubMenu>
				          <SubMenu key="sub2" title={<span>堆肥房管理</span>}>
				            <Menu.Item key="4"><Link to="/home/compostSupervise">考核督办</Link></Menu.Item>
				            <Menu.Item key="5"><Link to="/home/comostResult">考核结果</Link></Menu.Item>
				            <Menu.Item key="6"><Link to={"/home/compostRanking"}>考核排行</Link></Menu.Item>				          
				          </SubMenu>
				          <SubMenu key="sub3" title={<span>其他设施管理</span>}>
				            <Menu.Item key="7">考核督办</Menu.Item>
				            <Menu.Item key="8">考核结果</Menu.Item>
				          </SubMenu>
				          <SubMenu key="sub4" title={<span>系统管理</span>}>
				            <Menu.Item key="9"><Link to="/home/user"></Link>用户管理</Menu.Item>
				            <Menu.Item key="10"><Link to="/home/role">角色管理</Link></Menu.Item>
				            <Menu.Item key="11"><Link to="/home/systemCompost">堆肥房管理</Link></Menu.Item>
										<Menu.Item key='12'><Link to="/home/log">日志管理</Link></Menu.Item>
				          </SubMenu>} */}
				        </Menu>
				      </Sider>
				      
				      <Layout>

					    <HeaderComponent />
					    <div style={{ padding: '0 24px 24px' }}>
					       
									{
										power.map((item, i) => {	
											return <Route path={item.url} component={listMap[item.component]} key = {i}/>
										})
									}
								
					        {/* {<Route path={`/home/trashRanking`} component={TrashRanking} />
					        <Route path={`/home/compostRanking`} component={compostRanking}/>
					        <Route path={`/home/trashsupervise`} component = {supervise}/>
									<Route path="/home/compostSupervise" component = {compostSupervise} />
									<Route path="/home/trashResult" component = {trashResult} />
									<Route path="/home/comostResult" component = {comostResult} />
									<Route path="/home/log" component = {log} />
									<Route path="/home/user" component = {user}/>
									<Route path="/home/systemCompost" component = {systemCompost}/>
									<Route path="/home/role" component={role}/>} */}
					    </div>
				      </Layout>
				    </Layout>
				  </Layout>
			</div>)
}
class HeaderComponent extends Component {
				
				state = {
					realname: JSON.parse(sessionStorage.userMsg).username
				}
	             render() {
	             		const {realname} = this.state
						return <Header  style={{ height:"45px" }} className="header">
					
									<div>
										<Icon type="user" />
										<span style={{cursor:"default"}}>{realname}</span>
										<span style={{cursor:"pointer"}} onClick={loginOut}>
											<Icon type="logout" />
										</span>
									</div>	    
								</Header>
	            }

}
const loginOut = () => {
	localStorage.token = ""
	const history = createHistory({
		forceRefresh:true
	})
	history.push("/login")

}
export {
	Home
}