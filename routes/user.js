
const {User , validateUser} = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



//post method
router.post('/', async (req, res) => {
    const validation = schema.validateUser(req.body);
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