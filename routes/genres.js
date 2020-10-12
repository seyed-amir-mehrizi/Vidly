
const {Genre , validateGenre} = require('../models/genre');
const express = require('express');
const router = express.Router();



 //Get Method 

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

//Post Method

router.post('/', async (req, res) => {
    const validation = schema.validateGenre(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    let genre = new Genre({
        name: req.body.name
    })
    try {
        genre = await genre.save();
        res.send(genre);
    } catch (error) {
        console.log(error.message);
    }

});
//Put Method

router.put('/:id', async (req, res) => {
    const validation = schema.validateGenre(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    let genre = await Genre.findByIdAndUpdate( req.params.id);

    if (!genre) {
        res.status(404).send("the item is not found....");
        return;
    }
    genre.set({
        name: req.body.name
    });
    const result = await genre.save();
    res.send(result);
});
 
//Delete Method

router.delete('/:id', async (req, res) => {
     const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) {
        res.status(404).send("the item is not found....");
        return;
    }
    res.send(genre);

});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send("the item is not found....");
    } else {
        res.send(genre);
    }
});
module.exports = router;