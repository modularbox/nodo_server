const io = require('socket.io-client')
const logs = require('../utils/logs')

class SocketIOClient { 
    constructor(url) {
        try {
            this.socket = io(url);
            this.setupListeners();
        } catch (error) {
            logs(error)
        }
    }

    setupListeners() {
        this.socket.on('connect', () => {
            logs('Conectado al servidor Socket.IO');
        });

        this.socket.on('message', (data) => {
            logs('Mensaje del servidor:', data);
        });
        // this.socket.on('programacontinuo', (data) => {
        //     logs('Mensaje del servidor:', data);
        // });

        // this.socket.on('programacontinuo', (data) => {
        //     logs('Mensaje del servidor:', data);
        // });
		this.socket.on("error", (error) => {
			logs("Error en la conexión:", error);
		});

		this.socket.on("connect_error", (error) => {
			logs("Error al conectar:", error);
		});

        this.socket.on('disconnect', () => {
            logs('Desconectado del servidor Socket.IO');
        });
    }

    sendProgramaContinuo() {
        this.socket.emit('programacontinuo', "node programa continuo");
    }

    sendProgramaPorTiempo() {
        this.socket.emit('programaportiempo', "node programa por tiempo");
    }

    sendMensaje() {
        logs("Encender")
        this.socket.emit('encender', "node Mensjae por tiempo");
    }
}

module.exports = SocketIOClient;
