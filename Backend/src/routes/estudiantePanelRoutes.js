const router =
require('express').Router();



const Controller_panel =
require('../controllers/Controller_estudiante_panel');


const verificarToken =
require('../middlewares/authMiddleware');




router.get(

'/panel',

verificarToken,

Controller_panel.panel

);



module.exports = router;