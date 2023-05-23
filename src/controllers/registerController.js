const registerModel = require('../models/registerModel');

exports.register = (req, res) => {
  res.render('register/register');
};

exports.access = (req, res) => {
  res.send(req.body);
};
