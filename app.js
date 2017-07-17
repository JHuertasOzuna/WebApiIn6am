var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

//IMPORTAR ROUTES
var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth.route');
var usuarioRoute = require('./routes/api/usuario.route');
var categoriaRoute = require('./routes/api/categoria.route');
var contactoRoute = require('./routes/api/contacto.route');
var services = require('./services');

var app = express();
var port = 3000;
var uri = '/api/v1/';

//CONFIGURACION VISTA
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//CONFIGURACION LOGGER
app.use(logger('dev'));

//CONFIGURACION DE BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/', indexRoute);
app.use('/', authRoute);
app.use(uri, usuarioRoute);
app.use(uri, categoriaRoute);
app.use(uri, contactoRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json(err);
  next();
});


app.listen(port, function() {
  console.log("El servidor esta corriendo puerto: " + port);
});
