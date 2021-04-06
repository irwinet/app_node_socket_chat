const { Categoria, Role, Usuario, Producto } = require('../models');
// const Role = require('../models/role');
// const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } es esta registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluide = colecciones.includes(coleccion);
    if (!incluide) {
        throw new Error(`La coleccion ${coleccion} no es permitda, ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}