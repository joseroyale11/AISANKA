const router =
require('express').Router();



const Controller_resultado =
require('../controllers/Controller_resultado');




router.post(

'/',

Controller_resultado.crear

);





router.get(

'/estudiante/:idEstudiante',

Controller_resultado.listar

);




module.exports = router;