'use strict';

const express = require('express');
const router = express.Router();

const anuncioController = require('../../controllers/AnuncioController');
const Anuncio = require('../../models/Anuncio');

/**
 * GET /apiv1/anuncios
 * Devuelve una lista de anuncios
 * http://localhost:3000/apiv1/anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const anuncios = await anuncioController.listaAnuncios({skip, limit});
        res.json({ success: true, anuncios });
    } catch(err) {
        next(err);
    }
});

module.exports = router;