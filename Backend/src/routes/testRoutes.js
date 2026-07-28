const express = require('express');
const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');

router.get(
    '/privado',
    verificarToken,
    (req, res) => {

        res.json({
            mensaje: 'Acceso permitido',
            usuario: req.usuario
        });

    }
);

module.exports = router;