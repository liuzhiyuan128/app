const repairData =  require("./repairData").repairData;



exports.transferStation = function (req, res, resHeaders) {
    //目的区分 /login /login/?a=1&b=2  /login/2 
    let url = req.url;                                                                      
    const firstRepairName = url.substring(url.lastIndexOf("/") + 1, (url.lastIndexOf("?") + 1) ? url.lastIndexOf("?") : undefined);

    const secondRepaiUrl = url.substr(0, url.lastIndexOf("/"));
    
    const secondRepaiName = secondRepaiUrl.substr(secondRepaiUrl.lastIndexOf("/")+1);
    
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
