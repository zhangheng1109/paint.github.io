var mysql = require('mysql');


/** 配置mysql的参数 */
var pool = mysql.createPool({
    host:'192.168.5.104',
    user:'root',
    password:'root',
    database:'test'
});

/** 数据库链接 */
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql,function(err,rows){
            callback(err,rows);
            //释放链接
            connection.release();
        });
    });
}

exports.query = query;