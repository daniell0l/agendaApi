const Register = require('../models/registerModel');

exports.register = (req, res) => {
  res.render('register/register');
};

exports.access = (req, res) => {
  const register = new Register(req.body)
  res.send(register.body);
};
