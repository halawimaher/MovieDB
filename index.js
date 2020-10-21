const express = require('express')
const app = express()
const port = 3000
const d = new Date()
const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
const hours = d.getHours()
const TIME = hours + ":" + minutes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', function(req, res) {
    res.send('ok')
});

app.get('/test', function(req, res) {
    res.send({status:200, message:"ok"})
});

app.get('/time', function(req, res) {
    res.send({status:200, message: TIME})
});