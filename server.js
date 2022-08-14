const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const chalk = require('chalk')

const { Yeelight } = require('yeelight-node')

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

const hexColorToInt = c => [parseInt(c.substr(4, 2), 16), parseInt(c.substr(2, 2), 16), parseInt(c.substr(0, 2), 16)]

const yeelight = new Yeelight({ ip: '192.168.1.159', port: 55443 })

yeelight.set_power('on')

app.post('/color', (req, res) => {
    const { color } = req.body
    console.log(`Set YeeLight color to ${color}`, chalk.bgHex(color).hex(color)('■'))
    yeelight.set_rgb(hexColorToInt(color))
    res.status(200)
    res.send({})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
