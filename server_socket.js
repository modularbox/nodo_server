const http = require('http');
const logs = require('./app/utils/logs');
// Importa la biblioteca de Socket.io
const socketio = require('socket.io');

const VERSION = "2.1.0"

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor HTTP funcionando correctamente.');
});

// Crea una instancia de Socket.io y pásale el servidor HTTP
const io = socketio(server);

// Maneja la conexión de un cliente
io.on('connection', (socket) => {

  // Mandar el programa al cliente
  socket.on('programa', (data) => {
    var dataJson = JSON.parse(data);
    logs(`Mandando al cliente el programa ${dataJson.lugar} `);
    io.emit(`programa${dataJson.lugar}`, dataJson);
  });

  // Mandar el programa por tiempo, al cliente
  socket.on('programa_por_tiempo', (data) => {
    var dataJson = JSON.parse(data);
    logs(`Mandando al cliente el programa por tiempo ${dataJson.lugar} `);
    io.emit(`programa_por_tiempo${dataJson.lugar}`, dataJson);
  });
});

// Escucha en un puerto específico
const PORTSOCKET = 3005;
server.listen(PORTSOCKET, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`);
  logs(`Server Sockets - Version ${VERSION}`)
  logs(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`);
});