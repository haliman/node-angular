const auth = require('./auth.routes');
const buscar = require('./buscar.routes');
const categorias = require('./categorias.routes');
const productos = require('./productos.routes');
const uploads = require('./uploads.routes');
const usuarios = require('./usuarios.routes');

module.exports = {
    auth,
    buscar,
    categorias,
    productos,
    uploads,
    usuarios
}