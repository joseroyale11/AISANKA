const pool = require('../config/db');


const obtenerEjerciciosContenido = async(
idContenido
)=>{


    const [ejercicios] =

    await pool.query(

    `
    SELECT


    e.id_ejercicio,

    e.id_contenido,

    e.tipo,

    e.descripcion,

    e.puntaje_minimo


    FROM ejercicio e


    WHERE e.id_contenido = ?


    ORDER BY e.id_ejercicio


    `,


    [

        idContenido

    ]

    );


    return ejercicios;


};






const obtenerEjercicioPorId = async(
idEjercicio
)=>{


    const [ejercicio] =

    await pool.query(

    `
    SELECT


    e.id_ejercicio,

    e.tipo,

    e.descripcion,

    e.puntaje_minimo,

    c.titulo AS contenido


    FROM ejercicio e


    INNER JOIN contenido c

    ON e.id_contenido =
    c.id_contenido


    WHERE e.id_ejercicio = ?


    `,


    [

        idEjercicio

    ]

    );



    return ejercicio[0];


};





module.exports={


obtenerEjerciciosContenido,

obtenerEjercicioPorId


};