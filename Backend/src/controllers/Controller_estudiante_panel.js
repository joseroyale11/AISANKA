const Service_panel =
require('../services/Service_estudiante_panel');





const panel =
async(req,res)=>{


    try{


        const resultado =

        await Service_panel.obtenerPanelEstudiante(

            req.usuario.id_usuario

        );



        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};





module.exports={

panel

};
