const express = require('express')
const fs = require('fs')
const router = express.Router();
const logs = require('../utils/logs');


router.post('/id', async (req, res) => {
    const jsonData = req.body;
	logs(jsonData)
    logs(JSON.stringify(jsonData))
    res.status(200).send(`Luces enviadas con el id listo`);
});


// router.post('/:place/id', async (req, res) => {
//     // Tomar el lugar de la url
//     const place = req.params.place;
//     // JSON_FILE = `app/configuracion_luces/${place}.json` ;
//     // logs(`Configuracion luces ${place}`);
//     // Obtener el JSON enviado en la solicitud POST
//     const jsonData = req.body;
//     logs(JSON.stringify(jsonData, null, 2))
//     [1234366434]
//     res.status(200).send(`Luces enviadas ${place} listo`);

//     // focos_encendidos = None
//     // colores = {
//     //     'red': [1, 6, 11, 16],
//     //     'green': [2, 7, 12, 17],
//     //     'blue': [3, 8, 13, 18],
//     //     'yellow': [1, 2, 6, 7, 11, 12, 16, 17],
//     //     'orange': [1, [2, 170], 6, [7, 170], 11, [12, 170], 16, [17, 170] ],
//     //     'purple': [[1, 170], 3, [6, 170], 8, [11, 170], 13, [16, 170], 18],
        
//     // }
//     // if color == 'red':
//     //     focos_encendidos = colores['red']
//     // elif color == 'green'
//     //     focos_encendidos = colores['green']
//     // elif color == 'blue'
//     //     focos_encendidos = colores['blue']
//     // elif color == 'yellow'
//     //     focos_encendidos = colores['yellow']
//     // elif color == 'orange'
//     //     focos_encendidos = colores['orange']
//     // elif color == 'purple'
//     //     focos_encendidos = colores['purple']

//     // return focos_encendidos
//     // // Escribir el JSON en el archivo
//     // fs.writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2), err => {
//     //     if (err) {
//     //         logs('Error al guardar el archivo JSON:', err);
//     //         res.status(500).send('Error interno del servidor');
//     //     } else {
//     //        logs('Archivo JSON guardado correctamente');
//     //         res.status(200).send(`Configuracion de luces ${place} listo`);
//     //     }
//     // });
// });

// Ruta para manejar solicitudes GET
router.get('/:place', (req, res) => {
    const place = req.params.place;
    JSON_FILE = `app/configuracion_luces/${place}.json` ;
    // Leer el archivo JSON y enviarlo como respuesta
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs(`Enviado configuracion ${place} correctamente`)
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

module.exports = router;