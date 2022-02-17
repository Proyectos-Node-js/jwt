const express = require('express');
const UserController = require('../controllers/UserController')
const app = express();

app.post('/register',UserController.register);
app.post('/login', UserController.login);

module.exports = app;