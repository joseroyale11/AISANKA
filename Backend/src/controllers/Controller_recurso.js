const Service_recurso =
require('../services/Service_recurso');





const listarPorContenido =
async(req,res)=>{


    try{


        const resultado =

        await Service_recurso.obtenerRecursosContenido(

            req.params.idContenido

        );



        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};





module.exports={


listarPorContenido


};