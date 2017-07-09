var express = require('express');
var usuarioModel = require('../model/usuario.model');
var usuarioRoute = express.Router();

usuarioRoute.route('/api/v1/usuario/')
  .get(function(req, res) {
    usuarioModel.selectAll(function(resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"mensaje" : "No hay usuarios"});
      }
    });
  })
  .post(function(req, res) {
    res.json({"mensaje":"Se envio una peticion post"});
  });

usuarioRoute.route('/api/v1/usuario/:idUsuario')
  .get(function(req, res) {
    res.json({"mensaje":"Se envio una peticion get 1"});
  })
  .put(function(req, res) {
    res.json({"mensaje":"Se envio una peticion put"});
  })
  .delete(function(req, res) {
    res.json({"mensaje":"Se envio una peticion delete"});
  });

module.exports = usuarioRoute;
