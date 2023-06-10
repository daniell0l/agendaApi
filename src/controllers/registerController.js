const Register = require('../models/registerModel');

exports.register = (req, res) => {
  res.render('register/register', { errors: [] });
};

exports.registerSubmit = async (req, res) => {
  const register = new Register(req.body);
  await register.register();

  if (register.errors.length > 0) {
    // Renderizar novamente o formulário de registro com os erros
    return res.render('register/register', { register: register });
  }

  // Registro bem-sucedido, exibir mensagem de sucesso e redirecionar para a página inicial
  const successMessage = 'Cadastro realizado com sucesso!';
  return res.render('register/register', { successMessage: successMessage });
};

