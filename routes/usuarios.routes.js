const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios.controllers');
const { esRolValido, emailExiste, existeUsuarioPorId, existeNombreUsuario } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRole
} = require('../middlewares')

const router = Router();

router.get('/', [
    validarJWT,
    esAdminRol
], usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre').custom(existeNombreUsuario),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE]),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRole('ADMIN_ROL', 'OTRO_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;