const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre del producto es obligatorio'],
        unique: true
    },
    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    ventas:{
        type:Number,
        default:0
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    stock:{
        type:Number,
        default:0
    }

});


module.exports = model('Producto', ProductoSchema);