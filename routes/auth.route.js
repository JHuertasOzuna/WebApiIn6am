var express = require('express');
var jwt = require('jsonwebtoken');
var usuario = require('../model/usuario.model');
var router = express.Router();

router.post('/auth/', function(req, res) {
	var data = {
		nick: req.body.nick,
		contrasena: req.body.contrasena
	}
	usuario.login(data, function(resultado) {
		if(resultado != 0) {

			var token = 'Bearer ' + jwt.sign(resultado[0], 'shh', { expiresIn: '1h' });

			resultado[0].estado = true;
			resultado[0].mensaje = "Se autorizo el acceso";
			resultado[0].token = token;

			res.json(resultado[0]);
		} else {
			res.json({
				estado: false,
				mensaje: "Contraseña y Nick incorrecto, por favor no lo vuelva a intentar ;)"
			});
		}
	});
});

module.exports = router;
