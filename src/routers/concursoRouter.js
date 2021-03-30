const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');
const hasAccess = require('../middlewares/hasAccess');

router.get('/', concursoController.read);
router.get('/:idConcurso/detail', concursoController.cDetail);
router.get('/:idConcurso/:idPrueba/detail', concursoController.pDetail);
router.get('/:idConcurso/:idPrueba/inscripcion', concursoController.iForm);
router.post('/:idConcurso/:idPrueba/inscripcion',  concursoController.iCreate);


module.exports = router;