"use strict";

let Anuncio = require("../models/Anuncio");

// var anuncioController = {};

function lista() {
        const query = Anuncio.find({});                        
        return query.exec();      
}

module.exports.listaAnuncios = lista;