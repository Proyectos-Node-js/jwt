const express = require('express');
const app = express();
require('dotenv/config')

let setPort = app.set('port', process.env.PORT || 3000);

let listenPort = app.listen(app.get('port'), () => {
    console.log('Servidor en', `http://localhost:${app.get('port')}`);
})

module.exports = { setPort, listenPort, app }