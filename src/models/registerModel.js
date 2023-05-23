const mongoose = require('mongoose');
const validator = require('validator');

const registerSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  sobrenome: { type: String, required: true },
  telefone: { type: Number, required: true },
  senha: { type: String, required: true },
});

const registerModel = mongoose.model('register', registerSchema);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/;

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }

    if (this.body.senha.length < 6 || this.body.senha.length > 50) {
      this.errors.push('A senha precisa ter entre 6 e 50 caracteres.');
    }

    if (!passwordRegex.test(this.body.senha)) {
      this.errors.push('A senha precisa conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      senha: this.body.senha,
    };
  }
}

module.exports = Register;
