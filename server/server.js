// ====================
// Librerias requeridas
// ====================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ====================
// Ejecuciones previas
// ====================
require('./config/config');

// Se genera la aplicacion con express
const app = express();

// Generador del BODY para el REQ
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cargamos las Rutas
app.use(require('./routes/usuario'));

// Coneccion a mongoDB
mongoose.connect(process.env.URLDB, {
    // Opciones de la coneccion
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    // Callback cuando logra conectarse
    if (err) {throw new Error(err); }
    console.log('Base de datos online', process.env.URLDB);
});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ', process.env.PORT);
});