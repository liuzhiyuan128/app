

import {Home,Login,Route,Link,React,Router,Redirect } from "../config/router.js"


export const root = () =>  (
	<Router>
		<div>
			<Route exact={true} path="/" render={()=><Redirect to="/home"/>} />
			<Route path="/login" component={Login} />
			<Route path="/home" component={Home} />
		</div>
	</Router>
);

