const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user_pass: {
        type: String,
        required: true
    },
    is_admin: {
        type: Number,
        default: 0
    }
});

module.exports = Item = mongoose.model('usuario', UsuarioSchema);