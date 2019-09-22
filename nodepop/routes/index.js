'use strict';

const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/AnuncioController');

/* GET home page. */
router.get('/', async function(req, res, next) {  
  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const venta = req.query.venta;
    const tags = req.query.tag;
    const filter = {};
    if (venta) {
      filter.venta = venta;
    }
    if (tags) {
      filter.tags = tags;
    }

    res.locals.anuncios = await anuncioController.listaAnuncios({filter, skip, limit});
    res.render('index'); 
  } catch (err) {
    next(err);
  }
   
});

module.exports = router;