const Register = require('../models/registerModel');

exports.register = (req, res) => {
  res.render('register/register', { errors: [] });
};

exports.registerSubmit = async (req, res) => {
  const register = new Register(req.body);
  await register.register();

  if (register.errors.length > 0) {
    return res.render('register/register', { register: register });
  }
  const successMessage = 'Cadastro realizado com sucesso!';
  res.render('register/register', { successMessage: successMessage }, 3000);
  
};
