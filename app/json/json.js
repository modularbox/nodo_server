const fs = require('fs').promises; // Importar fs.promises para obtener funciones promisificadas

// Ruta al archivo JSON
const filePath = 'app/json/keys.json';

async function leerArchivo() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Manejar el error, si lo hay
    throw error;
  }
}
module.exports = leerArchivo;
