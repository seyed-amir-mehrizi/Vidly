const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
//post method
router.post('/', async (req, res) => {
    const validation = validateAuth(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("invalid email or password...");
        return;
    }
    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send("invalid email or password...");
            return;
        }
        res.send(true)

    } catch (error) {
        console.log(error.message);
    }
});

function validateAuth(req){
    const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().min(6)
    });
    return schema.validate(req);
}

module.exports = router;