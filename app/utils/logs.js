const fs = require("fs");

function escribirLog(mensaje) {
  console.log(mensaje);
  // Obtener la fecha actual
  const fechaActual = new Date().toISOString();

  // Formatear el mensaje de log
  const textoNuevo = `${fechaActual} - ${mensaje}.\n`;

  const filePath = "archivo_de_logs.txt";

  // Leer el contenido actual del archivo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }

    // Concatenar el nuevo texto al contenido existente
    const contenidoNuevo = textoNuevo + data;

    // Escribir el contenido actualizado en el archivo
    fs.writeFile(filePath, contenidoNuevo, (err) => {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
        return;
      }
      console.log("Texto agregado al inicio del archivo correctamente");
    });
  });
}

module.exports = escribirLog;
