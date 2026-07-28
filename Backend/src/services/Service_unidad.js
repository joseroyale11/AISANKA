const pool = require('../config/db');



const obtenerUnidades = async()=>{


    const [unidades] =
    await pool.query(
    `
    SELECT

    u.id_unidad,

    i.nombre AS idioma,

    g.nombre AS grado,

    u.numero_unidad,

    u.nombre,

    u.descripcion


    FROM unidad u


    INNER JOIN idioma i

    ON u.id_idioma =
    i.id_idioma


    INNER JOIN grado g

    ON u.id_grado =
    g.id_grado


    ORDER BY

    i.nombre,

    u.numero_unidad

    `
    );


    return unidades;


};






const obtenerContenidoUnidad =
async(idUnidad)=>{


    const [contenido] =
    await pool.query(

    `
    SELECT *

    FROM contenido

    WHERE id_unidad = ?

    ORDER BY id_contenido

    `,

    [
        idUnidad
    ]

    );


    return contenido;


};




module.exports={


obtenerUnidades,

obtenerContenidoUnidad


};