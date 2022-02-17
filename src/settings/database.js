const mongoose      = require('mongoose');
const { database }  = require('./keys');

mongoose.connect(database, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
})
    .then(data      => { console.log('Conectado a base de datos'); })
    .catch(error    => { console.log(error); })
