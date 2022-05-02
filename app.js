var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require("./routes/test")
let interception = require('./interception/index')
let menuRouter = require("./routes/menu")
let VolunteerRouter = require("./routes/volunteer")
let seekerRouter = require("./routes/family_seeker")
let positionRouter = require("./routes/position")
let martyrRouter = require("./routes/martyr")
let martyrCemeteryRouter = require("./routes/martyr_cemetery")
let seekerArticleRouter = require("./routes/Seeker_article")
let volunteerArticleRouter = require("./routes/volunteerArticle")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// 禁用缓存
// app.disable('etag');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(interception)
app.use('/users', usersRouter);
app.use('/test',testRouter);
app.use('/menu',menuRouter)
app.use('/volunteer',VolunteerRouter);
app.use('/seeker',seekerRouter);
app.use('/position',positionRouter);
app.use('/martyr',martyrRouter);
app.use('/martyrCemetery',martyrCemeteryRouter);
app.use('/seekerArticle',seekerArticleRouter);
app.use('/volunteerArticle',volunteerArticleRouter);

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

module.exports = app;
