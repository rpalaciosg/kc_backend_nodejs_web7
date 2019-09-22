'use strict';

const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/AnuncioController');

/* GET home page. */
router.get('/', async function(req, res, next) {  
  try {
    res.locals.anuncios = await anuncioController.listaAnuncios();
    res.render('index'); 
  } catch (err) {
    next(err);
  }
   
});

module.exports = router;