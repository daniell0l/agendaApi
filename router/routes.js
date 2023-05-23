const express = require('express');
const route = express.Router();
const homeController = require('../src/controllers/homeController');
const loginController = require('../src/controllers/loginController');
const registerController = require('../src/controllers/registerController');

// Rotas da home
route.get('/home', homeController.home);

// Rotas de login
route.get('/login', loginController.login);

// Rotas de cadastro
route.get('/register', registerController.register);
route.post('/register/acess', registerController.access);

module.exports = route;
