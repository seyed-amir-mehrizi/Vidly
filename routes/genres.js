
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const Genre = mongoose.model("Genre", mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 25
    }
}));

 //Get Method 

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

//Post Method

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
    try {
        genre = await genre.save();
        res.send(genre);
    } catch (error) {
        console.log(error.message);
    }

});
//Put Method

router.put('/:id', async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(12).required()
    });
    const validation = schema.validate(req.body);

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