const router =
require('express').Router();


const Controller_unidad =
require('../controllers/Controller_unidad');



router.get(
'/',
Controller_unidad.listar
);



router.get(
'/:id/contenidos',
Controller_unidad.contenido
);



module.exports = router;