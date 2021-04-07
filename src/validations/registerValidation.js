
const {check, body, validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('apellido')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('telefono')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio'),
    check('contrasena')
        .not()
        .isEmpty()
        .withMessage('Este campo es obligatorio')
        .isLength({min:8})
        .withMessage('La contraseña debe tener mínimo 8 caracteres '),
    body('email')
        .custom(async function(enteredEmail){
            let validationEmail = db.Usuario.findOne({
                where: {
                    email: enteredEmail
                }
            })
            .then(function(result){
                if(result){
                    throw Error('Este mail ya fue ingresado')
                }else{
                    return true
                }
            })
            return validationEmail
        }).withMessage('Este mail ya fue ingresado')
]