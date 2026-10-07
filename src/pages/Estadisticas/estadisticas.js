export default function iniciarEstadisticas() {
/* Lógica completa del módulo de estadísticas AISANKA: datos, filtros, gráficas, perfil docente y generación del PDF con todas las gráficas. */
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

    almacenamiento: "estudiantesAISANKA",
    sesion: "docenteSesion",
    fondoPDF: "/recursos/img/fondo_pdf.png"
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
        correo: "bengee.matamoramos@aisanka.edu.ni",
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
        responsablePrimerApellido: "Matamoros",
        telefono: "8888-0001",
        parentesco: "Madre",
        idiomaResponsable: "Español",
        idIdioma: 5,
        idioma: "Mayangna",
        idCondicion: 5,
        condicion: "Neurotípico",
        discapacidad: "Neurotípico",
        idIdiomaResponsable: 1,
        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",
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
        responsablePrimerApellido: "Treminio",
        responsableSegundoApellido: "López",
        telefono: "8888-0002",
        parentesco: "Padre",
        idiomaResponsable: "Español",
        idIdioma: 4,
        idioma: "Miskito",
        idCondicion: 3,
        condicion: "Dificultad auditiva",
        discapacidad: "Dificultad auditiva",
        idIdiomaResponsable: 1,
        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",
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
        responsablePrimerApellido: "Cruz",
        responsableSegundoApellido: "Martínez",
        telefono: "8888-0003",
        parentesco: "Madre",
        idiomaResponsable: "Español",
        idIdioma: 1,
        idioma: "Español",
        idCondicion: 2,
        condicion: "Dificultad visual",
        discapacidad: "Dificultad visual",
        idIdiomaResponsable: 1,
        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",
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
        responsablePrimerApellido: "Herrera",
        responsableSegundoApellido: "Pérez",
        telefono: "8888-0004",
        parentesco: "Padre",
        idiomaResponsable: "Español",
        idIdioma: 2,
        idioma: "Inglés",
        idCondicion: 4,
        condicion: "TDAH",
        discapacidad: "TDAH",
        idIdiomaResponsable: 1,
        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",
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
        responsablePrimerApellido: "Rodríguez",
        telefono: "8888-0005",
        parentesco: "Madre",
        idiomaResponsable: "Español",
        idIdioma: 3,
        idioma: "Chino",
        idCondicion: 1,
        condicion: "Autismo",
        discapacidad: "Autismo",
        idIdiomaResponsable: 1,
        escuelaResponsable: "CPACS",
        responsablePrincipal: "Sí",
        avance: 0,
        ejercicios: 0
    }
];

let estudiantes = [];
let estudiantesFiltrados = [];
let graficas = {};
let estudianteSeleccionado = null;
let filtroActual = {
    idioma: "todos",
    grado: "todos",
    periodo: "actual"
};

function obtenerElemento(id) {
    return document.getElementById(id);
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function obtenerValor(objeto, ...propiedades) {
    for (const propiedad of propiedades) {
        if (
            objeto &&
            objeto[propiedad] !== undefined &&
            objeto[propiedad] !== null &&
            objeto[propiedad] !== ""
        ) {
            return objeto[propiedad];
        }
    }

    return "";
}

function normalizarTexto(valor) {
    return String(valor || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function normalizarIdioma(idioma) {
    const texto = normalizarTexto(idioma);

    if (texto.includes("espanol")) {
        return "Español";
    }

    if (texto.includes("ingles") || texto.includes("english")) {
        return "Inglés";
    }

    if (texto.includes("chino") || texto.includes("mandarin")) {
        return "Chino";
    }

    if (texto.includes("miskito")) {
        return "Miskito";
    }

    if (texto.includes("mayangna")) {
        return "Mayangna";
    }

    return idioma || "Español";
}

function normalizarCondicion(condicion) {
    const texto = normalizarTexto(condicion);

    if (texto.includes("autismo")) {
        return "Autismo";
    }

    if (texto.includes("visual")) {
        return "Dificultad visual";
    }

    if (texto.includes("audit")) {
        return "Dificultad auditiva";
    }

    if (texto.includes("tdah")) {
        return "TDAH";
    }

    return "Neurotípico";
}

function normalizarSexo(sexo) {
    const texto = normalizarTexto(sexo);

    if (
        texto === "f" ||
        texto === "femenino" ||
        texto === "mujer"
    ) {
        return "F";
    }

    if (
        texto === "m" ||
        texto === "masculino" ||
        texto === "hombre" ||
        texto === "varon"
    ) {
        return "M";
    }

    return "";
}

function normalizarEstudiante(estudiante) {
    const resultado = {
        ...estudiante
    };

    resultado.id = obtenerValor(
        estudiante,
        "id",
        "idEstudiante",
        "id_estudiante"
    );

    resultado.codigoMined = obtenerValor(
        estudiante,
        "codigoMined",
        "codigo_mined"
    );

    resultado.primerNombre = obtenerValor(
        estudiante,
        "primerNombre",
        "primer_nombre"
    );

    resultado.segundoNombre = obtenerValor(
        estudiante,
        "segundoNombre",
        "segundo_nombre"
    );

    resultado.primerApellido = obtenerValor(
        estudiante,
        "primerApellido",
        "primer_apellido"
    );

    resultado.segundoApellido = obtenerValor(
        estudiante,
        "segundoApellido",
        "segundo_apellido"
    );

    resultado.correo = obtenerValor(
        estudiante,
        "correo",
        "email"
    );

    resultado.fechaNacimiento = obtenerValor(
        estudiante,
        "fechaNacimiento",
        "fecha_nacimiento"
    );

    resultado.fechaRegistro = obtenerValor(
        estudiante,
        "fechaRegistro",
        "fecha_registro",
        "createdAt",
        "created_at"
    );

    resultado.sexo = normalizarSexo(
        obtenerValor(estudiante, "sexo", "genero")
    );

    resultado.grado = obtenerValor(
        estudiante,
        "grado",
        "idGrado",
        "id_grado"
    ) || "6to";

    resultado.idioma = normalizarIdioma(
        obtenerValor(
            estudiante,
            "idioma",
            "nombreIdioma",
            "nombre_idioma"
        )
    );

    resultado.condicion = normalizarCondicion(
        obtenerValor(
            estudiante,
            "condicion",
            "discapacidad"
        )
    );

    resultado.estado = obtenerValor(
        estudiante,
        "estado",
        "activo"
    ) || "Activo";

    resultado.avance = Math.min(
        100,
        Math.max(
            0,
            Number(
                obtenerValor(
                    estudiante,
                    "avance",
                    "progreso",
                    "progreso_general",
                    "porcentaje"
                )
            ) || 0
        )
    );

    resultado.ejercicios = Math.max(
        0,
        Number(
            obtenerValor(
                estudiante,
                "ejercicios",
                "ejerciciosRealizados",
                "ejercicios_realizados"
            )
        ) || 0
    );

    resultado.aula = obtenerValor(
        estudiante,
        "aula",
        "seccion"
    );

    resultado.municipio = obtenerValor(
        estudiante,
        "municipio"
    ) || "Jinotega";

    resultado.departamento = obtenerValor(
        estudiante,
        "departamento"
    ) || "Jinotega";

    resultado.comunidad = obtenerValor(
        estudiante,
        "comunidad"
    ) || "Jinotega";

    resultado.escuela = obtenerValor(
        estudiante,
        "escuela"
    ) || "CPACS";

    resultado.modalidad = obtenerValor(
        estudiante,
        "modalidad"
    ) || "Diaria";

    resultado.turno = obtenerValor(
        estudiante,
        "turno"
    ) || "Matutino";

    resultado.anioLectivo = obtenerValor(
        estudiante,
        "anioLectivo",
        "anio_lectivo"
    ) || "2026";

    resultado.docente = obtenerValor(
        estudiante,
        "docente"
    ) || CONFIG_AISANKA.docente.nombre;

    resultado.estadoMatricula = obtenerValor(
        estudiante,
        "estadoMatricula",
        "estado_matricula"
    ) || "Activa";

    resultado.responsable = obtenerValor(
        estudiante,
        "responsable"
    );

    resultado.cedula = obtenerValor(
        estudiante,
        "cedula"
    );

    resultado.telefono = obtenerValor(
        estudiante,
        "telefono"
    );

    resultado.parentesco = obtenerValor(
        estudiante,
        "parentesco"
    );

    resultado.idiomaResponsable = normalizarIdioma(
        obtenerValor(
            estudiante,
            "idiomaResponsable",
            "idioma_responsable"
        )
    );

    resultado.escuelaResponsable = obtenerValor(
        estudiante,
        "escuelaResponsable",
        "escuela_responsable"
    ) || "CPACS";

    resultado.responsablePrincipal = obtenerValor(
        estudiante,
        "responsablePrincipal",
        "responsable_principal"
    ) || "Sí";

    return resultado;
}

function normalizarEstudiantes(lista) {
    return lista.map(normalizarEstudiante);
}

function obtenerIdentificadorEstudiante(estudiante) {
    if (estudiante.codigoMined) {
        return `codigo:${normalizarTexto(estudiante.codigoMined)}`;
    }

    if (estudiante.id !== "") {
        return `id:${estudiante.id}`;
    }

    return `nombre:${normalizarTexto(
        [
            estudiante.primerNombre,
            estudiante.primerApellido,
            estudiante.fechaNacimiento
        ].join("|")
    )}`;
}

function combinarEstudiantes(iniciales, guardados) {
    const mapa = new Map();

    iniciales.forEach(estudiante => {
        const normalizado = normalizarEstudiante(estudiante);

        mapa.set(
            obtenerIdentificadorEstudiante(normalizado),
            normalizado
        );
    });

    guardados.forEach(estudiante => {
        const normalizado = normalizarEstudiante(estudiante);
        const identificador = obtenerIdentificadorEstudiante(normalizado);

        const anterior = mapa.get(identificador);

        if (anterior) {
            mapa.set(
                identificador,
                {
                    ...anterior,
                    ...normalizado
                }
            );
        } else {
            mapa.set(
                identificador,
                normalizado
            );
        }
    });

    return Array.from(mapa.values());
}

function obtenerEstudiantes() {
    let guardados = [];

    try {
        const datos = localStorage.getItem(
            CONFIG_AISANKA.almacenamiento
        );

        if (datos) {
            const parseados = JSON.parse(datos);

            if (Array.isArray(parseados)) {
                guardados = parseados;
            }
        }
    } catch (error) {
        console.error(
            "No fue posible leer estudiantes:",
            error
        );
    }

    const lista = combinarEstudiantes(
        estudiantesIniciales,
        guardados
    );

    guardarEstudiantes(lista);

    return lista;
}

function guardarEstudiantes(lista = estudiantes) {
    try {
        localStorage.setItem(
            CONFIG_AISANKA.almacenamiento,
            JSON.stringify(lista)
        );
    } catch (error) {
        console.error(
            "No fue posible guardar estudiantes:",
            error
        );
    }
}

function calcularEdad(fecha) {
    if (!fecha) {
        return 0;
    }

    const nacimiento = new Date(`${fecha}T00:00:00`);

    if (Number.isNaN(nacimiento.getTime())) {
        return 0;
    }

    const hoy = new Date();

    let edad =
        hoy.getFullYear() -
        nacimiento.getFullYear();

    const mes =
        hoy.getMonth() -
        nacimiento.getMonth();

    if (
        mes < 0 ||
        (
            mes === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return Math.max(0, edad);
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "No registrada";
    }

    const fechaObjeto = new Date(`${fecha}T00:00:00`);

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

function obtenerNombreCompleto(estudiante) {
    return [
        estudiante.primerNombre,
        estudiante.segundoNombre,
        estudiante.primerApellido,
        estudiante.segundoApellido
    ]
        .filter(Boolean)
        .join(" ");
}

function obtenerFechaEstudiante(estudiante) {
    const fecha = obtenerValor(
        estudiante,
        "fechaRegistro",
        "fecha_registro",
        "createdAt",
        "created_at"
    );

    if (!fecha) {
        return null;
    }

    const fechaObjeto = new Date(`${fecha}T00:00:00`);

    return Number.isNaN(
        fechaObjeto.getTime()
    )
        ? null
        : fechaObjeto;
}

function perteneceAlPeriodo(estudiante, periodo) {
    if (periodo === "actual") {
        return true;
    }

    const fecha = obtenerFechaEstudiante(estudiante);

    if (!fecha) {
        return true;
    }

    const hoy = new Date();

    if (periodo === "mes") {
        return (
            fecha.getFullYear() === hoy.getFullYear() &&
            fecha.getMonth() === hoy.getMonth()
        );
    }

    if (periodo === "trimestre") {
        const trimestreActual =
            Math.floor(hoy.getMonth() / 3);

        const trimestreFecha =
            Math.floor(fecha.getMonth() / 3);

        return (
            fecha.getFullYear() === hoy.getFullYear() &&
            trimestreFecha === trimestreActual
        );
    }

    if (periodo === "anio") {
        return (
            fecha.getFullYear() === hoy.getFullYear()
        );
    }

    return true;
}

function aplicarFiltros() {
    const idioma = obtenerElemento("filtroIdioma")?.value || "todos";
    const grado = obtenerElemento("filtroGrado")?.value || "todos";
    const periodo = obtenerElemento("filtroPeriodo")?.value || "actual";

    filtroActual = {
        idioma,
        grado,
        periodo
    };

    estudiantesFiltrados = estudiantes.filter(estudiante => {
        const coincideIdioma =
            idioma === "todos" ||
            normalizarTexto(estudiante.idioma) === normalizarTexto(
                obtenerIdiomaFiltro(idioma)
            );

        const gradoNumero =
            extraerNumeroGrado(estudiante.grado);

        const coincideGrado =
            grado === "todos" ||
            String(gradoNumero) === String(grado);

        const coincidePeriodo =
            perteneceAlPeriodo(
                estudiante,
                periodo
            );

        return (
            coincideIdioma &&
            coincideGrado &&
            coincidePeriodo
        );
    });

    actualizarPanel(estudiantesFiltrados);
}

function obtenerIdiomaFiltro(valor) {
    const idiomas = {
        espanol: "Español",
        ingles: "Inglés",
        chino: "Chino",
        miskito: "Miskito",
        mayangna: "Mayangna"
    };

    return idiomas[valor] || valor;
}

function extraerNumeroGrado(grado) {
    const coincidencia =
        String(grado || "").match(/\d+/);

    return coincidencia
        ? Number(coincidencia[0])
        : 0;
}

function limpiarFiltros() {
    const idioma = obtenerElemento("filtroIdioma");
    const grado = obtenerElemento("filtroGrado");
    const periodo = obtenerElemento("filtroPeriodo");

    if (idioma) {
        idioma.value = "todos";
    }

    if (grado) {
        grado.value = "todos";
    }

    if (periodo) {
        periodo.value = "actual";
    }

    aplicarFiltros();
}

function calcularEstadisticas(lista) {
    const total = lista.length;

    const mujeres = lista.filter(
        estudiante => estudiante.sexo === "F"
    ).length;

    const varones = lista.filter(
        estudiante => estudiante.sexo === "M"
    ).length;

    const grados = {};

    for (let i = 1; i <= 6; i++) {
        grados[i] = 0;
    }

    lista.forEach(estudiante => {
        const grado = extraerNumeroGrado(
            estudiante.grado
        );

        if (grado >= 1 && grado <= 6) {
            grados[grado]++;
        }
    });

    const idiomas = {};

    CONFIG_AISANKA.idiomas.forEach(
        idioma => {
            idiomas[idioma] = 0;
        }
    );

    lista.forEach(estudiante => {
        const idioma = normalizarIdioma(
            estudiante.idioma
        );

        if (idiomas[idioma] !== undefined) {
            idiomas[idioma]++;
        }
    });

    const activos = lista.filter(
        estudiante =>
            normalizarTexto(estudiante.estado) === "activo"
    ).length;

    const inactivos = Math.max(
        0,
        total - activos
    );

    const progresoPromedio = total
        ? Math.round(
            lista.reduce(
                (totalActual, estudiante) =>
                    totalActual +
                    Number(estudiante.avance || 0),
                0
            ) / total
        )
        : 0;

    const ejercicios = lista.reduce(
        (totalActual, estudiante) =>
            totalActual +
            Number(estudiante.ejercicios || 0),
        0
    );

    return {
        total,
        mujeres,
        varones,
        grados,
        idiomas,
        activos,
        inactivos,
        progresoPromedio,
        ejercicios
    };
}

function actualizarPanel(lista) {
    const estadisticas =
        calcularEstadisticas(lista);

    actualizarTarjetas(
        estadisticas
    );

    actualizarIndicadores(
        estadisticas,
        lista
    );

    actualizarResumenFinal(
        estadisticas,
        lista
    );

    actualizarEstadoFiltros(
        lista
    );

    crearGraficas(
        lista,
        estadisticas
    );
}

function actualizarTarjetas(estadisticas) {
    const total =
        obtenerElemento("totalEstudiantes");

    const mujeres =
        obtenerElemento("totalMujeres");

    const varones =
        obtenerElemento("totalVarones");

    const progreso =
        obtenerElemento("progresoGeneral");

    const indicadorEstudiantes =
        obtenerElemento("indicadorEstudiantes");

    const porcentajeMujeres =
        obtenerElemento("porcentajeMujeres");

    const porcentajeVarones =
        obtenerElemento("porcentajeVarones");

    if (total) {
        total.textContent =
            estadisticas.total;
    }

    if (mujeres) {
        mujeres.textContent =
            estadisticas.mujeres;
    }

    if (varones) {
        varones.textContent =
            estadisticas.varones;
    }

    if (progreso) {
        progreso.textContent =
            `${estadisticas.progresoPromedio}%`;
    }

    if (indicadorEstudiantes) {
        indicadorEstudiantes.textContent =
            estadisticas.total === 1
                ? "1 registro seleccionado"
                : `${estadisticas.total} registros seleccionados`;
    }

    if (porcentajeMujeres) {
        porcentajeMujeres.textContent =
            `${calcularPorcentaje(
                estadisticas.mujeres,
                estadisticas.total
            )}% del total`;
    }

    if (porcentajeVarones) {
        porcentajeVarones.textContent =
            `${calcularPorcentaje(
                estadisticas.varones,
                estadisticas.total
            )}% del total`;
    }
}

function calcularPorcentaje(valor, total) {
    if (!total) {
        return 0;
    }

    return Math.round(
        (valor / total) * 100
    );
}

function actualizarIndicadores(
    estadisticas,
    lista
) {
    const progreso =
        estadisticas.progresoPromedio;

    const niveles =
        Math.min(100, progreso);

    const unidades =
        Math.min(
            100,
            Math.max(0, progreso - 3)
        );

    const ejercicios =
        Math.min(
            100,
            Math.max(0, progreso + 5)
        );

    const actividad =
        lista.length
            ? Math.min(
                100,
                Math.round(
                    lista.filter(
                        estudiante =>
                            Number(estudiante.ejercicios) > 0
                    ).length /
                    lista.length *
                    100
                )
            )
            : 0;

    actualizarIndicador(
        "indicadorNiveles",
        "barraNiveles",
        niveles
    );

    actualizarIndicador(
        "indicadorUnidades",
        "barraUnidades",
        unidades
    );

    actualizarIndicador(
        "indicadorEjercicios",
        "barraEjercicios",
        ejercicios
    );

    actualizarIndicador(
        "indicadorActividad",
        "barraActividad",
        actividad
    );
}

function actualizarIndicador(
    textoId,
    barraId,
    valor
) {
    const texto =
        obtenerElemento(textoId);

    const barra =
        obtenerElemento(barraId);

    const valorSeguro =
        Math.min(
            100,
            Math.max(
                0,
                Math.round(valor)
            )
        );

    if (texto) {
        texto.textContent =
            `${valorSeguro}%`;
    }

    if (barra) {
        barra.style.width =
            `${valorSeguro}%`;
    }
}

function actualizarResumenFinal(
    estadisticas,
    lista
) {
    const resumenNuevos =
        obtenerElemento("resumenNuevos");

    const resumenMayorProgreso =
        obtenerElemento("resumenMayorProgreso");

    const detalleMayorIdioma =
        obtenerElemento("detalleMayorIdioma");

    const resumenUnidad =
        obtenerElemento("resumenUnidad");

    const detalleResumenUnidad =
        obtenerElemento("detalleResumenUnidad");

    if (resumenNuevos) {
        resumenNuevos.textContent =
            estadisticas.total;
    }

    const idiomaMayor =
        Object.entries(
            estadisticas.idiomas
        )
            .sort(
                (a, b) => b[1] - a[1]
            )
            .find(
                item => item[1] > 0
            );

    if (resumenMayorProgreso) {
        resumenMayorProgreso.textContent =
            idiomaMayor
                ? idiomaMayor[0]
                : "Sin datos";
    }

    if (detalleMayorIdioma) {
        detalleMayorIdioma.textContent =
            idiomaMayor
                ? `${idiomaMayor[1]} estudiante${idiomaMayor[1] === 1 ? "" : "s"}`
                : "No hay registros de idioma";
    }

    const unidades =
        obtenerDatosUnidades(lista);

    if (unidades.disponible) {
        const mayor =
            unidades.datos
                .slice()
                .sort(
                    (a, b) =>
                        b.valor - a.valor
                )[0];

        if (resumenUnidad) {
            resumenUnidad.textContent =
                mayor
                    ? mayor.nombre
                    : "Sin datos";
        }

        if (detalleResumenUnidad) {
            detalleResumenUnidad.textContent =
                mayor
                    ? `${Math.round(mayor.valor)}% de avance promedio`
                    : "Sin datos";
        }
    } else {
        if (resumenUnidad) {
            resumenUnidad.textContent =
                "Sin datos";
        }

        if (detalleResumenUnidad) {
            detalleResumenUnidad.textContent =
                "Requiere registros de progreso por unidad";
        }
    }
}

function actualizarEstadoFiltros(lista) {
    const estado =
        obtenerElemento("estadoSinResultados");

    if (estado) {
        estado.hidden =
            lista.length !== 0;
    }

    const aviso =
        obtenerElemento("avisoDatos");

    const textoAviso =
        obtenerElemento("textoAvisoDatos");

    if (
        estudiantes.length ===
        estudiantesIniciales.length &&
        !localStorage.getItem(
            CONFIG_AISANKA.almacenamiento
        )
    ) {
        if (aviso) {
            aviso.classList.add("visible");
        }

        if (textoAviso) {
            textoAviso.textContent =
                "Se muestran los registros iniciales de demostración de AISANKA.";
        }
    } else {
        if (aviso) {
            aviso.classList.remove("visible");
        }
    }
}

function obtenerDatosUnidades(lista) {
    const unidades = new Map();

    lista.forEach(estudiante => {
        const fuente =
            estudiante.unidades ||
            estudiante.progresoUnidades ||
            estudiante.progreso_unidades ||
            estudiante.unidadesProgreso;

        if (!fuente) {
            return;
        }

        if (Array.isArray(fuente)) {
            fuente.forEach(item => {
                const nombre =
                    obtenerValor(
                        item,
                        "nombre",
                        "unidad",
                        "titulo"
                    );

                const valor =
                    Number(
                        obtenerValor(
                            item,
                            "progreso",
                            "avance",
                            "porcentaje"
                        )
                    );

                if (
                    nombre &&
                    Number.isFinite(valor)
                ) {
                    if (!unidades.has(nombre)) {
                        unidades.set(
                            nombre,
                            {
                                suma: 0,
                                cantidad: 0
                            }
                        );
                    }

                    const actual =
                        unidades.get(nombre);

                    actual.suma +=
                        Math.min(
                            100,
                            Math.max(0, valor)
                        );

                    actual.cantidad++;
                }
            });
        }

        if (
            typeof fuente === "object" &&
            !Array.isArray(fuente)
        ) {
            Object.entries(fuente).forEach(
                ([nombre, valor]) => {
                    const numero =
                        Number(
                            typeof valor === "object"
                                ? obtenerValor(
                                    valor,
                                    "progreso",
                                    "avance",
                                    "porcentaje"
                                )
                                : valor
                        );

                    if (
                        Number.isFinite(numero)
                    ) {
                        if (!unidades.has(nombre)) {
                            unidades.set(
                                nombre,
                                {
                                    suma: 0,
                                    cantidad: 0
                                }
                            );
                        }

                        const actual =
                            unidades.get(nombre);

                        actual.suma +=
                            Math.min(
                                100,
                                Math.max(0, numero)
                            );

                        actual.cantidad++;
                    }
                }
            );
        }
    });

    const datos =
        Array.from(unidades.entries())
            .map(
                ([nombre, valor]) => ({
                    nombre,
                    valor:
                        valor.cantidad
                            ? valor.suma /
                              valor.cantidad
                            : 0
                })
            );

    return {
        disponible:
            datos.length > 0,
        datos
    };
}

function destruirGraficas() {
    Object.values(graficas).forEach(
        grafica => {
            if (grafica) {
                grafica.destroy();
            }
        }
    );

    graficas = {};
}

function crearGradiente(
    canvas,
    inicio,
    fin
) {
    const ctx =
        canvas.getContext("2d");

    const gradiente =
        ctx.createLinearGradient(
            0,
            0,
            canvas.width,
            0
        );

    gradiente.addColorStop(
        0,
        inicio
    );

    gradiente.addColorStop(
        1,
        fin
    );

    return gradiente;
}

function opcionesBase() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 700
        },
        plugins: {
            legend: {
                labels: {
                    color: "#53645e",
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 14,
                    font: {
                        size: 10
                    }
                }
            },
            tooltip: {
                backgroundColor: "#0b3d34",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                padding: 10,
                cornerRadius: 8
            }
        }
    };
}

function crearGraficas(
    lista,
    estadisticas
) {
    if (
        typeof Chart ===
        "undefined"
    ) {
        return;
    }

    destruirGraficas();

    crearGraficaIdiomas(
        estadisticas
    );

    crearGraficaSexo(
        estadisticas
    );

    crearGraficaGrados(
        estadisticas
    );

    crearGraficaAvance(
        lista
    );

    crearGraficaUnidades(
        lista
    );

    crearGraficaEstado(
        estadisticas
    );

    crearGraficaDistribucion(
        lista
    );
}

function crearGraficaIdiomas(
    estadisticas
) {
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
                estadisticas.idiomas[idioma] || 0
        );

    graficas.idiomas =
        new Chart(
            canvas,
            {
                type: "doughnut",
                data: {
                    labels:
                        CONFIG_AISANKA.idiomas,
                    datasets: [
                        {
                            data: cantidades,
                            backgroundColor: [
                                "#176b5b",
                                "#d6a52c",
                                "#4b8f7a",
                                "#8db35b",
                                "#2f5d4e"
                            ],
                            borderColor: "#ffffff",
                            borderWidth: 3,
                            hoverOffset: 9
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "65%",
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                color: "#ffffff",
                                usePointStyle: true,
                                pointStyle: "circle",
                                padding: 12,
                                font: {
                                    size: 10
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: "#082f28",
                            callbacks: {
                                label: contexto => {
                                    const valor =
                                        Number(
                                            contexto.raw
                                        ) || 0;

                                    const porcentaje =
                                        calcularPorcentaje(
                                            valor,
                                            estadisticas.total
                                        );

                                    return ` ${contexto.label}: ${valor} (${porcentaje}%)`;
                                }
                            }
                        }
                    }
                }
            }
        );
}

function crearGraficaSexo(
    estadisticas
) {
    const canvas =
        obtenerElemento(
            "graficaSexo"
        );

    if (!canvas) {
        return;
    }

    graficas.sexo =
        new Chart(
            canvas,
            {
                type: "doughnut",
                data: {
                    labels: [
                        "Mujeres",
                        "Varones"
                    ],
                    datasets: [
                        {
                            data: [
                                estadisticas.mujeres,
                                estadisticas.varones
                            ],
                            backgroundColor: [
                                "#d6a52c",
                                "#176b5b"
                            ],
                            borderColor: "#ffffff",
                            borderWidth: 3,
                            hoverOffset: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "68%",
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                color: "#53645e",
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                    size: 10
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: contexto =>
                                    ` ${contexto.label}: ${contexto.raw} estudiante${contexto.raw === 1 ? "" : "s"}`
                            }
                        }
                    }
                }
            }
        );
}

function crearGraficaGrados(
    estadisticas
) {
    const canvas =
        obtenerElemento(
            "graficaGrados"
        );

    if (!canvas) {
        return;
    }

    const gradiente =
        crearGradiente(
            canvas,
            "#176b5b",
            "#d6a52c"
        );

    graficas.grados =
        new Chart(
            canvas,
            {
                type: "bar",
                data: {
                    labels: [
                        "1ro",
                        "2do",
                        "3ro",
                        "4to",
                        "5to",
                        "6to"
                    ],
                    datasets: [
                        {
                            label: "Estudiantes",
                            data: [
                                estadisticas.grados[1],
                                estadisticas.grados[2],
                                estadisticas.grados[3],
                                estadisticas.grados[4],
                                estadisticas.grados[5],
                                estadisticas.grados[6]
                            ],
                            backgroundColor: gradiente,
                            borderRadius: 8,
                            borderSkipped: false
                        }
                    ]
                },
                options: {
                    ...opcionesBase(),
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                                color: "#71807b"
                            },
                            grid: {
                                color: "rgba(23,107,91,.08)"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#71807b"
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
}

function crearGraficaAvance(
    lista
) {
    const canvas =
        obtenerElemento(
            "graficaAvance"
        );

    if (!canvas) {
        return;
    }

    const nombres =
        lista.map(
            estudiante =>
                estudiante.primerNombre ||
                "Estudiante"
        );

    const avances =
        lista.map(
            estudiante =>
                Number(
                    estudiante.avance
                ) || 0
        );

    const gradiente =
        crearGradiente(
            canvas,
            "#105044",
            "#d6a52c"
        );

    graficas.avance =
        new Chart(
            canvas,
            {
                type: "bar",
                data: {
                    labels: nombres,
                    datasets: [
                        {
                            label: "Avance",
                            data: avances,
                            backgroundColor: gradiente,
                            borderRadius: 9,
                            borderSkipped: false,
                            minBarLength: 5
                        }
                    ]
                },
                options: {
                    ...opcionesBase(),
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                                color: "#71807b",
                                callback: valor =>
                                    `${valor}%`
                            },
                            grid: {
                                color: "rgba(23,107,91,.08)"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#71807b",
                                maxRotation: 35,
                                minRotation: 0
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: contexto =>
                                    ` Avance: ${contexto.raw}%`
                            }
                        }
                    }
                }
            }
        );
}

function crearGraficaUnidades(
    lista
) {
    const canvas =
        obtenerElemento(
            "graficaUnidades"
        );

    const estado =
        obtenerElemento(
            "estadoUnidades"
        );

    const subtitulo =
        obtenerElemento(
            "subtituloUnidades"
        );

    if (!canvas) {
        return;
    }

    const datos =
        obtenerDatosUnidades(lista);

    if (!datos.disponible) {
        canvas.style.display = "none";

        if (estado) {
            estado.hidden = false;
        }

        if (subtitulo) {
            subtitulo.textContent =
                "No existen avances registrados por unidad";
        }

        return;
    }

    canvas.style.display = "block";

    if (estado) {
        estado.hidden = true;
    }

    if (subtitulo) {
        subtitulo.textContent =
            "Promedio de avance registrado por unidad";
    }

    const gradiente =
        crearGradiente(
            canvas,
            "#176b5b",
            "#d6a52c"
        );

    graficas.unidades =
        new Chart(
            canvas,
            {
                type: "bar",
                data: {
                    labels:
                        datos.datos.map(
                            item =>
                                item.nombre
                        ),
                    datasets: [
                        {
                            label: "Avance",
                            data:
                                datos.datos.map(
                                    item =>
                                        Math.round(
                                            item.valor
                                        )
                                ),
                            backgroundColor: gradiente,
                            borderRadius: 8,
                            borderSkipped: false
                        }
                    ]
                },
                options: {
                    ...opcionesBase(),
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                color: "#71807b",
                                callback: valor =>
                                    `${valor}%`
                            },
                            grid: {
                                color: "rgba(23,107,91,.08)"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#71807b"
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
}

function crearGraficaEstado(
    estadisticas
) {
    const canvas =
        obtenerElemento(
            "graficaEstado"
        );

    if (!canvas) {
        return;
    }

    graficas.estado =
        new Chart(
            canvas,
            {
                type: "doughnut",
                data: {
                    labels: [
                        "Activos",
                        "Inactivos"
                    ],
                    datasets: [
                        {
                            data: [
                                estadisticas.activos,
                                estadisticas.inactivos
                            ],
                            backgroundColor: [
                                "#176b5b",
                                "#d6a52c"
                            ],
                            borderColor: "#ffffff",
                            borderWidth: 3,
                            hoverOffset: 8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "68%",
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                color: "#53645e",
                                usePointStyle: true,
                                padding: 15,
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            }
        );
}

function crearGraficaDistribucion(
    lista
) {
    const canvas =
        obtenerElemento(
            "graficaDistribucionProgreso"
        );

    if (!canvas) {
        return;
    }

    const rangos = [
        {
            nombre: "0 - 25%",
            minimo: 0,
            maximo: 25
        },
        {
            nombre: "26 - 50%",
            minimo: 26,
            maximo: 50
        },
        {
            nombre: "51 - 75%",
            minimo: 51,
            maximo: 75
        },
        {
            nombre: "76 - 100%",
            minimo: 76,
            maximo: 100
        }
    ];

    const cantidades =
        rangos.map(
            rango =>
                lista.filter(
                    estudiante => {
                        const progreso =
                            Number(
                                estudiante.avance
                            ) || 0;

                        return (
                            progreso >=
                            rango.minimo &&
                            progreso <=
                            rango.maximo
                        );
                    }
                ).length
        );

    const gradiente =
        crearGradiente(
            canvas,
            "#0b3d34",
            "#d6a52c"
        );

    graficas.distribucion =
        new Chart(
            canvas,
            {
                type: "bar",
                data: {
                    labels:
                        rangos.map(
                            rango =>
                                rango.nombre
                        ),
                    datasets: [
                        {
                            label:
                                "Estudiantes",
                            data:
                                cantidades,
                            backgroundColor:
                                gradiente,
                            borderRadius: 8,
                            borderSkipped: false
                        }
                    ]
                },
                options: {
                    ...opcionesBase(),
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0,
                                color: "#71807b"
                            },
                            grid: {
                                color: "rgba(23,107,91,.08)"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#71807b"
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        );
}

function configurarFiltros() {
    const aplicar =
        obtenerElemento(
            "botonAplicarFiltros"
        );

    const limpiar =
        obtenerElemento(
            "botonLimpiarFiltros"
        );

    if (aplicar) {
        aplicar.addEventListener(
            "click",
            aplicarFiltros
        );
    }

    if (limpiar) {
        limpiar.addEventListener(
            "click",
            limpiarFiltros
        );
    }
}

function configurarPerfilDocente() {
    const perfil =
        obtenerElemento(
            "perfilDocente"
        );

    const cerrar =
        obtenerElemento(
            "cerrarPerfilDocente"
        );

    const overlay =
        obtenerElemento(
            "overlayPerfilDocente"
        );

    if (perfil) {
        perfil.addEventListener(
            "click",
            abrirPerfilDocente
        );
    }

    if (cerrar) {
        cerrar.addEventListener(
            "click",
            cerrarPerfilDocente
        );
    }

    if (overlay) {
        overlay.addEventListener(
            "click",
            cerrarPerfilDocente
        );
    }
}

function actualizarPerfilDocente() {
    document
        .querySelectorAll(
            "[data-docente-nombre]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.nombre;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-correo]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.correo;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-rol]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.rol;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-centro]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.centro;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-ubicacion]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    `${CONFIG_AISANKA.docente.municipio}, ${CONFIG_AISANKA.docente.departamento}`;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-grado]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.grado;
            }
        );

    document
        .querySelectorAll(
            "[data-docente-idiomas]"
        )
        .forEach(
            elemento => {
                elemento.textContent =
                    CONFIG_AISANKA.docente.idiomaActual;
            }
        );

    const total =
        obtenerElemento(
            "perfilTotalEstudiantes"
        );

    if (total) {
        total.textContent =
            estudiantes.length;
    }
}

function abrirPerfilDocente() {
    const modal =
        obtenerElemento(
            "modalPerfilDocente"
        );

    if (!modal) {
        return;
    }

    modal.classList.add(
        "activo"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}

function cerrarPerfilDocente() {
    const modal =
        obtenerElemento(
            "modalPerfilDocente"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "activo"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
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
        () => {
            sessionStorage.removeItem(
                CONFIG_AISANKA.sesion
            );

            window.location.href =
                "/";
        }
    );
}

async function convertirCanvasAImagen(
    canvas
) {
    return canvas.toDataURL(
        "image/png",
        1
    );
}

function cargarImagenPDF(ruta) {
    return new Promise(
        (resolver, rechazar) => {
            const imagen =
                new Image();

            imagen.onload = () =>
                resolver(imagen);

            imagen.onerror = () =>
                rechazar(
                    new Error(
                        `No se pudo cargar ${ruta}`
                    )
                );

            imagen.src = ruta;
        }
    );
}

function agregarFondoPDF(
    pdf,
    imagen
) {
    const ancho =
        pdf.internal.pageSize.getWidth();

    const alto =
        pdf.internal.pageSize.getHeight();

    const ratioImagen =
        imagen.width /
        imagen.height;

    const ratioPagina =
        ancho /
        alto;

    let anchoFinal =
        ancho;

    let altoFinal =
        alto;

    let x = 0;
    let y = 0;

    if (ratioImagen > ratioPagina) {
        altoFinal = alto;
        anchoFinal =
            altoFinal *
            ratioImagen;
        x =
            (ancho - anchoFinal) /
            2;
    } else {
        anchoFinal = ancho;
        altoFinal =
            anchoFinal /
            ratioImagen;
        y =
            (alto - altoFinal) /
            2;
    }

    pdf.addImage(
        imagen,
        "PNG",
        x,
        y,
        anchoFinal,
        altoFinal
    );
}

function agregarCabeceraPDF(
    pdf,
    titulo,
    subtitulo
) {
    const ancho =
        pdf.internal.pageSize.getWidth();

    pdf.setFillColor(
        11,
        61,
        52
    );

    pdf.roundedRect(
        14,
        14,
        ancho - 28,
        27,
        5,
        5,
        "F"
    );

    pdf.setTextColor(
        255,
        255,
        255
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(
        17
    );

    pdf.text(
        titulo,
        23,
        26
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(
        8
    );

    pdf.text(
        subtitulo,
        23,
        34
    );
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
        7
    );

    pdf.setTextColor(
        95,
        110,
        104
    );

    pdf.text(
        "AISANKA - El idioma que une a Nicaragua",
        16,
        alto - 9
    );

    pdf.text(
        `Página ${pagina}`,
        ancho - 35,
        alto - 9
    );
}

function dibujarTarjetaPDF(
    pdf,
    x,
    y,
    ancho,
    alto,
    titulo,
    valor,
    detalle
) {
    pdf.setFillColor(
        255,
        255,
        255
    );

    pdf.setDrawColor(
        220,
        231,
        226
    );

    pdf.roundedRect(
        x,
        y,
        ancho,
        alto,
        4,
        4,
        "FD"
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(
        8
    );

    pdf.setTextColor(
        100,
        115,
        108
    );

    pdf.text(
        titulo,
        x + 7,
        y + 9
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(
        18
    );

    pdf.setTextColor(
        16,
        80,
        68
    );

    pdf.text(
        String(valor),
        x + 7,
        y + 20
    );

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(
        7
    );

    pdf.setTextColor(
        125,
        135,
        130
    );

    pdf.text(
        detalle,
        x + 7,
        y + 27
    );
}

async function descargarPDF() {
    const boton =
        obtenerElemento(
            "botonDescargarPDF"
        );

    try {
        if (boton) {
            boton.disabled = true;
            boton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Preparando PDF...';
        }

        if (
            typeof window.jspdf ===
            "undefined"
        ) {
            await cargarJsPDF();
        }

        const {
            jsPDF
        } = window.jspdf;

        const fondo =
            await cargarImagenPDF(
                CONFIG_AISANKA.fondoPDF
            );

        const pdf =
            new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

        const ancho =
            pdf.internal.pageSize.getWidth();

        const alto =
            pdf.internal.pageSize.getHeight();

        const estadisticas =
            calcularEstadisticas(
                estudiantesFiltrados
            );

        agregarFondoPDF(
            pdf,
            fondo
        );

        pdf.setFillColor(
            255,
            255,
            255
        );

        pdf.setGlobalAlpha?.(.93);

        pdf.roundedRect(
            14,
            18,
            ancho - 28,
            55,
            7,
            7,
            "F"
        );

        pdf.setGlobalAlpha?.(1);

        pdf.setTextColor(
            11,
            61,
            52
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            27
        );

        pdf.text(
            "AISANKA",
            23,
            37
        );

        pdf.setFontSize(
            14
        );

        pdf.text(
            "Reporte de estadísticas",
            23,
            48
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            8
        );

        pdf.setTextColor(
            83,
            100,
            94
        );

        pdf.text(
            "El idioma que une a Nicaragua",
            23,
            58
        );

        pdf.text(
            `Generado: ${new Date().toLocaleDateString("es-NI")}`,
            23,
            65
        );

        const anchoTarjeta =
            (ancho - 42) /
            2;

        dibujarTarjetaPDF(
            pdf,
            14,
            82,
            anchoTarjeta,
            34,
            "Estudiantes",
            estadisticas.total,
            "Registros seleccionados"
        );

        dibujarTarjetaPDF(
            pdf,
            28 + anchoTarjeta,
            82,
            anchoTarjeta,
            34,
            "Progreso general",
            `${estadisticas.progresoPromedio}%`,
            "Promedio actual"
        );

        dibujarTarjetaPDF(
            pdf,
            14,
            122,
            anchoTarjeta,
            34,
            "Mujeres",
            estadisticas.mujeres,
            `${calcularPorcentaje(
                estadisticas.mujeres,
                estadisticas.total
            )}% del total`
        );

        dibujarTarjetaPDF(
            pdf,
            28 + anchoTarjeta,
            122,
            anchoTarjeta,
            34,
            "Varones",
            estadisticas.varones,
            `${calcularPorcentaje(
                estadisticas.varones,
                estadisticas.total
            )}% del total`
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            16,
            80,
            68
        );

        pdf.text(
            "Distribución por idioma",
            14,
            178
        );

        let yIdioma = 188;

        CONFIG_AISANKA.idiomas.forEach(
            idioma => {
                const cantidad =
                    estadisticas.idiomas[
                        idioma
                    ] || 0;

                const porcentaje =
                    calcularPorcentaje(
                        cantidad,
                        estadisticas.total
                    );

                pdf.setFont(
                    "helvetica",
                    "normal"
                );

                pdf.setFontSize(
                    9
                );

                pdf.setTextColor(
                    65,
                    80,
                    75
                );

                pdf.text(
                    idioma,
                    14,
                    yIdioma
                );

                pdf.text(
                    `${cantidad} estudiante${cantidad === 1 ? "" : "s"} (${porcentaje}%)`,
                    75,
                    yIdioma
                );

                pdf.setFillColor(
                    226,
                    236,
                    232
                );

                pdf.roundedRect(
                    14,
                    yIdioma + 3,
                    ancho - 28,
                    4,
                    2,
                    2,
                    "F"
                );

                pdf.setFillColor(
                    23,
                    107,
                    91
                );

                pdf.roundedRect(
                    14,
                    yIdioma + 3,
                    (
                        ancho -
                        28
                    ) *
                    porcentaje /
                    100,
                    4,
                    2,
                    2,
                    "F"
                );

                yIdioma += 15;
            }
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            16,
            80,
            68
        );

        pdf.text(
            "Distribución por grado",
            14,
            274
        );

        let yGrado = 283;

        for (let grado = 1; grado <= 6; grado++) {
            const cantidad =
                estadisticas.grados[grado] ||
                0;

            pdf.setFont(
                "helvetica",
                "normal"
            );

            pdf.setFontSize(
                8
            );

            pdf.setTextColor(
                70,
                85,
                80
            );

            pdf.text(
                `${grado}to grado`,
                14,
                yGrado
            );

            pdf.text(
                `${cantidad} estudiante${cantidad === 1 ? "" : "s"}`,
                70,
                yGrado
            );

            yGrado += 6;
        }

        agregarPiePDF(
            pdf,
            1
        );

        const graficasPDF = [
            {
                nombre: "Idiomas enseñados",
                canvas: "graficaIdiomas"
            },
            {
                nombre: "Distribución por sexo",
                canvas: "graficaSexo"
            },
            {
                nombre: "Estudiantes por grado",
                canvas: "graficaGrados"
            },
            {
                nombre: "Avance de estudiantes",
                canvas: "graficaAvance"
            },
            {
                nombre: "Progreso por unidad",
                canvas: "graficaUnidades"
            },
            {
                nombre: "Estado de estudiantes",
                canvas: "graficaEstado"
            },
            {
                nombre: "Distribución del progreso",
                canvas: "graficaDistribucionProgreso"
            }
        ];

        let pagina = 2;

        for (
            let indice = 0;
            indice < graficasPDF.length;
            indice += 2
        ) {
            pdf.addPage();

            agregarFondoPDF(
                pdf,
                fondo
            );

            agregarCabeceraPDF(
                pdf,
                "AISANKA | Estadísticas",
                `Gráficas ${indice + 1} y ${Math.min(indice + 2, graficasPDF.length)}`
            );

            const primera =
                graficasPDF[indice];

            const segunda =
                graficasPDF[indice + 1];

            const tarjetas =
                [
                    primera,
                    segunda
                ].filter(Boolean);

            const posiciones = [
                {
                    x: 14,
                    y: 51
                },
                {
                    x: 14,
                    y: 145
                }
            ];

            for (
                let j = 0;
                j < tarjetas.length;
                j++
            ) {
                const grafica =
                    tarjetas[j];

                const canvas =
                    obtenerElemento(
                        grafica.canvas
                    );

                if (!canvas) {
                    continue;
                }

                const imagen =
                    await convertirCanvasAImagen(
                        canvas
                    );

                const posicion =
                    posiciones[j];

                pdf.setFillColor(
                    255,
                    255,
                    255
                );

                pdf.setDrawColor(
                    220,
                    231,
                    226
                );

                pdf.roundedRect(
                    posicion.x,
                    posicion.y,
                    ancho - 28,
                    84,
                    5,
                    5,
                    "FD"
                );

                pdf.setFont(
                    "helvetica",
                    "bold"
                );

                pdf.setFontSize(
                    10
                );

                pdf.setTextColor(
                    16,
                    80,
                    68
                );

                pdf.text(
                    grafica.nombre,
                    posicion.x + 7,
                    posicion.y + 10
                );

                pdf.addImage(
                    imagen,
                    "PNG",
                    posicion.x + 7,
                    posicion.y + 15,
                    ancho - 42,
                    63
                );
            }

            agregarPiePDF(
                pdf,
                pagina
            );

            pagina++;
        }

        const nombreArchivo =
            `AISANKA_Estadisticas_${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`;

        pdf.save(
            nombreArchivo
        );

        mostrarMensaje(
            "Las estadísticas y todas las gráficas fueron descargadas correctamente."
        );
    } catch (error) {
        console.error(
            "Error al generar PDF:",
            error
        );

        mostrarMensaje(
            "No fue posible generar el PDF. Verifica que fondo_pdf.png exista en recursos/img."
        );
    } finally {
        if (boton) {
            boton.disabled = false;
            boton.innerHTML =
                '<i class="fa-solid fa-file-pdf"></i><span>Descargar estadísticas</span>';
        }
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
                            "jsPDF no está disponible."
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

function configurarPDF() {
    const boton =
        obtenerElemento(
            "botonDescargarPDF"
        );

    if (boton) {
        boton.addEventListener(
            "click",
            descargarPDF
        );
    }
}

function mostrarMensaje(mensaje) {
    let contenedor =
        obtenerElemento(
            "mensajeEstadisticas"
        );

    if (!contenedor) {
        contenedor =
            document.createElement(
                "div"
            );

        contenedor.id =
            "mensajeEstadisticas";

        contenedor.style.cssText = `
            position:fixed;
            right:24px;
            bottom:24px;
            z-index:99999;
            max-width:360px;
            padding:14px 18px;
            color:#ffffff;
            background:#176b5b;
            border-radius:11px;
            box-shadow:0 12px 30px rgba(0,0,0,.2);
            font-size:12px;
            line-height:1.5;
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
            4500
        );
}

function configurarTeclado() {
    document.addEventListener(
        "keydown",
        evento => {
            if (
                evento.key ===
                "Escape"
            ) {
                cerrarPerfilDocente();
            }
        }
    );
}

function iniciarAISANKA() {
    estudiantes =
        obtenerEstudiantes();

    estudiantesFiltrados =
        [...estudiantes];

    configurarFiltros();

    configurarPerfilDocente();

    actualizarPerfilDocente();

    configurarCerrarSesion();

    configurarPDF();

    configurarTeclado();

    actualizarPanel(
        estudiantesFiltrados
    );
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

window.abrirPerfilDocente =
    abrirPerfilDocente;

window.cerrarPerfilDocente =
    cerrarPerfilDocente;

window.descargarPDF =
    descargarPDF;
}
