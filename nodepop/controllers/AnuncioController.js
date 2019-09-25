"use strict";

let Anuncio = require("../models/Anuncio");

// var anuncioController = {};

function lista({filter, skip, limit, fields}) {
        const query = Anuncio.find(filter);                        
        query.skip(skip);
        query.limit(limit);
        query.select(fields);
        return query.exec();      
}

function unAnuncio(id){
    const query = Anuncio.findById(id);
    console.log(query.exec());
    return query.exec();

}

module.exports.listaAnuncios = lista;
module.exports.consultarUnAnuncio = unAnuncio;