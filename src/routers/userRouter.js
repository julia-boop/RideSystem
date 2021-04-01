const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const hasAccess = require('../middlewares/hasAccess')

router.get('/login', userController.login);
router.post('/login', userController.enter);

router.get('/register', userController.register);
router.post('/register', userController.saveUser);

router.get('/:idUser/account', userController.account);

router.get('/:idUser/edit', userController.accountEdit);
router.put('/:idUser/edit', userController.update);

router.get('/:idUser/inscripciones', hasAccess, userController.inscripciones);

router.get('/:idUser/:idInscripcion/inscripciones/eliminar', userController.iDestroy);

router.get('/:idUser/inscripciones/pagar', userController.testPay);

router.get('/logout', userController.logout);
module.exports = router 