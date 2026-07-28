const Service_progreso =
require('../services/Service_progreso');




const actualizar =
async(req,res)=>{


    try{


        const resultado =

        await Service_progreso.actualizarProgreso(

            req.body

        );



        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};






const listar =
async(req,res)=>{


    try{


        const resultado =

        await Service_progreso.obtenerProgresoEstudiante(

            req.params.idEstudiante

        );



        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};




module.exports={


actualizar,

listar


};