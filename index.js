const express = require('express');
const app = express();
const genres = [
    { id: 1, name: "action" },
    { id: 2, name: "horor" },
    { id: 3, name: "sci-fi" },
    { id: 4, name: "comedy" },
    { id: 5, name: "thriller" },
    { id: 6, name: "love story" },
    { id: 7, name: "cartoon" },


]
app.get('/', (req, res) => {
    res.send("the home page is running ....")
});
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(movie=> {
        return movie.id === parseInt(req.params.id);
    });
    if (!genre) {
        res.status(404).send("the item is not found....");
    } else {
        res.send(genre);
    }
});



app.listen(5000, () => {
    console.log("app is listening to the port 5000....");
});
