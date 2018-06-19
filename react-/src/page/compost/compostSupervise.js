import {
    qs,
    Route,
    Component,
    React,
    ajax,
    SearchRanking,
    Menu,
    TableComponent,
    AlertDetails,
    Link,
    checkUp,
    Redirect,
    compostVillageSupervise,
    compostTownSupervise,
    compostAreaSupervise
} from "../../config/router.js";


const compostSupervise = ({watch, history}) => {
    return (<div>
        <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '40px', height: 40, marginTop:15 }}
                 >
                    <Menu.Item key="1"><Link to="/home/compostSupervise/checkUp">检查合格</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/compostSupervise/compostVillageSupervise">村督办</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/home/compostSupervise/compostTownSupervise">镇督办</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/home/compostSupervise/compostAreaSupervise">区督办</Link></Menu.Item>
                </Menu>
                
                <Route exact path="/home/compostSupervise" render={()=><Redirect to="/home/compostSupervise/checkUp" />}></Route>
                <Route path="/home/compostSupervise/checkUp" component={checkUp} />
                <Route path="/home/compostSupervise/compostVillageSupervise" component={compostVillageSupervise} />
                <Route path="/home/compostSupervise/compostTownSupervise" component={compostTownSupervise} />
                <Route path="/home/compostSupervise/compostAreaSupervise" component={compostAreaSupervise} />
    </div>)
}
export default compostSupervise
