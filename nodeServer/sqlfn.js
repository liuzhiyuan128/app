var mysql = require('mysql');

const createConnection  = () =>  mysql.createConnection({ host: 'localhost', user: 'root', password: '123456', database: 'test' });
var connection = createConnection();
const getSqlData = (sql, callBack) => {
    
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            callBack(err)
            return;
        }
       
        callBack(null, rows)
    });
    
}

const upSqlUpData = (updateSql, updateParams, callBack) => {

    connection.query(updateSql,updateParams,function(err,result){
        
        
                if(err){
                      callBack && callBack(err)
                        console.log('[UPDATE ERROR] '+ err.message)
                }else{  

                     callBack && callBack(err,  result.affectedRows)                  
                    console.log(`UPDATE SUCCESS `+ result.affectedRows);        //成功影响了x行  1
                 }
    })
}

exports.getSqlData = getSqlData;
exports.upSqlUpData = upSqlUpData;