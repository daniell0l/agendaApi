const mongoose = require('mongoose');
const validator = require('validator')

const registerSchema = new mongoose.Schema({
  nome: {type: String, required: true},
  email: {type: String, required: true},
  sobrenome: {type: String, required: true},
  telefone: {type: number, required: true},
  senha: {type: String, required: true},
});

const registerModel = mongoose.model('register', registerSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }

  validate() {
    this.cleanUp();
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.bode[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      nome: this.body.name,
      sobrenome: this.body.sobrenome,
      telefone: this.body.telefone,
      senha: this.body.senha
    }
  }
}

module.exports = Register;
