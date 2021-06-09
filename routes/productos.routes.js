const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { noExisteCategoriaPorNombre, existeProductoNombre, existeProductoPorId } = require('../helpers/db-validators');

const {
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    crearProducto,
    borrarProducto
} = require('../controllers/productos.controllers');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'Debes de introducir el nombre del producto').not().isEmpty(),
    check('nombre').custom(existeProductoNombre),
    check('precio', 'Debes de introducir un precio').not().isEmpty(),
    check('precio', 'Introduce un precio valido').isNumeric(),
    check('nombreCategoria').custom(noExisteCategoriaPorNombre),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre').custom(existeProductoNombre),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

module.exports = router;