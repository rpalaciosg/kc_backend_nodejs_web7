'use strict';

const mongoose = require('mongoose');
const root = 'http://localhost:3000/images/anuncios/​';
const TAGS_LIST = ['work', 'lifestyle', 'motor', 'mobile'];

// definimos un esquema anuncio
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: {
        type: String,
        get: v => `${root}${v}`
    },
    tags: [{type: String, enum: TAGS_LIST}]
});

// definimos modelo, pluralizacion
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exporto modelo
module.exports = Anuncio;