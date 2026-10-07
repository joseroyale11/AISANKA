export default function iniciarUnidades() {
// Controla los idiomas, unidades, niveles, progreso, estados de habilitación, animaciones y cierre de sesión de la página de unidades de AISANKA.
const porcentajeNivel = 70;
const porcentajeUnidad = 90;

const idiomas = {
    espanol: {
        nombre: "Español",
        descripcion: "Ruta de aprendizaje para fortalecer la comunicación, comprensión y expresión en español.",
        avance: 0,
        unidades: [
            {
                numero: 1,
                nombre: "Explorando mi entorno",
                descripcion: "Saludos, presentaciones, vocabulario básico y expresiones utilizadas en situaciones cotidianas.",
                avance: 0,
                habilitada: true,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 2,
                nombre: "Mi comunidad",
                descripcion: "Palabras y expresiones relacionadas con las personas, lugares y actividades de la comunidad.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 3,
                nombre: "Descubriendo Nicaragua",
                descripcion: "Vocabulario relacionado con la cultura, naturaleza, identidad y diversidad de Nicaragua.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 4,
                nombre: "Comunicación cotidiana",
                descripcion: "Construcción de frases y expresiones para comunicarse en diferentes situaciones.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            }
        ]
    },

    ingles: {
        nombre: "Inglés",
        descripcion: "Ruta inicial para desarrollar vocabulario y expresiones básicas en inglés.",
        avance: 0,
        unidades: [
            {
                numero: 1,
                nombre: "Exploring my environment",
                descripcion: "Greetings, introductions and basic expressions for everyday communication.",
                avance: 0,
                habilitada: true,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 2,
                nombre: "My community",
                descripcion: "Vocabulary related to people, places and activities in the community.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 3,
                nombre: "Discovering Nicaragua",
                descripcion: "Words and expressions related to Nicaragua, culture and nature.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 4,
                nombre: "Everyday communication",
                descripcion: "Basic phrases for communicating in everyday situations.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            }
        ]
    },

    chino: {
        nombre: "Chino",
        descripcion: "Ruta introductoria para conocer expresiones, vocabulario y elementos básicos del idioma chino.",
        avance: 0,
        unidades: [
            {
                numero: 1,
                nombre: "Primeros pasos",
                descripcion: "Saludos, presentaciones y expresiones iniciales en chino.",
                avance: 0,
                habilitada: true,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 2,
                nombre: "Mi comunidad",
                descripcion: "Vocabulario básico relacionado con personas, lugares y colores.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 3,
                nombre: "Números y entorno",
                descripcion: "Números, objetos y expresiones sencillas de uso cotidiano.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 4,
                nombre: "Comunicación básica",
                descripcion: "Frases sencillas para comunicarse en situaciones comunes.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            }
        ]
    },

    miskito: {
        nombre: "Miskito",
        descripcion: "Ruta de aprendizaje orientada a la preservación y uso de la lengua miskita.",
        avance: 0,
        unidades: [
            {
                numero: 1,
                nombre: "Wan nani",
                descripcion: "Saludos, presentaciones y expresiones básicas en lengua miskita.",
                avance: 0,
                habilitada: true,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 2,
                nombre: "Mi comunidad",
                descripcion: "Vocabulario relacionado con personas, familia y comunidad.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 3,
                nombre: "Nuestro entorno",
                descripcion: "Palabras relacionadas con naturaleza, cultura y entorno.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 4,
                nombre: "Comunicación cotidiana",
                descripcion: "Expresiones utilizadas en situaciones comunes de comunicación.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            }
        ]
    },

    mayangna: {
        nombre: "Mayangna",
        descripcion: "Ruta educativa para fortalecer el aprendizaje y preservación de la lengua mayangna.",
        avance: 0,
        unidades: [
            {
                numero: 1,
                nombre: "Primeras palabras",
                descripcion: "Saludos, presentaciones y expresiones básicas en lengua mayangna.",
                avance: 0,
                habilitada: true,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 2,
                nombre: "Mi comunidad",
                descripcion: "Vocabulario inicial relacionado con personas y comunidad.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 3,
                nombre: "Nuestro entorno",
                descripcion: "Palabras relacionadas con naturaleza, cultura y territorio.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            },
            {
                numero: 4,
                nombre: "Comunicación cotidiana",
                descripcion: "Expresiones sencillas para situaciones de comunicación diaria.",
                avance: 0,
                habilitada: false,
                niveles: [0, 0, 0, 0, 0]
            }
        ]
    }
};

let idiomaActual = "espanol";

const botonesIdioma = document.querySelectorAll(".boton-idioma");
const contenedorUnidades = document.getElementById("contenedorUnidades");
const nombreIdioma = document.getElementById("nombreIdioma");
const descripcionIdioma = document.getElementById("descripcionIdioma");
const avanceIdioma = document.getElementById("avanceIdioma");
const avanceGeneral = document.getElementById("avanceGeneral");
const totalUnidades = document.getElementById("totalUnidades");
const totalNiveles = document.getElementById("totalNiveles");

function calcularAvanceIdioma(idioma) {
    const unidades = idioma.unidades;

    if (!unidades.length) {
        return 0;
    }

    const total = unidades.reduce((suma, unidad) => {
        return suma + unidad.avance;
    }, 0);

    return Math.round(total / unidades.length);
}

function actualizarAvanceIdioma(idioma) {
    idioma.avance = calcularAvanceIdioma(idioma);
}

function renderizarUnidades() {
    const idioma = idiomas[idiomaActual];

    actualizarAvanceIdioma(idioma);

    nombreIdioma.textContent = idioma.nombre;
    descripcionIdioma.textContent = idioma.descripcion;
    avanceIdioma.textContent = `${idioma.avance}%`;
    avanceGeneral.textContent = `${idioma.avance}%`;

    totalUnidades.textContent = idioma.unidades.length;

    totalNiveles.textContent = idioma.unidades.reduce((total, unidad) => {
        return total + unidad.niveles.length;
    }, 0);

    contenedorUnidades.innerHTML = "";

    idioma.unidades.forEach((unidad, indice) => {
        const tarjeta = crearTarjetaUnidad(unidad, indice, idioma);
        contenedorUnidades.appendChild(tarjeta);
    });
}

function crearTarjetaUnidad(unidad, indice, idioma) {
    const tarjeta = document.createElement("article");

    tarjeta.className = "tarjeta-unidad";

    if (!unidad.habilitada) {
        tarjeta.classList.add("bloqueada");
    }

    const estado = unidad.habilitada ? "Habilitada" : "Bloqueada";
    const claseEstado = unidad.habilitada ? "habilitada" : "bloqueada";

    const nivelesHabilitados = unidad.niveles.filter((avance, nivel) => {
        return nivel === 0
            ? unidad.habilitada
            : unidad.habilitada && puedeHabilitarNivel(unidad, nivel);
    }).length;

    tarjeta.innerHTML = `
        <div class="cabecera-tarjeta">
            <div class="numero-unidad">
                <span>${unidad.numero}</span>
                <small>UNIDAD</small>
            </div>

            <div class="estado-unidad ${claseEstado}">
                <i class="fa-solid ${unidad.habilitada ? "fa-circle-check" : "fa-lock"}"></i>
                ${estado}
            </div>
        </div>

        <div class="contenido-tarjeta">
            <span class="numero-ruta">RUTA ${String(unidad.numero).padStart(2, "0")}</span>

            <h3>${unidad.nombre}</h3>

            <p>${unidad.descripcion}</p>

            <div class="progreso-unidad">
                <div class="progreso-cabecera">
                    <span>Avance de estudiantes</span>
                    <strong>${unidad.avance}%</strong>
                </div>

                <div class="barra-progreso">
                    <div class="progreso" style="width:${unidad.avance}%"></div>
                </div>
            </div>

            <div class="resumen-niveles">
                <div>
                    <i class="fa-solid fa-layer-group"></i>
                    <span>${unidad.niveles.length} niveles</span>
                </div>

                <div>
                    <i class="fa-solid fa-unlock-keyhole"></i>
                    <span>${nivelesHabilitados} disponibles</span>
                </div>
            </div>
        </div>

        <div class="niveles">
            ${crearNiveles(unidad)}
        </div>

        <div class="control-unidad">
            <div class="condicion">
                <i class="fa-solid fa-circle-info"></i>
                <span>
                    ${
                        indice === 0
                            ? "Unidad inicial disponible."
                            : `Requiere más del ${porcentajeUnidad}% en la unidad anterior.`
                    }
                </span>
            </div>

            <button
                type="button"
                class="boton-control"
                ${puedeModificarUnidad(indice, idioma) ? "" : "disabled"}
            >
                <i class="fa-solid ${unidad.habilitada ? "fa-lock-open" : "fa-lock"}"></i>
                ${unidad.habilitada ? "Bloquear" : "Habilitar"}
            </button>
        </div>
    `;

    const boton = tarjeta.querySelector(".boton-control");

    if (boton) {
        boton.addEventListener("click", () => {
            cambiarEstadoUnidad(indice);
        });
    }

    return tarjeta;
}

function crearNiveles(unidad) {
    return unidad.niveles.map((avance, indice) => {
        const nivel = indice + 1;

        const habilitado =
            nivel === 1
                ? unidad.habilitada
                : unidad.habilitada && puedeHabilitarNivel(unidad, indice);

        if (habilitado) {
            return `
                <div class="nivel habilitado">
                    <div class="icono-nivel">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <div class="info-nivel">
                        <strong>Nivel ${nivel}</strong>
                        <small>${avance}% completado</small>
                    </div>
                </div>
            `;
        }

        return `
            <div class="nivel bloqueado">
                <div class="icono-nivel">
                    <i class="fa-solid fa-lock"></i>
                </div>

                <div class="info-nivel">
                    <strong>Nivel ${nivel}</strong>
                    <small>Bloqueado</small>
                </div>
            </div>
        `;
    }).join("");
}

function puedeHabilitarNivel(unidad, indiceNivel) {
    if (indiceNivel === 0) {
        return unidad.habilitada;
    }

    const nivelAnterior = unidad.niveles[indiceNivel - 1];

    return nivelAnterior > porcentajeNivel;
}

function puedeModificarUnidad(indice, idioma) {
    if (indice === 0) {
        return true;
    }

    const unidadAnterior = idioma.unidades[indice - 1];

    return unidadAnterior.avance > porcentajeUnidad;
}

function cambiarEstadoUnidad(indice) {
    const idioma = idiomas[idiomaActual];
    const unidad = idioma.unidades[indice];

    if (!puedeModificarUnidad(indice, idioma)) {
        mostrarAviso(
            "Unidad no disponible",
            `Más del ${porcentajeUnidad}% de los estudiantes debe completar la unidad anterior.`
        );
        return;
    }

    unidad.habilitada = !unidad.habilitada;

    if (!unidad.habilitada) {
        unidad.niveles = unidad.niveles.map(() => 0);
    }

    renderizarUnidades();
}

botonesIdioma.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesIdioma.forEach(item => {
            item.classList.remove("activo");
        });

        boton.classList.add("activo");
        idiomaActual = boton.dataset.idioma;

        renderizarUnidades();
    });
});

function mostrarAviso(titulo, mensaje) {
    window.alert(`${titulo}\n\n${mensaje}`);
}

const botonCerrarSesion = document.getElementById("botonCerrarSesion");
const modalCerrarSesion = document.getElementById("modalCerrarSesion");
const cancelarCerrarSesion = document.getElementById("cancelarCerrarSesion");
const confirmarCerrarSesion = document.getElementById("confirmarCerrarSesion");

botonCerrarSesion.addEventListener("click", () => {
    modalCerrarSesion.classList.add("activo");
});

cancelarCerrarSesion.addEventListener("click", () => {
    modalCerrarSesion.classList.remove("activo");
});

confirmarCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("docenteSesion");
    sessionStorage.clear();
    window.location.href = "/";
});

modalCerrarSesion.addEventListener("click", event => {
    if (event.target === modalCerrarSesion) {
        modalCerrarSesion.classList.remove("activo");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        modalCerrarSesion.classList.remove("activo");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderizarUnidades();
});
}
