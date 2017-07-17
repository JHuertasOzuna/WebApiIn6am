var express = require('express');
var usuario = require('../../model/usuario.model');
var services = require('../../services');
var router = express.Router();

router.get('/usuario', function(req, res) {
  usuario.selectAll(function(resultado) {
    if(typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"mensaje" : "No hay usuarios"});
    }
  });
});

router.get('/usuario/historial', function(req, res) {
  usuario.selectHistorial(1, function(err, resultado) {
    if(typeof resultado !== undefined) {
      res.json(resultado);
    } else {
      res.json({"mensaje" : "No hay historial"});
    }
  });
});

/*
SI ALGUIEN ESTA DORMIDO, NO LO DESPIERTEN,
NOS TOMAMOS UNA FOTICA A LA PAR DE EL
*/
router.post('/usuario', function(req, res) {
  var data = {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }
  usuario.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      res.json({
        estado : true,
        mensaje : "Se registo el usuario correctamente"
      });
    } else {
      resultado.status = false;
      resultado.mensaje = "Error no se registro el usuario";
      res.json(resultado);
    }
  });
});

router.put('/usuario/:idUsuario', function(req, res){
  var idUsuario = req.params.idUsuario;

	var data = {
		idUsuario : req.body.idUsuario,
    nick : req.body.nick,
    contrasena: req.body.contrasena
	}
  console.log(data);
  if (idUsuario == data.idUsuario) {
    usuario.update(data, function(resultado){
      if(typeof resultado !== undefined) {
        //res.json({"mensaje":"Se edito correctamente"});
        auth.cerrarSesion(res);
        res.json({"Editado":"true"});
  		} else {
  			res.json({"mensaje":"No se pudo actualizar"});
  		}
    });
  } else {
    res.json({mensaje: "No hay coherencia en los identificadores"});
  }
});

router.delete('/usuario/:idUsuario', function(req, res){
	var idUsuario = req.params.idUsuario;

	usuario.delete(idUsuario, function(resultado){
		if(resultado && resultado.mensaje ===	"Eliminado") {
			res.json({"mensaje":"Se elimino la usuario correctamente"});
		} else {
			res.json({"mensaje":"Se elimino la usuario"});
		}
	});
});
module.exports = router;
