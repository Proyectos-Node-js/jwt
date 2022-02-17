const joi = require('joi');

const movieValidation = (data)=>{
    const schemaValidation = joi.object({
        name: joi.string().required().min(1).max(256),
        fecha_pub: joi.string().required(),
        description: joi.string().min(3).max(1024).required(),
        link: joi.string().required().max(1024)
    })
    return schemaValidation.validate(data);
}


module.exports = {movieValidation};