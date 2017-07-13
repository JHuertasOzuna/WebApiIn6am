var database = require("../config/database.config");
var Contacto = {};

Contacto.select = function(idUsuario, callback) {
  if(database) {
		database.query('CALL sp_selectContactos(?)', idUsuario,
     function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados[0]);
			}
		});
	}
}

Contacto.insert = function(data, callback) {
  if(database) {
    database.query('CALL sp_insertContacto(?,?,?,?,?,?)',
    [data.idUsuario, data.nombre, data.apellido, data.telefono, data.direccion, data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

Contacto.update = function(data, callback){
	if(database) {
		database.query('CALL sp_updateContacto(?,?,?,?,?,?)',
		[data.idContacto, data.nombre, data.apellido, data.telefono, data.direccion, data.idCategoria],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

Contacto.delete = function(idContacto, callback) {
	if(database) {
		database.query('CALL sp_deleteContacto(?)', idContacto,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Contacto;
