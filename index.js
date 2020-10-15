const express = require('express')
const robot = require('robotjs')
const screenshot = require('screenshot-desktop')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 5000
const fps = 1

const { log } = console

const canais = {
  'viva': '1459',
  'vivafhd': '1460',
  'vivahd': '1461',
  'viva4k': '1462',
  'rede': '1500',
  'sbt': '1144',
}

const print = async () =>
  screenshot()
    .then(img => Buffer.from(img).toString('base64'))
    .catch(log)

io.on('connection', async socket => {
  log(`user connected - IP: ${socket.handshake.address}`)
  socket.on('disconnect', () => log(`user connected - IP: ${socket.handshake.address}`))
  socket.emit('image', await print())
})

setInterval(async () => io.sockets.emit('image', await print()), 1000 / fps)

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

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
  robot.typeStringDelayed(controle, 240)
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

http.listen(port, () => log(`Listening on port ${port}`))