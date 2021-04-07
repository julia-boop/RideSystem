const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');
const hasAccess = require('../middlewares/hasAccess');
const inscripcionValidation = require('../validations/inscripcionValidation');

router.get('/', concursoController.read);
router.get('/:idConcurso/detail', concursoController.cDetail);
router.get('/:idConcurso/:idPrueba/detail', concursoController.pDetail);
router.get('/:idConcurso/:idPrueba/inscripcion', concursoController.iForm);
router.post('/:idConcurso/:idPrueba/inscripcion', inscripcionValidation, concursoController.iCreate);


module.exports = router;