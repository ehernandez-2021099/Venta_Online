const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
    carro:{
        type:String,
        required:[true, 'El carrito es obligatorio']
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos:[{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        default: null
    }],
    total:{
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});


module.exports = model('Carrito', CarritoSchema);