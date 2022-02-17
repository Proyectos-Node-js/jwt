const {Schema, model} = require('mongoose');

let validRoles = {
    values :['ADMIN','USER'],
    message:'{VALUE} no es un rol válido'
}

const UserSchema = new Schema({
    username : {
        type:String,
        required:[true, 'El nombre de usuario es requerido'],
        min:3,
        max:256
    },
    email:{
        type:String,
        required:[true,'Email es requerido'],
        unique:[true,'Este email ya está registrado'],
        min:6,
        max:256
    },
    password:{
        type:String,
        required:[true,'La contraseña es requerida'],
        min:[3,'Al menos 3 caracteres'],
        max:[1024,'Máximo 1024 caracteres']
    },
    rol:{
        type:String,
        default:'USER',
        required: true,
        enum:validRoles
    }
})

//Ocultamos contraseña al crear usuario
/* UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.userObject();
    delete userObject.password;
    return userObject;
} */

module.exports = model('users',UserSchema);