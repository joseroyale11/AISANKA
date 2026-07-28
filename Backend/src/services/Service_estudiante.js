const pool = require('../config/db');



const crearEstudiante = async (
    datos,
    idUsuarioDocente
) => {


    const conexion =
    await pool.getConnection();


    try {


        await conexion.beginTransaction();


        const {

            estudiante,
            padre,
            matricula,
            id_condicion

        } = datos;



        const password =
        'MINED2026*';



        // VALIDAR DOCENTE

        const [docente] =
        await conexion.query(
            `
            SELECT id_docente
            FROM docente
            WHERE id_usuario = ?
            `,
            [
                idUsuarioDocente
            ]
        );


        if(docente.length === 0){

            throw new Error(
                'Docente no encontrado'
            );

        }


        const idDocente =
        docente[0].id_docente;



  

        const [usuarioExiste] =
        await conexion.query(
            `
            SELECT id_usuario
            FROM usuarios
            WHERE correo = ?
            `,
            [
                estudiante.correo
            ]
        );


        if(usuarioExiste.length > 0){

            throw new Error(
                'El correo ya existe'
            );

        }





        const [usuario] =
        await conexion.query(
            `
            INSERT INTO usuarios
            (
                correo,
                password,
                rol
            )
            VALUES
            (?,?,?)
            `,
            [
                estudiante.correo,
                password,
                'Estudiante'
            ]
        );


        const idUsuario =
        usuario.insertId;



      


        const [nuevoEstudiante] =
        await conexion.query(
            `
            INSERT INTO estudiante
            (
                id_usuario,
                primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                correo,
                fecha_nacimiento,
                sexo,
                idioma_materno,
                acceso_internet,
                tipo_dispositivo,
                codigo_mined
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?)
            `,
            [

                idUsuario,

                estudiante.primer_nombre,

                estudiante.segundo_nombre || null,

                estudiante.primer_apellido,

                estudiante.segundo_apellido || null,

                estudiante.correo,

                estudiante.fecha_nacimiento,

                estudiante.sexo,

                estudiante.idioma_materno,

                estudiante.acceso_internet,

                estudiante.tipo_dispositivo,

                estudiante.codigo_mined

            ]
        );


        const idEstudiante =
        nuevoEstudiante.insertId;




  

        await conexion.query(
            `
            INSERT INTO estudiante_docente
            (
                id_docente,
                id_estudiante
            )
            VALUES (?,?)
            `,
            [
                idDocente,
                idEstudiante
            ]
        );





const [escuela] =
await conexion.query(
`
SELECT id_escuela
FROM aula
WHERE id_aula = ?
`,
[
    matricula.id_aula
]
);


if(escuela.length === 0){

    throw new Error(
        'El aula no existe'
    );

}


const idEscuela =
escuela[0].id_escuela;



const [nuevoPadre] =
await conexion.query(
`
INSERT INTO padre
(
    cedula,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    telefono,
    id_idioma,
    id_escuela
)
VALUES
(?,?,?,?,?,?,?,?)
`,
[

    padre.cedula,

    padre.primer_nombre,

    padre.segundo_nombre || null,

    padre.primer_apellido,

    padre.segundo_apellido || null,

    padre.telefono,

    padre.id_idioma,

    idEscuela

]
);



const idPadre =
nuevoPadre.insertId;





        await conexion.query(
            `
            INSERT INTO padre_estudiante
            (
                id_padre,
                id_estudiante,
                parentesco
            )
            VALUES
            (?,?,?)
            `,
            [

                idPadre,

                idEstudiante,

                padre.parentesco

            ]
        );






        await conexion.query(
            `
            INSERT INTO matricula
            (
                id_estudiante,
                id_aula,
                anio_lectivo
            )
            VALUES
            (?,?,?)
            `,
            [

                idEstudiante,

                matricula.id_aula,

                matricula.anio_lectivo

            ]
        );







        if(id_condicion){


            await conexion.query(
                `
                INSERT INTO estudiante_condicion
                (
                    id_estudiante,
                    id_condicion
                )
                VALUES
                (?,?)
                `,
                [

                    idEstudiante,

                    id_condicion

                ]
            );

        }



        await conexion.commit();



        return {

            mensaje:
            'Estudiante creado correctamente',

            id_estudiante:
            idEstudiante

        };



    } catch(error){


        await conexion.rollback();

        throw error;


    } finally {


        conexion.release();

    }


};






const obtenerEstudiantes =
async(idUsuario)=>{


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


    if(docente.length===0){

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

g.nombre AS grado,

a.nombre AS aula,

m.nombre AS modalidad,

t.nombre AS turno,

es.nombre AS escuela,

CONCAT(
p.primer_nombre,
' ',
p.primer_apellido
)
AS tutor,


c.nombre AS condicion



FROM estudiante e


INNER JOIN estudiante_docente ed

ON e.id_estudiante =
ed.id_estudiante



INNER JOIN matricula mat

ON e.id_estudiante =
mat.id_estudiante



INNER JOIN aula a

ON mat.id_aula =
a.id_aula



INNER JOIN grado g

ON a.id_grado =
g.id_grado



INNER JOIN modalidad m

ON a.id_modalidad =
m.id_modalidad



INNER JOIN turno t

ON a.id_turno =
t.id_turno



INNER JOIN escuela es

ON a.id_escuela =
es.id_escuela



LEFT JOIN padre_estudiante pe

ON e.id_estudiante =
pe.id_estudiante



LEFT JOIN padre p

ON pe.id_padre =
p.id_padre



LEFT JOIN estudiante_condicion ec

ON e.id_estudiante =
ec.id_estudiante



LEFT JOIN condicion c

ON ec.id_condicion =
c.id_condicion



WHERE ed.id_docente = ?


ORDER BY

e.primer_nombre,

e.primer_apellido

`,
[
idDocente
]
);

    return estudiantes;


};




const verificarPropietarioEstudiante =
async(
idUsuario,
idEstudiante
)=>{


    const [resultado] =
    await pool.query(
        `
        SELECT ed.id_estudiante_docente

        FROM estudiante_docente ed

        INNER JOIN docente d

        ON ed.id_docente=d.id_docente

        WHERE d.id_usuario=?

        AND ed.id_estudiante=?
        `,
        [
            idUsuario,
            idEstudiante
        ]
    );


    return resultado.length>0;


};






const obtenerPorId =
async(
idUsuario,
idEstudiante
)=>{


    const permitido =
    await verificarPropietarioEstudiante(
        idUsuario,
        idEstudiante
    );


    if(!permitido){

        throw new Error(
            'No tiene acceso'
        );

    }



    const [estudiante] =
    await pool.query(
        `
        SELECT *
        FROM estudiante
        WHERE id_estudiante=?
        `,
        [
            idEstudiante
        ]
    );


    return estudiante[0];

};





const actualizarEstudiante =
async(
idUsuario,
idEstudiante,
datos
)=>{


    const permitido =
    await verificarPropietarioEstudiante(
        idUsuario,
        idEstudiante
    );


    if(!permitido){

        throw new Error(
            'No tiene acceso a este estudiante'
        );

    }



    const conexion =
    await pool.getConnection();


    try{


        await conexion.beginTransaction();



        const {

            estudiante,
            padre,
            matricula,
            id_condicion

        } = datos;




        await conexion.query(

        `
        UPDATE estudiante

        SET

        primer_nombre=?,
        segundo_nombre=?,
        primer_apellido=?,
        segundo_apellido=?,
        fecha_nacimiento=?,
        sexo=?,
        idioma_materno=?,
        acceso_internet=?,
        tipo_dispositivo=?,
        codigo_mined=?


        WHERE id_estudiante=?

        `,

        [

        estudiante.primer_nombre,

        estudiante.segundo_nombre || null,

        estudiante.primer_apellido,

        estudiante.segundo_apellido || null,

        estudiante.fecha_nacimiento,

        estudiante.sexo,

        estudiante.idioma_materno,

        estudiante.acceso_internet,

        estudiante.tipo_dispositivo,

        estudiante.codigo_mined,

        idEstudiante

        ]

        );






        const [relacionPadre] =
        await conexion.query(

        `
        SELECT id_padre

        FROM padre_estudiante

        WHERE id_estudiante=?

        `,

        [
            idEstudiante
        ]

        );



        if(relacionPadre.length){


            await conexion.query(

            `
            UPDATE padre

            SET

            primer_nombre=?,
            segundo_nombre=?,
            primer_apellido=?,
            segundo_apellido=?,
            telefono=?,
            id_idioma=?


            WHERE id_padre=?

            `,


            [

            padre.primer_nombre,

            padre.segundo_nombre || null,

            padre.primer_apellido,

            padre.segundo_apellido || null,

            padre.telefono,

            padre.id_idioma,

            relacionPadre[0].id_padre

            ]

            );


        }






        await conexion.query(

        `
        UPDATE matricula

        SET

        id_aula=?,

        anio_lectivo=?


        WHERE id_estudiante=?

        `,


        [

        matricula.id_aula,

        matricula.anio_lectivo,

        idEstudiante

        ]

        );






 

        if(id_condicion){


            await conexion.query(

            `
            UPDATE estudiante_condicion

            SET id_condicion=?

            WHERE id_estudiante=?

            `,


            [

            id_condicion,

            idEstudiante

            ]

            );


        }



        await conexion.commit();



        return {


            mensaje:

            'Estudiante actualizado correctamente'


        };




    }catch(error){


        await conexion.rollback();

        throw error;


    }finally{


        conexion.release();

    }


};



const eliminarEstudiante =
async(
idUsuario,
idEstudiante
)=>{


    const permitido =
    await verificarPropietarioEstudiante(
        idUsuario,
        idEstudiante
    );


    if(!permitido){

        throw new Error(
            'No tiene acceso a este estudiante'
        );

    }



    await pool.query(

    `
    UPDATE estudiante

    SET activo='No'

    WHERE id_estudiante=?

    `,

    [
        idEstudiante
    ]

    );



    return {

        mensaje:
        'Estudiante desactivado correctamente'

    };


};





module.exports={

crearEstudiante,

obtenerEstudiantes,

obtenerPorId,

actualizarEstudiante,

eliminarEstudiante

};