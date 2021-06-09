const { Categoria, Producto } = require('../models');
const Role = require('../models/rol');
const Usuario = require('../models/usuario');


/**Validación Usuario */
const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es correcto.`);
    }
}

const emailExiste = async(correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

/**
 * @method
 * @since 1.0.0
 * @version 1.0.0
 * @param {nombre} nombre del nuevo usuario
 * @desc  comprobamos si el nombre de usuario ya lo tiene asignado otro usuario
 * @throws {Error} nos devuelve un error en caso de que exista
 */
const existeNombreUsuario = async(nombre) => {
    const existeUsuario = await Usuario.findOne({ nombre });
    if (existeUsuario) {
        throw new Error(`El nombre ${nombre} no esta disponible`)
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`)
    }
}


/*** validaciones categorias * */

/**
 * @method
 * @since 1.0.0
 * @version 1.0.0
 * @param {mongoID} id de la categoria
 * @desc  comprobamos si existe la categoria introduciendo el ID
 * @throws {Error} nos devuelve un error en caso de que exista
 */
const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria con id ${id} no existe`)
    }
}

/**
 * @method 
 * @since 1.0.0
 * @version 1.0.0
 * @param {String} nombre de la categoria
 * @desc  comprobamos si existe la categoria introduciendo el nombre
 * @throws {Error} nos devuelve un error en caso de que exista
 */
const existeCategoriaPorNombre = async(nombre) => {
    const existeCategoria = await Categoria.find({ nombre });
    if (existeCategoria) {
        throw new Error(`La categoria ${nombre} ya esta creada`)
    }
}

/**
 * @method
 * @since 1.0.0
 * @version 1.0.0
 * @param {String} nombre de la categoria
 * @desc  comprobamos si existe la categoria introduciendo el nombre
 * @throws {Error} nos devuelve un error en caso de que no exista la categoria
 */
const noExisteCategoriaPorNombre = async(nombre) => {
    const existeCategoria = await Categoria.findOne({ nombre });
    if (!existeCategoria) {
        throw new Error(`La categoria ${nombre} no se encuentra registrada en la base de datos`)
    }
}

/**
 * Productos
 */
const existeProductoNombre = async(nombre) => {
    nombre = nombre.toUpperCase();
    const existeProducto = await Producto.findOne({ nombre })
    if (existeProducto) {
        throw new Error(`El producto ${nombre} ya se encuentra registrado en la base de datos`);
    }
}

/**
 * @method
 * @since 1.0.0
 * @version 1.0.0
 * @param {mongoID} id de la producto
 * @desc comprobamos si existe el producto introduciendo el ID
 * @throws {Error} nos devuelve un error en caso de que exista
 */
const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`La categoria con id ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
}

module.exports = {
    coleccionesPermitidas,
    esRolValido,
    emailExiste,
    existeCategoriaPorId,
    existeCategoriaPorNombre,
    existeUsuarioPorId,
    existeNombreUsuario,
    existeProductoNombre,
    existeProductoPorId,
    noExisteCategoriaPorNombre
}