var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const engine = require('ejs-mate');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

//Initializations
var app = express();
require('./database');
require('./passport/local-auth');

//settings
/*app.engine('ejs',engine)
app.set('view engine', 'ejs');*/

// starting the server
app.listen(app.get('port'),()=>{
  console.log('Server on port',app.get('port'));
})

// middlewares - Son funciones que se ejecutan antes de que pasen a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'myscretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Middleware que yo mismo voy a escribir, no como los anteriores que ya estaban definidos.
app.use((req, res, next) =>{
 app.locals.signupMessage = req.flash('signupMessage');
 app.locals.signinMessage = req.flash('signinMessage');
 app.locals.user = req.user;
 next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/karma",express.static(__dirname + "/karma"));
app.use("/Backend",express.static(__dirname + "/Backend"));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
