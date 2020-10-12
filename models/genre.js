
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model("Genre", mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 25
    }
}));


function validateGenre(genre){
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(12).required()
    });
    return schema.validate(req.body);
}

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
