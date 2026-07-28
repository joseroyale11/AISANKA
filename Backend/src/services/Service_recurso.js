const pool = require('../config/db');




const obtenerRecursosContenido = async(
idContenido
)=>{


    const [recursos] =
    await pool.query(

    `
    SELECT


    id_recurso,

    id_contenido,

    tipo,

    titulo,

    url,

    descripcion,

    fecha_creacion


    FROM recurso_multimedia


    WHERE id_contenido = ?


    ORDER BY id_recurso


    `,

    [
        idContenido
    ]

    );



    return recursos;


};





module.exports = {


obtenerRecursosContenido


};