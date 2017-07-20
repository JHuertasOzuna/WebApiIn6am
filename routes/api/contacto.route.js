var express = require('express');
var contacto = require('../../model/contacto.model');
var services = require('../../services');
var router = express.Router();

router.get('/contacto/', services.verificar, function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  contacto.select(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});
//localhost:3000/api/v1/contacto/4

router.get('/contacto/:id', services.verificar, function(req, res, next) {
  var idContacto = req.params.id;
  var idUsuario = req.usuario.idUsuario;
  contacto.select(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos.find(c => c.idContacto == idContacto));
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

router.post('/contacto', services.verificar, function(req, res, next) {
  console.log(req.usuario);
  
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    idCategoria : req.body.idCategoria
  };
  console.log(data);
  contacto.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.json({
        estado: true,
        mensaje: "Se agrego el contacto"
      });
    } else {
      res.json({"mensaje":"No se ingreso el contacto"});
    }
  });
});

router.put('/contacto/:idContacto', function(req, res, next){
  var idContacto = req.params.idContacto;
  var data = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    direccion : req.body.direccion,
    idCategoria : req.body.idCategoria,
    idContacto : idContacto
  }
  contacto.update(data, function(resultado){
    if(resultado.length > 0) {
      res.json({
        estado: true,
        mensaje: "Se ha modificado con exito"
      });
    } else {
      res.json({
        estado: false,
        mensaje: "No se pudo modificar"
      });
    }
  });
});

router.delete('/contacto/:idContacto', function(req, res, next){
  var idContactoUri = req.params.idContacto;
  contacto.delete(idContactoUri, function(resultado){
    if(resultado && resultado.mensaje ===	"Eliminado") {
      res.json({
        estado: true,
        "mensaje":"Se elimino el contacto correctamente"
      });
    } else {
      res.json({
        estado: false,
        "mensaje":"No se elimino el contacto"});
    }
  });
});

module.exports = router;
