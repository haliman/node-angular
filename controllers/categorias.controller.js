const { response, request } = require('express');

const { Categoria } = require('../models');

const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuarios', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        categoria
    })
}

const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);
}

const crearCategoria = async(req, res = response) => {

    //Para que el nombre sea en mayusculas
    const nombre = req.body.nombre.toUpperCase();

    // const categoriaBD = await Categoria.findOne({ nombre });

    // if (categoriaBD) {
    //     res.status(400).json({
    //         msg: `La categoria ${nombre} ya esta`
    //     });
    // }

    //Generar los datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria
    });
}

const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);

}

const borrarCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'Categoria borrada',
        categoria
    })
}

module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias
}