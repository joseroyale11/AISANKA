const router =
require('express').Router();



const Controller_recurso =
require('../controllers/Controller_recurso');



router.get(

'/:idContenido',

Controller_recurso.listarPorContenido

);



module.exports = router;