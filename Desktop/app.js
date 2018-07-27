var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//页面分发
var indexRouter = require('./routes/index');
//数据库
var mysqlRouter = require('./routes/mysql');

var app = express();

// view engine setup
app.engine(".html",require("ejs").__express);
app.set("view engine","html");


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mysql', mysqlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(1337,"127.0.0.1",function(){
    console.log(
        "开始监听......"
    );
});

module.exports = app;
