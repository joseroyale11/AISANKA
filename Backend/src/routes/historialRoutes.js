const router =
require('express').Router();



const Controller_historial =
require('../controllers/Controller_historial');




router.post(

'/',

Controller_historial.crear

);




router.get(

'/estudiante/:idEstudiante',

Controller_historial.listar

);



module.exports = router;