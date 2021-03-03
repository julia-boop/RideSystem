const express = require('express');
const router = express.Router();
const concursoController = require('../controllers/concursoController');

router.get('/crear', concursoController.cForm);
router.get('/', concursoController.read);

module.exports = router;