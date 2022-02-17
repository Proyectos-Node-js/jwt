let host    = 'localhost';
let db      = 'jwt';
let port    = 27017;

const database = `mongodb://${host}:${port}/${db}`; //Cadena de conexión

module.exports = { database };