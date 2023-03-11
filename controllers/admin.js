const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Admin = require('../models/usuario');

const getAdmin = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaAdmin = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
    ]);

    res.json({
        msg: 'get Api - mostrar Admin',
        listaAdmin
    });

}

const postAdmin = async (req = request, res = response) => {
    rol='ADMIN'
    //Desestructuración
    const { nombre, correo, password} = req.body;
    const adminGuardadoDB = new Admin({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    adminGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    
    await adminGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Cliente',
        adminGuardadoDB
        
    });

}


const putAdmin = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    //const { id } = req.params;
    const id = req.usuario.id;
    const { _id, img,  /* rol,*/  estado, google, ...resto } = req.body;
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const adminEditado = await Admin.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar Cliente',
        
        adminEditado
    });

}


const putAdminClient = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    //const { id } = req.params;
    const {id} = req.params;
    const { _id, img,  /* rol,*/  estado, google, ...resto } = req.body;
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const clientEditado = await Admin.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar Cliente',
        
        clientEditado
    });

}



const deleteAdmin = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    //const { id } = req.params;
    const id = req.usuario.id;
    //Eliminar fisicamente de la DB
    //const clienteEliminado = await Cliente.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const adminEliminado = await Admin.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar Admin',
        adminEliminado 
    });
}

const deleteCliente = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    //const { id } = req.params;
    const { id } = req.params;
    //Eliminar fisicamente de la DB
    //const clienteEliminado = await Cliente.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
     const clienteEliminado = await Admin.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar cliente por Admin',
        clienteEliminado 
    });
}

module.exports = {
    getAdmin,
    postAdmin,
    putAdmin,
    deleteAdmin,
    deleteCliente,
    putAdminClient
}


// CONTROLADOR