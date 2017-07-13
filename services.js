var jwt = require('jsonwebtoken');
var services = {};
services.verificar = function(req, res, next) {
	console.log("Funcion para verificar el token");
	var header = req.headers["Authorization"];
	if(typeof header !== undefined) {
		console.log("Si trae la cabecera de Authorization");
		var arrayHeader = header.split(" ");
		var token = arrayHeader[1];
		if(token) {
			console.log("Si existe el token");
			jwt.verify(token, 'shh', function(err, decoded) {
				if(err) {
					if(err.name == "TokenExpiredError") {
						console.log("El token ya expiro");
						res.json({
							estado: false,
							mensaje: "Autenticacion fallida, expiro el token"
						});
					}
				} else {
					console.log("El token ya fue verificado");
					req.token = token;
					next();
				}
			});
		} else {
			console.log("No existe el token");
		}
	} else {
		console.log("No trae la cabecera de Authorization");
		next();
	}
}
module.exports = services;