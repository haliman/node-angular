const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares/');
const { login, googleSignin, renovarToken } = require('../controllers/auth.controllers');

const router = Router();

router.post('/login', [
    check('password', 'Debe de introducir una contraseña').not().isEmpty(),
    check('correo', 'Debe de introducir un correo').isEmail(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin);

router.get('/', validarJWT, renovarToken);

module.exports = router;