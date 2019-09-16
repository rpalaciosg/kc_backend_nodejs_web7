'use strict';

const mongoose = require('mongoose');

const TAGS_LIST = ['work', 'lifestyle', 'motor', 'mobile'];

// definimos un esquema anuncio
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [{type: String, enum: TAGS_LIST}]
});

// definimos modelo, pluralizacion
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exporto modelo
module.exports = Anuncio;