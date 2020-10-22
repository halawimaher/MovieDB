const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

mongoose.connect("mongodb+srv://bubbles:newpass13@cluster0.iczof.mongodb.net/MoviesDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, function(){
    console.log("Connected to Movies Database")
})

const schema = mongoose.Schema({
    title: {
        type: String
    },
    year: {
        type: Number,
        min: 1000,
        max: 9999
    },
    rating: {
        type:Number,
        default: 4
    }
})

const Movies = mongoose.model("Movie", schema)

//Creating new entries

app.post('/movies/add', async function(req, res) {
    var name = req.query.title
    var year = req.query.year
    var len = year.toString().length
    if(name == "" || year == "" || len !=4 || isNaN(year)){res.status(403).send('you cannot create a movie without providing a title and a year')}
    else{
        if(req.query.rating == "" || typeof req.query.rating === "undefined"){
            movie=new Movies({title: req.query.title, year: req.query.year, rating: 4})}
        else{
            movie=new Movies({title: req.query.title, year: req.query.year, rating: req.query.rating})
        }
    }
    const addedMovie = await movie.save()
    res.status(200).send(addedMovie)
});

//Reading from database

app.get('/movies/get', async function(req, res) {
    const retrievedMovies = await Movies.find()
    res.status(200).send(retrievedMovies)
});

//Updating move database

app.put("/movies/update/:id", async function (req, res) {
    const updatedMovie = await Movies.updateOne(
        { _id: req.params.id },
        {$set:{ title: req.query.title,
            year: req.query.year,
           rating: req.query.rating }}
        
    )
    res.status(200).send(updatedMovie);
  });

//Removing from database

app.delete('/movies/delete/:id', async function(req, res) {
            const deletedMovie = await Movies.remove({_id: req.params.id})
            console.log(deletedMovie)
            res.send(deletedMovie)
});