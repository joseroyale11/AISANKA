const Service_ejercicio =
require('../services/Service_ejercicio');

const listarPorContenido =
async(req,res)=>{
    try{
        const resultado =
        await Service_ejercicio.obtenerEjerciciosContenido(
            req.params.idContenido
        );
        res.json(resultado);
    }
    
    catch(error){
        res.status(400).json({
            mensaje:error.message
        });
    }
};



const obtenerPorId =
async(req,res)=>{

    try{
        const resultado =
        await Service_ejercicio.obtenerEjercicioPorId(
            req.params.id
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
listarPorContenido,
obtenerPorId
};