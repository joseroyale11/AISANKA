const pool = require('../config/db');

const obtenerMisAulas = async (idUsuario) => {

    const [docente] = await pool.query(
        `
        SELECT id_docente
        FROM docente
        WHERE id_usuario = ?
        `,
        [idUsuario]
    );

    if (docente.length === 0) {
        throw new Error('Docente no encontrado');
    }

    const idDocente = docente[0].id_docente;

    const [aulas] = await pool.query(
        `
        SELECT

            a.id_aula,
            a.nombre AS aula,
            a.anio_lectivo,

            g.nombre AS grado,

            m.nombre AS modalidad,

            t.nombre AS turno,

            e.nombre AS escuela

        FROM aula a

        INNER JOIN grado g
            ON a.id_grado = g.id_grado

        INNER JOIN modalidad m
            ON a.id_modalidad = m.id_modalidad

        INNER JOIN turno t
            ON a.id_turno = t.id_turno

        INNER JOIN escuela e
            ON a.id_escuela = e.id_escuela

        WHERE a.id_docente = ?

        ORDER BY
            g.nombre,
            a.nombre
        `,
        [idDocente]
    );

    return aulas;
};

module.exports = {
    obtenerMisAulas
};