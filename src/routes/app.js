const routerx = require('express-promise-router');
const User = require('./user');
const Movie = require('./movie');
const router = routerx();


router.use('/user', User);
router.use('/movie', Movie);

module.exports = router