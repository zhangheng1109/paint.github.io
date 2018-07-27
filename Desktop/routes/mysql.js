var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.post('/getUsers', function(req, res, next) {
    var sql = 'select * from users';
    db.query(sql,function(err,rows){
        if(err){
            res.send(err);
        }else {
            //获取ajax传递数值
            //console.log(req.body);

            res.send(rows);
        }
    });
});

module.exports = router;