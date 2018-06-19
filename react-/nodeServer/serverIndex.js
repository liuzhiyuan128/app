const http = require("http");
const util = require('util');

const transferStation = require('./transferStation').transferStation;
const port = 8888;
// const ip = "192.168.1.4"
const ip = "192.168.10.117"


const resHeaders = {
    "Content-type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Origin' : '*', //允许跨域
    "Access-Control-Allow-Methods" : 'PUT, GET, POST, DELETE, OPTIONS', //允许请求方式
    "Access-Control-Allow-Headers" : 'X-Requested-With,token,Content-Type', //允许请求头发送的参数
    "Access-Control-Expose-Headers" : 'token' //允许请求头的token被获取
}



http.createServer(function (request, response) {
    //跨域问题
      if (request.method == 'OPTIONS') {
            response.writeHead(200, resHeaders )     
            response.end(JSON.stringify({}))
        }else{
            transferStation(request, response, resHeaders) 
        }
    })
    .listen(port, ip, null, function () {
        console.log("http://"+ip+":"+port)
    });
