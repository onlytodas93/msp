const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    status: { type: String, default: "A" }, // A - ATIVO   C - CANCELADO   F - FECHADO
    statusVenda : { type: String, default: "A" }, // A - ATIVO  F - FECHADO
    dataAbertura: { type: Date, default: Date.now() },
    dataSorteio: { type: Date },
    vendedores: [{
        status: { type: Boolean, default: true },
        vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
        quantidade: { type: Number, required: true },
        cartelas: [{
            status: { type: String, default: "A" }, // A- Ativo - V - Vendido
            numeros: [{ type: String, default: "A" }],
            nome: String,
            whatsapp: String
        }]
    }],
    nome: String,
    cidade: String,
    quantidade: Number, // Quantidade de chances
    valorCartela : Number,
    ganhador: String,
    contatoGanhador: String,
    numeroSorteado: String,
    vendedor: String
}, { timestamps: true });

module.exports = mongoose.model('sorteios', UsuarioSchema);
