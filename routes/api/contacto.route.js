var express = require('express');
var contacto = require('../../model/contacto.model');
var router = express.Router();
var idUsuario = 1;

router.get('/contacto/', function(req, res, next) {
  contacto.select(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.get('/contacto/:id', function(req, res, next) {
  var idContacto = req.params.id;
  contacto.select(idContacto, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.post('/contacto', function(req, res, next) {
  var data = {
    idUsuario: idUsuario,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    idCategoria : req.body.idCategoria
  };

  contacto.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.redirect('/api/contacto/');
    } else {
      res.json({"mensaje":"No se ingreso el contacto"});
    }
  });
});

router.put('/contacto/:idContacto', function(req, res, next){
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }
  if(idContacto == data.idContacto) {
    contacto.update(data, function(resultado){
      if(resultado.length > 0) {
        res.json(resultado);
      } else {
        console.log("NO: " + resultado.length);
        //res.json({"estatus": "false"});
        res.end();
      }
    });
  } else {
    res.json({"mensaje": "No coinciden los identificadores"});
  }
});

router.delete('/contacto/:idContacto', function(req, res, next){
  var idContactoUri = req.params.idContacto;
  var idContactoBody = req.body.idContacto;

  if(idContactoUri == idContactoBody) {
    contacto.delete(idContactoBody, function(resultado){
      if(resultado && resultado.mensaje ===	"Eliminado") {
        res.json({"mensaje":"Se elimino la contacto correctamente"});
      } else {
        res.json({"mensaje":"Se elimino la contacto"});
      }
    });
  }
});

module.exports = router;
