// ====================
// Importaciones requeridas
// ====================
const express = require('express');
const bcrypy  = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario.model');
const { isNumber } = require('underscore');
const { json } = require('body-parser');

// ====================
// Inicializamos la app
// ====================
const app = express();

// Obtener Usuarios
app.get('/usuario', (req, res) => {

    desde = req.query.desde || 0;
    desde = Number(desde);

    limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario
        .find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuariosDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({estado: true}, (err, cuantos) => {

                res.json({
                    ok: true,
                    cuantos,
                    usuariosDB
                });
            });

        });
});
 
// Creacion de Usuario
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypy.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// Actualizacion del usuario
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, {
        // Opciones
        new: true,
        runValidators: true

        // Callback
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

// Borrar Usuario
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

module.exports = app;