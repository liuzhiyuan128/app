var mysql = require('mysql');


const getSqlData = (sql, callBack) => {
    var connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '123456', database: 'test' });
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            callBack(err)
            return;
        }
        callBack(null, rows)
    });
    connection.end(function (err) {
        if (err) {
            callBack(err)
        }
        console.log('[connection end] succeed!');
    });
}

exports.getSqlData = getSqlData;