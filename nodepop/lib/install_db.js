'use strict';

const fs = require('fs');
const fsPromises = fs.promises;

const mongoose = require('mongoose');
const conn = require('./connectDB');
const Anuncio = require('../models/Anuncio');

const file = '../data/anuncios.json';

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

async function loadAgentes() {
    console.log('Cargando agentes.json!');
    try {
        await Anuncio.insertMany(data);
        console.log('Datos de anuncios cargados.!', data);
        process.exit();
    } catch (err) {
        console.log(`Error al cargar archivo ${file}, >>>>  ${err}`);
        process.exit();
    }
}

// gestionar eventos de conexión
conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1); // podría hacerme un catálogo de códigos de error.
});

conn.once('open', () => {
    console.log('Conectado a MongoDB en ', mongoose.connection.name);
    console.log('Limpiar Base de datos..!');
    const resDel = await Anuncio.deleteMany();
    console.log('Base de datos borrada!', resDel.ok, resDel.deletedCount);
    await loadAgentes();
    console.log('Terminado..!');
    conn.close();
});

// conectar
mongoose.connect('mongodb://localhost/cursonode' , { useNewUrlParser: true });