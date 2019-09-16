'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio.js');

/**
 * GET /anuncios
 * Devuelve una lista de anuncios
 * http://localhost:3000/api/anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        const anuncios = await Anuncio.find().exec();
        res.json({ success: true, anuncios });
    } catch(err) {
        next(err);
    }
});

module.exports = router;