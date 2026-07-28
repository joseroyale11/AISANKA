const Service_docente =
require('../services/Service_docente');

const panel =
async(req,res)=>{
    try{
        const resultado =
        await Service_docente.obtenerPanelDocente(
            req.usuario.id_usuario
        );
        res.json(resultado);
    }
    
    catch(error){
        res.status(400).json({
            mensaje:error.message
        });
    }
};


module.exports={
panel
};