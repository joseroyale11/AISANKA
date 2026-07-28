const Service_resultado =
require('../services/Service_resultado');





const crear =
async(req,res)=>{


    try{


        const resultado =

        await Service_resultado.guardarResultado(

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

        await Service_resultado.obtenerResultadosEstudiante(

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