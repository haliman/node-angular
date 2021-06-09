const { response, request } = require('express');

const { Producto, Categoria } = require('../models');

const obtenerProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        producto
    })
}

const obtenerProducto = async(req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);

}

const crearProducto = async(req, res = response) => {

    const { estado, usuario, nombreCategoria, ...body } = req.body;

    // const nombre = req.body.nombre.toUpperCase();
    // const nombreCategoria = req.body.nombreCategoria.toUpperCase();
    // const precio = req.body.precio;
    // const descripcion = req.body.descripcion;

    const categoria = await Categoria.findOne({ nombre: nombreCategoria.toUpperCase() });

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        categoria,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        producto
    })
}

const actualizarProducto = async(req, res = response) => {

    let { estado, usuario, ...body } = req.body;
    const { id } = req.params;

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        producto
    })
}

const borrarProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(producto);
}

module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos
}