const express = require('express')
const robot = require('robotjs')

const app = express()
const port = process.env.PORT || 5000

const { log } = console

const canais = {
  'viva': '1459',
  'vivafhd': '1460',
  'vivahd': '1461',
  'viva4k': '1462',
  'rede': '1500',
  'sbt': '1144',
}

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.get('/canal/:canal', (req, res) => {
  const { canal } = req.params
  res.send(`Canal: ${canal}`)
  log(`Canal: ${canal}`)
  robot.typeStringDelayed(canal, 240)
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

app.listen(port, () => console.log(`Listening on port ${port}`))