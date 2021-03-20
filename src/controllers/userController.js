const db = require('../database/models');
const bcrypt = require('bcryptjs');


module.exports = {
    login: function(req, res){
        res.render('login');
    },
    enter: function(req, res){
        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(bcrypt.compareSync(req.body.contrasena, usuario.contrasena)){
                req.session.userSession = usuario.id
                res.render('home')
            }else{
                res.render('login')
            }
        })
        .catch(function(e){
            res.send(e)
        })
    }, 
    register: function(req, res){
        res.render('register');
    }, 
    saveUser: function(req, res){
        db.Usuario.create({
          email: req.body.email,
          rol: 1,
          contrasena: bcrypt.hashSync(req.body.contrasena, 10),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          telefono: req.body.telefono,
          pais: null 
        })
        .then(function(usuario){
            res.render('home')
        })
        .catch(function(e){
            res.send(e)
        })
    },
    account: function(req, res){
        res.render('cuenta');
    }, 
    accountEdit: function(req, res){
        res.render('accountEdit');
    },
    update: function(req, res){
        res.render('accountEdit');
    },
    inscripciones: function(req, res){
        res.render('misInscripciones');
    }
}