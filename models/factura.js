const {Schema, model} = require('mongoose');

const FacturaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    carro:{
        type: Schema.Types.ObjectId,
        ref:'Carrito',
        required: true,
    },
    estado:{
        type:Boolean,
        default:true    
    }
})

module.exports = model('Factura', FacturaSchema);