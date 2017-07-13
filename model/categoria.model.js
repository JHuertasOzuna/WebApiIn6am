var database = require("../config/database.config");
var Categoria = {};

Categoria.select = function(callback) {
  if(database) {
		database.query('SELECT * FROM Categoria', function(error, resultados){
			if(error) {
				throw error;
			} else {
				callback(resultados);
			}
		});
	}
}

Categoria.insert = function(data, callback) {
  if(database) {
    database.query('INSERT INTO Categoria SET ?', data, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"insertId":resultado.insertId});
      }
    });
  }
}

Categoria.update = function(data, callback){
	if(database) {
		database.query('UPDATE Categoria SET nombreCategoria=? WHERE idCategoria=?',
		[data.nombreCategoria, data.idCategoria],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

Categoria.delete = function(idCategoria, callback) {
	if(database) {
		database.query('DELETE FROM Categoria WHERE idCategoria = ?', idCategoria,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = Categoria;
