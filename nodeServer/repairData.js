"use strict";

var jwt = require("jsonwebtoken");
var url = require("url");
var sqlfn = require("./sqlfn");

var getSqlData = sqlfn.getSqlData;
var upSqlUpData = sqlfn.upSqlUpData;
var tokenObj = {};

var getPostData = function getPostData(req, callback) {
    var postData = "";
    //监听post传过来的数据；
    req.addListener("data", function (data) {
        postData += data;
    });
    req.addListener("end", function () {
        //password=admin&username=admin
        postData = postData.split("&"); //["password=admin","username=admin"]
        var postDataObj = {};
        postData.some(function (item, index) {
            var onItem = item.split("=");
            postDataObj[onItem[0]] = onItem[1];
        });
        callback && callback(postDataObj);
    });
};
// 获取get 请求数据 /login?a=2&b=1   {a:2,b:1}
var getGetData = function getGetData(getResUrl) {
    return url
        .parse(getResUrl, true)
        .query;
};

exports.tokenObj = tokenObj;
exports.repairData = {
    login: function login(req, res, resHeaders) {
        if (req.method === "POST") {
            var userData = {};
            new Promise(function (resolve, reject) {
                getPostData(req, function (postData) {
                    resolve(postData);
                });
            })
                .then(function (postData) {

                    return new Promise(function (resolve, reject) {
                        getSqlData("select * from user where username='" + postData.username + "'", function (err, rows) {
                            if (err) {
                                throw err;
                            }
                            //没有用户
                            if (rows.length == 0) {
                                res.writeHead(200, {});
                                res.end(JSON.stringify({code: 404, data: {}, msg: "暂无用户"}));
                                resolve(0);
                            } else {
                                var nextThenData = {
                                    rows: rows,
                                    postData: postData
                                };

                                resolve(nextThenData);
                            }
                        });
                    });
                })
                .then(function (_ref) {
                    var rows = _ref.rows,
                        postData = _ref.postData;

                    //与数据库的密码相等
                    if (rows) {
                        if (rows[0].password == postData.password) {
                            userData.username = rows[0].username,
                            userData.roleid = rows[0].roleid;
                            var token = jwt.sign({
                                exp: Date.now() + 1 * 60 * 60 * 1000,
                                token: rows[0].username
                            }, 'secret');
                            tokenObj[rows[0].username] = token;
                            //获取权限
                            getSqlData("select * from power where roleid=" + rows[0].roleid, function (err, rows) {
                                if (err) {
                                    throw err;
                                } else {
                                    var resData = [];
                                    rows.some(function (item) {
                                        if (item.isCheck == 1) {
                                            resData.push(item);
                                        }
                                    });
                                    userData.data = resData;
                                    res.writeHead(200, {token: token});
                                    res.end(JSON.stringify(userData));
                                }
                            });
                        } else {
                            res.writeHead(200, resHeaders);
                            res.end(JSON.stringify({code: 404, data: {}, msg: "密码错误"}));
                        }
                    }
                });
        } else {
            res.writeHead(404, resHeaders);
            res.end();
        }
    },

    getUserList: function getUserList(req, res) {

        getSqlData("select * from user", function (err, rows) {
            if (err) {
                return false;
            }
            res.writeHead(200, {});
            res.end(JSON.stringify(rows));
        });
    },
    addUser: function addUser(req, res) {

        new Promise(function (resolve, reject) {
            // 得到新用户数据
            getPostData(req, function (data) {
                resolve(data);
            });
        })
            .then(function (postData) {
                //查询用户是否存在；

                return new Promise(function (resolve, reject) {
                    getSqlData("select * from user where username='" + postData.username + "'", function (err, data) {
                        if (err) {
                            res.writeHead(200, {});
                            res.end(JSON.stringify({
                                msg: '添加' + postData.username + '失败'
                            }));
                        } else {
                            if (data.length > 0) {
                                res.writeHead(200, {});
                                res.end(JSON.stringify({
                                    msg: postData.username + '重复'
                                }));
                            } else {

                                resolve(postData);
                            }
                        }
                    });
                });
            })
            .then(function (postData) {
                //添加用户
                if (postData) {
                    res.writeHead(200, {});
                    var userAddsql = 'insert into user(username,password,roleid) value(?,?,?)';
                    var addData = [];
                    for (var item in postData) {
                        if (postData.hasOwnProperty(item)) {
                            addData.push(postData[item]);
                        }
                    }
                    upSqlUpData(userAddsql, addData, function (err, data) {
                        if (err) {
                            res.end(JSON.stringify({
                                msg: '添加' + postData.username + '失败'
                            }));
                            return;
                        }
                        res.end(JSON.stringify({
                            msg: '添加' + postData.username + '成功'
                        }));
                    });
                }
            });
    },
    deleteUser: function deleteUser(req, res) {
        res.writeHead(200, {});
        var userid = req
            .url
            .substr(req.url.lastIndexOf("/") + 1);
        if (userid == 1) {
            res.end(JSON.stringify({msg: "admin不可被删除"}));
            return false;
        }
        getSqlData("delete from user where userid = " + userid, function (err, rows) {
            if (err) {

                res.end(JSON.stringify({msg: "删除失败"}));
            }
            res.end(JSON.stringify({msg: "删除成功"}));
        });
    }
};