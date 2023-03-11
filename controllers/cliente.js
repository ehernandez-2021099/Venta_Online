const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Cliente = require('../models/usuario');

const getCliente = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCliente = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador de Clientes, mostrar.',
        listaCliente
    });

}

const postCliente = async (req = request, res = response) => {
    rol='CLIENT'
    //Desestructuración
    
    const { nombre, correo, password} = req.body;
    const clienteGuardadoDB = new Cliente({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    clienteGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    
    await clienteGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Cliente',
        clienteGuardadoDB
        
    });

}


const putCliente = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const _id = req.usuario.id;
    const { img,  /* rol,*/  estado, google, ...resto } = req.body;
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const clienteEditado = await Cliente.findByIdAndUpdate(_id, resto);

    res.json({
        msg: 'PUT editar Cliente',
        
        clienteEditado
    });

}

const deleteCliente = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const _id = req.usuario.id;

    //Eliminar fisicamente de la DB
    //const clienteEliminado = await Cliente.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const clienteEliminado = await Cliente.findByIdAndUpdate(_id, { estado: false });

    res.json({
        msg: 'DELETE eliminar cliente',
        clienteEliminado 
    });
}

module.exports = {
    getCliente,
    postCliente,
    putCliente,
    deleteCliente
}


// CONTROLADOR