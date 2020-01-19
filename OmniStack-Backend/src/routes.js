const { Router } = require('express');
const DevController = require('./constrollers/DevControllers')
//const SeachController = require('./constrollers/SeachControllers')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

//routes.get('./search', SeachController.index);
//routes.get('./search', SeachController.find);

module.exports = routes;