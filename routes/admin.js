const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { getAdmin, postAdmin, putAdmin, deleteAdmin, deleteCliente, putAdminClient } = require('../controllers/admin');

const { esRoleValido, emailExiste } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');
const router = Router();

router.get('/', getAdmin );


router.post('/agregar',
[
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    check('rol').default('ADMIN').custom(esRoleValido),
    validarCampos
],
postAdmin);


////
router.put('/editar',
 [
    validarJWT,
    // check('id', 'No es un id de Mongo Válido').isMongoId(),
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeProfesorPorId ),
    //check('rol').custom(esRoleValido),
    esAdminRole,
    validarCampos
],
 putAdmin);

 router.put('/editarClient/:id',
 [
    validarJWT,
    // check('id', 'No es un id de Mongo Válido').isMongoId(),
    // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeProfesorPorId ),
    //check('rol').custom(esRoleValido),
    
    validarCampos
],
putAdminClient);

 ///

 router.delete('/eliminar',
 [
    validarJWT,
    esAdminRole,
    validarCampos
],
 deleteAdmin);

 router.delete('/eliminarClient/:id',
 [
    validarJWT,

    validarCampos
],
deleteCliente);
 module.exports = router;