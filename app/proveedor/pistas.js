const logs = require('../utils/logs');
const BD = require('../bd/bd');
class Pistas {
  constructor() {
    this.bd = new BD();
  }

  /// Funcion para recibir las pistas
  async getPistas() {
    try {
      await this.bd.connect();
      await this.bd.connection.beginTransaction();

      const [resultPistas] = await this.bd.connection.execute(
        `SELECT DISTINCT 
            P.*, 
            L.id_pista 
        FROM 
            localidades L 
        JOIN 
            pistas P ON P.id_pista = L.id_pista 
        WHERE L.id_proveedor = ?;`,
        [1]
      );
      await this.bd.connection.commit();
      return resultPistas;
    } catch (error) {
      logs('Error al obtener los datos:', error);
      await this.bd.rollback();
    } finally {
      await this.bd.disconnect();
    }
  }

  // Funcion para anadir las pistas
  async anadirPista(datos) {
    try {
      await this.bd.connect();
      await this.bd.connection.beginTransaction();
      var listIdsTarifas = [];

      /// Insertar Tarifas
      datos.tarifas.forEach(async (dias) => {
        dias.forEach(async (tarifa, index) => {
          // Insertar datos en la tabla Tarifas
          const [resultTarifas] = await this.bd.connection.execute(
            'INSERT INTO tarifas (activado, clases, luz, hora, fecha, precio_con_luz_socio, precio_sin_luz_socio, precio_con_luz_no_socio, precio_sin_luz_no_socio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            tarifa
          );
          listIdsTarifas.push(resultTarifas.insertId);
        });
      });

      /// Insertar Pista
      const [resultPistas] = await this.bd.connection.execute(
        `INSERT INTO pistas (deporte, num_pista, techada, iluminacion, tipo, cesped, automatizada, duracion_partida, hora_inicio, hora_fin, tiempo_reserva_socio, tiempo_cancelacion_socio, precio_luz_socio, precio_sin_luz_socio, tiempo_reserva_no_socio, tiempo_cancelacion_no_socio, precio_luz_no_socio, precio_sin_luz_no_socio, descripcion, nombre_patrocinador, imagen_patrocinador, vestuario, duchas, imagenes_pista)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); `,
        datos.pista
      );

      /// Insertar Localidad con los ids de pista y tarifas
      listIdsTarifas.forEach(async (idTarifa) => {
        const [resultLocalidad] = await this.bd.connection.execute(
          `INSERT INTO localidades (nombre,	id_proveedor,	id_pista,	id_tarifa)
        VALUES(?, ?, ?, ?); `,
          ['Riolobos', 1, resultPistas.insertId, idTarifa]
        );
      });
      await this.bd.connection.commit();
      logs('Pista insertada correctamente.');
    } catch (error) {
      logs('Error al insertar datos:', error.message);
      await this.bd.rollback();
    } finally {
      await this.bd.disconnect();
    }
  }
}
module.exports = Pistas;
