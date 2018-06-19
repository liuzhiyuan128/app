
import {root,Component,React,ReactDOM} from "./config/router.js"
import './css/antd.min.css';
import './css/index.less';
import createHistory from "history/createBrowserHistory"



class Root extends Component{
	constructor(props) {  
	    super(props);  
	   
 	 }  
	render(){
		return root()
	}
	componentDidMount(){
	
	}
	
}

ReactDOM.render(<Root/>,document.querySelector("#Root"))



