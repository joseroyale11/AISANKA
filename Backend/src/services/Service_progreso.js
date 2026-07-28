const pool = require('../config/db');





const actualizarProgreso = async(datos)=>{


    const {


        id_estudiante,

        id_ejercicio,

        puntaje


    } = datos;




    const [existe] =

    await pool.query(

    `
    SELECT *

    FROM progreso

    WHERE id_estudiante = ?

    AND id_ejercicio = ?

    `,

    [

        id_estudiante,

        id_ejercicio

    ]

    );








    if(existe.length > 0){


        let mejorPuntaje =
        existe[0].mejor_puntaje;



        if(
            puntaje > mejorPuntaje
            ||
            mejorPuntaje === null
        ){

            mejorPuntaje = puntaje;

        }



        let estado =
        'En proceso';



        if(mejorPuntaje >= 60){

            estado =
            'Finalizado';

        }




        await pool.query(

        `
        UPDATE progreso


        SET

        intentos = intentos + 1,

        mejor_puntaje = ?,

        estado = ?,

        fecha_ultimo_intento =
        NOW()



        WHERE id_progreso = ?

        `,


        [

            mejorPuntaje,

            estado,

            existe[0].id_progreso

        ]

        );



    }



 

    else{


        let estado =
        'En proceso';



        if(puntaje >= 60){

            estado =
            'Finalizado';

        }



        await pool.query(

        `
        INSERT INTO progreso

        (

        id_estudiante,

        id_ejercicio,

        intentos,

        mejor_puntaje,

        estado,

        fecha_ultimo_intento

        )


        VALUES

        (?,?,?,?,?,NOW())

        `,


        [

            id_estudiante,

            id_ejercicio,

            1,

            puntaje,

            estado

        ]

        );


    }



    return {

        mensaje:
        'Progreso actualizado correctamente'

    };


};








const obtenerProgresoEstudiante =
async(idEstudiante)=>{


    const [progreso] =

    await pool.query(

    `
    SELECT


    p.id_progreso,


    c.titulo AS contenido,


    e.tipo,


    e.descripcion,


    p.intentos,


    p.mejor_puntaje,


    p.estado,


    p.fecha_ultimo_intento



    FROM progreso p



    INNER JOIN ejercicio e

    ON p.id_ejercicio =
    e.id_ejercicio



    INNER JOIN contenido c

    ON e.id_contenido =
    c.id_contenido



    WHERE p.id_estudiante = ?


    ORDER BY p.fecha_ultimo_intento DESC


    `,


    [

        idEstudiante

    ]

    );


    return progreso;


};





module.exports={


actualizarProgreso,

obtenerProgresoEstudiante


};