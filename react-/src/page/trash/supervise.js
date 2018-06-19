import {trashAreaSupervise, trashTownSupervise, Redirect, Menu, Link, trashCheckUp, qs, Route, Component, React, ajax, SearchRanking, Tabs, TabPane, TableComponent, AlertDetails, trashVillageSupervise}  from "../../config/router.js";

const supervise = ({ watch, history }) => {
	return (
		<div>
        <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ height: 40,lineHeight: '40px', marginTop:15 }}
                 >
                    <Menu.Item key="1"><Link to="/home/trashSupervise/trashCheckUp">检查合格</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/trashSupervise/trashVillageSupervise">村督办</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/home/trashSupervise/trashTownSupervise">镇督办</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/home/trashSupervise/trashAreaSupervise">区督办</Link></Menu.Item>
                </Menu>
                <Route exact path="/home/trashSupervise" render={()=><Redirect to="/home/trashSupervise/trashCheckUp" />}></Route>
                <Route path="/home/trashSupervise/trashCheckUp" component={trashCheckUp} />
                <Route path="/home/trashSupervise/trashVillageSupervise" component={trashVillageSupervise} />
                <Route path="/home/trashSupervise/trashTownSupervise" component={trashTownSupervise} />
                <Route path="/home/trashSupervise/trashAreaSupervise" component={trashAreaSupervise} />
    </div>
	)
}
 export default supervise
