const authService =
require('../services/authService');





const login =
async(req,res)=>{


    try{


        const {


            correo,

            password


        } = req.body;





        const resultado =

        await authService.login(

            correo,

            password

        );




        res.json(resultado);



    }catch(error){


        res.status(400).json({

            mensaje:
            error.message

        });


    }


};





module.exports={

login

};