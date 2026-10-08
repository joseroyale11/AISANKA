export default function iniciarCrearEstudiante() {
const CONFIG_AISANKA = {

docente: {
    nombre: "Henrry Montes",
    rol: "Docente responsable",
    correo: "henrrymontes@gmail.com",
    centro: "CPACS",
    municipio: "Jinotega",
    departamento: "Jinotega",
    grado: "6to",
    idiomaActual: "Chino",
    foto: "/recursos/img/perfil_docente.jfif"
},

anioLectivo: "2026",

modalidad: "Diaria",

turno: "Matutino",

idiomas: {
    "Español": 1,
    "Inglés": 2,
    "Miskito": 3,
    "Mayangna": 4,
    "Chino": 5
},

condiciones: {
    "Neurotípico": 1,
    "Autismo": 2,
    "Dificultad visual": 3,
    "Dificultad auditiva": 4,
    "TDAH": 5
}

};

let datosMined = [];
let estudianteRegistrado = null;

const formulario =
document.getElementById("formularioEstudiante");

const codigoMined =
document.getElementById("codigoMined");

const buscarMined =
document.getElementById("buscarMined");

const modalAlerta =
document.getElementById("modalAlerta");

const modalExito =
document.getElementById("modalExito");

const modalPerfil =
document.getElementById("modalPerfil");

const ventanaChat =
document.getElementById("ventanaChat");

const botonChat =
document.getElementById("botonChat");

const cerrarChat =
document.getElementById("cerrarChat");

const botonPerfilDocente =
document.getElementById("botonPerfilDocente");

const botonPerfilSuperior =
document.getElementById("botonPerfilSuperior");

const cerrarPerfil =
document.getElementById("cerrarPerfil");

const cerrarAlerta =
document.getElementById("cerrarAlerta");

const cerrarExito =
document.getElementById("cerrarExito");

const descargarPdf =
document.getElementById("descargarPdf");

const botonCerrarSesion =
document.getElementById("botonCerrarSesion");

document.addEventListener(
"DOMContentLoaded",
inicializarAISANKA
);

async function inicializarAISANKA() {

establecerFechaRegistro();

establecerDatosDocente();

establecerDatosIniciales();

actualizarCantidadEstudiantes();

configurarPerfilDocente();

configurarChat();

configurarModalAlerta();

configurarModalExito();

configurarFormulario();

configurarCamposRelacionados();

await cargarDatosMined();

}

function establecerDatosIniciales() {

establecerValor(
    "modalidad",
    CONFIG_AISANKA.modalidad
);

establecerValor(
    "turno",
    CONFIG_AISANKA.turno
);

establecerValor(
    "anioLectivo",
    CONFIG_AISANKA.anioLectivo
);

establecerValor(
    "docente",
    CONFIG_AISANKA.docente.nombre
);

establecerValor(
    "estado",
    "Activo"
);

establecerValor(
    "estadoMatricula",
    "Activa"
);

}

function establecerDatosDocente() {

const docente =
    CONFIG_AISANKA.docente;


const nombreElementos =
    document.querySelectorAll(
        ".datos-docente strong, .informacion-superior strong"
    );


nombreElementos.forEach(
    elemento => {

        elemento.textContent =
            docente.nombre;

    }
);


const rolElementos =
    document.querySelectorAll(
        ".datos-docente span, .informacion-superior span"
    );


rolElementos.forEach(
    elemento => {

        elemento.textContent =
            elemento.classList.contains(
                "etiqueta-docente"
            )
                ? docente.rol
                : "Docente";

    }
);


const fotos =
    document.querySelectorAll(
        ".foto-docente, .perfil-superior img, .perfil-modal-foto img"
    );


fotos.forEach(
    foto => {

        foto.src =
            docente.foto;

        foto.alt =
            docente.nombre;

    }
);

}

async function cargarDatosMined() {

try {

    const respuesta =
        await fetch(
            "/datos_mined.json"
        );


    if (!respuesta.ok) {

        throw new Error(
            "No se pudo cargar datos_mined.json"
        );

    }


    datosMined =
        await respuesta.json();


    if (!Array.isArray(datosMined)) {

        throw new Error(
            "El archivo datos_mined.json no contiene una lista válida."
        );

    }

}
catch (error) {

    console.error(
        "Error cargando datos MINED:",
        error
    );

    mostrarAlerta(
        "No se pudo cargar la información MINED. Verifique que datos_mined.json esté en la misma carpeta y que el proyecto se ejecute mediante Live Server.",
        "Error de información MINED"
    );

}

}

function obtenerEstudiantes() {

const datos =
    localStorage.getItem(
        "estudiantesAISANKA"
    );


if (!datos) {

    return [];

}


try {

    const estudiantes =
        JSON.parse(datos);


    return Array.isArray(estudiantes)
        ? estudiantes
        : [];

}
catch (error) {

    console.error(
        "Error leyendo estudiantes:",
        error
    );

    return [];

}

}

function guardarEstudiantes(estudiantes) {

localStorage.setItem(
    "estudiantesAISANKA",
    JSON.stringify(estudiantes)
);

}

function actualizarCantidadEstudiantes() {

const estudiantes =
    obtenerEstudiantes();


const elementos =
    document.querySelectorAll(
        "#cantidadEstudiantesPerfil"
    );


elementos.forEach(
    elemento => {

        elemento.textContent =
            estudiantes.length;

    }
);

}

function calcularEdad(fecha) {

if (!fecha) {

    return "";

}


const nacimiento =
    new Date(
        `${fecha}T00:00:00`
    );


const hoy =
    new Date();


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
        hoy.getDate() <
        nacimiento.getDate()
    )
) {

    edad--;

}


return edad;

}

function obtenerFechaActual() {

const hoy =
    new Date();


const año =
    hoy.getFullYear();


const mes =
    String(
        hoy.getMonth() + 1
    ).padStart(
        2,
        "0"
    );


const dia =
    String(
        hoy.getDate()
    ).padStart(
        2,
        "0"
    );


return `${año}-${mes}-${dia}`;

}

function establecerFechaRegistro() {

establecerValor(
    "fechaRegistro",
    obtenerFechaActual()
);

}

function formatearFecha(fecha) {

if (!fecha) {

    return "";

}


const partes =
    fecha.split("-");


if (partes.length !== 3) {

    return fecha;

}


return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function normalizarCodigo(codigo) {

return String(
    codigo || ""
)
    .trim()
    .toUpperCase();

}

function mostrarAlerta(
mensaje,
titulo = "Aviso"
) {

const tituloElemento =
    document.getElementById(
        "tituloAlerta"
    );


const mensajeElemento =
    document.getElementById(
        "mensajeAlerta"
    );


if (tituloElemento) {

    tituloElemento.textContent =
        titulo;

}


if (mensajeElemento) {

    mensajeElemento.textContent =
        mensaje;

}


if (modalAlerta) {

    modalAlerta.classList.add(
        "activo"
    );

}

}

function configurarModalAlerta() {

if (!cerrarAlerta) {

    return;

}


cerrarAlerta.addEventListener(
    "click",
    () => {

        modalAlerta.classList.remove(
            "activo"
        );

    }
);


modalAlerta.addEventListener(
    "click",
    evento => {

        if (
            evento.target ===
            modalAlerta
        ) {

            modalAlerta.classList.remove(
                "activo"
            );

        }

    }
);

}

async function consultarCodigoMined() {

const codigo =
    normalizarCodigo(
        codigoMined.value
    );


if (!codigo) {

    mostrarAlerta(
        "Ingrese el código MINED del estudiante."
    );

    codigoMined.focus();

    return;

}


if (
    !/^MINED-\d{4,}$/.test(codigo)
) {

    mostrarAlerta(
        "El código MINED debe tener un formato válido. Ejemplo: MINED-0006."
    );

    codigoMined.focus();

    return;

}


if (
    datosMined.length === 0
) {

    await cargarDatosMined();

}


const estudianteMined =
    datosMined.find(
        estudiante =>
            normalizarCodigo(
                estudiante.codigoMined
            ) === codigo
    );


if (!estudianteMined) {

    limpiarDatosMined();

    mostrarAlerta(
        "El código MINED no fue encontrado en el registro.",
        "Código no encontrado"
    );

    return;

}


const camposMined = [

    "codigoMined",
    "primerNombre",
    "primerApellido",
    "fechaNacimiento",
    "sexo",
    "escuela",
    "comunidad",
    "municipio",
    "departamento",
    "grado"

];


const camposIncompletos =
    camposMined.filter(
        campo => {

            const valor =
                estudianteMined[campo];


            return (
                valor === undefined ||
                valor === null ||
                String(valor).trim() === ""
            );

        }
    );


if (
    camposIncompletos.length > 0
) {

    limpiarDatosMined();

    mostrarAlerta(
        "El registro MINED de este estudiante está incompleto.",
        "Información incompleta"
    );

    return;

}


const estudiantes =
    obtenerEstudiantes();


const yaRegistrado =
    estudiantes.some(
        estudiante =>
            normalizarCodigo(
                estudiante.codigoMined
            ) === codigo
    );


if (yaRegistrado) {

    limpiarDatosMined();

    mostrarAlerta(
        "Este código MINED ya está registrado en AISANKA.",
        "Estudiante ya registrado"
    );

    return;

}


cargarDatosFormulario(
    estudianteMined
);


codigoMined.value =
    codigo;

codigoMined.classList.add(
    "campo-cargado"
);

}

function cargarDatosFormulario(
estudiante
) {

establecerValor(
    "codigoMined",
    estudiante.codigoMined
);

establecerValor(
    "primerNombre",
    estudiante.primerNombre
);

establecerValor(
    "segundoNombre",
    estudiante.segundoNombre || ""
);

establecerValor(
    "primerApellido",
    estudiante.primerApellido
);

establecerValor(
    "segundoApellido",
    estudiante.segundoApellido || ""
);

establecerValor(
    "fechaNacimiento",
    estudiante.fechaNacimiento
);

establecerValor(
    "edad",
    `${calcularEdad(
        estudiante.fechaNacimiento
    )} años`
);

establecerValor(
    "sexo",
    estudiante.sexo
);

establecerValor(
    "escuela",
    estudiante.escuela
);

establecerValor(
    "comunidad",
    estudiante.comunidad
);

establecerValor(
    "municipio",
    estudiante.municipio
);

establecerValor(
    "departamento",
    estudiante.departamento
);

establecerValor(
    "grado",
    estudiante.grado
);


const aula =
    estudiante.aula ||
    estudiante.seccion ||
    "";


establecerValor(
    "aula",
    aula
);

establecerValor(
    "seccion",
    aula
);


establecerValor(
    "modalidad",
    CONFIG_AISANKA.modalidad
);

establecerValor(
    "turno",
    CONFIG_AISANKA.turno
);

establecerValor(
    "anioLectivo",
    CONFIG_AISANKA.anioLectivo
);

establecerValor(
    "docente",
    CONFIG_AISANKA.docente.nombre
);

establecerValor(
    "estado",
    "Activo"
);

establecerValor(
    "estadoMatricula",
    "Activa"
);

establecerValor(
    "fechaRegistro",
    obtenerFechaActual()
);


if (estudiante.correo) {

    establecerValor(
        "correo",
        estudiante.correo
    );

}


if (estudiante.accesoInternet) {

    establecerValor(
        "accesoInternet",
        estudiante.accesoInternet
    );

}


if (estudiante.tipoDispositivo) {

    establecerValor(
        "tipoDispositivo",
        estudiante.tipoDispositivo
    );

}


if (estudiante.idioma) {

    establecerValor(
        "idioma",
        estudiante.idioma
    );

}

}

function establecerValor(
id,
valor
) {

const elemento =
    document.getElementById(id);


if (elemento) {

    elemento.value =
        valor ?? "";

}

}

function limpiarDatosMined() {

const campos = [

    "primerNombre",
    "segundoNombre",
    "primerApellido",
    "segundoApellido",
    "fechaNacimiento",
    "edad",
    "sexo",
    "escuela",
    "comunidad",
    "municipio",
    "departamento",
    "grado",
    "aula",
    "seccion"

];


campos.forEach(
    id => {

        establecerValor(
            id,
            ""
        );

    }
);


establecerValor(
    "estado",
    "Activo"
);

establecerValor(
    "modalidad",
    CONFIG_AISANKA.modalidad
);

establecerValor(
    "turno",
    CONFIG_AISANKA.turno
);

establecerValor(
    "anioLectivo",
    CONFIG_AISANKA.anioLectivo
);

establecerValor(
    "docente",
    CONFIG_AISANKA.docente.nombre
);

establecerValor(
    "estadoMatricula",
    "Activa"
);

establecerValor(
    "fechaRegistro",
    obtenerFechaActual()
);


if (codigoMined) {

    codigoMined.classList.remove(
        "campo-cargado"
    );

}

}

function configurarCamposRelacionados() {

const aula =
    document.getElementById(
        "aula"
    );

const seccion =
    document.getElementById(
        "seccion"
    );


if (
    aula &&
    seccion
) {

    aula.addEventListener(
        "input",
        () => {

            seccion.value =
                aula.value;

        }
    );

}

}

function configurarFormulario() {

if (!formulario) {

    return;

}


formulario.addEventListener(
    "submit",
    registrarEstudiante
);


if (buscarMined) {

    buscarMined.addEventListener(
        "click",
        consultarCodigoMined
    );

}


if (codigoMined) {

    codigoMined.addEventListener(
        "keydown",
        evento => {

            if (
                evento.key === "Enter"
            ) {

                evento.preventDefault();

                consultarCodigoMined();

            }

        }
    );

}

}

function validarFormulario() {

const camposObligatorios = [

    "codigoMined",
    "primerNombre",
    "primerApellido",
    "fechaNacimiento",
    "sexo",
    "correo",

    "escuela",
    "comunidad",
    "municipio",
    "departamento",
    "grado",
    "aula",

    "modalidad",
    "turno",
    "anioLectivo",
    "docente",

    "idioma",
    "accesoInternet",
    "tipoDispositivo",

    "condicion",

    "primerNombreResponsable",
    "primerApellidoResponsable",
    "cedula",
    "parentesco",
    "idiomaResponsable"

];


for (
    const id of camposObligatorios
) {

    const campo =
        document.getElementById(id);


    if (
        !campo ||
        !String(
            campo.value
        ).trim()
    ) {

        if (campo) {

            campo.focus();

        }


        mostrarAlerta(
            "Debe completar todos los campos obligatorios antes de registrar al estudiante.",
            "Formulario incompleto"
        );


        return false;

    }

}


const correo =
    obtenerValor("correo");


const correoRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (
    !correoRegex.test(correo)
) {

    mostrarAlerta(
        "Ingrese un correo electrónico válido.",
        "Correo electrónico"
    );

    document
        .getElementById("correo")
        .focus();

    return false;

}


return true;

}

function obtenerValor(id) {

const elemento =
    document.getElementById(id);


return elemento
    ? String(
        elemento.value
    ).trim()
    : "";

}

function obtenerIdIdioma(
nombreIdioma
) {

return (
    CONFIG_AISANKA.idiomas[
        nombreIdioma
    ] || null
);

}

function obtenerIdCondicion(
nombreCondicion
) {

return (
    CONFIG_AISANKA.condiciones[
        nombreCondicion
    ] || null
);

}

function construirDatosBackend() {

const idioma =
    obtenerValor("idioma");

const condicion =
    obtenerValor("condicion");


const idIdioma =
    obtenerIdIdioma(
        idioma
    );


const idCondicion =
    obtenerIdCondicion(
        condicion
    );


const idAula =
    obtenerValor("aula");


return {

    estudiante: {

        primer_nombre:
            obtenerValor(
                "primerNombre"
            ),

        segundo_nombre:
            obtenerValor(
                "segundoNombre"
            ),

        primer_apellido:
            obtenerValor(
                "primerApellido"
            ),

        segundo_apellido:
            obtenerValor(
                "segundoApellido"
            ),

        correo:
            obtenerValor(
                "correo"
            ),

        fecha_nacimiento:
            obtenerValor(
                "fechaNacimiento"
            ),

        sexo:
            normalizarSexo(
                obtenerValor(
                    "sexo"
                )
            ),

        id_idioma:
            idIdioma,

        acceso_internet:
            obtenerValor(
                "accesoInternet"
            ),

        tipo_dispositivo:
            obtenerValor(
                "tipoDispositivo"
            ),

        codigo_mined:
            normalizarCodigo(
                obtenerValor(
                    "codigoMined"
                )
            )

    },

    padre: {

        cedula:
            obtenerValor(
                "cedula"
            ),

        primer_nombre:
            obtenerValor(
                "primerNombreResponsable"
            ),

        segundo_nombre:
            obtenerValor(
                "segundoNombreResponsable"
            ),

        primer_apellido:
            obtenerValor(
                "primerApellidoResponsable"
            ),

        segundo_apellido:
            obtenerValor(
                "segundoApellidoResponsable"
            ),

        telefono:
            obtenerValor(
                "telefono"
            ),

        id_idioma:
            obtenerIdIdioma(
                obtenerValor(
                    "idiomaResponsable"
                )
            ),

        parentesco:
            obtenerValor(
                "parentesco"
            )

    },

    matricula: {

        id_aula:
            idAula,

        anio_lectivo:
            obtenerValor(
                "anioLectivo"
            )

    },

    id_condicion:
        idCondicion

};

}

function normalizarSexo(
sexo
) {

const valor =
    String(
        sexo || ""
    )
        .trim()
        .toUpperCase();


if (
    valor === "F" ||
    valor === "FEMENINO"
) {

    return "F";

}


if (
    valor === "M" ||
    valor === "MASCULINO"
) {

    return "M";

}


return valor;

}

function registrarEstudiante(
evento
) {

evento.preventDefault();


if (
    !validarFormulario()
) {

    return;

}


const estudiantes =
    obtenerEstudiantes();


const codigo =
    normalizarCodigo(
        obtenerValor(
            "codigoMined"
        )
    );


const existe =
    estudiantes.some(
        estudiante =>
            normalizarCodigo(
                estudiante.codigoMined
            ) === codigo
    );


if (existe) {

    mostrarAlerta(
        "Este código MINED ya está registrado en AISANKA.",
        "Código MINED duplicado"
    );

    return;

}


const datosBackend =
    construirDatosBackend();


if (
    !datosBackend.estudiante.id_idioma
) {

    mostrarAlerta(
        "El idioma seleccionado no tiene un ID configurado.",
        "Idioma"
    );

    return;

}


if (
    !datosBackend.padre.id_idioma
) {

    mostrarAlerta(
        "El idioma del padre o tutor no tiene un ID configurado.",
        "Idioma del responsable"
    );

    return;

}


if (
    !datosBackend.id_condicion
) {

    mostrarAlerta(
        "La condición seleccionada no tiene un ID configurado.",
        "Condición"
    );

    return;

}


const nuevoId =
    estudiantes.length > 0
        ? Math.max(
            ...estudiantes.map(
                estudiante =>
                    Number(
                        estudiante.id
                    ) || 0
            )
        ) + 1
        : 1;


const nuevoEstudiante = {

    id:
        nuevoId,

    ...datosBackend.estudiante,

    edad:
        calcularEdad(
            obtenerValor(
                "fechaNacimiento"
            )
        ),

    estado:
        obtenerValor(
            "estado"
        ),

    fechaRegistro:
        obtenerValor(
            "fechaRegistro"
        ),

    escuela:
        obtenerValor(
            "escuela"
        ),

    comunidad:
        obtenerValor(
            "comunidad"
        ),

    municipio:
        obtenerValor(
            "municipio"
        ),

    departamento:
        obtenerValor(
            "departamento"
        ),

    grado:
        obtenerValor(
            "grado"
        ),

    aula:
        obtenerValor(
            "aula"
        ),

    seccion:
        obtenerValor(
            "seccion"
        ),

    modalidad:
        CONFIG_AISANKA.modalidad,

    turno:
        CONFIG_AISANKA.turno,

    anioLectivo:
        CONFIG_AISANKA.anioLectivo,

    docente:
        CONFIG_AISANKA.docente.nombre,

    estadoMatricula:
        obtenerValor(
            "estadoMatricula"
        ),

    condicion:
        obtenerValor(
            "condicion"
        ),

    id_condicion:
        datosBackend.id_condicion,

    responsable: {

        ...datosBackend.padre

    },

    padre:
        datosBackend.padre,

    matricula:
        datosBackend.matricula,

    progreso:
        0,

    avance:
        0,

    ejercicios:
        0,

    ejerciciosRealizados:
        0

};


estudiantes.push(
    nuevoEstudiante
);


guardarEstudiantes(
    estudiantes
);


estudianteRegistrado =
    nuevoEstudiante;


actualizarCantidadEstudiantes();


const nombreCompleto =
    [
        nuevoEstudiante.primer_nombre,
        nuevoEstudiante.segundo_nombre,
        nuevoEstudiante.primer_apellido,
        nuevoEstudiante.segundo_apellido
    ]
        .filter(Boolean)
        .join(" ");


const mensajeExito =
    document.getElementById(
        "mensajeExito"
    );


if (mensajeExito) {

    mensajeExito.textContent =
        `${nombreCompleto} fue registrado correctamente en AISANKA.`;

}


modalExito.classList.add(
    "activo"
);

}

function configurarModalExito() {

if (!cerrarExito) {

    return;

}


cerrarExito.addEventListener(
    "click",
    cerrarModalExito
);


modalExito.addEventListener(
    "click",
    evento => {

        if (
            evento.target ===
            modalExito
        ) {

            cerrarModalExito();

        }

    }
);


if (descargarPdf) {

    descargarPdf.addEventListener(
        "click",
        descargarPDF
    );

}

}

function cerrarModalExito() {

modalExito.classList.remove(
    "activo"
);


if (formulario) {

    formulario.reset();

}


limpiarDatosMined();

establecerFechaRegistro();

establecerDatosIniciales();

estudianteRegistrado =
    null;

}

function configurarPerfilDocente() {

if (botonPerfilDocente) {

    botonPerfilDocente.addEventListener(
        "click",
        abrirPerfilDocente
    );

}


if (botonPerfilSuperior) {

    botonPerfilSuperior.addEventListener(
        "click",
        abrirPerfilDocente
    );

}


if (cerrarPerfil) {

    cerrarPerfil.addEventListener(
        "click",
        cerrarPerfilDocente
    );

}


if (modalPerfil) {

    modalPerfil.addEventListener(
        "click",
        evento => {

            if (
                evento.target ===
                modalPerfil
            ) {

                cerrarPerfilDocente();

            }

        }
    );

}

}

function abrirPerfilDocente() {

actualizarInformacionPerfil();


if (modalPerfil) {

    modalPerfil.classList.add(
        "activo"
    );

}

}

function cerrarPerfilDocente() {

if (modalPerfil) {

    modalPerfil.classList.remove(
        "activo"
    );

}

}

function actualizarInformacionPerfil() {

const docente =
    CONFIG_AISANKA.docente;


const estudiantes =
    obtenerEstudiantes();


const nombreModal =
    modalPerfil?.querySelector(
        ".perfil-modal h2"
    );


if (nombreModal) {

    nombreModal.textContent =
        docente.nombre;

}


const etiqueta =
    modalPerfil?.querySelector(
        ".etiqueta-docente"
    );


if (etiqueta) {

    etiqueta.textContent =
        docente.rol;

}


const cantidad =
    document.getElementById(
        "cantidadEstudiantesPerfil"
    );


if (cantidad) {

    cantidad.textContent =
        estudiantes.length;

}

}

function configurarChat() {

if (botonChat) {

    botonChat.addEventListener(
        "click",
        abrirChat
    );

}


if (cerrarChat) {

    cerrarChat.addEventListener(
        "click",
        cerrarVentanaChat
    );

}

}

function abrirChat() {

if (!ventanaChat) {

    return;

}


ventanaChat.classList.add(
    "activo"
);

}

function cerrarVentanaChat() {

if (!ventanaChat) {

    return;

}


ventanaChat.classList.remove(
    "activo"
);

}

if (botonCerrarSesion) {

botonCerrarSesion.addEventListener(
    "click",
    () => {

        const confirmar =
            confirm(
                "¿Está seguro de que desea cerrar la sesión?"
            );


        if (!confirmar) {

            return;

        }


        sessionStorage.removeItem(
            "docenteSesion"
        );


        window.location.href =
            "/";

    }
);

}

async function descargarPDF() {

if (
    !estudianteRegistrado
) {

    mostrarAlerta(
        "No hay ningún estudiante registrado para generar el PDF.",
        "No se puede generar el PDF"
    );

    return;

}


if (
    !window.jspdf ||
    !window.jspdf.jsPDF
) {

    mostrarAlerta(
        "No se pudo cargar el generador PDF.",
        "Error al generar PDF"
    );

    return;

}


try {

    const {
        jsPDF
    } = window.jspdf;


    const pdf =
        new jsPDF(
            "p",
            "mm",
            "a4"
        );


    const fondo =
        await cargarImagen(
            "/recursos/img/fondo_pdf.png"
        );


    if (fondo) {

        pdf.addImage(
            fondo,
            "PNG",
            0,
            0,
            210,
            297
        );

    }


    pdf.setFillColor(
        255,
        255,
        255
    );


    pdf.roundedRect(
        10,
        10,
        190,
        277,
        5,
        5,
        "F"
    );


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
        21
    );


    pdf.text(
        "AISANKA",
        18,
        27
    );


    pdf.setFontSize(
        10
    );


    pdf.setTextColor(
        90,
        90,
        90
    );


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.text(
        "Registro oficial de estudiante",
        18,
        34
    );


    pdf.setDrawColor(
        23,
        107,
        91
    );


    pdf.line(
        18,
        39,
        192,
        39
    );


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        16
    );


    pdf.setTextColor(
        30,
        30,
        30
    );


    const nombreCompleto =
        [
            estudianteRegistrado.primer_nombre,
            estudianteRegistrado.segundo_nombre,
            estudianteRegistrado.primer_apellido,
            estudianteRegistrado.segundo_apellido
        ]
            .filter(Boolean)
            .join(" ");


    pdf.text(
        nombreCompleto,
        18,
        50
    );


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        9
    );


    pdf.setTextColor(
        100,
        100,
        100
    );


    pdf.text(
        `Código MINED: ${estudianteRegistrado.codigo_mined}`,
        18,
        57
    );


    let y =
        69;


    function tituloSeccion(
        titulo
    ) {

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
            titulo,
            18,
            y
        );


        y += 7;


        pdf.setDrawColor(
            220,
            230,
            226
        );


        pdf.line(
            18,
            y,
            192,
            y
        );


        y += 6;

    }


    function campo(
        etiqueta,
        valor
    ) {

        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            8.5
        );


        pdf.setTextColor(
            80,
            80,
            80
        );


        pdf.text(
            etiqueta,
            20,
            y
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.setTextColor(
            35,
            35,
            35
        );


        const texto =
            String(
                valor || "-"
            );


        const lineas =
            pdf.splitTextToSize(
                texto,
                125
            );


        pdf.text(
            lineas,
            65,
            y
        );


        y +=
            Math.max(
                6,
                lineas.length * 4.5
            );

    }


    tituloSeccion(
        "Información personal"
    );


    campo(
        "Primer nombre:",
        estudianteRegistrado.primer_nombre
    );


    campo(
        "Segundo nombre:",
        estudianteRegistrado.segundo_nombre
    );


    campo(
        "Primer apellido:",
        estudianteRegistrado.primer_apellido
    );


    campo(
        "Segundo apellido:",
        estudianteRegistrado.segundo_apellido
    );


    campo(
        "Fecha nacimiento:",
        formatearFecha(
            estudianteRegistrado.fecha_nacimiento
        )
    );


    campo(
        "Edad:",
        `${estudianteRegistrado.edad} años`
    );


    campo(
        "Sexo:",
        estudianteRegistrado.sexo
    );


    campo(
        "Correo:",
        estudianteRegistrado.correo
    );


    campo(
        "Idioma:",
        obtenerNombreIdiomaPorId(
            estudianteRegistrado.id_idioma
        )
    );


    y += 4;


    tituloSeccion(
        "Procedencia y matrícula"
    );


    campo(
        "Escuela:",
        estudianteRegistrado.escuela
    );


    campo(
        "Comunidad:",
        estudianteRegistrado.comunidad
    );


    campo(
        "Municipio:",
        estudianteRegistrado.municipio
    );


    campo(
        "Departamento:",
        estudianteRegistrado.departamento
    );


    campo(
        "Grado:",
        estudianteRegistrado.grado
    );


    campo(
        "Aula:",
        estudianteRegistrado.aula
    );


    campo(
        "Modalidad:",
        estudianteRegistrado.modalidad
    );


    campo(
        "Turno:",
        estudianteRegistrado.turno
    );


    campo(
        "Año lectivo:",
        estudianteRegistrado.anioLectivo
    );


    campo(
        "Docente:",
        estudianteRegistrado.docente
    );


    campo(
        "Condición:",
        estudianteRegistrado.condicion
    );


    y += 4;


    tituloSeccion(
        "Acceso tecnológico"
    );


    campo(
        "Internet:",
        estudianteRegistrado.acceso_internet
    );


    campo(
        "Dispositivo:",
        estudianteRegistrado.tipo_dispositivo
    );


    y += 4;


    tituloSeccion(
        "Padre, madre o tutor"
    );


    const padre =
        estudianteRegistrado.padre;


    campo(
        "Primer nombre:",
        padre?.primer_nombre
    );


    campo(
        "Segundo nombre:",
        padre?.segundo_nombre
    );


    campo(
        "Primer apellido:",
        padre?.primer_apellido
    );


    campo(
        "Segundo apellido:",
        padre?.segundo_apellido
    );


    campo(
        "Cédula:",
        padre?.cedula
    );


    campo(
        "Teléfono:",
        padre?.telefono
    );


    campo(
        "Parentesco:",
        padre?.parentesco
    );


    campo(
        "Idioma:",
        obtenerNombreIdiomaPorId(
            padre?.id_idioma
        )
    );


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        7.5
    );


    pdf.setTextColor(
        100,
        100,
        100
    );


    pdf.text(
        `Fecha de registro: ${formatearFecha(
            estudianteRegistrado.fechaRegistro
        )}`,
        18,
        280
    );


    pdf.text(
        "AISANKA - El idioma que une a Nicaragua",
        192,
        280,
        {
            align: "right"
        }
    );


    const nombreArchivo =
        `${estudianteRegistrado.primer_nombre}_${estudianteRegistrado.primer_apellido}_AISANKA.pdf`
            .replace(
                /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]/g,
                "_"
            );


    pdf.save(
        nombreArchivo
    );

}
catch (error) {

    console.error(
        "Error generando PDF:",
        error
    );


    mostrarAlerta(
        "Ocurrió un error al generar el PDF.",
        "Error al generar PDF"
    );

}

}

function obtenerNombreIdiomaPorId(
id
) {

const entrada =
    Object.entries(
        CONFIG_AISANKA.idiomas
    )
        .find(
            ([, valor]) =>
                Number(valor) ===
                Number(id)
        );


return entrada
    ? entrada[0]
    : "-";

}

function cargarImagen(
ruta
) {

return new Promise(
    resolve => {

        const imagen =
            new Image();


        imagen.onload =
            () => resolve(
                imagen
            );


        imagen.onerror =
            () => {

                console.warn(
                    `No se pudo cargar la imagen: ${ruta}`
                );

                resolve(null);

            };


        imagen.src =
            ruta;

    }
);

}

document.addEventListener(
"keydown",
evento => {


    if (
        evento.key !== "Escape"
    ) {

        return;

    }


    if (
        modalAlerta?.classList.contains(
            "activo"
        )
    ) {

        modalAlerta.classList.remove(
            "activo"
        );

    }


    if (
        modalExito?.classList.contains(
            "activo"
        )
    ) {

        modalExito.classList.remove(
            "activo"
        );

    }


    if (
        modalPerfil?.classList.contains(
            "activo"
        )
    ) {

        modalPerfil.classList.remove(
            "activo"
        );

    }


    if (
        ventanaChat?.classList.contains(
            "activo"
        )
    ) {

        ventanaChat.classList.remove(
            "activo"
        );

    }

}


);

}
