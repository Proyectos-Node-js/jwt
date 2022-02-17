const server = require('./server/server')
const expres = require('express');
const router = require('./routes/app');
const path = require('path');
const cors = require('cors');

require('./settings/database');

server.setPort;


const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

server.app.use(expres.static(path.join(__dirname,'public')));

//Middlewares
server.app.use(cors());
server.app.use(expres.json({extended:true}));
server.app.use('/api',cors(corsOptions),router);


server.listenPort;