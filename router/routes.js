/* eslint-disable new-cap */
const express = require('express');
const route = express.Router();
const homeController = require('../src/controllers/homeController');
const loginController = require('../src/controllers/loginController');
const cadastroController = require('../src/controllers/cadastroController');

// Rotas da home
route.get('/home', homeController.home);

// Rotas de login
route.get('/login', loginController.login);

// Rotas de cadastro
route.get('/cadastro', cadastroController.cadastro);

module.exports = route;
