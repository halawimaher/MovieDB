const express = require('express')
const app = express()
const port = 3000
const d = new Date()
const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
const hours = d.getHours()
const TIME = hours + ":" + minutes
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

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

app.get('/movies/add', function(req, res) {
    res.status(200).send("Create")
});

//Reading from database
app.get('/movies/get', function(req, res) {
    res.status(200).send(movies)
});

app.get('/movies/get/by-date', function(req, res) {
    movies.sort(function(a,b){
        return a.year-b.year;
    })
    res.status(200).send(movies);
});

app.get('/movies/get/by-rating', function(req, res) {
    movies.sort(function(a,b){
        return b.rating-a.rating;
    })
    res.status(200).send(movies);
});

app.get('/movies/get/by-title', function(req, res) {
    movies.sort(function(a,b){
        return a.title.localeCompare(b.title);
    })
    res.status(200).send(movies);
});

//Updating move database
app.get('/movies/update', function(req, res) {
    res.status(200).send("Update")
});

app.get('/movies/delete', function(req, res) {
    res.status(200).send("Delete")
});