const logs = require('../utils/logs');
const BD = require('../bd/bd');
class Proveedor {
  constructor() {
    this.bd = new BD();
  }

  // Funcion para anadir un nuevo Proveedor
  async anadirProveedor(datos) {
    try {
      // Empezar conexion con la base de datos
      await this.bd.connect();
      await this.bd.connection.beginTransaction();
      /// Insertar Proveedor
      let signosValues = Array(datos.proveedor.length).fill('?').join(', ');
      await this.bd.connection.execute(
        `INSERT INTO proveedores(tipo, cif_nif, direccion_fiscal, codigo_postal_fiscal, localidad_fiscal, provincia_fiscal, comunidad_fiscal, codigo_iban, certificado_cuenta, nombre, apellidos, fijo, email, lada, telefono, nombre_comercial, direccion, codigo_postal, localidad, provincia, comunidad, contrasena, foto, fecha_registro)
        VALUES (${signosValues}); `,
        datos.proveedor
      );
      this.bd.connection.commit();
      logs('Usuario anadido correctamente.');
    } catch (error) {
      logs('Error al insertar datos:', error.message);
      await this.bd.rollback();
    } finally {
      await this.bd.disconnect();
    }
  }
  /// Funcion para recibir los usuarios
  async datosProveedor(usuario) {
    try {
      await this.bd.connect();
      await this.bd.connection.beginTransaction();
      const [result] = await this.bd.connection.execute(
        `SELECT tipo, cif_nif, direccion_fiscal, codigo_postal_fiscal, localidad_fiscal, provincia_fiscal, comunidad_fiscal, codigo_iban, certificado_cuenta, nombre, apellidos, fijo, email, lada, telefono, nombre_comercial, direccion, codigo_postal, localidad, provincia, comunidad, contrasena, foto, fecha_registro
          FROM proveedores
          ORDER BY id_proveedor DESC
          LIMIT 1;`
      );
      this.bd.connection.commit();
      if (result.length > 0) {
        console.log([result.length > 0]);
        return result[0];
      } else {
        return {};
      }
    } catch (error) {
      logs('Error al obtener los datos:', error);
      await this.bd.rollback();
    } finally {
      await this.bd.disconnect();
    }
  }
}
module.exports = Proveedor;
