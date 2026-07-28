const pool = require('../config/db');





const generarNotaUnidad = async(

idEstudiante,

idUnidad

)=>{



    const [datos] =

    await pool.query(

    `

    SELECT

    AVG(r.puntaje) AS promedio


    FROM resultado_ejercicio r



    INNER JOIN ejercicio e


    ON r.id_ejercicio =
    e.id_ejercicio



    INNER JOIN contenido c


    ON e.id_contenido =
    c.id_contenido



    WHERE r.id_estudiante = ?

    AND c.id_unidad = ?


    `,


    [

        idEstudiante,

        idUnidad

    ]

    );




    const promedio =

    Number(datos[0].promedio);



    if(!promedio){

        return null;

    }



    let aprobado =
    'Reprobado';



    if(promedio >= 60){

        aprobado =
        'Aprobado';

    }



    await pool.query(

    `

    INSERT INTO historial_notas


    (

    id_estudiante,

    id_unidad,

    nota_final,

    aprobado,

    fecha_completado

    )


    VALUES

    (?,?,?,?,NOW())


    `,


    [

        idEstudiante,

        idUnidad,

        promedio,

        aprobado

    ]

    );



    return {


        promedio,

        aprobado


    };

};





module.exports={

generarNotaUnidad

};