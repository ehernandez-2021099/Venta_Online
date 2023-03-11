const { request, response } = require('express');
const Factura = require('../models/factura');
const Carro = require('../models/carro');
const Producto = require('../models/producto');



const getFactura = async (req=request, res=response) =>{

    const query = { estado: true };

     const listaFactura = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query).populate({
            path: 'carro',
            populate: { 
              path: 'productos', 
              select: 'nombre',
              path: 'cliente',
              select: 'nombre'               // incluir solo los campos nombre y precio de Producto
            },
        })
     ]);
 
     res.json({
         msg: 'get Api - Controlador Factura',
         listaFactura
     });

}



const getTuFactura = async (req=request, res=response) =>{

    const query = { estado: true };

     const listaTuFactura = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query).populate({
            path: 'carro',
            populate: { 
              path: 'productos', 
              select: 'nombre',
              path: 'cliente',
              select: 'nombre'               
            },
        })
     ]);
 
     res.json({
         msg: 'get Api - Controlador Tu Factura',
         listaTuFactura
     });

}

const postFactura = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const { nombre, admin, ...resto} = req.body;
    // const buscar = await Factura.findById(req.usuario._id)
    // const buscadorCar = await Carro.findById(buscar.carro)
    // const producto = await Producto.findById(buscadorCar.producto)

    // Generar la data a guardar
    const data = {
        ...resto,
        nombre,
        admin: req.usuario._id
    }

    const factura = await new Factura(data);
    //Guardar en DB
    await factura.save();

    res.status(201).json(factura);

}


module.exports={
    getFactura,
    postFactura
}

