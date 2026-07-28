const pool = require('../config/db');





const crearNota = async(datos)=>{


    const {


        id_estudiante,

        id_unidad,

        nota_final


    } = datos;



    let aprobado =
    'Reprobado';



    if(nota_final >= 60){

        aprobado =
        'Aprobado';

    }





    const [nota] =

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

        id_estudiante,

        id_unidad,

        nota_final,

        aprobado

    ]

    );



    return {


        mensaje:

        'Nota registrada correctamente',


        id_nota:

        nota.insertId,


        aprobado


    };

};








const obtenerHistorial =
async(idEstudiante)=>{


    const [historial] =

    await pool.query(

    `
    SELECT


    h.id_nota,


    u.nombre AS unidad,


    h.nota_final,


    h.aprobado,


    h.fecha_completado



    FROM historial_notas h



    INNER JOIN unidad u

    ON h.id_unidad =
    u.id_unidad



    WHERE h.id_estudiante = ?



    ORDER BY h.fecha_completado DESC


    `,


    [

        idEstudiante

    ]

    );



    return historial;


};





module.exports={


crearNota,

obtenerHistorial


};