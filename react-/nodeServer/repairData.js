

const jwt = require("jsonwebtoken");
const url = require("url");
const getSqlData = require("./getSqlData").getSqlData;

let token = jwt.sign({
    foo: 'bar'
}, 'shhhhh');

const getPostData = function (req, callback) {
         let postData = ""
         //监听post传过来的数据；
            req.addListener("data",function(data){
                postData += data
            });
            req.addListener("end", function (){
                                //password=admin&username=admin
                postData = postData.split("&"); //["password=admin","username=admin"]
                let postDataObj = {}
                
                postData.some(function (item,index) {
                    const onItem = item.split("=");
                    postDataObj[onItem[0]] = onItem[1];
                })
               
                callback && callback(postDataObj)
            })
} 
// 获取get 请求数据 /login?a=2&b=1   {a:2,b:1}
const getGetData = getResUrl => url.parse(getResUrl, true).query;


exports.repairData  = {
    login: function (req, res, resHeaders) {
        
        if (req.url === "/rbac/user/login" && req.method === "POST") {
            
            getPostData(req, function(postData){
            
                getSqlData(`select * from user where username='${postData.username}'`, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    //没有用户
                    if (rows.length == 0) {
                      
                        res.writeHead(200, resHeaders)
                        res.end(JSON.stringify({ code: 404, data: {},  msg:"暂无用户",}));
                    }else{
                        //与数据库的密码相等
                      
                     
                      if(rows[0].password == postData.password){
                         
                        // 查询成功
                  
                        resHeaders["token"] = token
                      
                       
                        res.writeHead(200, resHeaders)
                        res.end(JSON.stringify({ code: 200, data: { ok: "ok", id: 1 }, msg: "超级管理", }));
                      }else{
                       
                        res.writeHead(200, resHeaders)
                        res.end(JSON.stringify({ code: 404, data: {}, msg: "密码错误", }));
                      }
                    
                    } 
                })
            })
          
        }else{
             res.writeHead(404, resHeaders);
             res.end()
        }
    },
    selectMyUserById: function (req, res, resHeaders){
            //判断/login/1
        if (req.url.indexOf("/rbac/user/selectMyUserById/")+1 && req.method == "GET"){
            var a = {"data":{"id":"gl00001","realname":"超级管理员","description":"大BOSS","image":"","lrr":null},"code":200,"msg":"获取用户头像、姓名、描述成功"}
            res.writeHead(200, resHeaders)
            res.end(JSON.stringify(a))
        }else{
            res.writeHead(404, resHeaders);
            res.end()
        }
    },
    getUserRank: function (req, res, resHeaders) {
        if (req.url == "/bettle/api/evaluation/getUserRank" && req.method == "POST"){
            var data = {"data":{"pageNum":1,"pageSize":10,"size":10,"orderBy":null,"startRow":1,"endRow":10,"total":564,"pages":57,"list":[{"trashId":"jdjd12034","realname":"胡瑞棠","adress":"江东镇南下王村","total":150,"avg":15.0,"rank":1,"number":10},{"trashId":"jdjd12004","realname":"卢洪亮","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12072","realname":"卢耀芸","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12021","realname":"傅裕登","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12022","realname":"姜小倩","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12138","realname":"汤燕春","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12107","realname":"王姣芸","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12023","realname":"傅文侠","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12102","realname":"王永成","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12110","realname":"沈财成","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9}],"firstPage":1,"prePage":0,"nextPage":2,"lastPage":8,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8]},"code":200,"msg":"查询垃圾桶住户排名成功"}
            res.writeHead(200, resHeaders)
            res.end(JSON.stringify(data))
        }else{
             res.writeHead(404, resHeaders);
             res.end()
        }
    },
    test: function (req, res, resHeaders) {

        if (req.url.indexOf("/bettle/api/evaluation/test")+1 && req.method == "GET"){
            var data = {"data":{"pageNum":1,"pageSize":10,"size":10,"orderBy":null,"startRow":1,"endRow":10,"total":564,"pages":57,"list":[{"trashId":"jdjd12034","realname":"胡瑞棠","adress":"江东镇南下王村","total":150,"avg":15.0,"rank":1,"number":10},{"trashId":"jdjd12004","realname":"卢洪亮","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12072","realname":"卢耀芸","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12021","realname":"傅裕登","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12022","realname":"姜小倩","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12138","realname":"汤燕春","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12107","realname":"王姣芸","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12023","realname":"傅文侠","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12102","realname":"王永成","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9},{"trashId":"jdjd12110","realname":"沈财成","adress":"江东镇南下王村","total":135,"avg":15.0,"rank":2,"number":9}],"firstPage":1,"prePage":0,"nextPage":2,"lastPage":8,"isFirstPage":true,"isLastPage":false,"hasPreviousPage":false,"hasNextPage":true,"navigatePages":8,"navigatepageNums":[1,2,3,4,5,6,7,8]},"code":200,"msg":"查询垃圾桶住户排名成功"}
            console.log(getGetData(req.url))
            res.writeHead(200, resHeaders)
            res.end(JSON.stringify(data))
        }else{
             res.writeHead(404, resHeaders);
             res.end()
        }
    },
    tree: function (req, res, resHeaders) {

        if (req.url == "/bettle/api/village/tree" && req.method == "GET"){
            var data = {
    "data": [
        {
            "id": 10,
            "name": "金东区",
            "pid": 0
        },
        {
            "id": 9,
            "name": "江东镇",
            "pid": 10
        },
        {
            "id": 11,
            "name": "多湖街道",
            "pid": 10
        },
        {
            "id": 13,
            "name": "澧浦镇",
            "pid": 10
        },
        {
            "id": 15,
            "name": "源东乡",
            "pid": 10
        },
        {
            "id": 22,
            "name": "岭下镇",
            "pid": 10
        },
        {
            "id": 27,
            "name": "东孝街道",
            "pid": 10
        },
        {
            "id": 29,
            "name": "曹宅镇",
            "pid": 10
        },
        {
            "id": 32,
            "name": "塘雅镇",
            "pid": 10
        },
        {
            "id": 1,
            "name": "江东镇上王村",
            "pid": 9
        },
        {
            "id": 2,
            "name": "江东镇前贾村",
            "pid": 9
        },
        {
            "id": 3,
            "name": "江东镇雅金村",
            "pid": 9
        },
        {
            "id": 4,
            "name": "江东镇杨川村",
            "pid": 9
        },
        {
            "id": 5,
            "name": "江东镇雅湖村",
            "pid": 9
        },
        {
            "id": 6,
            "name": "江东镇浪石头村",
            "pid": 9
        },
        {
            "id": 7,
            "name": "江东镇国湖村",
            "pid": 9
        },
        {
            "id": 8,
            "name": "江东镇焦岩村",
            "pid": 9
        },
        {
            "id": 36,
            "name": "江东镇孔坑村",
            "pid": 9
        },
        {
            "id": 37,
            "name": "江东镇岩岭村",
            "pid": 9
        },
        {
            "id": 38,
            "name": "江东镇黄埔坑村",
            "pid": 9
        },
        {
            "id": 39,
            "name": "江东镇徐里村",
            "pid": 9
        },
        {
            "id": 40,
            "name": "江东镇湖园村",
            "pid": 9
        },
        {
            "id": 1233,
            "name": "test",
            "pid": 15
        }
        ]
    }
            res.writeHead(200, resHeaders)
            res.end(JSON.stringify(data))
        }else{
             res.writeHead(404, resHeaders);
             res.end()
        }
    },  
    areaTownTree: function (req, res, resHeaders) {
		console.log(req.url)
        if (req.url == "/bettle/api/village/areaTownTree" && req.method == "GET"){
            var data = {
			    "data": [
			        {
			            "id": 10,
			            "name": "金东区",
			            "pid": 0
			        },
			        {
			            "id": 9,
			            "name": "江东镇",
			            "pid": 10
			        },
			        {
			            "id": 11,
			            "name": "多湖街道",
			            "pid": 10
			        },
			        {
			            "id": 13,
			            "name": "澧浦镇",
			            "pid": 10
			        },
			        {
			            "id": 15,
			            "name": "源东乡",
			            "pid": 10
			        },
			        {
			            "id": 22,
			            "name": "岭下镇",
			            "pid": 10
			        },
			        {
			            "id": 27,
			            "name": "东孝街道",
			            "pid": 10
			        },
			        {
			            "id": 29,
			            "name": "曹宅镇",
			            "pid": 10
			        },
			        {
			            "id": 32,
			            "name": "塘雅镇",
			            "pid": 10
			        },
			        {
			            "id": 1,
			            "name": "江东镇上王村",
			            "pid": 9
			        },
			        {
			            "id": 2,
			            "name": "江东镇前贾村",
			            "pid": 9
			        },
			        {
			            "id": 3,
			            "name": "江东镇雅金村",
			            "pid": 9
			        },
			        {
			            "id": 4,
			            "name": "江东镇杨川村",
			            "pid": 9
			        },
			        {
			            "id": 5,
			            "name": "江东镇雅湖村",
			            "pid": 9
			        },
			        {
			            "id": 6,
			            "name": "江东镇浪石头村",
			            "pid": 9
			        },
			        {
			            "id": 7,
			            "name": "江东镇国湖村",
			            "pid": 9
			        },
			        {
			            "id": 8,
			            "name": "江东镇焦岩村",
			            "pid": 9
			        },
			        {
			            "id": 36,
			            "name": "江东镇孔坑村",
			            "pid": 9
			        },
			        {
			            "id": 37,
			            "name": "江东镇岩岭村",
			            "pid": 9
			        },
			        {
			            "id": 38,
			            "name": "江东镇黄埔坑村",
			            "pid": 9
			        },
			        {
			            "id": 39,
			            "name": "江东镇徐里村",
			            "pid": 9
			        },
			        {
			            "id": 40,
			            "name": "江东镇湖园村",
			            "pid": 9
			        },
			        {
			            "id": 1233,
			            "name": "test",
			            "pid": 15
			        }
			        ]
			    }
            res.writeHead(200, resHeaders)
            res.end(JSON.stringify(data))
        }else{
             res.writeHead(404, resHeaders);
             res.end()
        }
    }
   
    
    
}
