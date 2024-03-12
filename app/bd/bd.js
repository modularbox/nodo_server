const mysql = require('mysql2/promise');
const leerArchivo = require('../json/json');
const logs = require('../utils/logs');
class BD {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      const json = await leerArchivo();
      // Accede a las variables de entorno
      this.connection = await mysql.createConnection({
        host: json.host,
        user: json.user,
        password: json.password,
        database: json.database,
      });
      logs('Conectado a la base de datos');
    } catch (error) {
      logs('Error al conectar a bd: ', error.message);
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      logs('Desconectado de la base de datos');
    }
  }
  async rollback() {
    if (this.connection) {
      await this.connection.rollback();
      logs('Desconectado de la base de datos');
    }
  }
}
module.exports = BD;
