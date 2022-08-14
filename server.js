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
const rgbArrToHex = ([r, g, b]) => `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

const yeelight = new Yeelight({ ip: '192.168.1.159', port: 55443 })

yeelight.set_power('on')
yeelight.set_rgb([30, 215, 96])

app.post('/color', (req, res) => {
    const { color } = req.body
    console.log(`Set YeeLight color to ${color}`, chalk.bgHex(color).hex(color)('■'))
    const rgbColor = hexColorToInt(color.slice(1))
    const hexColor = rgbArrToHex(rgbArrToHex)
    yeelight.set_rgb(rgbColor)
    console.log(`Set color to rgb [${rgbColor.join(', ')}] as hex ${hexColor}`)
    
    if (hexColor !== color) {
        console.warn(`Resulting color does not match color from response: ${hexColor} /vs/ ${color}`)
    }
    
    res.status(200)
    res.send({})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
