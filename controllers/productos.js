const { response } = require("express");
const { Producto } = require('../models');

const crearProducto = async(req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    // const nombreUpper = nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

    if (productoDB) {
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

//obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate({
            path: 'usuario',
            select: 'nombre correo -_id'
        }).populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limit))
    ]);

    res.json({
        total,
        productos
    });
}

//obtenerProducto - populate {}
const obtenerProducto = async(req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto);
}

//actualizarProducto
const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//borrarProducto - estado : false
const borrarProducto = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(producto);
}

module.exports = {
    crearProducto,
    borrarProducto,
    actualizarProducto,
    obtenerProductos,
    obtenerProducto
}