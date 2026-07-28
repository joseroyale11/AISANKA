const Service_estudiante =
require('../services/Service_estudiante');



const crear = async (req,res)=>{


    try{


        const resultado =
        await Service_estudiante.crearEstudiante(
            req.body,
            req.usuario.id_usuario
        );


        res.status(201).json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};







const listar = async(req,res)=>{


    try{


        const estudiantes =
        await Service_estudiante.obtenerEstudiantes(
            req.usuario.id_usuario
        );


        res.json(estudiantes);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};







const obtenerPorId =
async(req,res)=>{


    try{


        const estudiante =
        await Service_estudiante.obtenerPorId(

            req.usuario.id_usuario,

            req.params.id

        );



        res.json(estudiante);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};







const actualizar =
async(req,res)=>{


    try{


        const resultado =
        await Service_estudiante.actualizarEstudiante(

            req.usuario.id_usuario,

            req.params.id,

            req.body

        );



        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:error.message

        });


    }


};







const eliminar =
async(req,res)=>{


    try{


        const resultado =
        await Service_estudiante.eliminarEstudiante(

            req.usuario.id_usuario,

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


    crear,

    listar,

    obtenerPorId,

    actualizar,

    eliminar


};