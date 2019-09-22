"use strict";

let Anuncio = require("../models/Anuncio");

// var anuncioController = {};

function lista({filter, skip, limit}) {
        const query = Anuncio.find(filter);                        
        query.skip(skip);
        query.limit(limit);
        return query.exec();      
}

module.exports.listaAnuncios = lista;