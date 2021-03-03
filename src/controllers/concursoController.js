module.exports = {
    cForm: function(req, res){
        res.render('formConcurso');
    },
    read: function(req, res){
        res.render('concursos')
    }
}