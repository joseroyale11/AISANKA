const router =
require('express').Router();


const Controller_docente =
require('../controllers/Controller_docente');


const verificarToken =
require('../middlewares/authMiddleware');




router.get(

'/panel',

verificarToken,

Controller_docente.panel

);



module.exports = router;