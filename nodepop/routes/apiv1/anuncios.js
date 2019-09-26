'use strict';

const express = require('express');
const router = express.Router();

const anuncioController = require('../../controllers/AnuncioController');
const Anuncio = require('../../models/Anuncio');

/**
 * GET /anuncios
 * Devuelve una lista de anuncios
 * http://localhost:3000/apiv1/anuncios
 */
router.get('/', async (req, res, next) => {
    try {
        const skip = parseInt(req.query.start);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;
        const tags = req.query.tags;
        const venta = req.query.venta;
        //const precio // para el filtro por precio debo hacer un typeof para comparar que no sea 'undefined'
        const filter = {};
        
        // para este filtro por tags lo debo hacer con un $in
        // const cursor = db.collection('anuncios').find({ tags: { $in: ['work','stylelife']}});
        if (tags) { 
            filter.tags = tags;
        }

        if (venta) {
            filter.venta = venta;
        }
        const anuncios = await anuncioController.listaAnuncios({filter:filter, skip, limit, fields, sort});
        res.json({ success: true, results: anuncios });
    } catch(err) {
        next(err);
    }
});

/**
 * Get /anuncios/:id
 * Obtiene un agente mediante el :id
 */
router.get('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;        
        const anuncio = await anuncioController.consultarUnAnuncio(_id);        
        if(!anuncio) {
            res.status(404).json({success: false});
        }
        res.json({success: true, result: anuncio});
    } catch (error) {
        next(err);
    }
});

module.exports = router;
