export default function iniciarInicio() {
"use strict";

const CONFIG_AISANKA = {
    docente: {
        nombre: "Henrry Montes",
        correo: "henrrymontes@gmail.com",
        rol: "Docente responsable",
        centro: "CPACS",
        municipio: "Jinotega",
        departamento: "Jinotega",
        grado: "6to",
        idiomaActual: "Chino, Miskito, Español, Mayangna, Inglés",
        estudiantesAsignados: 5
    },

    idiomas: [
        "Español",
        "Inglés",
        "Chino",
        "Miskito",
        "Mayangna"
    ],

    condiciones: [
        "Autismo",
        "Dificultad visual",
        "Dificultad auditiva",
        "TDAH",
        "Neurotípico"
    ],

    idiomaActual: "Chino",

    fondoPDF: "/recursos/img/fondo_pdf.png",

    almacenamiento: "estudiantesAISANKA",

    estudianteEditar: "estudianteEditar",

    sesion: "docenteSesion"
};



const estudiantesIniciales = [
    {
        id: 1,
        idEstudiante: 1,
        codigoMined: "MINED-0001",

        primerNombre: "Bengee",
        segundoNombre: "José",
        primerApellido: "Matamoros",
        segundoApellido: "García",

        correo: "bengee.matamoros@aisanka.edu.ni",
        fechaNacimiento: "2014-05-12",
        sexo: "M",

        accesoInternet: "Sí",
        tipoDispositivo: "Computadora",

        estado: "Activo",
        fechaRegistro: "2026-01-15",

        escuela: "CPACS",
        comunidad: "Jinotega",
        municipio: "Jinotega",
        departamento: "Jinotega",

        grado: "6to",
        aula: "A",
        idAula: 1,

        modalidad: "Diaria",
        turno: "Matutino",
        anioLectivo: "2026",

        docente: "Henrry Montes",
        estadoMatricula: "Activa",

        responsable: "María Matamoros",
        cedula: "000-000000-0000A",

        responsablePrimerNombre: "María",
        responsableSegundoNombre: "",
        responsablePrimerApellido: "Matamoros",
        responsableSegundoApellido: "",

        telefono: "8888-0001",
        parentesco: "Madre",
        idiomaResponsable: "Español",

        idIdioma: 5,
        idioma: "Mayangna",

        idCondicion: 5,
        condicion: "Neurotípico",

        idIdiomaResponsable: 1,

        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",

        discapacidad: "Neurotípico",

        avance: 0,
        ejercicios: 0
    },

    {
        id: 2,
        idEstudiante: 2,
        codigoMined: "MINED-0002",

        primerNombre: "Marbell",
        segundoNombre: "Lucía",
        primerApellido: "Treminio",
        segundoApellido: "López",

        correo: "marbell.treminio@aisanka.edu.ni",
        fechaNacimiento: "2015-08-20",
        sexo: "F",

        accesoInternet: "Sí",
        tipoDispositivo: "Tablet",

        estado: "Activo",
        fechaRegistro: "2026-01-16",

        escuela: "CPACS",
        comunidad: "Jinotega",
        municipio: "Jinotega",
        departamento: "Jinotega",

        grado: "6to",
        aula: "B",
        idAula: 2,

        modalidad: "Diaria",
        turno: "Matutino",
        anioLectivo: "2026",

        docente: "Henrry Montes",
        estadoMatricula: "Activa",

        responsable: "Carlos Treminio",
        cedula: "000-000000-0000B",

        responsablePrimerNombre: "Carlos",
        responsableSegundoNombre: "",
        responsablePrimerApellido: "Treminio",
        responsableSegundoApellido: "López",

        telefono: "8888-0002",
        parentesco: "Padre",
        idiomaResponsable: "Español",

        idIdioma: 4,
        idioma: "Miskito",

        idCondicion: 3,
        condicion: "Dificultad auditiva",

        idIdiomaResponsable: 1,

        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",

        discapacidad: "Dificultad auditiva",

        avance: 0,
        ejercicios: 0
    },

    {
        id: 3,
        idEstudiante: 3,
        codigoMined: "MINED-0003",

        primerNombre: "Héctor",
        segundoNombre: "Daniel",
        primerApellido: "Cruz",
        segundoApellido: "Martínez",

        correo: "hector.cruz@aisanka.edu.ni",
        fechaNacimiento: "2013-03-04",
        sexo: "M",

        accesoInternet: "No",
        tipoDispositivo: "Computadora",

        estado: "Activo",
        fechaRegistro: "2026-01-18",

        escuela: "CPACS",
        comunidad: "Jinotega",
        municipio: "Jinotega",
        departamento: "Jinotega",

        grado: "6to",
        aula: "A",
        idAula: 1,

        modalidad: "Diaria",
        turno: "Matutino",
        anioLectivo: "2026",

        docente: "Henrry Montes",
        estadoMatricula: "Activa",

        responsable: "Ana Cruz",
        cedula: "000-000000-0000C",

        responsablePrimerNombre: "Ana",
        responsableSegundoNombre: "",
        responsablePrimerApellido: "Cruz",
        responsableSegundoApellido: "Martínez",

        telefono: "8888-0003",
        parentesco: "Madre",
        idiomaResponsable: "Español",

        idIdioma: 1,
        idioma: "Español",

        idCondicion: 2,
        condicion: "Dificultad visual",

        idIdiomaResponsable: 1,

        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",

        discapacidad: "Dificultad visual",

        avance: 0,
        ejercicios: 0
    },

    {
        id: 4,
        idEstudiante: 4,
        codigoMined: "MINED-0004",

        primerNombre: "José",
        segundoNombre: "Antonio",
        primerApellido: "Herrera",
        segundoApellido: "Pérez",

        correo: "jose.herrera@aisanka.edu.ni",
        fechaNacimiento: "2014-11-19",
        sexo: "M",

        accesoInternet: "Sí",
        tipoDispositivo: "Teléfono",

        estado: "Activo",
        fechaRegistro: "2026-01-20",

        escuela: "CPACS",
        comunidad: "Jinotega",
        municipio: "Jinotega",
        departamento: "Jinotega",

        grado: "6to",
        aula: "A",
        idAula: 1,

        modalidad: "Diaria",
        turno: "Matutino",
        anioLectivo: "2026",

        docente: "Henrry Montes",
        estadoMatricula: "Activa",

        responsable: "Pedro Herrera",
        cedula: "000-000000-0000D",

        responsablePrimerNombre: "Pedro",
        responsableSegundoNombre: "",
        responsablePrimerApellido: "Herrera",
        responsableSegundoApellido: "Pérez",

        telefono: "8888-0004",
        parentesco: "Padre",
        idiomaResponsable: "Español",

        idIdioma: 2,
        idioma: "Inglés",

        idCondicion: 4,
        condicion: "TDAH",

        idIdiomaResponsable: 1,

        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",

        discapacidad: "TDAH",

        avance: 0,
        ejercicios: 0
    },

    {
        id: 5,
        idEstudiante: 5,
        codigoMined: "MINED-0005",

        primerNombre: "Marling",
        segundoNombre: "Isabel",
        primerApellido: "Granados",
        segundoApellido: "Rodríguez",

        correo: "marling.granados@aisanka.edu.ni",
        fechaNacimiento: "2013-07-15",
        sexo: "F",

        accesoInternet: "Sí",
        tipoDispositivo: "Computadora",

        estado: "Activo",
        fechaRegistro: "2026-01-21",

        escuela: "CPACS",
        comunidad: "Jinotega",
        municipio: "Jinotega",
        departamento: "Jinotega",

        grado: "6to",
        aula: "B",
        idAula: 2,

        modalidad: "Diaria",
        turno: "Matutino",
        anioLectivo: "2026",

        docente: "Henrry Montes",
        estadoMatricula: "Activa",

        responsable: "Rosa Rodríguez",
        cedula: "000-000000-0000E",

        responsablePrimerNombre: "Rosa",
        responsableSegundoNombre: "",
        responsablePrimerApellido: "Rodríguez",
        responsableSegundoApellido: "",

        telefono: "8888-0005",
        parentesco: "Madre",
        idiomaResponsable: "Español",

        idIdioma: 3,
        idioma: "Chino",

        idCondicion: 1,
        condicion: "Autismo",

        idIdiomaResponsable: 1,

        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",

        discapacidad: "Autismo",

        avance: 0,
        ejercicios: 0
    }
];


let estudiantes = [];

let estudianteSeleccionado = null;

let graficaAvance = null;

let graficaIdiomas = null;

let chartCargando = null;

let tablaEstudiantes;

let buscadorEstudiantes;

let botonLimpiarBusqueda;

let sinResultados;

let totalEstudiantes;

let avancePromedio;

let ejerciciosRealizados;



function obtenerElemento(id) {
    return document.getElementById(id);
}


function escaparHTML(valor) {
    if (valor === null || valor === undefined) {
        return "";
    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) {
        return 0;
    }

    const nacimiento =
        new Date(fechaNacimiento + "T00:00:00");

    const hoy = new Date();

    let edad =
        hoy.getFullYear() -
        nacimiento.getFullYear();

    const diferenciaMes =
        hoy.getMonth() -
        nacimiento.getMonth();

    if (
        diferenciaMes < 0 ||
        (
            diferenciaMes === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return edad;
}


function formatearFecha(fecha) {
    if (!fecha) {
        return "";
    }

    const fechaObjeto =
        new Date(fecha + "T00:00:00");

    if (Number.isNaN(fechaObjeto.getTime())) {
        return fecha;
    }

    return fechaObjeto.toLocaleDateString(
        "es-NI",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}



function normalizarIdioma(idioma) {
    const texto =
        String(idioma || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    if (texto === "espanol") {
        return "Español";
    }

    if (
        texto === "ingles" ||
        texto === "english"
    ) {
        return "Inglés";
    }

    if (texto === "chino") {
        return "Chino";
    }

    if (texto === "miskito") {
        return "Miskito";
    }

    if (texto === "mayangna") {
        return "Mayangna";
    }

    return "Español";
}



function normalizarCondicion(condicion) {
    const texto =
        String(condicion || "")
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    if (
        texto === "autismo"
    ) {
        return "Autismo";
    }

    if (
        texto === "visual" ||
        texto === "dificultad visual"
    ) {
        return "Dificultad visual";
    }

    if (
        texto === "auditivo" ||
        texto === "auditiva" ||
        texto === "dificultad auditiva"
    ) {
        return "Dificultad auditiva";
    }

    if (
        texto === "tdha" ||
        texto === "tdah"
    ) {
        return "TDAH";
    }

    if (
        texto === "normal" ||
        texto === "neurotipico" ||
        texto === "neurotípico"
    ) {
        return "Neurotípico";
    }

    return "Neurotípico";
}



function obtenerValor(objeto, ...propiedades) {
    for (const propiedad of propiedades) {
        if (
            objeto[propiedad] !== undefined &&
            objeto[propiedad] !== null &&
            objeto[propiedad] !== ""
        ) {
            return objeto[propiedad];
        }
    }

    return "";
}



function normalizarEstudiante(estudiante, referencia = {}) {
    const estudianteNormalizado = {
        ...referencia,
        ...estudiante
    };

    const primerNombre =
        obtenerValor(
            estudianteNormalizado,
            "primerNombre",
            "primer_nombre"
        );

    const segundoNombre =
        obtenerValor(
            estudianteNormalizado,
            "segundoNombre",
            "segundo_nombre"
        );

    const primerApellido =
        obtenerValor(
            estudianteNormalizado,
            "primerApellido",
            "primer_apellido"
        );

    const segundoApellido =
        obtenerValor(
            estudianteNormalizado,
            "segundoApellido",
            "segundo_apellido"
        );

    const codigoMined =
        obtenerValor(
            estudianteNormalizado,
            "codigoMined",
            "codigo_mined"
        );

    const correo =
        obtenerValor(
            estudianteNormalizado,
            "correo",
            "email"
        );

    const fechaNacimiento =
        obtenerValor(
            estudianteNormalizado,
            "fechaNacimiento",
            "fecha_nacimiento"
        );

    const sexo =
        obtenerValor(
            estudianteNormalizado,
            "sexo"
        );

    const accesoInternet =
        obtenerValor(
            estudianteNormalizado,
            "accesoInternet",
            "acceso_internet"
        );

    const tipoDispositivo =
        obtenerValor(
            estudianteNormalizado,
            "tipoDispositivo",
            "tipo_dispositivo"
        );

    const fechaRegistro =
        obtenerValor(
            estudianteNormalizado,
            "fechaRegistro",
            "fecha_registro"
        );

    const idioma =
        normalizarIdioma(
            obtenerValor(
                estudianteNormalizado,
                "idioma"
            )
        );

    const idIdioma =
        obtenerValor(
            estudianteNormalizado,
            "idIdioma",
            "id_idioma"
        );

    const condicion =
        normalizarCondicion(
            obtenerValor(
                estudianteNormalizado,
                "condicion",
                "discapacidad"
            )
        );

    const idCondicion =
        obtenerValor(
            estudianteNormalizado,
            "idCondicion",
            "id_condicion"
        );

    const aula =
        obtenerValor(
            estudianteNormalizado,
            "aula",
            "seccion"
        );

    const idAula =
        obtenerValor(
            estudianteNormalizado,
            "idAula",
            "id_aula"
        );

    const modalidad =
        obtenerValor(
            estudianteNormalizado,
            "modalidad"
        ) || "Diaria";

    const turno =
        obtenerValor(
            estudianteNormalizado,
            "turno"
        ) || "Matutino";

    const anioLectivo =
        obtenerValor(
            estudianteNormalizado,
            "anioLectivo",
            "anio_lectivo"
        ) || "2026";

    const responsablePrimerNombre =
        obtenerValor(
            estudianteNormalizado,
            "responsablePrimerNombre",
            "responsable_primer_nombre"
        );

    const responsableSegundoNombre =
        obtenerValor(
            estudianteNormalizado,
            "responsableSegundoNombre",
            "responsable_segundo_nombre"
        );

    const responsablePrimerApellido =
        obtenerValor(
            estudianteNormalizado,
            "responsablePrimerApellido",
            "responsable_primer_apellido"
        );

    const responsableSegundoApellido =
        obtenerValor(
            estudianteNormalizado,
            "responsableSegundoApellido",
            "responsable_segundo_apellido"
        );

    const responsable =
        obtenerValor(
            estudianteNormalizado,
            "responsable"
        ) ||
        [
            responsablePrimerNombre,
            responsableSegundoNombre,
            responsablePrimerApellido,
            responsableSegundoApellido
        ]
            .filter(Boolean)
            .join(" ");

    const cedula =
        obtenerValor(
            estudianteNormalizado,
            "cedula"
        );

    const telefono =
        obtenerValor(
            estudianteNormalizado,
            "telefono"
        );

    const parentesco =
        obtenerValor(
            estudianteNormalizado,
            "parentesco"
        );

    const idiomaResponsable =
        normalizarIdioma(
            obtenerValor(
                estudianteNormalizado,
                "idiomaResponsable",
                "idioma_responsable"
            )
        );

    const idIdiomaResponsable =
        obtenerValor(
            estudianteNormalizado,
            "idIdiomaResponsable",
            "id_idioma_responsable"
        );

    const id =
        obtenerValor(
            estudianteNormalizado,
            "id",
            "idEstudiante",
            "id_estudiante"
        );

    return {
        ...estudianteNormalizado,

        id: id || codigoMined,

        idEstudiante:
            id ||
            estudianteNormalizado.idEstudiante ||
            estudianteNormalizado.id_estudiante ||
            codigoMined,

        codigoMined,

        primerNombre,

        segundoNombre,

        primerApellido,

        segundoApellido,

        correo,

        fechaNacimiento,

        sexo,

        accesoInternet,

        tipoDispositivo,

        estado:
            obtenerValor(
                estudianteNormalizado,
                "estado",
                "activo"
            ) || "Activo",

        fechaRegistro:
            fechaRegistro ||
            new Date()
                .toISOString()
                .split("T")[0],

        escuela:
            obtenerValor(
                estudianteNormalizado,
                "escuela"
            ) || "CPACS",

        comunidad:
            obtenerValor(
                estudianteNormalizado,
                "comunidad"
            ) || "Jinotega",

        municipio:
            obtenerValor(
                estudianteNormalizado,
                "municipio"
            ) || "Jinotega",

        departamento:
            obtenerValor(
                estudianteNormalizado,
                "departamento"
            ) || "Jinotega",

        grado:
            obtenerValor(
                estudianteNormalizado,
                "grado"
            ) || "6to",

        aula,

        idAula,

        modalidad,

        turno,

        anioLectivo,

        docente:
            obtenerValor(
                estudianteNormalizado,
                "docente"
            ) || "Henrry Montes",

        estadoMatricula:
            obtenerValor(
                estudianteNormalizado,
                "estadoMatricula"
            ) || "Activa",

        responsable,

        responsablePrimerNombre,

        responsableSegundoNombre,

        responsablePrimerApellido,

        responsableSegundoApellido,

        cedula,

        telefono,

        parentesco,

        idiomaResponsable,

        idIdiomaResponsable,

        escuelaResponsable:
            obtenerValor(
                estudianteNormalizado,
                "escuelaResponsable"
            ) || "CPACS",

        responsablePrincipal:
            obtenerValor(
                estudianteNormalizado,
                "responsablePrincipal"
            ) || "Sí",

        idioma,

        idIdioma,

        condicion,

        idCondicion,

        discapacidad: condicion,

        avance:
            Number(
                obtenerValor(
                    estudianteNormalizado,
                    "avance"
                )
            ) || 0,

        ejercicios:
            Number(
                obtenerValor(
                    estudianteNormalizado,
                    "ejercicios"
                )
            ) || 0
    };
}


function normalizarEstudiantes(lista) {
    return lista.map(estudiante =>
        normalizarEstudiante(estudiante)
    );
}



function obtenerIdentificadorEstudiante(estudiante) {
    const codigo =
        obtenerValor(
            estudiante,
            "codigoMined",
            "codigo_mined"
        );

    if (codigo) {
        return `codigo:${String(codigo).trim().toLowerCase()}`;
    }

    const id =
        obtenerValor(
            estudiante,
            "id",
            "idEstudiante",
            "id_estudiante"
        );

    if (id !== "") {
        return `id:${String(id)}`;
    }

    const nombre = [
        obtenerValor(
            estudiante,
            "primerNombre",
            "primer_nombre"
        ),
        obtenerValor(
            estudiante,
            "primerApellido",
            "primer_apellido"
        ),
        obtenerValor(
            estudiante,
            "fechaNacimiento",
            "fecha_nacimiento"
        )
    ]
        .join("|")
        .toLowerCase();

    return `nombre:${nombre}`;
}



function combinarEstudiantes(
    iniciales,
    guardados
) {
    const mapa =
        new Map();

    iniciales.forEach(
        estudiante => {
            const normalizado =
                normalizarEstudiante(
                    estudiante
                );

            mapa.set(
                obtenerIdentificadorEstudiante(
                    normalizado
                ),
                normalizado
            );
        }
    );

    guardados.forEach(
        estudiante => {
            const normalizado =
                normalizarEstudiante(
                    estudiante
                );

            const identificador =
                obtenerIdentificadorEstudiante(
                    normalizado
                );

            const anterior =
                mapa.get(
                    identificador
                );

            if (anterior) {
                mapa.set(
                    identificador,
                    normalizarEstudiante(
                        normalizado,
                        anterior
                    )
                );
            } else {
                mapa.set(
                    identificador,
                    normalizado
                );
            }
        }
    );

    return Array.from(
        mapa.values()
    );
}



function obtenerEstudiantes() {
    let guardados = [];

    try {
        const datos =
            localStorage.getItem(
                CONFIG_AISANKA.almacenamiento
            );

        if (datos) {
            const datosParseados =
                JSON.parse(datos);

            if (
                Array.isArray(
                    datosParseados
                )
            ) {
                guardados =
                    datosParseados;
            }
        }
    } catch (error) {
        console.error(
            "Error al leer los estudiantes guardados:",
            error
        );
    }


    const listaFinal =
        combinarEstudiantes(
            estudiantesIniciales,
            guardados
        );

    guardarEstudiantes(
        listaFinal
    );

    return listaFinal;
}


function guardarEstudiantes(
    lista = estudiantes
) {
    try {
        localStorage.setItem(
            CONFIG_AISANKA.almacenamiento,
            JSON.stringify(lista)
        );
    } catch (error) {
        console.error(
            "Error al guardar estudiantes:",
            error
        );
    }
}



function inicializarElementos() {
    tablaEstudiantes =
        obtenerElemento(
            "tablaEstudiantes"
        );

    buscadorEstudiantes =
        obtenerElemento(
            "buscadorEstudiantes"
        );

    botonLimpiarBusqueda =
        obtenerElemento(
            "botonLimpiarBusqueda"
        );

    sinResultados =
        obtenerElemento(
            "sinResultados"
        );

    totalEstudiantes =
        obtenerElemento(
            "totalEstudiantes"
        );

    avancePromedio =
        obtenerElemento(
            "avancePromedio"
        );

    ejerciciosRealizados =
        obtenerElemento(
            "ejerciciosRealizados"
        );
}



function mostrarEstudiantes(
    lista = estudiantes
) {
    if (!tablaEstudiantes) {
        return;
    }

    tablaEstudiantes.innerHTML = "";

    if (!lista.length) {
        if (sinResultados) {
            sinResultados.style.display =
                "flex";
        }

        return;
    }

    if (sinResultados) {
        sinResultados.style.display =
            "none";
    }

    lista.forEach(estudiante => {
        const fila =
            document.createElement(
                "tr"
            );

        const nombreCompleto = [
            estudiante.primerNombre,
            estudiante.segundoNombre,
            estudiante.primerApellido,
            estudiante.segundoApellido
        ]
            .filter(Boolean)
            .join(" ");

        fila.innerHTML = `
            <td>
                <div class="informacion-estudiante">
                    <div class="avatar-estudiante">
                        <i class="fa-solid fa-user"></i>
                    </div>

                    <div class="nombre-estudiante">
                        <strong>
                            ${escaparHTML(nombreCompleto)}
                        </strong>

                        <span>
                            ${escaparHTML(
                                estudiante.codigoMined
                            )}
                        </span>
                    </div>
                </div>
            </td>

            <td>
                ${escaparHTML(
                    estudiante.grado
                )}
            </td>

            <td>
                ${escaparHTML(
                    estudiante.condicion
                )}
            </td>

            <td>
                ${escaparHTML(
                    estudiante.idioma
                )}
            </td>

            <td>
                <div class="contenedor-avance">
                    <div class="barra-avance">
                        <div
                            class="progreso-avance"
                            style="width:${Math.min(
                                100,
                                Math.max(
                                    0,
                                    estudiante.avance
                                )
                            )}%"
                        ></div>
                    </div>

                    <span class="porcentaje-avance">
                        ${estudiante.avance}%
                    </span>
                </div>
            </td>

            <td>
                <span class="estado activo">
                    ${escaparHTML(
                        estudiante.estado
                    )}
                </span>
            </td>

            <td>
                <div class="acciones-estudiante">

                    <button
                        type="button"
                        class="boton-accion boton-ver"
                        title="Ver estudiante"
                        onclick="verEstudiante(${JSON.stringify(
                            estudiante.id
                        )})"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                    <button
                        type="button"
                        class="boton-accion boton-editar"
                        title="Editar estudiante"
                        onclick="editarEstudiante(${JSON.stringify(
                            estudiante.id
                        )})"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        class="boton-accion boton-eliminar"
                        title="Eliminar estudiante"
                        onclick="prepararEliminar(${JSON.stringify(
                            estudiante.id
                        )})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </td>
        `;

        tablaEstudiantes.appendChild(
            fila
        );
    });
}



function configurarBusqueda() {
    if (!buscadorEstudiantes) {
        return;
    }

    buscadorEstudiantes.addEventListener(
        "input",
        function() {
            const texto =
                this.value
                    .trim()
                    .toLowerCase();

            if (botonLimpiarBusqueda) {
                botonLimpiarBusqueda.style.display =
                    texto
                        ? "flex"
                        : "none";
            }

            if (!texto) {
                mostrarEstudiantes();

                return;
            }

            const resultados =
                estudiantes.filter(
                    estudiante => {
                        const nombreCompleto = [
                            estudiante.primerNombre,
                            estudiante.segundoNombre,
                            estudiante.primerApellido,
                            estudiante.segundoApellido
                        ]
                            .filter(Boolean)
                            .join(" ")
                            .toLowerCase();

                        return (
                            nombreCompleto.includes(
                                texto
                            ) ||

                            String(
                                estudiante.codigoMined
                            )
                                .toLowerCase()
                                .includes(texto) ||

                            String(
                                estudiante.condicion
                            )
                                .toLowerCase()
                                .includes(texto) ||

                            String(
                                estudiante.idioma
                            )
                                .toLowerCase()
                                .includes(texto) ||

                            String(
                                estudiante.aula
                            )
                                .toLowerCase()
                                .includes(texto) ||

                            String(
                                estudiante.correo
                            )
                                .toLowerCase()
                                .includes(texto)
                        );
                    }
                );

            mostrarEstudiantes(
                resultados
            );
        }
    );

    if (botonLimpiarBusqueda) {
        botonLimpiarBusqueda.addEventListener(
            "click",
            function() {
                buscadorEstudiantes.value =
                    "";

                botonLimpiarBusqueda.style.display =
                    "none";

                mostrarEstudiantes();

                buscadorEstudiantes.focus();
            }
        );
    }
}



function verEstudiante(id) {
    const estudiante =
        estudiantes.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!estudiante) {
        return;
    }

    estudianteSeleccionado =
        estudiante;

    const campos = {
        documentoNombre:
            [
                estudiante.primerNombre,
                estudiante.segundoNombre,
                estudiante.primerApellido,
                estudiante.segundoApellido
            ]
                .filter(Boolean)
                .join(" "),

        documentoId:
            estudiante.id,

        documentoMined:
            estudiante.codigoMined,

        documentoPrimerNombre:
            estudiante.primerNombre,

        documentoSegundoNombre:
            estudiante.segundoNombre,

        documentoPrimerApellido:
            estudiante.primerApellido,

        documentoSegundoApellido:
            estudiante.segundoApellido,

        documentoCorreo:
            estudiante.correo,

        documentoNacimiento:
            formatearFecha(
                estudiante.fechaNacimiento
            ),

        documentoEdad:
            calcularEdad(
                estudiante.fechaNacimiento
            ) + " años",

        documentoSexo:
            estudiante.sexo,

        documentoAccesoInternet:
            estudiante.accesoInternet,

        documentoDispositivo:
            estudiante.tipoDispositivo,

        documentoEstado:
            estudiante.estado,

        documentoRegistro:
            formatearFecha(
                estudiante.fechaRegistro
            ),

        documentoEscuela:
            estudiante.escuela,

        documentoComunidad:
            estudiante.comunidad ||
            "No registrada",

        documentoMunicipio:
            estudiante.municipio,

        documentoDepartamento:
            estudiante.departamento,

        documentoGrado:
            estudiante.grado,

        documentoAula:
            estudiante.aula,

        documentoModalidad:
            estudiante.modalidad,

        documentoTurno:
            estudiante.turno,

        documentoAnio:
            estudiante.anioLectivo,

        documentoDocente:
            estudiante.docente,

        documentoMatricula:
            estudiante.estadoMatricula,

        documentoResponsable:
            estudiante.responsable,

        documentoCedula:
            estudiante.cedula,

        documentoTelefono:
            estudiante.telefono,

        documentoParentesco:
            estudiante.parentesco,

        documentoIdiomaResponsable:
            estudiante.idiomaResponsable,

        documentoEscuelaResponsable:
            estudiante.escuelaResponsable,

        documentoResponsablePrincipal:
            estudiante.responsablePrincipal,

        documentoDiscapacidad:
            estudiante.condicion,

        documentoIdioma:
            estudiante.idioma,

        documentoAvance:
            estudiante.avance + "%",

        documentoEjercicios:
            estudiante.ejercicios
    };

    Object.keys(campos).forEach(
        idCampo => {
            const elemento =
                obtenerElemento(
                    idCampo
                );

            if (elemento) {
                elemento.textContent =
                    campos[idCampo];
            }
        }
    );

    const modal =
        obtenerElemento(
            "modalEstudiante"
        );

    if (modal) {
        modal.classList.add(
            "activo"
        );
    }
}


function cerrarDocumento() {
    const modal =
        obtenerElemento(
            "modalEstudiante"
        );

    if (modal) {
        modal.classList.remove(
            "activo"
        );
    }

    estudianteSeleccionado =
        null;
}



function editarEstudiante(id) {
    const estudiante =
        estudiantes.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!estudiante) {
        return;
    }

    localStorage.setItem(
        CONFIG_AISANKA.estudianteEditar,
        String(estudiante.id)
    );

    window.location.href =
        "/editar-estudiante";
}



function prepararEliminar(id) {
    const estudiante =
        estudiantes.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!estudiante) {
        return;
    }

    estudianteSeleccionado =
        estudiante;

    const nombreElemento =
        obtenerElemento(
            "nombreEliminar"
        );

    if (nombreElemento) {
        nombreElemento.textContent =
            [
                estudiante.primerNombre,
                estudiante.primerApellido
            ]
                .filter(Boolean)
                .join(" ");
    }

    const modal =
        obtenerElemento(
            "modalEliminar"
        );

    if (modal) {
        modal.classList.add(
            "activo"
        );

        return;
    }

    crearModalEliminar();
}


function crearModalEliminar() {
    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "modalEliminarDinamico";

    modal.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.55);
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:99999;
    `;

    const nombre =
        estudianteSeleccionado
            ? [
                estudianteSeleccionado.primerNombre,
                estudianteSeleccionado.primerApellido
            ]
                .filter(Boolean)
                .join(" ")
            : "";

    modal.innerHTML = `
        <div style="
            width:min(430px,90%);
            background:#ffffff;
            border-radius:18px;
            padding:30px;
            box-shadow:0 20px 60px rgba(0,0,0,.25);
            font-family:Arial,sans-serif;
        ">

            <div style="
                width:55px;
                height:55px;
                border-radius:50%;
                background:#f2eeee;
                display:flex;
                align-items:center;
                justify-content:center;
                margin:0 auto 18px;
            ">
                <i
                    class="fa-solid fa-trash"
                    style="
                        font-size:21px;
                        color:#b23b3b;
                    "
                ></i>
            </div>

            <h3 style="
                margin:0;
                text-align:center;
                color:#17352f;
            ">
                Confirmar eliminación
            </h3>

            <p style="
                text-align:center;
                color:#66736f;
                line-height:1.6;
                margin:15px 0 25px;
            ">
                ¿Seguro que deseas eliminar a
                <strong>
                    ${escaparHTML(nombre)}
                </strong>?
                <br>
                Esta acción eliminará al estudiante
                del panel actual.
            </p>

            <div style="
                display:flex;
                gap:10px;
                justify-content:center;
            ">

                <button
                    id="cancelarEliminarDinamico"
                    style="
                        border:1px solid #d6dcd9;
                        background:#fff;
                        padding:11px 22px;
                        border-radius:9px;
                        cursor:pointer;
                    "
                >
                    Cancelar
                </button>

                <button
                    id="confirmarEliminarDinamico"
                    style="
                        border:none;
                        background:#b23b3b;
                        color:white;
                        padding:11px 22px;
                        border-radius:9px;
                        cursor:pointer;
                    "
                >
                    Eliminar
                </button>

            </div>
        </div>
    `;

    document.body.appendChild(
        modal
    );

    const cancelar =
        obtenerElemento(
            "cancelarEliminarDinamico"
        );

    if (cancelar) {
        cancelar.onclick = () => {
            modal.remove();

            estudianteSeleccionado =
                null;
        };
    }

    const confirmar =
        obtenerElemento(
            "confirmarEliminarDinamico"
        );

    if (confirmar) {
        confirmar.onclick = () => {
            confirmarEliminacion();

            modal.remove();
        };
    }
}


function confirmarEliminacion() {
    if (!estudianteSeleccionado) {
        return;
    }

    estudiantes =
        estudiantes.filter(
            estudiante =>
                String(estudiante.id) !==
                String(
                    estudianteSeleccionado.id
                )
        );

    guardarEstudiantes();

    estudianteSeleccionado =
        null;

    mostrarEstudiantes();

    actualizarResumen();

    crearGraficas();
}



function actualizarResumen() {
    if (totalEstudiantes) {
        totalEstudiantes.textContent =
            estudiantes.length;
    }

    if (avancePromedio) {
        if (estudiantes.length) {
            const suma =
                estudiantes.reduce(
                    (
                        total,
                        estudiante
                    ) =>
                        total +
                        (
                            Number(
                                estudiante.avance
                            ) || 0
                        ),
                    0
                );

            avancePromedio.textContent =
                Math.round(
                    suma /
                    estudiantes.length
                ) + "%";
        } else {
            avancePromedio.textContent =
                "0%";
        }
    }

    if (ejerciciosRealizados) {
        const totalEjercicios =
            estudiantes.reduce(
                (
                    total,
                    estudiante
                ) =>
                    total +
                    (
                        Number(
                            estudiante.ejercicios
                        ) || 0
                    ),
                0
            );

        ejerciciosRealizados.textContent =
            totalEjercicios;
    }
}



function destruirGraficas() {
    if (graficaAvance) {
        graficaAvance.destroy();

        graficaAvance =
            null;
    }

    if (graficaIdiomas) {
        graficaIdiomas.destroy();

        graficaIdiomas =
            null;
    }
}


function cargarChartJS() {
    if (
        typeof window.Chart !==
        "undefined"
    ) {
        return Promise.resolve(
            window.Chart
        );
    }

    if (chartCargando) {
        return chartCargando;
    }

    chartCargando =
        new Promise(
            (
                resolver,
                rechazar
            ) => {
                const script =
                    document.createElement(
                        "script"
                    );

                script.src =
                    "https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js";

                script.onload = () => {
                    if (
                        typeof window.Chart !==
                        "undefined"
                    ) {
                        resolver(
                            window.Chart
                        );
                    } else {
                        rechazar(
                            new Error(
                                "Chart.js no está disponible."
                            )
                        );
                    }
                };

                script.onerror = () => {
                    rechazar(
                        new Error(
                            "No fue posible cargar Chart.js."
                        )
                    );
                };

                document.head.appendChild(
                    script
                );
            }
        );

    return chartCargando;
}


async function crearGraficas() {
    try {
        await cargarChartJS();

        destruirGraficas();

        crearGraficaIdiomas();

        crearGraficaAvance();

    } catch (error) {
        console.error(
            "No fue posible cargar las gráficas:",
            error
        );
    }
}


function crearGraficaIdiomas() {
    const canvas =
        obtenerElemento(
            "graficaIdiomas"
        );

    if (!canvas) {
        return;
    }

    const cantidades =
        CONFIG_AISANKA.idiomas.map(
            idioma =>
                estudiantes.filter(
                    estudiante =>
                        normalizarIdioma(
                            estudiante.idioma
                        ) === idioma
                ).length
        );

    const total =
        cantidades.reduce(
            (suma, cantidad) =>
                suma + cantidad,
            0
        );

    const coloresIdiomas = [
        "#176b5b",
        "#d6ad3c",
        "#49d6d6",
        "#2f5028",
        "#39a51e"
    ];

    const coloresBorde = [
        "#ffffff5e",
        "#ffffff5b",
        "#ffffff7e",
        "#ffffff57",
        "#ffffff77"
    ];

    const pluginCentroDona = {
        id: "centroDonaIdiomas",

        beforeDraw(chart) {
            const {
                ctx,
                chartArea
            } = chart;

            if (!chartArea) {
                return;
            }

            const x =
                (
                    chartArea.left +
                    chartArea.right
                ) / 2;

            const y =
                (
                    chartArea.top +
                    chartArea.bottom
                ) / 2;

            ctx.save();

            ctx.font =
                "700 28px Arial";

            ctx.fillStyle =
                "#ffffff";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillText(
                String(total),
                x,
                y - 7
            );

            ctx.font =
                "500 12px Arial";

            ctx.fillStyle =
                "rgba(255,255,255,.78)";

            ctx.fillText(
                total === 1
                    ? "estudiante"
                    : "estudiantes",
                x,
                y + 17
            );

            ctx.restore();
        }
    };

    if (
        typeof Chart !==
        "undefined"
    ) {
        Chart.register(
            pluginCentroDona
        );
    }

    graficaIdiomas =
        new Chart(
            canvas,
            {
                type: "doughnut",

                data: {
                    labels:
                        CONFIG_AISANKA.idiomas,

                    datasets: [
                        {
                            label:
                                "Estudiantes",

                            data:
                                cantidades,

                            backgroundColor:
                                coloresIdiomas,

                            borderColor:
                                coloresBorde,

                            borderWidth:
                                3,

                            hoverOffset:
                                10,

                            spacing:
                                2
                        }
                    ]
                },

                options: {
                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    cutout:
                        "68%",

                    animation: {
                        animateRotate:
                            true,

                        animateScale:
                            true,

                        duration:
                            900
                    },

                    plugins: {
                        legend: {
                            display:
                                true,

                            position:
                                "bottom",

                            labels: {
                                color:
                                    "#ffffff",

                                padding:
                                    16,

                                usePointStyle:
                                    true,

                                pointStyle:
                                    "circle",

                                font: {
                                    size:
                                        12
                                }
                            }
                        },

                        title: {
                            display:
                                true,

                            text:
                                "Idiomas enseñados",

                            color:
                                "#fbfffe",

                            font: {
                                size:
                                    16,

                                weight:
                                    "700"
                            },

                            padding: {
                                bottom:
                                    18
                            }
                        },

                        tooltip: {
                            enabled:
                                true,

                            callbacks: {
                                label:
                                    function(
                                        contexto
                                    ) {
                                        const valor =
                                            Number(
                                                contexto.raw
                                            ) || 0;

                                        const porcentaje =
                                            total >
                                            0
                                                ? (
                                                    valor /
                                                    total
                                                ) *
                                                100
                                                : 0;

                                        return ` ${contexto.label}: ${valor} estudiante${
                                            valor === 1
                                                ? ""
                                                : "s"
                                        } (${porcentaje.toFixed(
                                            1
                                        )}%)`;
                                    }
                            }
                        }
                    }
                },

                plugins: [
                    pluginCentroDona
                ]
            }
        );
}



function crearGraficaAvance() {
    const canvas =
        obtenerElemento(
            "graficaAvance"
        );

    if (!canvas) {
        return;
    }

    const nombres =
        estudiantes.map(
            estudiante =>
                estudiante.primerNombre
        );

    const avances =
        estudiantes.map(
            estudiante =>
                Number(
                    estudiante.avance
                ) || 0
        );

    graficaAvance =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {
                    labels:
                        nombres,

                    datasets: [
                        {
                            label:
                                "Avance",

                            data:
                                avances,

                            backgroundColor:
                                "#176b5b",

                            borderColor:
                                "#105044",

                            borderWidth:
                                1,

                            borderRadius:
                                8,

                            borderSkipped:
                                false,

                            minBarLength:
                                5
                        }
                    ]
                },

                options: {
                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    animation: {
                        duration:
                            800
                    },

                    scales: {
                        y: {
                            beginAtZero:
                                true,

                            max:
                                100,

                            ticks: {
                                stepSize:
                                    20,

                                callback:
                                    valor =>
                                        valor +
                                        "%"
                            },

                            title: {
                                display:
                                    true,

                                text:
                                    "Avance"
                            },

                            grid: {
                                color:
                                    "rgba(23,107,91,.10)"
                            }
                        },

                        x: {
                            grid: {
                                display:
                                    false
                            }
                        }
                    },

                    plugins: {
                        legend: {
                            display:
                                false
                        },

                        title: {
                            display:
                                true,

                            text:
                                "Avance de estudiantes",

                            color:
                                "#105044",

                            font: {
                                size:
                                    16,

                                weight:
                                    "700"
                            },

                            padding: {
                                bottom:
                                    18
                            }
                        },

                        tooltip: {
                            callbacks: {
                                label:
                                    contexto =>
                                        ` Avance: ${contexto.raw}%`
                            }
                        }
                    }
                }
            }
        );
}



function configurarPosicionChat() {
    const botonChat =
        obtenerElemento(
            "botonChat"
        );

    const ventanaChat =
        obtenerElemento(
            "ventanaChat"
        );

    const estilosChat =
        obtenerElemento(
            "estilosPosicionChat"
        );

    if (!estilosChat) {
        const estilo =
            document.createElement(
                "style"
            );

        estilo.id =
            "estilosPosicionChat";

        estilo.textContent = `
            #botonChat {
                position:fixed !important;
                right:24px !important;
                left:auto !important;
                bottom:24px !important;
                z-index:9998 !important;
            }

            #ventanaChat {
                position:fixed !important;
                right:24px !important;
                left:auto !important;
                bottom:28px !important;
                z-index:9999 !important;
            }

            @media (max-width:768px) {
                #botonChat {
                    right:16px !important;
                    left:auto !important;
                    bottom:16px !important;
                }

                #ventanaChat {
                    right:16px !important;
                    left:16px !important;
                    bottom:76px !important;
                    width:auto !important;
                    max-width:none !important;
                }
            }
        `;

        document.head.appendChild(
            estilo
        );
    }

    if (botonChat) {
        botonChat.style.right =
            "24px";

        botonChat.style.left =
            "auto";

        botonChat.style.bottom =
            "24px";

        botonChat.style.zIndex =
            "9998";
    }

    if (ventanaChat) {
        ventanaChat.style.right =
            "24px";

        ventanaChat.style.left =
            "auto";

        ventanaChat.style.bottom =
            "88px";

        ventanaChat.style.zIndex =
            "9999";
    }
}



function crearPerfilDocente() {
    if (
        obtenerElemento(
            "modalPerfilDocente"
        )
    ) {
        return;
    }

    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "modalPerfilDocente";

    modal.innerHTML = `
        <div class="perfil-docente-overlay">

            <div class="perfil-docente-modal">

                <button
                    type="button"
                    id="cerrarPerfilDocente"
                    class="cerrar-perfil-docente"
                    aria-label="Cerrar"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="perfil-docente-cabecera">

                    <div class="foto-perfil-modal">
                        <i class="fa-solid fa-user"></i>
                    </div>

                    <h2>
                        ${escaparHTML(
                            CONFIG_AISANKA.docente.nombre
                        )}
                    </h2>

                    <p>
                        ${escaparHTML(
                            CONFIG_AISANKA.docente.rol
                        )}
                    </p>

                </div>

                <div class="perfil-docente-informacion">

                    <div class="dato-docente">
                        <i class="fa-solid fa-envelope"></i>

                        <div>
                            <span>
                                Correo electrónico
                            </span>

                            <strong>
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.correo
                                )}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-school"></i>

                        <div>
                            <span>
                                Centro educativo
                            </span>

                            <strong>
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.centro
                                )}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-location-dot"></i>

                        <div>
                            <span>
                                Ubicación
                            </span>

                            <strong>
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.municipio
                                )},
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.departamento
                                )}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-graduation-cap"></i>

                        <div>
                            <span>
                                Grado atendido
                            </span>

                            <strong>
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.grado
                                )}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-language"></i>

                        <div>
                            <span>
                                Idiomas enseñados
                            </span>

                            <strong>
                                ${escaparHTML(
                                    CONFIG_AISANKA.docente.idiomaActual
                                )}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-users"></i>

                        <div>
                            <span>
                                Estudiantes asignados
                            </span>

                            <strong>
                                ${estudiantes.length}
                            </strong>
                        </div>
                    </div>

                    <div class="dato-docente">
                        <i class="fa-solid fa-circle-check"></i>

                        <div>
                            <span>
                                Estado
                            </span>

                            <strong>
                                Sesión activa
                            </strong>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;

    document.body.appendChild(
        modal
    );

    const estilos =
        document.createElement(
            "style"
        );

    estilos.id =
        "estilosPerfilDocente";

    estilos.textContent = `
        #modalPerfilDocente {
            position:fixed;
            inset:0;
            z-index:99990;
            display:none;
        }

        #modalPerfilDocente.activo {
            display:block;
        }

        .perfil-docente-overlay {
            position:absolute;
            inset:0;
            background:rgba(16,40,35,.58);
            backdrop-filter:blur(5px);
            display:flex;
            align-items:center;
            justify-content:center;
            padding:20px;
        }

        .perfil-docente-modal {
            width:min(470px,100%);
            background:#ffffff;
            border-radius:22px;
            overflow:hidden;
            box-shadow:0 25px 80px rgba(0,0,0,.28);
            position:relative;
            animation:aparecerPerfil .22s ease;
        }

        @keyframes aparecerPerfil {
            from {
                opacity:0;
                transform:translateY(15px) scale(.98);
            }

            to {
                opacity:1;
                transform:translateY(0) scale(1);
            }
        }

        .cerrar-perfil-docente {
            position:absolute;
            right:18px;
            top:18px;
            width:36px;
            height:36px;
            border:none;
            border-radius:50%;
            background:rgba(255,255,255,.18);
            color:#ffffff;
            cursor:pointer;
            z-index:3;
            font-size:17px;
        }

        .perfil-docente-cabecera {
            background:#176b5b;
            color:#ffffff;
            text-align:center;
            padding:35px 25px 30px;
        }

        .foto-perfil-modal {
            width:90px;
            height:90px;
            margin:0 auto 15px;
            border-radius:50%;
            background:#ffffff;
            color:#176b5b;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:35px;
            border:4px solid rgba(255,255,255,.4);
        }

        .perfil-docente-cabecera h2 {
            margin:0;
            font-size:22px;
        }

        .perfil-docente-cabecera p {
            margin:6px 0 0;
            opacity:.85;
        }

        .perfil-docente-informacion {
            padding:20px;
            display:grid;
            gap:5px;
        }

        .dato-docente {
            display:flex;
            align-items:center;
            gap:14px;
            padding:12px 8px;
            border-bottom:1px solid #edf0ee;
        }

        .dato-docente:last-child {
            border-bottom:none;
        }

        .dato-docente > i {
            width:38px;
            height:38px;
            border-radius:10px;
            background:#edf5f2;
            color:#176b5b;
            display:flex;
            align-items:center;
            justify-content:center;
        }

        .dato-docente div {
            display:flex;
            flex-direction:column;
            gap:3px;
        }

        .dato-docente span {
            color:#7b8581;
            font-size:12px;
        }

        .dato-docente strong {
            color:#243a35;
            font-size:14px;
        }
    `;

    document.head.appendChild(
        estilos
    );

    const botonCerrar =
        obtenerElemento(
            "cerrarPerfilDocente"
        );

    if (botonCerrar) {
        botonCerrar.addEventListener(
            "click",
            cerrarPerfilDocente
        );
    }

    const overlay =
        modal.querySelector(
            ".perfil-docente-overlay"
        );

    if (overlay) {
        overlay.addEventListener(
            "click",
            function(evento) {
                if (
                    evento.target ===
                    this
                ) {
                    cerrarPerfilDocente();
                }
            }
        );
    }
}


function abrirPerfilDocente() {
    crearPerfilDocente();

    const modal =
        obtenerElemento(
            "modalPerfilDocente"
        );

    if (modal) {
        modal.classList.add(
            "activo"
        );
    }
}


function cerrarPerfilDocente() {
    const modal =
        obtenerElemento(
            "modalPerfilDocente"
        );

    if (modal) {
        modal.classList.remove(
            "activo"
        );
    }
}


function configurarPerfilDocente() {
    crearPerfilDocente();

    const selectores = [
        "#fotoDocente",
        "#fotoPerfil",
        "#perfilDocente",
        "#botonPerfilDocente",
        ".foto-docente",
        ".foto-perfil",
        ".perfil-docente",
        ".informacion-docente",
        ".perfil-usuario"
    ];

    const elementos = [];

    selectores.forEach(
        selector => {
            document
                .querySelectorAll(
                    selector
                )
                .forEach(
                    elemento => {
                        if (
                            !elementos.includes(
                                elemento
                            )
                        ) {
                            elementos.push(
                                elemento
                            );
                        }
                    }
                );
        }
    );

    elementos.forEach(
        elemento => {
            elemento.style.cursor =
                "pointer";

            elemento.addEventListener(
                "click",
                abrirPerfilDocente
            );
        }
    );
}



function configurarChat() {
    const botonChat =
        obtenerElemento(
            "botonChat"
        );

    const ventanaChat =
        obtenerElemento(
            "ventanaChat"
        );

    const cerrarChat =
        obtenerElemento(
            "cerrarChat"
        );

    configurarPosicionChat();

    if (
        botonChat &&
        ventanaChat
    ) {
        botonChat.addEventListener(
            "click",
            function() {
                ventanaChat.classList.toggle(
                    "activo"
                );
            }
        );
    }

    if (
        cerrarChat &&
        ventanaChat
    ) {
        cerrarChat.addEventListener(
            "click",
            function() {
                ventanaChat.classList.remove(
                    "activo"
                );
            }
        );
    }
}



function configurarCerrarSesion() {
    const boton =
        obtenerElemento(
            "botonCerrarSesion"
        );

    if (!boton) {
        return;
    }

    boton.addEventListener(
        "click",
        function() {
            sessionStorage.removeItem(
                CONFIG_AISANKA.sesion
            );

            window.location.href =
                "/";
        }
    );
}



function configurarModales() {
    const modalEstudiante =
        obtenerElemento(
            "modalEstudiante"
        );

    const cerrarModal =
        obtenerElemento(
            "cerrarModalEstudiante"
        );

    const cerrarDocumentoBoton =
        obtenerElemento(
            "cerrarDocumento"
        );

    if (cerrarModal) {
        cerrarModal.addEventListener(
            "click",
            cerrarDocumento
        );
    }

    if (cerrarDocumentoBoton) {
        cerrarDocumentoBoton.addEventListener(
            "click",
            cerrarDocumento
        );
    }

    if (modalEstudiante) {
        modalEstudiante.addEventListener(
            "click",
            function(evento) {
                if (
                    evento.target ===
                    this
                ) {
                    cerrarDocumento();
                }
            }
        );
    }

    const modalEliminar =
        obtenerElemento(
            "modalEliminar"
        );

    if (modalEliminar) {
        modalEliminar.addEventListener(
            "click",
            function(evento) {
                if (
                    evento.target ===
                    this
                ) {
                    modalEliminar.classList.remove(
                        "activo"
                    );

                    estudianteSeleccionado =
                        null;
                }
            }
        );
    }

    const cancelar =
        obtenerElemento(
            "cancelarEliminar"
        );

    if (cancelar) {
        cancelar.addEventListener(
            "click",
            function() {
                modalEliminar?.classList.remove(
                    "activo"
                );

                estudianteSeleccionado =
                    null;
            }
        );
    }

    const confirmar =
        obtenerElemento(
            "confirmarEliminar"
        );

    if (confirmar) {
        confirmar.addEventListener(
            "click",
            confirmarEliminacion
        );
    }
}


function cargarJsPDF() {
    return new Promise(
        (
            resolver,
            rechazar
        ) => {
            if (
                window.jspdf &&
                window.jspdf.jsPDF
            ) {
                resolver(
                    window.jspdf.jsPDF
                );

                return;
            }

            const script =
                document.createElement(
                    "script"
                );

            script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

            script.onload = () => {
                if (
                    window.jspdf &&
                    window.jspdf.jsPDF
                ) {
                    resolver(
                        window.jspdf.jsPDF
                    );
                } else {
                    rechazar(
                        new Error(
                            "No se pudo cargar jsPDF."
                        )
                    );
                }
            };

            script.onerror = () => {
                rechazar(
                    new Error(
                        "No fue posible cargar jsPDF."
                    )
                );
            };

            document.head.appendChild(
                script
            );
        }
    );
}


function cargarImagenPDF(ruta) {
    return new Promise(
        (
            resolver,
            rechazar
        ) => {
            const imagen =
                new Image();

            imagen.onload = () => {
                resolver(
                    imagen
                );
            };

            imagen.onerror = () => {
                rechazar(
                    new Error(
                        "No se pudo cargar el fondo del PDF: " +
                        ruta
                    )
                );
            };

            imagen.src =
                ruta;
        }
    );
}


function agregarFondoPDF(
    pdf,
    imagen,
    ancho,
    alto
) {
    try {
        const tipo =
            imagen.src
                .toLowerCase()
                .includes(".png")
                ? "PNG"
                : "JPEG";

        pdf.addImage(
            imagen,
            tipo,
            0,
            0,
            ancho,
            alto
        );

    } catch (error) {
        console.warn(
            "No se pudo agregar el fondo.",
            error
        );
    }
}


function escribirCampoPDF(
    pdf,
    etiqueta,
    valor,
    x,
    y,
    ancho
) {
    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(
        9
    );

    pdf.setTextColor(
        60,
        80,
        75
    );

    pdf.text(
        etiqueta,
        x,
        y
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(
        10
    );

    pdf.setTextColor(
        30,
        45,
        42
    );

    const texto =
        pdf.splitTextToSize(
            String(
                valor ||
                "No registrado"
            ),
            ancho
        );

    pdf.text(
        texto,
        x,
        y + 5
    );

    return (
        y +
        5 +
        texto.length * 4 +
        5
    );
}



async function descargarPDF() {
    if (!estudianteSeleccionado) {
        mostrarMensajePDF(
            "Primero selecciona un estudiante."
        );

        return;
    }

    const boton =
        obtenerElemento(
            "descargarPDF"
        ) ||
        obtenerElemento(
            "imprimirDocumento"
        );

    try {
        if (boton) {
            boton.disabled =
                true;

            boton.dataset.textoOriginal =
                boton.innerHTML;

            boton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Generando PDF...';
        }

        const jsPDF =
            await cargarJsPDF();

        let fondo =
            null;

        try {
            fondo =
                await cargarImagenPDF(
                    CONFIG_AISANKA.fondoPDF
                );
        } catch (error) {
            console.warn(
                error
            );
        }

        const pdf =
            new jsPDF({
                orientation:
                    "portrait",

                unit:
                    "mm",

                format:
                    "a4"
            });

        const ancho =
            pdf.internal.pageSize.getWidth();

        const alto =
            pdf.internal.pageSize.getHeight();

        const estudiante =
            estudianteSeleccionado;

        if (fondo) {
            agregarFondoPDF(
                pdf,
                fondo,
                ancho,
                alto
            );
        } else {
            pdf.setFillColor(
                247,
                250,
                249
            );

            pdf.rect(
                0,
                0,
                ancho,
                alto,
                "F"
            );
        }

        pdf.setTextColor(
            23,
            107,
            91
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            23
        );

        pdf.text(
            "AISANKA",
            20,
            25
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            70,
            80,
            77
        );

        pdf.text(
            "Ficha de información del estudiante",
            20,
            33
        );

        pdf.setDrawColor(
            23,
            107,
            91
        );

        pdf.setLineWidth(
            0.6
        );

        pdf.line(
            20,
            39,
            ancho - 20,
            39
        );

        let y =
            52;

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            15
        );

        pdf.setTextColor(
            25,
            55,
            48
        );

        pdf.text(
            [
                estudiante.primerNombre,
                estudiante.primerApellido
            ]
                .filter(Boolean)
                .join(" "),
            20,
            y
        );

        y += 12;

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            23,
            107,
            91
        );

        pdf.text(
            "Información personal",
            20,
            y
        );

        y += 8;

        const columna1 =
            20;

        const columna2 =
            110;

        escribirCampoPDF(
            pdf,
            "ID del estudiante",
            estudiante.id,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Código MINED",
            estudiante.codigoMined,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Primer nombre",
            estudiante.primerNombre,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Segundo nombre",
            estudiante.segundoNombre,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Primer apellido",
            estudiante.primerApellido,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Segundo apellido",
            estudiante.segundoApellido,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Correo electrónico",
            estudiante.correo,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Fecha de nacimiento",
            formatearFecha(
                estudiante.fechaNacimiento
            ),
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Edad",
            calcularEdad(
                estudiante.fechaNacimiento
            ) + " años",
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Sexo",
            estudiante.sexo,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Acceso a internet",
            estudiante.accesoInternet,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Dispositivo",
            estudiante.tipoDispositivo,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Estado",
            estudiante.estado,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Fecha de registro",
            formatearFecha(
                estudiante.fechaRegistro
            ),
            columna2,
            y,
            75
        );

        y += 25;

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            23,
            107,
            91
        );

        pdf.text(
            "Procedencia y matrícula",
            20,
            y
        );

        y += 8;

        escribirCampoPDF(
            pdf,
            "Escuela",
            estudiante.escuela,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Comunidad",
            estudiante.comunidad ||
                "No registrada",
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Municipio",
            estudiante.municipio,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Departamento",
            estudiante.departamento,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Grado",
            estudiante.grado,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Aula / Sección",
            estudiante.aula,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Modalidad",
            estudiante.modalidad,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Turno",
            estudiante.turno,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Año lectivo",
            estudiante.anioLectivo,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Docente responsable",
            estudiante.docente,
            columna2,
            y,
            75
        );

        agregarPiePDF(
            pdf,
            1
        );

        pdf.addPage();

        if (fondo) {
            agregarFondoPDF(
                pdf,
                fondo,
                ancho,
                alto
            );
        }

        y =
            28;

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            17
        );

        pdf.setTextColor(
            23,
            107,
            91
        );

        pdf.text(
            "Información familiar y educativa",
            20,
            y
        );

        y += 15;

        pdf.setFontSize(
            12
        );

        pdf.text(
            "Responsable del estudiante",
            20,
            y
        );

        y += 10;

        escribirCampoPDF(
            pdf,
            "Nombre completo",
            estudiante.responsable,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Cédula",
            estudiante.cedula,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Teléfono",
            estudiante.telefono,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Parentesco",
            estudiante.parentesco,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Idioma",
            estudiante.idiomaResponsable,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Escuela",
            estudiante.escuelaResponsable,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Responsable principal",
            estudiante.responsablePrincipal,
            columna1,
            y,
            75
        );

        y += 30;

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.text(
            "Información educativa",
            20,
            y
        );

        y += 10;

        escribirCampoPDF(
            pdf,
            "Condición",
            estudiante.condicion,
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Idioma enseñado",
            estudiante.idioma,
            columna2,
            y,
            75
        );

        y += 20;

        escribirCampoPDF(
            pdf,
            "Progreso en plataforma",
            estudiante.avance + "%",
            columna1,
            y,
            75
        );

        escribirCampoPDF(
            pdf,
            "Ejercicios realizados",
            estudiante.ejercicios,
            columna2,
            y,
            75
        );

        y += 30;

        pdf.setFillColor(
            237,
            245,
            242
        );

        pdf.roundedRect(
            20,
            y,
            ancho - 40,
            35,
            4,
            4,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            23,
            107,
            91
        );

        pdf.text(
            "Estado académico actual",
            28,
            y + 10
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            10
        );

        pdf.setTextColor(
            55,
            70,
            66
        );

        pdf.text(
            `Progreso general: ${estudiante.avance}%`,
            28,
            y + 19
        );

        pdf.text(
            `Ejercicios realizados: ${estudiante.ejercicios}`,
            28,
            y + 26
        );

        agregarPiePDF(
            pdf,
            2
        );

        const nombreArchivo =
            `AISANKA_${estudiante.primerNombre}_${estudiante.primerApellido}.pdf`;

        pdf.save(
            nombreArchivo
        );

        mostrarMensajePDF(
            "El PDF se descargó correctamente."
        );

    } catch (error) {
        console.error(
            "Error al generar PDF:",
            error
        );

        mostrarMensajePDF(
            "No fue posible generar el PDF. Verifica que la imagen fondo_pdf.png se encuentre en recursos/img."
        );

    } finally {
        if (boton) {
            boton.disabled =
                false;

            boton.innerHTML =
                boton.dataset.textoOriginal ||
                '<i class="fa-solid fa-download"></i> Descargar PDF';
        }
    }
}



function agregarPiePDF(
    pdf,
    pagina
) {
    const ancho =
        pdf.internal.pageSize.getWidth();

    const alto =
        pdf.internal.pageSize.getHeight();

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(
        8
    );

    pdf.setTextColor(
        110,
        120,
        117
    );

    pdf.text(
        "AISANKA - El idioma que une a Nicaragua",
        20,
        alto - 12
    );

    pdf.text(
        `Página ${pagina}`,
        ancho - 35,
        alto - 12
    );
}



function mostrarMensajePDF(
    mensaje
) {
    let contenedor =
        obtenerElemento(
            "mensajePDFDinamico"
        );

    if (!contenedor) {
        contenedor =
            document.createElement(
                "div"
            );

        contenedor.id =
            "mensajePDFDinamico";

        contenedor.style.cssText = `
            position:fixed;
            bottom:25px;
            right:25px;
            background:#176b5b;
            color:#ffffff;
            padding:14px 20px;
            border-radius:10px;
            box-shadow:0 10px 30px rgba(0,0,0,.18);
            z-index:999999;
            font-family:Arial,sans-serif;
            font-size:14px;
        `;

        document.body.appendChild(
            contenedor
        );
    }

    contenedor.textContent =
        mensaje;

    contenedor.style.display =
        "block";

    clearTimeout(
        contenedor._temporizador
    );

    contenedor._temporizador =
        setTimeout(
            () => {
                contenedor.style.display =
                    "none";
            },
            4000
        );
}



function configurarPDF() {
    const botones = [
        obtenerElemento(
            "descargarPDF"
        ),

        obtenerElemento(
            "imprimirDocumento"
        )
    ].filter(Boolean);

    botones.forEach(
        boton => {
            boton.addEventListener(
                "click",
                function(evento) {
                    evento.preventDefault();

                    descargarPDF();
                }
            );
        }
    );
}


function actualizarPerfilVisible() {
    const nombre =
        document.querySelectorAll(
            "[data-docente-nombre]"
        );

    nombre.forEach(
        elemento => {
            elemento.textContent =
                CONFIG_AISANKA
                    .docente
                    .nombre;
        }
    );

    const correo =
        document.querySelectorAll(
            "[data-docente-correo]"
        );

    correo.forEach(
        elemento => {
            elemento.textContent =
                CONFIG_AISANKA
                    .docente
                    .correo;
        }
    );
}



function configurarTeclado() {
    document.addEventListener(
        "keydown",
        function(evento) {
            if (
                evento.key ===
                "Escape"
            ) {
                cerrarDocumento();

                cerrarPerfilDocente();

                const chat =
                    obtenerElemento(
                        "ventanaChat"
                    );

                if (chat) {
                    chat.classList.remove(
                        "activo"
                    );
                }
            }
        }
    );
}



function actualizarPanel() {
    mostrarEstudiantes();

    actualizarResumen();

    crearGraficas();
}



function iniciarAISANKA() {
    inicializarElementos();

    estudiantes =
        obtenerEstudiantes();

    configurarBusqueda();

    configurarModales();

    configurarPerfilDocente();

    configurarChat();

    configurarCerrarSesion();

    configurarPDF();

    configurarTeclado();

    actualizarPerfilVisible();

    actualizarPanel();
}



if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarAISANKA
    );
} else {
    iniciarAISANKA();
}



window.verEstudiante =
    verEstudiante;

window.editarEstudiante =
    editarEstudiante;

window.prepararEliminar =
    prepararEliminar;

window.descargarPDF =
    descargarPDF;

window.abrirPerfilDocente =
    abrirPerfilDocente;

window.cerrarPerfilDocente =
    cerrarPerfilDocente;

window.cerrarDocumento =
    cerrarDocumento;
}
