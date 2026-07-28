const pool = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');





const login = async(
correo,
password
)=>{


    const [usuarios] =

    await pool.query(

    `
    SELECT

    id_usuario,

    correo,

    password,

    rol


    FROM usuarios


    WHERE correo = ?

    `,


    [

        correo

    ]

    );




    if(usuarios.length === 0){


        throw new Error(
            'Usuario no encontrado'
        );


    }



    const usuario =
    usuarios[0];






    if(password !== usuario.password){


        throw new Error(
            'Contraseña incorrecta'
        );

    }






    const token =

    jwt.sign(


    {

        id_usuario:
        usuario.id_usuario,


        rol:
        usuario.rol


    },


    process.env.JWT_SECRET,


    {

        expiresIn:'8h'

    }


    );






    return {


        mensaje:
        'Login correcto',


        usuario:{


            id_usuario:
            usuario.id_usuario,


            correo:
            usuario.correo,


            rol:
            usuario.rol


        },


        token


    };


};





module.exports={

login

};