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
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	next();
});

app.use('/', indexRoute);
app.use('/', authRoute);
app.use(uri, usuarioRoute);
app.use(uri, categoriaRoute);
app.use(uri, contactoRoute);

app.listen(port, function() {
  console.log("El servidor esta corriendo puerto: " + port);
});
