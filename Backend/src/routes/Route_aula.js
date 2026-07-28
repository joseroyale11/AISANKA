const express = require('express');

const router = express.Router();

const verificarToken =
require('../middlewares/authMiddleware');

const Controller_aula =
require('../controllers/Controller_aula');

router.get(
    '/mis-aulas',
    verificarToken,
    Controller_aula.misAulas
);

module.exports = router;