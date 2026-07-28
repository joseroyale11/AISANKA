const pool = require('../config/db');





const guardarResultado = async(datos)=>{


    const {

        id_ejercicio,

        id_estudiante,

        puntaje,

        tiempo


    } = datos;



    const [resultado] =

    await pool.query(

    `
    INSERT INTO resultado_ejercicio

    (

    id_ejercicio,

    id_estudiante,

    puntaje,

    tiempo

    )


    VALUES

    (?,?,?,?)

    `,


    [

        id_ejercicio,

        id_estudiante,

        puntaje,

        tiempo || null

    ]

    );



    return {


        mensaje:
        'Resultado guardado correctamente',


        id_resultado:
        resultado.insertId


    };


};







const obtenerResultadosEstudiante =
async(idEstudiante)=>{


    const [resultados] =

    await pool.query(

    `
    SELECT


    r.id_resultado,


    e.tipo,


    e.descripcion,


    c.titulo AS contenido,


    r.puntaje,


    r.tiempo,


    r.fecha



    FROM resultado_ejercicio r



    INNER JOIN ejercicio e


    ON r.id_ejercicio =
    e.id_ejercicio



    INNER JOIN contenido c


    ON e.id_contenido =
    c.id_contenido



    WHERE r.id_estudiante = ?



    ORDER BY r.fecha DESC


    `,


    [

        idEstudiante

    ]

    );



    return resultados;


};





module.exports={


guardarResultado,

obtenerResultadosEstudiante


};