const models = require('../models/models');
const { movieValidation } = require('../validations/movieValidation')

let add = async (req, res, next) => {
    const { error } = movieValidation(req.body);
    if (error) {
        res.status(401).send({ message: error['details'][0]['message'] });
    } else {
        //Buscar si existe película
        const movieExists = await models.Movie.findOne({ name: req.body.name });
        if (movieExists) {
            res.status(401).send({ message: 'Pelicula, ya registrada' });
        } else {
            const { name, fecha_pub, description, link } = req.body;
            try {
                const newMovie = await models.Movie({
                    name,
                    fecha_pub,
                    description,
                    link
                })
                let data = await newMovie.save();
                if (data) {
                    res.status(200).json({ message: 'Película registrada', data });
                } else {
                    res.status(404).send({ message: 'Error al registrar película' });
                }
            } catch (error) {
                res.status(404).send({ message: 'Error en el proceso' });
                next();
            }
        }
    }
}

let list = async (req,res,next)=>{
    try {
        const data = await models.Movie.find();
        if (data === 0) {
            res.status(200).send({message:'No existe peliculas regisrtadas'});
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        
    }
}


let update = async(req,res,next)=>{
    const id = req.params._id;
    const {name, fecha_pub, description, link } = req.body;
    const {error} = movieValidation(req.body);
    if (error) {
        res.status(401).send({message:error['details'][0]['message']});
    }else{
        const data = await models.Movie.findByIdAndUpdate({_id:id},{name, fecha_pub, description, link});
        if (!data) {
            res.status(404).send({message:'Error al actualizar registros'});
        }else{
            res.status(200).json({message:'Actualizado correctamente',data});
        }
    }
}



let remove = async (req,res,next)=>{
    const id = req.body._id;
    try {
        const data = await models.Movie.findByIdAndDelete({_id:id});
        if (data) {
            res.status(200).json({message:'Eliminado correctamente',data});
        } else {
            res.status(404).send({message:'Error el eliminar'});            
        }
    } catch (error) {
        
    }
}



module.exports = { add, list,update, remove};