const red = [255, 0, 0]
const green = [0, 255, 0]
const blue = [0, 0, 255]
const yellow = [255, 255, 0]
const orange = [255, 170, 0]
const purple = [170, 0, 255]

var guardar_casardepalomero = {
  iglesia: [],
  campanario: []
}

function getLocalidad(type_ciudad, rgb) {
  switch (type_ciudad) {
    case 'iglesia':
      let iglesia = espiritusanto(rgb)
      guardar_casardepalomero.iglesia = iglesia
      return guardar_casardepalomero.campanario.concat(iglesia)
    case 'campanario':
      let campanario = campanarioluces(rgb)
      guardar_casardepalomero.campanario = campanario
      return guardar_casardepalomero.iglesia.concat(campanario)
    case 'desaguadero':
      return desaguadero(rgb)
    case 'basilica':
      return cruzbendita(rgb)
    case 'ermita':
      return ermita(rgb)
    case 'caseres':
      return caseres(rgb)
    default:
      return []
  }
}

function getColor(color, type_ciudad) {
  switch (color) {
    case 'red':
      return getLocalidad(type_ciudad, red)
    case 'green':
      return getLocalidad(type_ciudad, green)
    case 'blue':
      return getLocalidad(type_ciudad, blue)
    case 'yellow':
      return getLocalidad(type_ciudad, yellow)
    case 'orange':
      return getLocalidad(type_ciudad, orange)
    case 'purple':
      return getLocalidad(type_ciudad, purple)
    default:
      return []
  }
}

function getOffOnRGB(rgb, canal) {
  var red = rgb[0]
  var green = rgb[1]
  var blue = rgb[2]
  var newList = []
  var newCanal = canal + 1
  if (red === 255) {
    newList.push(newCanal)
  } else if (red !== 0) {
    newList.push([newCanal, red])
  }
  newCanal++
  if (green === 255) {
    newList.push(newCanal)
  } else if (green !== 0) {
    newList.push([newCanal, green])
  }
  newCanal++
  if (blue === 255) {
    newList.push(newCanal)
  } else if (blue !== 0) {
    newList.push([newCanal, blue])
  }
  return newList
}

function desaguadero(rgb) {
  var cont = 4
  var newList = [1, 2, 3, 4]
  for (var i = 0; i < 4; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 5
  }
  return newList
}

function caseres(rgb) {
  var cont = 1
  var newList = []
  for (var i = 0; i < 2; i++) {
    newList.add(cont)
    cont++
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 10
  }
  for (var i = 0; i < 8; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 3
  }
  cont+=12
  for (var i = 0; i < 2; i++) {
    newList.add(cont)
    cont++
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 10
  }
  return newList
}

function ermita(rgb) {
  var cont = 10
  var newList = []
  for (var i = 0; i < 4; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 10
  }
  return newList
}

function cruzbendita(rgb) {
  var cont = 1
  var newList = []
  for (var i = 0; i < 5; i++) {
    newList.push(cont)
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 8
  }
  cont = 40
  for (var i = 0; i < 4; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 4
  }
  return newList
}

function campanarioluces(rgb) {
  var cont = 0
  var newList = []
  for (var i = 0; i < 3; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 8
  }
  cont = 24
  for (var i = 0; i < 5; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 5
  }
  return newList
}

function espiritusanto(rgb) {
  var cont = 49
  var newList = []
  for (var i = 0; i < 7; i++) {
    newList = newList.concat(getOffOnRGB(rgb, cont))
    cont += 8
  }
  return newList
}

module.exports = getColor
