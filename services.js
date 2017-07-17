var jwt = require('jsonwebtoken');
var services = {};
services.verificar = function(req, res, next) {
	console.log("Funcion para verificar el token");
	var header = req.headers.authorization;

    if (typeof header != 'undefined') {
        var headerArray = header.split(" ");
        var token = headerArray[1];
        if(token) {
        	console.log("Si existe el token");
        	jwt.verify(token, 'shh', function(err, decoded){
						if(err) {
							return res.json({
								success: false,
								mensaje: 'Autenticacion fallida, expiró el token',
								error: err
							});
						} else {
							console.log("token decodificado");
							req.token = token;
							req.usuario = decoded;
							next();
						}
					});
        } else {
        	console.log("No existe el token");
        	res.json({
	        	estado: false,
	        	mensaje: "No existe el token"
	        });
        }
    } else {
        console.log("No lleva la cabezera authorization");
        res.json({
        	estado: false,
        	mensaje: "No lleva la cabezera authorization"
        });
        //next();
    }
}

module.exports = services;
