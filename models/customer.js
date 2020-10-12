
const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: Boolean,
    name: { type: String, required: true },
    phone: { type: Number, required: true }
}));

function validateCustomer(customer) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean().required()
    });

    return schema.validate(customer);
}



module.exports.Customer = Customer;
module.exports.ValidateCustomer = validateCustomer;

