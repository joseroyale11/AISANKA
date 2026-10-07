export default function iniciarEditarEstudiante() {
let estudiantes = [];
let estudianteSeleccionado = null;

const tablaEstudiantes = document.getElementById("tablaEstudiantes");
const sinEstudiantes = document.getElementById("sinEstudiantes");
const buscador = document.getElementById("buscadorEstudiante");
const filtroGrado = document.getElementById("filtroGrado");
const filtroSexo = document.getElementById("filtroSexo");
const filtroEstado = document.getElementById("filtroEstado");

const modalVerEstudiante = document.getElementById("modalVerEstudiante");
const modalEditarEstudiante = document.getElementById("modalEditarEstudiante");
const modalCambiosGuardados = document.getElementById("modalCambiosGuardados");
const modalEliminar = document.getElementById("modalEliminar");
const modalPerfil = document.getElementById("modalPerfil");

const CONFIG = {
    idiomas: {
        Español: 1,
        Inglés: 2,
        Miskito: 3,
        Mayangna: 4,
        Chino: 5
    },
    condiciones: {
        Autismo: 1,
        "Dificultad visual": 2,
        "Dificultad auditiva": 3,
        TDAH: 4,
        Neurotípico: 5
    }
};

function obtenerEstudiantes() {
    const datos = localStorage.getItem("estudiantesAISANKA");

    if (!datos) {
        return [];
    }

    try {
        const resultado = JSON.parse(datos);

        return Array.isArray(resultado)
            ? resultado
            : [];
    } catch (error) {
        console.error("Error leyendo estudiantes:", error);
        return [];
    }
}

function guardarEstudiantes() {
    localStorage.setItem(
        "estudiantesAISANKA",
        JSON.stringify(estudiantes)
    );
}

function fechaActual() {
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Nunca editado";
    }

    const partes = String(fecha).split("-");

    if (partes.length !== 3) {
        return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function calcularEdad(fecha) {
    if (!fecha) {
        return "";
    }

    const nacimiento = new Date(`${fecha}T00:00:00`);
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

function nombreCompleto(estudiante) {
    return [
        estudiante.primerNombre,
        estudiante.segundoNombre,
        estudiante.primerApellido,
        estudiante.segundoApellido
    ]
        .filter(Boolean)
        .join(" ");
}

function nombreResponsable(estudiante) {
    return [
        estudiante.primerNombrePadre,
        estudiante.segundoNombrePadre,
        estudiante.primerApellidoPadre,
        estudiante.segundoApellidoPadre
    ]
        .filter(Boolean)
        .join(" ");
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function actualizarContador(cantidad) {
    const contador =
        document.getElementById("contadorEstudiantes");

    contador.textContent =
        cantidad === 1
            ? "1 estudiante registrado"
            : `${cantidad} estudiantes registrados`;
}

function cargarGrados() {
    const grados = [
        ...new Set(
            estudiantes
                .map(estudiante => estudiante.grado)
                .filter(Boolean)
        )
    ].sort();

    const valorActual = filtroGrado.value;

    filtroGrado.innerHTML = `
        <option value="">
            Todos los grados
        </option>
    `;

    grados.forEach(grado => {
        const opcion =
            document.createElement("option");

        opcion.value = grado;
        opcion.textContent = grado;

        filtroGrado.appendChild(opcion);
    });

    if (grados.includes(valorActual)) {
        filtroGrado.value = valorActual;
    }
}

function obtenerEstudiantesFiltrados() {
    const texto =
        buscador.value
            .trim()
            .toLowerCase();

    const grado = filtroGrado.value;
    const sexo = filtroSexo.value;
    const estado = filtroEstado.value;

    return estudiantes.filter(estudiante => {
        const nombre =
            nombreCompleto(estudiante)
                .toLowerCase();

        const codigo =
            String(
                estudiante.codigoMined || ""
            ).toLowerCase();

        const coincideTexto =
            !texto ||
            nombre.includes(texto) ||
            codigo.includes(texto);

        const coincideGrado =
            !grado ||
            estudiante.grado === grado;

        const coincideSexo =
            !sexo ||
            estudiante.sexo === sexo;

        const coincideEstado =
            !estado ||
            estudiante.estado === estado;

        return (
            coincideTexto &&
            coincideGrado &&
            coincideSexo &&
            coincideEstado
        );
    });
}

function renderizarEstudiantes() {
    const filtrados =
        obtenerEstudiantesFiltrados();

    tablaEstudiantes.innerHTML = "";

    actualizarContador(filtrados.length);

    if (filtrados.length === 0) {
        sinEstudiantes.classList.add("visible");
        return;
    }

    sinEstudiantes.classList.remove("visible");

    filtrados.forEach(estudiante => {
        const fila =
            document.createElement("tr");

        const nombre =
            nombreCompleto(estudiante);

        const estado =
            estudiante.estado || "Activo";

        const claseEstado =
            estado.toLowerCase() === "activo"
                ? "activo"
                : "inactivo";

        fila.innerHTML = `
            <td>
                <div class="estudiante-nombre">
                    <div class="avatar-tabla">
                        <i class="fa-solid fa-user"></i>
                    </div>

                    <div class="nombre-tabla">
                        <strong>
                            ${escaparHTML(nombre)}
                        </strong>

                        <span>
                            ${escaparHTML(
                                estudiante.escuela ||
                                "Sin escuela"
                            )}
                        </span>
                    </div>
                </div>
            </td>

            <td>
                ${escaparHTML(
                    estudiante.codigoMined ||
                    "Sin código"
                )}
            </td>

            <td>
                ${escaparHTML(
                    estudiante.grado ||
                    "—"
                )}
            </td>

            <td>
                ${
                    estudiante.sexo === "F"
                        ? "Femenino"
                        : estudiante.sexo === "M"
                            ? "Masculino"
                            : "—"
                }
            </td>

            <td>
                <span class="estado ${claseEstado}">
                    ${escaparHTML(estado)}
                </span>
            </td>

            <td>
                ${
                    estudiante.fechaEdicion
                        ? formatearFecha(
                            estudiante.fechaEdicion
                        )
                        : "Nunca editado"
                }
            </td>

            <td>
                <div class="acciones-tabla">

                    <button
                        type="button"
                        class="boton-accion"
                        title="Consultar estudiante"
                        data-accion="consultar"
                        data-id="${escaparHTML(
                            estudiante.id
                        )}"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                    <button
                        type="button"
                        class="boton-accion editar"
                        title="Editar estudiante"
                        data-accion="editar"
                        data-id="${escaparHTML(
                            estudiante.id
                        )}"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        type="button"
                        class="boton-accion eliminar"
                        title="Eliminar estudiante"
                        data-accion="eliminar"
                        data-id="${escaparHTML(
                            estudiante.id
                        )}"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </td>
        `;

        tablaEstudiantes.appendChild(fila);
    });
}

function buscarEstudiantePorId(id) {
    return estudiantes.find(
        estudiante =>
            String(estudiante.id) === String(id)
    );
}

function obtenerDatosEstudiante(estudiante) {
    return [
        {
            titulo: "Código MINED",
            valor: estudiante.codigoMined
        },
        {
            titulo: "Primer nombre",
            valor: estudiante.primerNombre
        },
        {
            titulo: "Segundo nombre",
            valor: estudiante.segundoNombre
        },
        {
            titulo: "Primer apellido",
            valor: estudiante.primerApellido
        },
        {
            titulo: "Segundo apellido",
            valor: estudiante.segundoApellido
        },
        {
            titulo: "Correo electrónico",
            valor: estudiante.correo
        },
        {
            titulo: "Fecha de nacimiento",
            valor: estudiante.fechaNacimiento
        },
        {
            titulo: "Edad",
            valor: estudiante.fechaNacimiento
                ? `${calcularEdad(
                    estudiante.fechaNacimiento
                )} años`
                : ""
        },
        {
            titulo: "Sexo",
            valor:
                estudiante.sexo === "F"
                    ? "Femenino"
                    : estudiante.sexo === "M"
                        ? "Masculino"
                        : estudiante.sexo
        },
        {
            titulo: "Idioma",
            valor: estudiante.idioma
        },
        {
            titulo: "Acceso a internet",
            valor: estudiante.accesoInternet
        },
        {
            titulo: "Tipo de dispositivo",
            valor: estudiante.tipoDispositivo
        },
        {
            titulo: "Condición",
            valor: estudiante.condicion
        },
        {
            titulo: "Estado",
            valor: estudiante.estado
        },
        {
            titulo: "Escuela",
            valor: estudiante.escuela
        },
        {
            titulo: "Comunidad",
            valor: estudiante.comunidad
        },
        {
            titulo: "Municipio",
            valor: estudiante.municipio
        },
        {
            titulo: "Departamento",
            valor: estudiante.departamento
        },
        {
            titulo: "Grado",
            valor: estudiante.grado
        },
        {
            titulo: "Aula / Sección",
            valor: estudiante.aulaSeccion
        },
        {
            titulo: "Modalidad",
            valor: estudiante.modalidad || "Diaria"
        },
        {
            titulo: "Turno",
            valor: estudiante.turno || "Matutino"
        },
        {
            titulo: "Año lectivo",
            valor: estudiante.anioLectivo
        },
        {
            titulo: "Docente responsable",
            valor: estudiante.docente
        },
        {
            titulo: "Cédula del responsable",
            valor: estudiante.cedula
        },
        {
            titulo: "Primer nombre del responsable",
            valor: estudiante.primerNombrePadre
        },
        {
            titulo: "Segundo nombre del responsable",
            valor: estudiante.segundoNombrePadre
        },
        {
            titulo: "Primer apellido del responsable",
            valor: estudiante.primerApellidoPadre
        },
        {
            titulo: "Segundo apellido del responsable",
            valor: estudiante.segundoApellidoPadre
        },
        {
            titulo: "Teléfono",
            valor: estudiante.telefono
        },
        {
            titulo: "Idioma del responsable",
            valor: estudiante.idiomaResponsable
        },
        {
            titulo: "Parentesco",
            valor: estudiante.parentesco
        }
    ];
}

function abrirModalVer(id) {
    const estudiante =
        buscarEstudiantePorId(id);

    if (!estudiante) {
        return;
    }

    estudianteSeleccionado =
        estudiante;

    document.getElementById(
        "verNombreEstudiante"
    ).textContent =
        nombreCompleto(estudiante);

    document.getElementById(
        "verCodigoMined"
    ).textContent =
        estudiante.codigoMined ||
        "Sin código MINED";

    document.getElementById(
        "verEstado"
    ).textContent =
        estudiante.estado ||
        "Activo";

    document.getElementById(
        "verFechaRegistro"
    ).textContent =
        formatearFecha(
            estudiante.fechaRegistro
        );

    document.getElementById(
        "verFechaEdicion"
    ).textContent =
        estudiante.fechaEdicion
            ? formatearFecha(
                estudiante.fechaEdicion
            )
            : "Nunca editado";

    const contenedor =
        document.getElementById(
            "contenidoVerEstudiante"
        );

    contenedor.innerHTML = "";

    const datos =
        obtenerDatosEstudiante(
            estudiante
        );

    const grupos = [
        {
            titulo: "Información del estudiante",
            icono: "fa-id-card",
            campos: datos.slice(0, 14)
        },
        {
            titulo: "Matrícula",
            icono: "fa-school",
            campos: datos.slice(14, 24)
        },
        {
            titulo: "Padre, madre o tutor",
            icono: "fa-people-roof",
            campos: datos.slice(24)
        }
    ];

    grupos.forEach(grupo => {
        const seccion =
            document.createElement("div");

        seccion.className =
            "seccion-modal";

        const titulo =
            document.createElement("h3");

        titulo.innerHTML = `
            <i class="fa-solid ${grupo.icono}"></i>
            ${grupo.titulo}
        `;

        seccion.appendChild(titulo);

        const grid =
            document.createElement("div");

        grid.className =
            "grid-modal";

        grupo.campos.forEach(campo => {
            const contenedorCampo =
                document.createElement("div");

            contenedorCampo.className =
                "campo-modal";

            const label =
                document.createElement("label");

            label.textContent =
                campo.titulo;

            const input =
                document.createElement("input");

            input.type = "text";
            input.readOnly = true;
            input.value =
                campo.valor ?? "";

            contenedorCampo.appendChild(label);
            contenedorCampo.appendChild(input);

            grid.appendChild(
                contenedorCampo
            );
        });

        seccion.appendChild(grid);
        contenedor.appendChild(seccion);
    });

    modalVerEstudiante.classList.add("activo");
}

function cerrarModalVer() {
    modalVerEstudiante.classList.remove("activo");
}

function cargarFormularioEdicion(estudiante) {
    const valores = {
        editarId:
            estudiante.id,

        editarCodigo:
            estudiante.codigoMined,

        editarPrimerNombre:
            estudiante.primerNombre,

        editarSegundoNombre:
            estudiante.segundoNombre,

        editarPrimerApellido:
            estudiante.primerApellido,

        editarSegundoApellido:
            estudiante.segundoApellido,

        editarCorreo:
            estudiante.correo,

        editarFechaNacimiento:
            estudiante.fechaNacimiento,

        editarEdad:
            estudiante.fechaNacimiento
                ? `${calcularEdad(
                    estudiante.fechaNacimiento
                )} años`
                : "",

        editarSexo:
            estudiante.sexo,

        editarIdioma:
            estudiante.idioma,

        editarAccesoInternet:
            estudiante.accesoInternet,

        editarTipoDispositivo:
            estudiante.tipoDispositivo,

        editarCondicion:
            estudiante.condicion,

        editarEstado:
            estudiante.estado ||
            "Activo",

        editarEscuela:
            estudiante.escuela,

        editarComunidad:
            estudiante.comunidad,

        editarMunicipio:
            estudiante.municipio,

        editarDepartamento:
            estudiante.departamento,

        editarGrado:
            estudiante.grado,

        editarAulaSeccion:
            estudiante.aulaSeccion ||
            estudiante.aula,

        editarModalidad:
            "Diaria",

        editarTurno:
            "Matutino",

        editarAnio:
            estudiante.anioLectivo,

        editarDocente:
            estudiante.docente,

        editarCedula:
            estudiante.cedula,

        editarPrimerNombrePadre:
            estudiante.primerNombrePadre,

        editarSegundoNombrePadre:
            estudiante.segundoNombrePadre,

        editarPrimerApellidoPadre:
            estudiante.primerApellidoPadre,

        editarSegundoApellidoPadre:
            estudiante.segundoApellidoPadre,

        editarTelefono:
            estudiante.telefono,

        editarIdiomaResponsable:
            estudiante.idiomaResponsable,

        editarParentesco:
            estudiante.parentesco
    };

    Object.entries(valores).forEach(
        ([id, valor]) => {
            const elemento =
                document.getElementById(id);

            if (elemento) {
                elemento.value =
                    valor ?? "";
            }
        }
    );

    document.getElementById(
        "editarNombreTitulo"
    ).textContent =
        nombreCompleto(estudiante);

    document.getElementById(
        "editarCodigoTitulo"
    ).textContent =
        estudiante.codigoMined ||
        "Sin código MINED";
}

function abrirModalEditar(id) {
    const estudiante =
        buscarEstudiantePorId(id);

    if (!estudiante) {
        return;
    }

    estudianteSeleccionado =
        estudiante;

    cargarFormularioEdicion(
        estudiante
    );

    modalEditarEstudiante.classList.add(
        "activo"
    );
}

function cerrarModalEditar() {
    modalEditarEstudiante.classList.remove(
        "activo"
    );
}

function obtenerDatosFormulario() {
    return {
        id:
            document.getElementById(
                "editarId"
            ).value,

        codigoMined:
            document.getElementById(
                "editarCodigo"
            ).value.trim(),

        primerNombre:
            document.getElementById(
                "editarPrimerNombre"
            ).value.trim(),

        segundoNombre:
            document.getElementById(
                "editarSegundoNombre"
            ).value.trim(),

        primerApellido:
            document.getElementById(
                "editarPrimerApellido"
            ).value.trim(),

        segundoApellido:
            document.getElementById(
                "editarSegundoApellido"
            ).value.trim(),

        correo:
            document.getElementById(
                "editarCorreo"
            ).value.trim(),

        fechaNacimiento:
            document.getElementById(
                "editarFechaNacimiento"
            ).value,

        sexo:
            document.getElementById(
                "editarSexo"
            ).value,

        idioma:
            document.getElementById(
                "editarIdioma"
            ).value,

        accesoInternet:
            document.getElementById(
                "editarAccesoInternet"
            ).value,

        tipoDispositivo:
            document.getElementById(
                "editarTipoDispositivo"
            ).value,

        condicion:
            document.getElementById(
                "editarCondicion"
            ).value,

        estado:
            document.getElementById(
                "editarEstado"
            ).value,

        escuela:
            document.getElementById(
                "editarEscuela"
            ).value,

        comunidad:
            document.getElementById(
                "editarComunidad"
            ).value,

        municipio:
            document.getElementById(
                "editarMunicipio"
            ).value,

        departamento:
            document.getElementById(
                "editarDepartamento"
            ).value,

        grado:
            document.getElementById(
                "editarGrado"
            ).value,

        aulaSeccion:
            document.getElementById(
                "editarAulaSeccion"
            ).value,

        modalidad:
            "Diaria",

        turno:
            "Matutino",

        anioLectivo:
            document.getElementById(
                "editarAnio"
            ).value,

        docente:
            document.getElementById(
                "editarDocente"
            ).value,

        cedula:
            document.getElementById(
                "editarCedula"
            ).value.trim(),

        primerNombrePadre:
            document.getElementById(
                "editarPrimerNombrePadre"
            ).value.trim(),

        segundoNombrePadre:
            document.getElementById(
                "editarSegundoNombrePadre"
            ).value.trim(),

        primerApellidoPadre:
            document.getElementById(
                "editarPrimerApellidoPadre"
            ).value.trim(),

        segundoApellidoPadre:
            document.getElementById(
                "editarSegundoApellidoPadre"
            ).value.trim(),

        telefono:
            document.getElementById(
                "editarTelefono"
            ).value.trim(),

        idiomaResponsable:
            document.getElementById(
                "editarIdiomaResponsable"
            ).value,

        parentesco:
            document.getElementById(
                "editarParentesco"
            ).value
    };
}

function validarFormulario(datos) {
    const obligatorios = [
        {
            campo: datos.correo,
            mensaje: "Ingrese el correo electrónico."
        },
        {
            campo: datos.idioma,
            mensaje: "Seleccione el idioma del estudiante."
        },
        {
            campo: datos.accesoInternet,
            mensaje: "Seleccione el acceso a internet."
        },
        {
            campo: datos.tipoDispositivo,
            mensaje: "Seleccione el tipo de dispositivo."
        },
        {
            campo: datos.condicion,
            mensaje: "Seleccione la condición."
        },
        {
            campo: datos.anioLectivo,
            mensaje: "Ingrese el año lectivo."
        },
        {
            campo: datos.cedula,
            mensaje: "Ingrese la cédula del responsable."
        },
        {
            campo: datos.primerNombrePadre,
            mensaje: "Ingrese el primer nombre del responsable."
        },
        {
            campo: datos.primerApellidoPadre,
            mensaje: "Ingrese el primer apellido del responsable."
        },
        {
            campo: datos.idiomaResponsable,
            mensaje: "Seleccione el idioma del responsable."
        },
        {
            campo: datos.parentesco,
            mensaje: "Seleccione el parentesco."
        }
    ];

    for (const obligatorio of obligatorios) {
        if (!String(obligatorio.campo || "").trim()) {
            alert(obligatorio.mensaje);
            return false;
        }
    }

    if (
        datos.correo &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            datos.correo
        )
    ) {
        alert(
            "Ingrese un correo electrónico válido."
        );

        return false;
    }

    return true;
}

document
    .getElementById("formularioEdicion")
    .addEventListener(
        "submit",
        function(evento) {
            evento.preventDefault();

            if (!estudianteSeleccionado) {
                return;
            }

            const datos =
                obtenerDatosFormulario();

            if (!validarFormulario(datos)) {
                return;
            }

            const indice =
                estudiantes.findIndex(
                    estudiante =>
                        String(
                            estudiante.id
                        ) ===
                        String(
                            estudianteSeleccionado.id
                        )
                );

            if (indice === -1) {
                return;
            }

            const estudiante =
                estudiantes[indice];

            Object.assign(
                estudiante,
                datos
            );

            estudiante.fechaEdicion =
                fechaActual();

            estudiante.ultimaModificacion =
                new Date().toISOString();

            estudiante.idIdioma =
                CONFIG.idiomas[
                    datos.idioma
                ] || estudiante.idIdioma;

            estudiante.idCondicion =
                CONFIG.condiciones[
                    datos.condicion
                ] || estudiante.idCondicion;

            estudiantes[indice] =
                estudiante;

            estudianteSeleccionado =
                estudiante;

            guardarEstudiantes();

            cargarGrados();
            renderizarEstudiantes();

            cerrarModalEditar();

            abrirModalCambiosGuardados();
        }
    );

function abrirModalCambiosGuardados() {
    modalCambiosGuardados.classList.add(
        "activo"
    );
}

function cerrarModalCambiosGuardados() {
    modalCambiosGuardados.classList.remove(
        "activo"
    );
}

document
    .getElementById("cerrarCambiosGuardados")
    .addEventListener(
        "click",
        cerrarModalCambiosGuardados
    );

function prepararEliminar(id) {
    const estudiante =
        buscarEstudiantePorId(id);

    if (!estudiante) {
        return;
    }

    estudianteSeleccionado =
        estudiante;

    document.getElementById(
        "nombreEliminar"
    ).textContent =
        nombreCompleto(
            estudiante
        );

    modalEliminar.classList.add(
        "activo"
    );
}

function cerrarModalEliminar() {
    modalEliminar.classList.remove(
        "activo"
    );
}

document
    .getElementById("cancelarEliminar")
    .addEventListener(
        "click",
        cerrarModalEliminar
    );

document
    .getElementById("confirmarEliminar")
    .addEventListener(
        "click",
        function() {
            if (!estudianteSeleccionado) {
                return;
            }

            const indice =
                estudiantes.findIndex(
                    estudiante =>
                        String(
                            estudiante.id
                        ) ===
                        String(
                            estudianteSeleccionado.id
                        )
                );

            if (indice === -1) {
                return;
            }

            estudiantes[indice].estado =
                "Inactivo";

            estudiantes[indice].fechaEdicion =
                fechaActual();

            estudiantes[indice].ultimaModificacion =
                new Date().toISOString();

            guardarEstudiantes();

            estudianteSeleccionado =
                null;

            cerrarModalEliminar();

            cargarGrados();
            renderizarEstudiantes();
        }
    );

modalEliminar.addEventListener(
    "click",
    function(evento) {
        if (
            evento.target ===
            modalEliminar
        ) {
            cerrarModalEliminar();
        }
    }
);

tablaEstudiantes.addEventListener(
    "click",
    function(evento) {
        const boton =
            evento.target.closest(
                "[data-accion]"
            );

        if (!boton) {
            return;
        }

        const id =
            boton.dataset.id;

        const accion =
            boton.dataset.accion;

        switch (accion) {
            case "consultar":
                abrirModalVer(id);
                break;

            case "editar":
                abrirModalEditar(id);
                break;

            case "eliminar":
                prepararEliminar(id);
                break;
        }
    }
);

document
    .getElementById("cerrarModalVer")
    .addEventListener(
        "click",
        cerrarModalVer
    );

document
    .getElementById("botonCerrarVer")
    .addEventListener(
        "click",
        cerrarModalVer
    );

modalVerEstudiante.addEventListener(
    "click",
    function(evento) {
        if (
            evento.target ===
            modalVerEstudiante
        ) {
            cerrarModalVer();
        }
    }
);

document
    .getElementById("cerrarModalEditar")
    .addEventListener(
        "click",
        cerrarModalEditar
    );

document
    .getElementById("botonCancelarEdicion")
    .addEventListener(
        "click",
        cerrarModalEditar
    );

modalEditarEstudiante.addEventListener(
    "click",
    function(evento) {
        if (
            evento.target ===
            modalEditarEstudiante
        ) {
            cerrarModalEditar();
        }
    }
);

function generarPDF(estudiante) {
    if (!estudiante) {
        return;
    }

    if (
        !window.jspdf ||
        !window.jspdf.jsPDF
    ) {
        alert(
            "No se pudo cargar el generador de PDF."
        );

        return;
    }

    const { jsPDF } =
        window.jspdf;

    const pdf =
        new jsPDF(
            "p",
            "mm",
            "a4"
        );

    const margen = 18;
    const ancho = 210;

    pdf.setFillColor(
        23,
        107,
        91
    );

    pdf.rect(
        0,
        0,
        ancho,
        34,
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

    pdf.setFontSize(22);

    pdf.text(
        "AISANKA",
        margen,
        15
    );

    pdf.setFontSize(10);

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.text(
        "El idioma que une a Nicaragua",
        margen,
        22
    );

    pdf.text(
        "Ficha del estudiante",
        margen,
        28
    );

    let y = 46;

    pdf.setTextColor(
        36,
        58,
        53
    );

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(16);

    pdf.text(
        nombreCompleto(estudiante),
        margen,
        y
    );

    y += 7;

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
        110,
        120,
        116
    );

    pdf.text(
        `Código MINED: ${
            estudiante.codigoMined ||
            "Sin código"
        }`,
        margen,
        y
    );

    y += 10;

    function tituloSeccion(titulo) {
        if (y > 260) {
            pdf.addPage();
            y = 20;
        }

        pdf.setFillColor(
            237,
            245,
            242
        );

        pdf.roundedRect(
            margen,
            y,
            ancho - margen * 2,
            8,
            2,
            2,
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

        pdf.setFontSize(10);

        pdf.text(
            titulo,
            margen + 4,
            y + 5.5
        );

        y += 14;
    }

    function campo(etiqueta, valor) {
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }

        pdf.setTextColor(
            105,
            117,
            112
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(8);

        pdf.text(
            etiqueta,
            margen,
            y
        );

        pdf.setTextColor(
            36,
            58,
            53
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(10);

        const texto =
            String(
                valor || "—"
            );

        const lineas =
            pdf.splitTextToSize(
                texto,
                72
            );

        pdf.text(
            lineas,
            margen,
            y + 5
        );

        y +=
            5 +
            lineas.length * 4.5 +
            5;
    }

    tituloSeccion(
        "Información del estudiante"
    );

    campo(
        "Código MINED",
        estudiante.codigoMined
    );

    campo(
        "Primer nombre",
        estudiante.primerNombre
    );

    campo(
        "Segundo nombre",
        estudiante.segundoNombre
    );

    campo(
        "Primer apellido",
        estudiante.primerApellido
    );

    campo(
        "Segundo apellido",
        estudiante.segundoApellido
    );

    campo(
        "Correo electrónico",
        estudiante.correo
    );

    campo(
        "Fecha de nacimiento",
        estudiante.fechaNacimiento
    );

    campo(
        "Edad",
        estudiante.fechaNacimiento
            ? `${calcularEdad(
                estudiante.fechaNacimiento
            )} años`
            : ""
    );

    campo(
        "Sexo",
        estudiante.sexo === "F"
            ? "Femenino"
            : estudiante.sexo === "M"
                ? "Masculino"
                : estudiante.sexo
    );

    campo(
        "Idioma",
        estudiante.idioma
    );

    campo(
        "Acceso a internet",
        estudiante.accesoInternet
    );

    campo(
        "Tipo de dispositivo",
        estudiante.tipoDispositivo
    );

    campo(
        "Condición",
        estudiante.condicion
    );

    campo(
        "Estado",
        estudiante.estado
    );

    tituloSeccion(
        "Matrícula"
    );

    campo(
        "Escuela",
        estudiante.escuela
    );

    campo(
        "Comunidad",
        estudiante.comunidad
    );

    campo(
        "Municipio",
        estudiante.municipio
    );

    campo(
        "Departamento",
        estudiante.departamento
    );

    campo(
        "Grado",
        estudiante.grado
    );

    campo(
        "Aula / Sección",
        estudiante.aulaSeccion
    );

    campo(
        "Modalidad",
        "Diaria"
    );

    campo(
        "Turno",
        "Matutino"
    );

    campo(
        "Año lectivo",
        estudiante.anioLectivo
    );

    campo(
        "Docente responsable",
        estudiante.docente
    );

    tituloSeccion(
        "Padre, madre o tutor"
    );

    campo(
        "Cédula",
        estudiante.cedula
    );

    campo(
        "Primer nombre",
        estudiante.primerNombrePadre
    );

    campo(
        "Segundo nombre",
        estudiante.segundoNombrePadre
    );

    campo(
        "Primer apellido",
        estudiante.primerApellidoPadre
    );

    campo(
        "Segundo apellido",
        estudiante.segundoApellidoPadre
    );

    campo(
        "Teléfono",
        estudiante.telefono
    );

    campo(
        "Idioma",
        estudiante.idiomaResponsable
    );

    campo(
        "Parentesco",
        estudiante.parentesco
    );

    pdf.setFontSize(8);

    pdf.setTextColor(
        130,
        130,
        130
    );

    pdf.text(
        `Fecha de generación: ${
            formatearFecha(
                fechaActual()
            )
        }`,
        margen,
        285
    );

    pdf.text(
        "AISANKA - Panel docente",
        margen,
        290
    );

    const nombreArchivo =
        nombreCompleto(
            estudiante
        )
            .replace(
                /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g,
                ""
            )
            .replace(
                /\s+/g,
                "_"
            );

    pdf.save(
        `AISANKA_${
            nombreArchivo ||
            "estudiante"
        }.pdf`
    );
}

document
    .getElementById("botonPDFVer")
    .addEventListener(
        "click",
        function() {
            generarPDF(
                estudianteSeleccionado
            );
        }
    );

document
    .getElementById("botonPDFGuardado")
    .addEventListener(
        "click",
        function() {
            generarPDF(
                estudianteSeleccionado
            );
        }
    );


function abrirPerfil() {
    document.getElementById(
        "cantidadEstudiantesPerfil"
    ).textContent =
        estudiantes.length;

    modalPerfil.classList.add(
        "activo"
    );
}

document
    .getElementById("botonPerfilDocente")
    .addEventListener(
        "click",
        abrirPerfil
    );

document
    .getElementById("cerrarPerfil")
    .addEventListener(
        "click",
        function() {
            modalPerfil.classList.remove(
                "activo"
            );
        }
    );

modalPerfil.addEventListener(
    "click",
    function(evento) {
        if (
            evento.target ===
            modalPerfil
        ) {
            modalPerfil.classList.remove(
                "activo"
            );
        }
    }
);

document
    .getElementById("botonCerrarSesion")
    .addEventListener(
        "click",
        function() {
            sessionStorage.removeItem(
                "docenteSesion"
            );

            window.location.href =
                "/";
        }
    );

buscador.addEventListener(
    "input",
    renderizarEstudiantes
);

filtroGrado.addEventListener(
    "change",
    renderizarEstudiantes
);

filtroSexo.addEventListener(
    "change",
    renderizarEstudiantes
);

filtroEstado.addEventListener(
    "change",
    renderizarEstudiantes
);


document.addEventListener(
    "DOMContentLoaded",
    function() {
        estudiantes =
            obtenerEstudiantes();

        cargarGrados();

        renderizarEstudiantes();
    }
);
}
