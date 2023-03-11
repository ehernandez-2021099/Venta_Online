const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

//Controllers
const {getFactura, postFactura } = require('../controllers/factura');

const { existeProductoPorId } = require('../helpers/db-validators');
const { putAdmin } = require('../controllers/admin');

const router = Router();


//Manejo de rutas

// Obtener todas las categorias - publico
router.get('/', getFactura );

// Obtener una categoria por id - publico
// router.get('/:id', [
//     // check('id', 'No es un id de Mongo Válido').isMongoId(),
//     // check('id').custom( existeCategoriaPorId ),
//     // validarCampos
// ], getCategoriaPorID );

// Crear categoria - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,postFactura);

// Actuaizar categoria - privada - cualquier persona con un token válido
// router.put('/editar/:id', [
//     // validarJWT,
//     // check('id', 'No es un id de Mongo Válido').isMongoId(),
//     // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
//     // check('id').custom( existeCategoriaPorId ),
//     // validarCampos
// ] ,putCarro);

//Borrar una categoria - privado - Solo el admin puede eliminar una categoria (estado: false)
// router.delete('/eliminar/:id', [
//     // validarJWT,
//     // check('id', 'No es un id de Mongo Válido').isMongoId(),
//     // check('id').custom( existeCategoriaPorId ),
//     // validarCampos
// ] ,delete);



module.exports = router;