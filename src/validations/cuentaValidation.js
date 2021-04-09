
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
    check('email')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('telefono')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
]