const models = require('../models/models');
const {registerValidation} = require('../validations/registerUser');
const {loginValidation} = require('../validations/loginValidation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


let register = async (req,res,next) =>{
    const {error} = registerValidation(req.body);
    if (error) {
        res.send({message: error['details'][0]['message']})
    }else{
        const {username,email,password,rol} = req.body;
        let hashPassword = await bcryptjs.hash(password,5);
        const userExist = await models.User.findOne({email: req.body.email});

        const newUser = await models.User({
            username,
            email,
            password: hashPassword,
            rol
        })

        if (userExist) {
            res.status(400).send({message:'Ya existe usuario'});
        }else{
            try {
                let result = await newUser.save();
                //Ocultamos la contraseña
                result = result.toObject();
                delete result.password;
                //************* */
                res.status(200).json({message:'Usuario registrado',result});
            } catch (error) {
                res.status(404).send({message:'Error al registrar usuario'});
            }
        }      
    }
}


let login = async (req,res,next)=>{
    const {error} = loginValidation(req.body);
    //Buscamos usuario
    const userExist = await models.User.findOne({email: req.body.email});
    //Comparamos constraseñas
    const passwordValidation = await bcryptjs.compare(req.body.password, userExist.password);
    if (error) {
        res.send({message: error['details'][0]['message']})
    }else{
        if (!userExist) {
            res.status(400).send({message:'No existe usuario'});
        }else{
            if (!passwordValidation) {
                res.status(400).send({message:'Contraseña incorrecta'})
            }else{
                //res.send({message:'LOGEADO!!'})
                //Si el usuario y la contraseña existen, generamos un token de autenticación
                const token = jwt.sign({_id:userExist._id}, process.env.TOKEN_SECRET);
                res.header('auth-token',token).send({'auth-token':token});
            }
        }
    }
}

module.exports = {register,login};