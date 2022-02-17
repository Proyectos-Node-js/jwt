const routerx = require('express-promise-router');
const MovieController = require('../controllers/MovieController');
const {verifyToken} = require('../validations/verifyToken');
const app = routerx();

app.get('/list',verifyToken ,MovieController.list);
app.post('/add', MovieController.add);
app.put('/update/:_id', MovieController.update);
app.delete('/remove', MovieController.remove);

module.exports = app;