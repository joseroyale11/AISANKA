const pool = require('../config/db');




const obtenerPanelEstudiante = async(
idUsuario
)=>{


    
    const [estudiante] =

    await pool.query(

    `
    SELECT

    id_estudiante,

    primer_nombre,

    primer_apellido

    FROM estudiante

    WHERE id_usuario = ?

    `,


    [

        idUsuario

    ]

    );



    if(estudiante.length === 0){

        throw new Error(
            'Estudiante no encontrado'
        );

    }



    const idEstudiante =
    estudiante[0].id_estudiante;






    const [unidades] =

    await pool.query(

    `
    SELECT


    u.id_unidad,


    u.nombre,


    u.descripcion,


    i.nombre AS idioma



    FROM unidad u



    INNER JOIN idioma i


    ON u.id_idioma = i.id_idioma



    ORDER BY

    u.id_unidad


    `

    );




    const [progreso] =

    await pool.query(

    `
    SELECT


    c.titulo AS contenido,


    e.descripcion AS ejercicio,


    p.intentos,


    p.mejor_puntaje,


    p.estado



    FROM progreso p



    INNER JOIN ejercicio e


    ON p.id_ejercicio =
    e.id_ejercicio



    INNER JOIN contenido c


    ON e.id_contenido =
    c.id_contenido



    WHERE p.id_estudiante = ?


    `,


    [

        idEstudiante

    ]

    );






    const [notas] =

    await pool.query(

    `
    SELECT


    u.nombre AS unidad,


    h.nota_final,


    h.aprobado



    FROM historial_notas h



    INNER JOIN unidad u


    ON h.id_unidad =
    u.id_unidad



    WHERE h.id_estudiante = ?



    `,


    [

        idEstudiante

    ]

    );





    return {


        estudiante:
        estudiante[0],


        unidades,


        progreso,


        notas


    };


};





module.exports={

obtenerPanelEstudiante

};