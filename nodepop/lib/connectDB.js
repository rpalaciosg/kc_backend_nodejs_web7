"use strict";

// cargar librería de mongoose
const mongoose = require("mongoose");
const conn = mongoose.connection;

mongoose.set('useFindAndModify', false);

// gestionar eventos de conexion
conn.on("error", err => {
    console.log("Error de conexiòn", err);
    process.exit(1);
});

conn.once("open", () =>  {
    console.log("Conectado a MongoDB en", conn.name);
});

// conectar
mongoose.connect("mongodb://localhost/nodepop", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// exportar la conexiòn
module.exports = conn;