const { Router } = require('express');
const { check } = require('express-validator');
const { deleteCategoria } = require('../controllers/categoria');

//Controllers
const { getCliente, postCliente, putCliente, deleteAdmin, deleteCliente,  } = require('../controllers/cliente');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');
const router = Router();

router.get('/', getCliente );


router.post('/agregar',
[
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    check('rol').default('CLIENT').custom(esRoleValido),
    validarCampos
],
postCliente);


////
router.put('/editar',
 [
    validarJWT,

    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
 putCliente);

 

 ///

 router.delete('/eliminar',
 [

    validarJWT,
    //tieneRole('CLIENT'),
    validarCampos
],
 deleteCliente);
 module.exports = router;