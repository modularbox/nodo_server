const logs = require('../utils/logs');
const BD = require('../bd/bd');
class Usuario {
  constructor() {
    this.bd = new BD();
  }
  /// Funcion para recibir los usuarios
  async getComidaDomicilio() {
    try {
      await this.bd.connect();
      await this.bd.connection.beginTransaction();
      const [result] = await this.bd.connection.execute(
        `SELECT 
            * 
        FROM 
            comida_domicilo`
      );
      this.bd.connection.commit();
      return result;
    } catch (error) {
      logs('Error al obtener los datos:', error);
      await this.bd.rollback();
    } finally {
      await this.bd.disconnect();
    }
  }
}

module.exports = Usuario;
