const {Schema, model} = require('mongoose');

const MovieSchema = new Schema({
    name:{
        type:String,
        required:[true,'EL nombre de la película es requerida'],
        min:1,
        max:256,
        unique:[true,'Ya existe esta película']
    },
    fecha_pub:{
        type:Date,
        required:[true,'La fecha de publicación es requerida'],
    },
    description:{
        type:String,
        min:3,
        max:1024,
        required:[true, 'Es necesario la descripción']
    },
    link:{
        type:String,
        required:[true,'El link e requerido'],
        max:1024
    }
})

module.exports = model('movies',MovieSchema);