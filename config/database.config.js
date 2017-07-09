var mysql = require('mysql');
var parametros =  {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'AgendaIn6am'
}
var connection = mysql.createConnection(parametros);

module.exports = connection;
