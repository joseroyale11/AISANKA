const router =
require('express').Router();



const Controller_ejercicio =
require('../controllers/Controller_ejercicio');



router.get(

'/contenido/:idContenido',

Controller_ejercicio.listarPorContenido

);



router.get(

'/:id',

Controller_ejercicio.obtenerPorId

);



module.exports = router;