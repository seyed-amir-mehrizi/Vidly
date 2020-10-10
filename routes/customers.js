
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');


const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: Boolean,
    name: { type: String, required: true },
    phone: { type: Number, required: true }
}));

//Get Method 

router.get('/', async (req, res) => {
    let customers = await Customer.find().sort({ phone: 1 });
    res.send(customers);
});

//Get Method 

router.get('/:field', async (req, res) => {
    let customers = await Customer.find().sort(req.params.field);
    res.send(customers);
});
//post method


router.post('/', async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().required()
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    try {
        customer = await customer.save();
        res.send(customer);
    } catch (error) {
        console.log(error.message);
    }
});




//put method 


router.put('/:id', async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().required()
    });

    const validation = schema.validate(req.body.id);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404).send("customer is noot found...")
    }
    customer.set({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    try {
        const result = await customer.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});


//Delete method


router.delete('/:id' , async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer){
        res.status(404).send("customer is noot found...")
    }
    res.send(customer);
})


// Get By Id

router.get('/:id' , async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send("customer is noot found...")
    }
    res.send(customer);
});



module.exports = router;