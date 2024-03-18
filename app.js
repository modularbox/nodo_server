const express = require('express')
const cors = require('cors')
const app = express()
const logs = require('./app/utils/logs')
const getColor = require('./app/configuracion_luces/casardepalomero')
// Version del servidor
const VERSION = '2.1.0-1';
/// Configuracion del cliente de los sockets
const SocketIOClient = require('./app/sockets/socket_ioclient')
const client = new SocketIOClient('http://api.conectateriolobos.es:3005')

var guardar_saucedilla = {
  ayuntamiento: [],
  iglesia: []
}
// Middleware para analizar datos JSON en el cuerpo de la solicitud.
app.use(express.json())
app.use(cors())
// Puerto para las peticiones nodejs
const PORT = 3000
// app.use('/luces', luces)

// Ruta para mandar a los sockets el programa
app.post('/:localidad/:lugar/programa', (req, res) => {
  const localidad = req.params.localidad
  const lugar = req.params.lugar
  logs(localidad)
  logs(lugar)
  req.body.lugar = lugar
  client.socket.emit('programa', JSON.stringify(req.body))
  res.send(lugar)
})

function colorSaucedillaAyuntamiento(red, green, blue) {
  var newList = []
  var cont = 171
  for (var i = 1; i <= 2; i++) {
    newList.push(cont)
    if (red === 255) {
      newList.push(cont + 1)
    } else if (red !== 0) {
      newList.push([cont + 1, red])
    }
    if (green === 255) {
      newList.push(cont + 2)
    } else if (green !== 0) {
      newList.push([cont + 2, green])
    }
    if (blue === 255) {
      newList.push(cont + 3)
    } else if (blue !== 0) {
      newList.push([cont + 3, blue])
    }
    cont += 10
  }
  cont = 321
  for (var i = 1; i <= 3; i++) {
    newList.push(cont)
    if (red === 255) {
      newList.push(cont + 1)
    } else if (red !== 0) {
      newList.push([cont + 1, red])
    }
    if (green === 255) {
      newList.push(cont + 2)
    } else if (green !== 0) {
      newList.push([cont + 2, green])
    }
    if (blue === 255) {
      newList.push(cont + 3)
    } else if (blue !== 0) {
      newList.push([cont + 3, blue])
    }
    cont += 10
  }

  var contBarra = 200
  for (var j = 1; j <= 3; j++) {
    for (var k = 1; k <= 8; k++) {
      if (red === 255) {
        newList.push(contBarra + 1)
      } else if (red !== 0) {
        newList.push([contBarra + 1, red])
      }
      if (green === 255) {
        newList.push(contBarra + 2)
      } else if (green !== 0) {
        newList.push([contBarra + 2, green])
      }
      if (blue === 255) {
        newList.push(contBarra + 3)
      } else if (blue !== 0) {
        newList.push([contBarra + 3, blue])
      }
      contBarra += 3
    }
    contBarra += 6
  }

  return newList
}

function colorSaucedillaPicker(red, green, blue) {
  var newList = []
  var cont = 1
  for (var i = 1; i <= 19; i++) {
    newList.push(cont)
    if (red === 255) {
      newList.push(cont + 1)
    } else if (red !== 0) {
      newList.push([cont + 1, red])
    }
    if (green === 255) {
      newList.push(cont + 2)
    } else if (green !== 0) {
      newList.push([cont + 2, green])
    }
    if (blue === 255) {
      newList.push(cont + 3)
    } else if (blue !== 0) {
      newList.push([cont + 3, blue])
    }
    cont += 10
  }

  var contBarra = 200
  for (var j = 1; j <= 4; j++) {
    for (var k = 1; k <= 8; k++) {
      if (red === 255) {
        newList.push(cont + 1)
      } else if (red !== 0) {
        newList.push([contBarra + 1, red])
      }
      if (green === 255) {
        newList.push(contBarra + 2)
      } else if (green !== 0) {
        newList.push([contBarra + 2, green])
      }
      if (blue === 255) {
        newList.push(contBarra + 3)
      } else if (blue !== 0) {
        newList.push([contBarra + 3, blue])
      }
      contBarra += 3
    }
    contBarra += 6
  }

  var contBarra2 = 321
  for (var m = 1; m <= 3; m++) {
    newList.push(contBarra2)
    if (red === 255) {
      newList.push(contBarra2 + 1)
    } else if (red !== 0) {
      newList.push([contBarra2 + 1, red])
    }
    if (green === 255) {
      newList.push(contBarra2 + 2)
    } else if (green !== 0) {
      newList.push([contBarra2 + 2, green])
    }
    if (blue === 255) {
      newList.push(contBarra2 + 3)
    } else if (blue !== 0) {
      newList.push([contBarra2 + 3, blue])
    }
    contBarra2 += 10
  }

  return newList
}

function colorSaucedillaIglesia(red, green, blue) {
  var newList = []
  var cont = 1
  for (var i = 1; i <= 17; i++) {
    newList.push(cont)
    if (red === 255) {
      newList.push(cont + 1)
    } else if (red !== 0) {
      newList.push([cont + 1, red])
    }
    if (green === 255) {
      newList.push(cont + 2)
    } else if (green !== 0) {
      newList.push([cont + 2, green])
    }
    if (blue === 255) {
      newList.push(cont + 3)
    } else if (blue !== 0) {
      newList.push([cont + 3, blue])
    }
    cont += 10
  }
  return newList
}

function returnRespuesta(l) {
  return {
    canales: l,
    modo: 'automatico',
    horarios: [
      { horario_inicio: '19:30:00', horario_fin: '23:59:00' },
      { horario_inicio: '00:00:00', horario_fin: '05:00:00' }
    ],
    lugar: 'saucedilla'
  }
}

function getLocalidadNodo(type_ciudad) {
  switch (type_ciudad) {
    case 'iglesia':
      return 'campanario'
    case 'campanario':
      return 'campanario'
    case 'desaguadero':
      return 'desaguadero'
    case 'basilica':
      return 'cruz_bendita'
    case 'ermita':
      return 'ermita'
    default:
      return ''
  }
}
// Ruta para mandar a los sockets el programa por tiempo
app.post('/:localidad/:lugar', (req, res) => {
  const lugar = req.params.localidad.toLowerCase()
  const localidad = req.params.lugar.toLowerCase()
  logs(lugar)
  logs(localidad)
  var idPagina = req.body.id
  logs(JSON.stringify(req.body.id))
  if (localidad === 'saucedilla') {
    logs('Entro en saucedilla')
    // var idPagina = '1111_red'
    var id = '1111_'

    if (idPagina === `${id}red`) {
      // lucesCanales = [...colorSaucedillaAyuntamiento(255, 0, 0), ...colorSaucedillaIglesia(255, 0, 0)]
      // lucesCanales = colorSaucedillaPicker(255, 0, 0)
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(255, 0, 0)
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(255, 0, 0)
      }
    }
    if (idPagina === `${id}green`) {
      // lucesCanales = [...colorSaucedillaAyuntamiento(0, 255, 0), ...colorSaucedillaIglesia(0, 255, 0)]
      // lucesCanales = colorSaucedillaPicker(0, 255, 0)
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(0, 255, 0)
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(0, 255, 0)
      }
    }
    if (idPagina === `${id}blue`) {
      // lucesCanales = [...colorSaucedillaAyuntamiento(0, 0, 255), ...colorSaucedillaIglesia(0, 0, 255)]

      // lucesCanales = colorSaucedillaPicker(0, 0, 255)
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(0, 0, 255)
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(0, 0, 255)
      }
    }
    if (idPagina === `${id}yellow`) {
      // lucesCanales = colorSaucedillaPicker(255, 255, 0)
      // lucesCanales = [...colorSaucedillaAyuntamiento(255, 255, 0), ...colorSaucedillaIglesia(255, 255, 0)]
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(
          255,
          255,
          0
        )
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(255, 255, 0)
      }
    }
    if (idPagina === `${id}orange`) {
      // lucesCanales = colorSaucedillaPicker(255, 170, 0)
      // lucesCanales = [...colorSaucedillaAyuntamiento(255, 170, 0), ...colorSaucedillaIglesia(255, 170, 0)]
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(
          255,
          170,
          0
        )
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(255, 170, 0)
      }
    }
    if (idPagina === `${id}purple`) {
      // lucesCanales = [...colorSaucedillaAyuntamiento(170, 0, 255), ...colorSaucedillaIglesia(170, 0, 255)]

      // lucesCanales = colorSaucedillaPicker(170, 0, 255)
      if (lugar === 'ayuntamiento') {
        guardar_saucedilla.ayuntamiento = colorSaucedillaAyuntamiento(
          170,
          0,
          255
        )
      }
      if (lugar === 'iglesia') {
        guardar_saucedilla.iglesia = colorSaucedillaIglesia(170, 0, 255)
      }
    }

    var datosJosn = returnRespuesta([
      ...guardar_saucedilla.iglesia,
      ...guardar_saucedilla.ayuntamiento
    ])
    logs(JSON.stringify(datosJosn))
    console.log(JSON.stringify(datosJosn))
    client.socket.emit('programa', JSON.stringify(datosJosn))
  } else if (localidad === 'casardepalomero') {
    // client.socket.emit('programa', JSON.stringify(datosJosn))
    console.log(idPagina.substring(4, idPagina.length))
    var datosJosn = returnRespuesta(
      getColor(idPagina.substring(5, idPagina.length), lugar)
    )
    datosJosn.lugar = getLocalidadNodo(lugar)
    logs(JSON.stringify(datosJosn))
    client.socket.emit('programa', JSON.stringify(datosJosn))
  }else if(localidad === 'modularbox'){
    logs("Entro aqui")
    console.log(idPagina.substring(4, idPagina.length))
    var datosJosn = returnRespuesta(
      getColor(idPagina.substring(5, idPagina.length), lugar)
    )
    datosJosn.lugar = getLocalidadNodo(lugar)
    logs(JSON.stringify(datosJosn))
    client.socket.emit('programa', JSON.stringify(datosJosn))
  }
  //}else{
  // req.body.lugar = lugar;
  //client.socket.emit('programa_por_tiempo', JSON.stringify(req.body))
  //}
  res.send(lugar)
})

app.post('/luces/id', (req, res) => {
  const jsonData = req.body
  logs(JSON.stringify(jsonData, null, 2))
  res.status(200).send(`Luces enviadas con el idlisto`)
})


// Ruta GET para obtener el contenido del archivo
app.get("/logs", (req, res) => {

  if(req.query.token === 'TokenLogsModular2024'){
  // Lee el contenido del archivo
  fs.readFile("archivo_de_logs.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res.status(500).send("Error al leer el archivo");
    }
    // Envía el contenido del archivo como respuesta dentro de la etiqueta <pre>
    res.send(`<pre>${data}</pre>`);
  });
  }else{
    res.status(404).send('Not found');
  }
});

/// Iniciar el servidor
app.listen(PORT, () => {
  logs_truncate()
  logs(`Listo por el puerto ${PORT}, Version app ${VERSION}`);
})
