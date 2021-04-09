const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const hasAccess = require('../middlewares/hasAccess')
const loginValidation = require('../validations/loginValidation');
const registerValidation = require('../validations/registerValidation');
const cuentaValidation = require('../validations/cuentaValidation');



router.get('/login', userController.login);
router.post('/login', loginValidation, userController.enter);

router.get('/register', userController.register);
router.post('/register', registerValidation, userController.saveUser);

router.get('/:idUser/account', hasAccess, userController.account);

router.get('/:idUser/edit', hasAccess, userController.accountEdit);
router.put('/:idUser/edit', cuentaValidation, userController.update);

router.get('/:idUser/inscripciones', hasAccess, userController.inscripciones);

router.get('/:idUser/:idInscripcion/inscripciones/eliminar', userController.iDestroy);

router.get('/:idUser/inscripciones/pagar', userController.testPay);

router.get('/logout', userController.logout);
module.exports = router 