const router =
require('express').Router();


const Controller_progreso =
require('../controllers/Controller_progreso');



router.post(

'/',

Controller_progreso.actualizar

);



router.get(

'/estudiante/:idEstudiante',

Controller_progreso.listar

);



module.exports = router;