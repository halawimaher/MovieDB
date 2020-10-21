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
    res.status(200).send("ok")
});

app.get('/time', function(req, res) {
    res.status(200).send(TIME)
});

app.get('/hello', function(req, res) {
    res.status(200).send("Hello")
});

app.get('/hello/:id', function(req, res) {
    res.status(200).send("Hello " + req.params.id)
});

app.get('/search', function(req, res) {
    if(req.query.s == "" || req.query.s == undefined){res.status(500).send('You have to enter a search')}
    else{res.status(200).send("OK! You searched for:" + req.query.s)}
});