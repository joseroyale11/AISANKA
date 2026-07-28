const express = require('express');
const router = express.Router();

const Controller_estudiante =
require('../controllers/Controller_estudiante');

const verificarToken =
require('../middlewares/authMiddleware');

router.post(
    '/',
    verificarToken,
    Controller_estudiante.crear
);

router.get(
    '/',
    verificarToken,
    Controller_estudiante.listar
);

router.get(
    '/:id',
    verificarToken,
    Controller_estudiante.obtenerPorId
);

router.put(
    '/:id',
    verificarToken,
    Controller_estudiante.actualizar
);

router.delete(
    '/:id',
    verificarToken,
    Controller_estudiante.eliminar
); 
module.exports = router;