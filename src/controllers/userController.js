const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");


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
                res.redirect('/')
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
            req.session.userSession = usuario.id
            res.redirect('/')
        })
        .catch(function(e){
            res.send(e)
        })
    },
    account: function(req, res){
        db.Usuario.findByPk(req.params.idUser)
        .then(function(usuario){
            res.render('cuenta', {usuario});
        })
        .catch(function(e){
            res.send(e)
        })
    }, 
    accountEdit: function(req, res){
        db.Usuario.findByPk(req.params.idUser)
        .then(function(usuario){
            res.render('accountEdit', {usuario});
        })
        .catch(function(e){
            res.send(e)
        })
    },
    update: function(req, res){
        db.Usuario.update({
            email: req.body.email,
            rol: 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
        }, {
            where: {
                id: req.params.idUser
            }
        })
        .then(function(usuario){
            res.redirect('/user/' + req.params.idUser + '/account')
        })
        .catch(function(e){
            res.send(e)
        })
    },
    inscripciones: async function(req, res){
        let reducer = (a, b) => {
            return a + b
        }

        let inscripciones = await db.Inscripcion.findAll({
            include:[{association: 'Usuario', where: {id: req.session.userSession}}, {association: 'Prueba', include: [{association:'Concurso', include: [{association:'Hipico'}]}]}]    
        })
        let hipico = await db.Hipico.findAll({
            include:[{association:'Concurso',
                include:[{association:'Prueba',
                where:{
                    estado:1
                },
                    include:[{association:'Inscripcion',
                    where:{
                        estado: 1,
                        usuario_id: req.params.idUser,
                    }
                }]}]}]
                
        })

            let prueXConc = 0
            let prue = []
            let ins = []
            let prueCant = []
            let pruebasXHipico = []
            let insXHipico = []
            let insCantXHipico = []

            for(let i = 0 ; i < hipico.length ; i ++){
                for(let j = 0 ; j < hipico[i].Concurso.length ; j ++){
                    prueXConc+=hipico[i].Concurso[j].Prueba.length
                    for(let k = 0 ; k < hipico[i].Concurso[j].Prueba.length ; k++){
                        ins.push(Number(hipico[i].Concurso[j].Prueba[k].precio)) 
                        prue.push(Number(hipico[i].Concurso[j].Prueba[k].Inscripcion.length))
                    }
                }
                pruebasXHipico.push(prueXConc)
                prueXConc = 0
                insXHipico.push(ins.splice(0, pruebasXHipico[i]))
                insCantXHipico.push(prue.splice(0, pruebasXHipico[i]))
            }

            for(let i = 0 ; i < insXHipico.length ; i ++){
                for(let j = 0 ; j < insXHipico[i].length ; j ++){
                    insXHipico[i][j] = Number(insXHipico[i][j]*insCantXHipico[i][j])
                }
            }

            let totalFinal = []
            for(let i = 0 ; i < insXHipico.length ; i ++){
                totalFinal.push(insXHipico[i].reduce(reducer))
            }

            let comision = []
            let totalCom = []
            for(let i = 0 ; i < totalFinal.length ; i++){
                comision.push(Number(totalFinal[i]*0.1).toFixed(0))
                comision = comision.map(Number)
                totalCom.push(Number(comision[i]+totalFinal[i]))
            }

            
            
            console.log(insCantXHipico)
            console.log(pruebasXHipico)
            console.log(insXHipico)
            console.log(prue)
            console.log(comision)
            console.log(totalCom)

            return res.render('carrito', {hipico, totalFinal, comision, totalCom})
            return res.send(hipico)

            return res.send(concDef)





//POR SI NO ANDA LO NUEVO
            // for(let i = 0 ; i < inscripciones.length ; i ++){
            //     if(inscripciones[i].estado == 1){
            //         iFilter.push(inscripciones[i])
            //         arrTotalParcial.push(inscripciones[i].Prueba.precio)
            //     }
            // }
    
            //     for(let i = 0 ; i < iFilter.length ; i ++){
            //         for (let j = 0 ; j < iFilter[i].Prueba.length ; j ++){
            //             for(let h = 0 ; h < iFilter[i].Prueba[j].Concurso.length ; h++){
            //             }
            //         }
            //     }
            // }


            // for(let j = 0 ; j < arrTotalParcial.length ; j ++){
            //     totalParcial += arrTotalParcial[j]
            // }



            // let serviciosCalc = Number((totalParcial/100)*10)
            // let servicios = Number(serviciosCalc.toFixed(0))
            // let total = Number(totalParcial + servicios)

            // return res.send(iFilter)
    },
    logout: function(req, res){
        req.session.destroy()
        res.redirect('/')
    },
    iDestroy: function(req, res){
        db.Inscripcion.destroy({
            where: {
                id: req.params.idInscripcion
            }
        })
        .then(function(){
            res.redirect('/user/' + req.params.idUser + '/inscripciones')
        })
        .catch(function(e){
            res.send(e)
        })
    }, 
    testPay: async (req, res) => {
        let inscripciones = await db.Inscripcion.findAll( {
            include:[{association: 'Prueba'}], 
            where: {
                usuario_id: req.params.idUser,
                estado: 1
            }
        })
        let anotadosCalc = []
        let prueba = []
        let iUpdate = []

        for(let i = 0 ; i < inscripciones.length ; i++ ){
            anotadosCalc.push(Number(inscripciones[i].Prueba.anotados+1));
            prueba = await db.Prueba.update({
                anotados: anotadosCalc[i],
            }, {
                where: {
                    id: inscripciones[i].prueba_id
                }
            })
            iUpdate = db.Inscripcion.update({
                estado: 2
            }, {
                where: {
                    id: inscripciones[i].id
                }
            })
        }
        return res.redirect('/user/'+inscripciones[0].usuario_id+'/inscripciones')
    }
}