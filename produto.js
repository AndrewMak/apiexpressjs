const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProdutoSchema = new Schema({
    nome_produto: {
        type: String,
        required: true
    },
    desc_produto: {
        type: String,
        required: true
    },
    preco_produto: {
        type: Number,
        default: 0
    },
    dt_atualizacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('produto', ProdutoSchema);
