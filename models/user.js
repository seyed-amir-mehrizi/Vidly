
const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', mongoose.Schema({
   
    name: { type: String, required: true , minLength : 5 , maxLength : 250 },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true , minLength : 6 },

}));


function validateUser(user){
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(250).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6)
    });
    return schema.validate(user);
}


module.exports.User = User;
module.exports.validateUser = validateUser;


