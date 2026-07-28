const Service_historial =
require('../services/Service_historial');





const crear =
async(req,res)=>{


    try{


        const resultado =

        await Service_historial.crearNota(

            req.body

        );



        res.status(201).json(resultado);



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

        await Service_historial.obtenerHistorial(

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


crear,

listar


};