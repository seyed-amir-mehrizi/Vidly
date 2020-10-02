
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


const Genre = mongoose.model("Genre", mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 25
    }
}));


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.post('/', async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(12).required()
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    let genre = new Genre({
        name: req.body.name
    })
    genre = await genre.save();
    res.send(result);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(movie => {
        return movie.id === parseInt(req.params.id);
    });
    if (!genre) {
        res.status(404).send("the item is not found....");
    } else {
        res.send(genre);
    }
});
router.put('/:id', (req, res) => {
    const genre = genres.find(movie => {
        return movie.id === parseInt(req.params.id);
    });
    if (!genre) {
        res.status(404).send("the item is not found....");
        return;
    }

    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(12).required()
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    genre.name = req.body.name;
    res.send(genre);

});


router.delete('/:id', (req, res) => {
    const genre = genres.find(movie => {
        return movie.id === parseInt(req.params.id);
    });
    if (!genre) {
        res.status(404).send("the item is not found....");
        return;
    }
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);

});


module.exports = router;