const pool = require('../config/db');





const obtenerPanelDocente = async(
idUsuario
)=>{


    const [docente] =

    await pool.query(

    `
    SELECT id_docente

    FROM docente

    WHERE id_usuario = ?

    `,

    [

        idUsuario

    ]

    );



    if(docente.length === 0){

        throw new Error(
            'Docente no encontrado'
        );

    }



    const idDocente =
    docente[0].id_docente;




    const [estudiantes] =

    await pool.query(

    `

    SELECT


    e.id_estudiante,


    e.primer_nombre,


    e.segundo_nombre,


    e.primer_apellido,


    e.segundo_apellido,


    e.codigo_mined,


    a.nombre AS aula,


    g.nombre AS grado,


    es.nombre AS escuela,



    COUNT(DISTINCT r.id_resultado)
    AS ejercicios_realizados,



    ROUND(
    AVG(r.puntaje),
    2
    )

    AS promedio



    FROM estudiante_docente ed



    INNER JOIN estudiante e

    ON ed.id_estudiante =
    e.id_estudiante



    LEFT JOIN matricula m

    ON e.id_estudiante =
    m.id_estudiante



    LEFT JOIN aula a

    ON m.id_aula =
    a.id_aula



    LEFT JOIN grado g

    ON a.id_grado =
    g.id_grado



    LEFT JOIN escuela es

    ON a.id_escuela =
    es.id_escuela



    LEFT JOIN resultado_ejercicio r

    ON e.id_estudiante =
    r.id_estudiante



    WHERE ed.id_docente = ?



GROUP BY

e.id_estudiante,

e.primer_nombre,

e.segundo_nombre,

e.primer_apellido,

e.segundo_apellido,

e.codigo_mined,

a.nombre,

g.nombre,

es.nombre


ORDER BY

e.primer_nombre



    `,


    [

        idDocente

    ]

    );



    return estudiantes;


};





module.exports={


obtenerPanelDocente


};