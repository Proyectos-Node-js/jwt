const jwt = require('jsonwebtoken');
require('dotenv/config')

const verifyToken = (req,res,next) =>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({message:'Acceso denegado'});
    }else{
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            res.status(401).send({message:'Token inválido'});
        }
    }
}
module.exports = {verifyToken};