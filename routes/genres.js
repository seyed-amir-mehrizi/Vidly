

const express = require('express');
const Joi = require('joi');
const router = express.Router();
const genres = [
    { id: 1, name: "action" },
    { id: 2, name: "horor" },
    { id: 3, name: "sci-fi" },
    { id: 4, name: "comedy" },
    { id: 5, name: "thriller" },
    { id: 6, name: "love story" },
    { id: 7, name: "cartoon" },


]


router.get('/', (req, res) => {
    res.send(genres);
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
router.post('/', (req, res) => {

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(12).required()
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    genres.push(genre);
    res.send(genre);
});


router.put('/:id' , (req,res)=>{
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


router.delete('/:id',(req,res)=>{
    const genre = genres.find(movie => {
        return movie.id === parseInt(req.params.id);
    });
    if (!genre) {
        res.status(404).send("the item is not found....");
        return;
    }
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);

});


module.exports = router;