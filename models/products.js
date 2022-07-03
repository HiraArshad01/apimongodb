var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var productScheme = mongoose.Schema({
    name : String,
    price: Number,
})

var Product = mongoose.model("Product",productScheme);

function validateProduct(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        price: Joi.number().min(0).required(),
    });
    return schema.validate(data, {abortEarly: false});
};
module.exports.Product = Product;
module.exports.validate = validateProduct;