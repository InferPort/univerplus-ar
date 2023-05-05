const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use("/render",express.static('public/assets/render'))

app.use('/scripts', express.static(__dirname + '/node_modules/aframe/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/mind-ar/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/three/build/'));

app.listen(port, () => {
  console.log(`Running service on port: ${port}`)
})
