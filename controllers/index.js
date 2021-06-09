const auth = require('../controllers/auth.controllers');
const buscar = require('../controllers/buscar.controllers');
const categorias = require('../controllers/categorias.controller');
const productos = require('../controllers/productos.controllers');
const usuarios = require('../controllers/usuarios.controllers');
const uploads = require('../controllers/uploads.controllers');

module.exports = {
    ...auth,
    ...buscar,
    ...categorias,
    ...productos,
    ...usuarios,
    ...uploads
}