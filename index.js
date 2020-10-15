const express = require('express')
const robot = require('robotjs')
const screenshot = require('screenshot-desktop')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 5000
const fps = 1
const screenSize = robot.getScreenSize()

const { log } = console

const canais = {
  'viva': '1459',
  'vivafhd': '1460',
  'vivahd': '1461',
  'viva4k': '1462',
  'redevida': '1130',
  'sbt': '1144',
}

const print = async () =>
  screenshot()
    .then(img => Buffer.from(img).toString('base64'))
    .catch(log)

setInterval(async () => io.sockets.emit('image', await print()), 1000 / fps)

io.on('connection', async socket => {
  log(`user connected - IP: ${socket.handshake.address}`)
  socket.on('disconnect', () => log(`user connected - IP: ${socket.handshake.address}`))
  socket.emit('image', await print())
})

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

app.get('/canais', (req, res) => res.send(canais))

app.get('/canal/:canal', (req, res) => {
  const { canal } = req.params
  res.send(`Canal: ${canal}`)
  log(`Canal: ${canal}`)
  robot.typeStringDelayed(canal, 240)
})

app.get('/controle/:controle', (req, res) => {
  const { controle } = req.params
  res.send(`Controle: ${controle}`)
  log(`Controle: ${controle}`)
  switch (controle) {
    case 'm':
      robot.typeStringDelayed(controle, 240)
      break
    case 'rmb':
      robot.mouseClick('right')
      break
  }
})

app.get('/canal/nome/:nome', (req, res) => {
  const { nome } = req.params
  const canal = canais[nome] || null
  if (canal == null) {
    res.send(`Canal "${canal}" não encontrado.`)
    return
  }
  res.send(`Canal: ${nome}, número: ${canal}`)
  log(`Canal: ${nome}, número: ${canal}`)
  robot.typeStringDelayed(canal, 240)
})

app.get('/mouse/:x/:y', (req, res) => {
  let { x, y } = req.params
  x *= screenSize.width
  y *= screenSize.height
  res.send(`Mouse movido para X ${x}, Y ${y}`)
  log(`Mouse movido para X ${x}, Y ${y}`)
  robot.moveMouse(x, y)
  robot.mouseClick('left')
})


http.listen(port, () => log(`Listening on port ${port}`))