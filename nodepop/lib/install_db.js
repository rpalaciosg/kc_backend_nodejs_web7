'use strict';

const fs = require('fs');
const fsPromises = fs.promises;

const mongoose = require('mongoose');
const conn = require('./connectDB');
const Anuncio = require('../models/Anuncio');

const file = '../data/anuncios.json';

const data = JSON.parse(fs.readFileSync(file,'utf-8'));

console.log(data);


// conectar
mongoose.connect('mongodb://localhost/nodepop' , { useNewUrlParser: true, useUnifiedTopology: true });

async function loadAgentes() {    
    try {
        await Anuncio.insertMany(data);
        console.log('Datos de anuncios cargados.!');
        // process.exit();
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

conn.once('open', async () => {
    console.log('Conectado a MongoDB en ', mongoose.connection.name);
    console.log('Limpiando Base de datos..!');
    const resDel = await Anuncio.deleteMany({});
    console.log('Base de datos borrada!', resDel.ok, resDel.deletedCount);
    console.log('Cargando anuncios.json!');
    await loadAgentes();
    console.log('Terminado..!');
    process.exit();
});