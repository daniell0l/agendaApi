const mongoose = require('mongoose');
const validator = require('validator');

const registerSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  sobrenome: { type: String, required: true },
  telefone: { type: Number, required: true },
  senha: { type: String, required: true },
});

const RegisterModel = mongoose.model('register', registerSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.successMessage = '';
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      const emailExists = await RegisterModel.exists({ email: this.body.email });
      if (emailExists) {
        this.errors.push('O email já está registrado.');
        return;
      }

      this.user = await RegisterModel.create(this.body);
    } catch (error) {
      console.log(error);
      this.errors.push('Ocorreu um erro ao criar o usuário.');
    }
  }

  validate() {
    this.cleanUp();
    if (!validator.default.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido');
    }

    if (this.body.senha.length < 6) {
      this.errors.push('A senha precisa ter pelo menos 6 caracteres.');
    }

    if (!/[!@#$%^&*()]/.test(this.body.senha)) {
      this.errors.push('A senha deve conter pelo menos um caractere especial (!@#$%^&*()).');
    }

    if (!/[A-Z]/.test(this.body.senha)) {
      this.errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!/[a-z]/.test(this.body.senha)) {
      this.errors.push('A senha deve conter pelo menos uma letra minúscula.');
    }

    if (!/\d/.test(this.body.senha)) {
      this.errors.push('A senha deve conter pelo menos um número.');
    }

    if (this.body.senha !== this.body.confirmacaoSenha) {
      this.errors.push('As senhas não coincidem.');
    }
  }

  cleanUp() {
    const { nome, sobrenome, telefone, senha, confirmacaoSenha, email } = this.body;
    this.body = {
      email: typeof email === 'string' ? email : '',
      nome: typeof nome === 'string' ? nome : '',
      sobrenome: typeof sobrenome === 'string' ? sobrenome : '',
      telefone: typeof telefone === 'string' ? telefone : '',
      senha: typeof senha === 'string' ? senha : '',
      confirmacaoSenha: typeof confirmacaoSenha === 'string' ? confirmacaoSenha : '',
    };
  }
}

module.exports = Register;
