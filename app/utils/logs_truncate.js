const fs = require("fs");

function logs_truncate() {
  const filePath = "archivo_de_logs.txt";
  // Trunca el archivo a longitud 0 para eliminar todo el contenido
  fs.truncate(filePath, 0, (err) => {
    if (err) {
      console.error("Error al truncar el archivo:", err);
      return;
    }
    console.log("Contenido del archivo eliminado correctamente");
  });
}

module.exports = logs_truncate;
