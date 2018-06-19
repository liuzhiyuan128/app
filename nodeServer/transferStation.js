const a = require("./repairData");

const repairData = a.repairData;
const tokenObj = a.tokenObj;

const jwt = require("jsonwebtoken");
const getSqlData = require("./sqlfn").getSqlData;


exports.transferStation = function (req, res, resHeaders) {
    //目的区分 /login /login/?a=1&b=2  /login/2 
    var url = req.url;                                                                      
    const firstRepairName = url.substring(url.lastIndexOf("/") + 1, (url.lastIndexOf("?") + 1) ? url.lastIndexOf("?") : undefined);

    const secondRepaiUrl = url.substr(0, url.lastIndexOf("/"));
    
    const secondRepaiName = secondRepaiUrl.substr(secondRepaiUrl.lastIndexOf("/")+1);
    
    //设置公共 请求头
    for (var key in resHeaders) {
        if (resHeaders.hasOwnProperty(key)) {
            res.setHeader(key, resHeaders[key])
        }
    }
    //token权限
     if (firstRepairName !== "login") {
            var tokenData = null;
            var token = req.headers.token;
           
            if (token)(tokenData = jwt.decode(token));
            
            //比较token
            if(token.length <=0 || token == undefined || token == 0 || token == null){
                res.writeHead(400,{});
                 res.end(JSON.stringify({
                     msg: 'token非法'
                 }))
                return false;
            }
            if(tokenObj[tokenData.token] !== token){
                
                 res.writeHead(400,{});
                 res.end(JSON.stringify({
                     msg: 'token非法'
                 }))
                 return false;
            }
        }


    //调用对应的接口方法
    
    try{
 
        eval("repairData."+firstRepairName+"(req, res, resHeaders)")
    }catch(err){
        try{
            
            eval("repairData."+secondRepaiName+"(req, res, resHeaders)")
        }catch(err){
            res.writeHead(404,resHeaders);
            res.end()
        }
    }
   
   
}
