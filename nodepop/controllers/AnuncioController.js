'use strict';

const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');

var anuncioController = {};

anuncioController.list = async function(req, res){
    try{
        await Anuncio.find({}).exec();        
    } catch(err){
        console.log('Error', err);
        return;
    }
};

module.exports = anuncioController;