import {message} from "antd";
import inter from "./interface";


const ajax = (option) => {
	
	var urls = option.url;
	
	var params = '';
	if(urls.indexOf("/") == -1){
		urls = urls;
	}else{
	
		urls = urls.substring(0, urls.indexOf("/"))
		
		params =  option.url.substring(option.url.indexOf("/"))
	
	}
	//可以不传data
	option.data = option.data || {}
	
	let url = `${inter.baseUrl}${inter[option.module][urls]}${params}`;


	//判断token是否纯在 存在就传入请求头 不存在 就在请求头里传入空对象
	if (!url) option.success("路径有误")
		
	axios({
		url: url, //请求地址
		type: option.type, //请求方式
		data: option.data, //请求参数
		success: function (res, xml) {
			option.success(res)
			// 此处放成功后执行的代码
		},
		fail: function (status) {

			message.warning("请求数据有误")
		},
		asyny: option.asyny
	})

}



function axios(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	options.asyny = options.asyny == false ? false : true
	var params = options.data

	//创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//接收 - 第三步
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				
				var res = JSON.parse(xhr.responseText);
				if(xhr.getResponseHeader('token')){
					sessionStorage.token =  xhr.getResponseHeader('token')
				}
				options.success && options.success(res, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	if (options.type == "GET") {
		if(JSON.stringify(params) != "{}"){
			options.url = options.url + "?" + params
		} 
		xhr.open("GET", options.url, options.asyny);
		if (sessionStorage.token) {
			xhr.setRequestHeader("token", sessionStorage.token)
		}
		xhr.send(null);
	} else if (options.type == "POST") {
		console.log(options.url)
		xhr.open("POST", options.url, options.asyny);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if (sessionStorage.token) {
			xhr.setRequestHeader("token", sessionStorage.token)
		}
		xhr.send(params);
	}
}
//格式化参数

export default ajax