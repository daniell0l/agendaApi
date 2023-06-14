const Register = require('../models/registerModel');

exports.register = (req, res) => {
  res.render('register/register', { currentPage: 'register/register', errors: [] });
};

exports.registerSubmit = async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.register();

    if (register.errors.length > 0) {
      return res.render('register/register', { currentPage: 'register/register', register: register });
    }
  
    const successMessage = 'Cadastro realizado com sucesso!';
    return res.render('register/register', { currentPage: 'register/register', successMessage: successMessage });
  } catch(e) {
    console.log(e);
    return res.render('error/404');
  }
};
