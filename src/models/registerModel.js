const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  titulo: {type: String, required: true},
  descricao: String,
});

const registerModel = mongoose.model('Register', registerSchema);

class Register {
  constructor(body) {
    this.body = body;
  }
}

module.exports = Register;
