const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRol = require('../middlewares/validar-rol');
const validarArchivoSubir = require('./validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRol,
    ...validarArchivoSubir
}