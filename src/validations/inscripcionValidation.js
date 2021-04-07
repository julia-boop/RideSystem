
const {check, body, validationResult} = require('express-validator');

module.exports = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('apellido')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('caballo')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('categoria')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('club')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('pais')
    .not()
    .isEmpty()
    .withMessage('Este campo es obligatorio')
]