const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRECTORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en la BD'
            })
        }
        //verificar si el usuario esta activo estado es true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario desactivado'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(token);
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}