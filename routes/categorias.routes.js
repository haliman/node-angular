const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearCategoria, obtenerCategorias, borrarCategoria, obtenerCategoria, actualizarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaPorId, existeCategoriaPorNombre } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre', 'Debe de introducir el nombre de la categoría').not().isEmpty(),
    check('nombre').custom(existeCategoriaPorNombre),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'Debe de introducir el nombre de la categoría').not().isEmpty(),
    check('nombre').custom(existeCategoriaPorNombre),
    validarCampos
], actualizarCategoria)

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria)

module.exports = router;