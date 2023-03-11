const { response, request } = require("express");
const Producto = require("../models/producto");
const Carro = require("../models/carro");

const getCarro = async (req = request, res = response)=>{
    const query = {estado: true};

    const listaCarros = await Promise.all([
        Carro.countDocuments(query),
        Carro.find(query).populate('cliente', 'nombre').populate('productos'),
    ]); 

    res.status(201).json({
        msg: "Get Api - Controlador Carro",
        listaCarros,
      });
}


const postCarro = async (req = request, res = response) => {
    const carro = req.body.carro.toUpperCase();

    const { productos, cantidadProduc } = req.body;
    const carroDB = await Carro.findOne({ carro });
    let tota1 = 0;
    let total2 = 0;
  
    //Si el carrito existe no lo agrega.
    if (carroDB) {
      return res.status(400).json({
        msg: `El carrito ${carroDB.carr}, ya existe.`,
      });
    }
  
    for (let i = 0; i < productos.length; i++) {
      const cantxProduc = cantidadProduc[i];
      const listaProductos = productos[i];
      
      const query = await Producto.findById(listaProductos);
      let precio = query.precio;
      let cantidad = parseInt(cantxProduc);
  
      tota1 = precio * cantidad;
      
      total2 = tota1 + total2;
      console.log(total2, 'total final');

    }
  
    const data = {
      carro,
      cliente: req.usuario.id,
      total: total2,
    };
  
    const carros = new Carro(data);
    carros.productos.push(...req.body.productos);
  
    await carros.save();
    res.status(201).json(carros);
  // //   const carro = req.body.caro
  
 

 
  // const carro = req.body.carro.toUpperCase();
  // const carroDB = await Carro. findOne({ carro });
  // //si el carrito existe no Lo agrega.
  // if (carroDB) {
  //   return res.status (400).json({
  //     msg: `El carrito ${carritoD8.carro}, ya existe`,
  //    });
  //  }
  //  const data ={
  //    carro,
  //    usuario: req.usuario.id
  //  };
  //  const carros = new Carro(data);
  //  carros.productos.push(...req.body.productos);
  //   await carros.save();
  //   res.status (201).json(carros);

};

const putCarro = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;
  
    resto.carro = resto.carro.toUpperCase();
    resto.productos = [...req.body.productos];
    resto.usuario = req.usuario._id;
  
    const carroEditado = await Carro.findByIdAndUpdate(id, resto, {new: true,});
  
    res.status(201).json({
        msg:"Put Api - Controlador Carro",
        carroEditado
    });
  };
  
  module.exports = {
    getCarro,
    postCarro,
    putCarro
  };