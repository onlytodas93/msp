const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    status: { type: Boolean, required: false, default: true },
    tipo: String, // A - ADM   V - VENDEDOR  C - CLIENTE
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('usuario', UsuarioSchema);
