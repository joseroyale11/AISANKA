const Service_unidad =
require('../services/Service_unidad');



const listar = async(req,res)=>{


    try{


        const resultado =
        await Service_unidad.obtenerUnidades();


        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};




const contenido =
async(req,res)=>{


    try{


        const resultado =

        await Service_unidad.obtenerContenidoUnidad(

            req.params.id

        );


        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};




module.exports={

listar,

contenido

};