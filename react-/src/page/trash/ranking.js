import { Menu, Content, React, Component,Link,Route,Redirect,vliiageRanking,townRanking,househlodRanking } from "../../config/router.js"
let selected = sessionStorage.selected || "househlodRanking"
const selectFn = ({ item, key, selectedKeys }) => {
	sessionStorage.selected = key
	
}
const TrashRanking = ({match}) =>{
	
	
	return (
			<div>
				<Menu
			 	theme="light"
				mode="horizontal"			       
				defaultSelectedKeys={[selected]}
				style={{ lineHeight: '40px',height:"40px", marginTop:"15px" }}
				onSelect={selectFn}
				>
					 <Menu.Item key="househlodRanking"><Link to="/home/trashRanking/househlodRanking">住户排名</Link></Menu.Item>
					 <Menu.Item key="vliiageRanking"><Link to="/home/trashRanking/vliiageRanking">村排名</Link></Menu.Item>
					 <Menu.Item key="townRanking"><Link to="/home/trashRanking/townRanking">镇排名</Link></Menu.Item>
			</Menu>
			<div>
				<Route exact={true} path="/home" render={()=><Redirect to="/home/trashRanking/househlodRanking"/>} />
				<Route exact={true} path="/home/trashRanking" render={()=><Redirect to="/home/trashRanking/househlodRanking"/>} />
			    <Route path="/home/trashRanking/househlodRanking" component={househlodRanking} />   
			    <Route path="/home/trashRanking/vliiageRanking" component={vliiageRanking} />   
			    <Route path="/home/trashRanking/townRanking" component={townRanking} />   
			</div>
		</div>
		)
}
export default TrashRanking

