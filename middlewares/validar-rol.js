const { response } = require('express');

const esAdminRol = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if (!rol === 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el token'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}


module.exports = {
    esAdminRol,
    tieneRole
}