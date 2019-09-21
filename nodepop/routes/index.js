'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

var anuncio = require('../controllers/AnuncioController');

var anuncio = require('../controllers/AnuncioController');

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.locals = anuncioController.anuncios;
   res.render('index');
});

module.exports = router;
