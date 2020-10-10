const _ = require('lodash');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');


const User = mongoose.model('User', mongoose.Schema({
   
    name: { type: String, required: true , minLength : 5 , maxLength : 250 },
    email: { type: String, required: true , unique : true },
    password: { type: String, required: true , minLength : 6 },

}));



//post method


router.post('/', async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(5).max(250).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6)
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    let user = await User.findOne({email : req.body.email});
    if(user){
        res.status(400).send("this email has already been used...");
        return;
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt)
        user = await user.save();
        res.send(_.pick(user,["_id" , "name" , "email"]));
        
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;