const {check, body, validationResult} = require('express-validator')

module.exports = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('Credenciales Invalidas'),
    check('contrasena')
        .not()
        .isEmpty()
        .withMessage('Credenciales Invalidas')
]