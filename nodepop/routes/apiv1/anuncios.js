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
        const tags = req.query.tags || "";
        const venta = req.query.venta;
        const precio = req.query.precio || "";        
        const extPrecio = precio.split("-");        
        const extTags = tags.split(" ");
        console.log("extrae tags--->", extTags)
        let patPreIgual = /\d/;
        let patPreMenor = /-\d/;
        let patPreEntre = /\d-\d/;
        let patPreMayor = /\d-/;
        
        const filter = {};
        
        // para este filtro por tags lo debo hacer con un $in
        // const cursor = db.collection('anuncios').find({ tags: { $in: ['work','stylelife']}});
        if (tags !== "") {             
            // filter.tags = tags;           
            filter.tags = {  '$in': extTags };
            console.log("filtro de tags-->", filter.tags);
        }

        if (venta) {
            filter.venta = venta;
        }

        //const precio // para el filtro por precio debo hacer un typeof para comparar que no sea 'undefined'
        if (typeof precio !== 'undefined') {
            if (patPreIgual.test(precio)) {
                filter.precio = extPrecio[0];
            }
            
            if (patPreMenor.test(precio)) {
                console.log("arma query menor---->", { '$lte': parseInt(extPrecio[1]) });
                filter.precio = { '$lte': parseInt(extPrecio[1]) };
                
            }
             if (patPreEntre.test(precio)) {
                filter.precio = { '$gte': extPrecio[0], '$lte': extPrecio[1] };
            } 
            
            if (patPreMayor.test(precio)) {
                filter.precio = { '$gte': extPrecio[0] };
            }
        }

        const anuncios = await anuncioController.listaAnuncios({filter:filter, skip, limit, fields, sort});
        res.json({ success: true, results: anuncios });
    } catch(err) {
        next(err);
    }
});

/**
 * GET /anuncios/tags
 * Obtiene el listado de tags existentes
 * http://localhost:3000/apiv1/anuncios/tags
 */
router.get('/tags', async (req, res, next) => {
    try {
        const tagList = await anuncioController.listaTags();
        res.json({ success: true, results: tagList });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /anuncios/:id
 * Obtiene un agente mediante el :id
 * http://localhost:3000/apiv1/anuncios/:id
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

/**
 * POST /anuncios
 * Crea un anuncio 
 * http://localhost:3000/apiv1/anuncios
 */
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const anuncio = new Anuncio(data);
        const anuncioGuardado = await anuncio.save();
        res.json({success: true, result: anuncioGuardado});
    } catch (err) {
        next(err);
    }
});

module.exports = router;
