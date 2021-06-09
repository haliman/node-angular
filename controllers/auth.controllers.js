const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        //Validar correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: `Correo ${correo} incorrecto`
            })
        }

        //Usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'No se encuentra el usuario'
            })
        }

        //Validar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Password introducido incorrecto'
            })
        }

        //Validar token
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: `Login de ${correo} correcto`,
            usuario,
            token
        });
    } catch {
        console.log(error);
        res.status(500).json({
            msg: 'Hablar con el administrador'
        });
    }
}

const googleSignin = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Se crea el usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario tiene el estado false en google en la BD
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador'
            });
        }

        //generamos el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token

        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no valido'
        })
    }
}

const renovarToken = async(req, res = response) => {

    const { usuario } = req;
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    });

}

module.exports = {
    login,
    googleSignin,
    renovarToken
}