export default function iniciarChat() {
"use strict";

/*
    chat.js — Asistente local de AISANKA (solo el modal del chat)
    - Sin API ni Internet.
    - Lee los estudiantes de la variable global `estudiantes` (inicio.js)
      o, si no existe, de localStorage ("estudiantesAISANKA").
    - Ignora mayúsculas y tildes, y tolera errores de ortografía.
*/

document.addEventListener("DOMContentLoaded", () => {

    const $ = id => document.getElementById(id);
    const ventanaChat = $("ventanaChat");
    const botonChat = $("botonChat");
    const cerrarChat = $("cerrarChat");
    const reiniciarChat = $("reiniciarChat");
    const formularioChat = $("formularioChat");
    const entradaChat = $("entradaChat");
    const enviarChat = $("enviarChat");
    const mensajesChat = $("mensajesChat");
    const sugerenciasChat = $("sugerenciasChat");

    if (!ventanaChat || !mensajesChat || !entradaChat) {
        return;
    }

    const ICONO_BOT = "fa-wand-magic-sparkles";
    let ultimoEstudiante = null;
    let ocupado = false;


    const norm = t => String(t ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    function distancia(a, b) {
        if (a === b) return 0;
        let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            const act = [i];
            for (let j = 1; j <= b.length; j++) {
                act[j] = Math.min(
                    prev[j] + 1,
                    act[j - 1] + 1,
                    prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
                );
            }
            prev = act;
        }
        return prev[b.length];
    }

    const similitud = (a, b) => {
        const m = Math.max(a.length, b.length);
        return m ? 1 - distancia(a, b) / m : 1;
    };
    const tiene = (t, ...patrones) =>
        patrones.some(p => new RegExp("(^| )" + p).test(t));

    const VOCABULARIO = [
        "estudiante", "estudiantes", "alumno", "alumnos", "progreso", "avance",
        "ejercicios", "ejercicio", "idioma", "idiomas", "mayangna", "miskito",
        "ingles", "chino", "espanol", "autismo", "visual", "auditiva",
        "condicion", "informacion", "datos", "unidades", "clase", "entiende",
        "comprende", "actividad", "actividades", "responsable", "telefono",
        "internet", "dispositivo", "estadisticas", "promedio", "docente"
    ];

    const ALIAS = {
        misquito: "miskito", miskitu: "miskito", mayagna: "mayangna",
        mayanga: "mayangna", tdha: "tdah", english: "ingles",
        chinese: "chino", spanish: "espanol", castellano: "espanol"
    };

    function corregir(t) {
        return t.split(" ").map(w => {
            if (ALIAS[w]) return ALIAS[w];
            if (w.length < 5 || VOCABULARIO.includes(w)) return w;
            let mejor = w, punt = 0;
            for (const v of VOCABULARIO) {
                if (Math.abs(v.length - w.length) > 2) continue;
                const s = similitud(w, v);
                if (s > punt) { punt = s; mejor = v; }
            }
            return punt >= 0.78 ? mejor : w;
        }).join(" ");
    }

    const val = (v, d = "No registrado") =>
        (v === undefined || v === null || v === "") ? d : v;

    const plural = (n, s, p) => n === 1 ? s : p;

    const capitalizar = t => t.charAt(0).toUpperCase() + t.slice(1);

    const barra = v => {
        const l = Math.round(Math.max(0, Math.min(100, v)) / 10);
        return "█".repeat(l) + "░".repeat(10 - l);
    };

    function calcularEdad(f) {
        if (!f) return null;
        const n = new Date(f + "T00:00:00");
        if (Number.isNaN(n.getTime())) return null;
        const h = new Date();
        let a = h.getFullYear() - n.getFullYear();
        const m = h.getMonth() - n.getMonth();
        if (m < 0 || (m === 0 && h.getDate() < n.getDate())) a--;
        return a;
    }


    function listaEstudiantes() {
        try {
            if (typeof estudiantes !== "undefined" && Array.isArray(estudiantes)) {
                return estudiantes;
            }
        } catch (e) { /* se usa localStorage */ }

        try {
            const d = JSON.parse(localStorage.getItem("estudiantesAISANKA") || "[]");
            return Array.isArray(d) ? d : [];
        } catch (e) {
            return [];
        }
    }

    const nombreCompleto = e => [
        e.primerNombre, e.segundoNombre, e.primerApellido, e.segundoApellido
    ].filter(Boolean).join(" ").trim();

    const nombreCorto = e =>
        [e.primerNombre, e.primerApellido].filter(Boolean).join(" ").trim();

    const condicionDe = e => val(e.condicion || e.discapacidad, "No registrada");

    const ejemploNombre = () => {
        const l = listaEstudiantes();
        return l.length ? l[0].primerNombre : "Bengee";
    };

    function claveIdioma(texto) {
        const n = norm(texto);
        for (const k of ["mayangna", "miskito", "ingles", "chino", "espanol"]) {
            if (n.includes(k)) return k;
        }
        return "";
    }

    function claveCondicion(texto) {
        const n = norm(texto);
        if (n.includes("autis")) return "autismo";
        if (n.includes("visual")) return "visual";
        if (n.includes("audit")) return "auditiva";
        if (n.includes("tdah") || n.includes("tdha")) return "tdah";
        return "neurotipico";
    }


    function puntoCampo(campo, peso, texto, palabras) {
        if (!campo || campo.length < 3) return 0;
        if (campo.includes(" ")) {
            return (" " + texto + " ").includes(" " + campo + " ") ? peso : 0;
        }
        if (palabras.includes(campo)) return peso;
        if (campo.length >= 5) {
            for (const w of palabras) {
                if (w.length >= 5 && similitud(w, campo) >= 0.8) return peso * 0.8;
            }
        }
        return 0;
    }

    function buscarEstudiantes(texto) {
        const palabras = texto.split(" ");
        let mejor = 0;
        let resultado = [];

        for (const e of listaEstudiantes()) {
            const completo = norm(nombreCompleto(e));
            let p = 0;

            if (completo && (" " + texto + " ").includes(" " + completo + " ")) {
                p = 100;
            } else {
                p = puntoCampo(norm(e.primerNombre), 10, texto, palabras)
                  + puntoCampo(norm(e.primerApellido), 8, texto, palabras)
                  + puntoCampo(norm(e.segundoNombre), 3, texto, palabras)
                  + puntoCampo(norm(e.segundoApellido), 3, texto, palabras);
            }

            if (p > mejor) { mejor = p; resultado = [e]; }
            else if (p === mejor && p > 0) { resultado.push(e); }
        }

        return mejor >= 3 ? resultado : [];
    }

    const NO_NOMBRES = new Set([
        "mis", "mi", "los", "las", "todos", "todas", "la", "el", "un", "una",
        "este", "ese", "esta", "esa", "unidad", "clase", "panel", "aisanka",
        "grupo", "ella", "ellos", "plataforma", "como", "que", "cuantos",
        "cuantas", "cual", "cuales", "donde", "cuando", "esto", "eso", "aqui",
        "hoy", "los", "sus", "para", "con", "por", "del", "las", "una", "uno"
    ]);

    function nombreNoEncontrado(t) {
        if (!tiene(t, "progres", "avance", "dato", "informacion", "ficha",
            "ejercicio", "rendimiento", "como va", "quien es", "perfil",
            "ayuda para", "apoyo para")) {
            return null;
        }
        const coincidencias = t.matchAll(/(?:^| )(?:de|del|sobre|para|a)\s+([a-z]{3,})/g);
        for (const m of coincidencias) {
            const c = m[1];
            if (!NO_NOMBRES.has(c) && !VOCABULARIO.includes(c)) return c;
        }
        return null;
    }


    const APOYO_CONDICION = {
        autismo: "Autismo: usa instrucciones claras y literales, actividades estructuradas, pocos elementos en pantalla, animaciones suaves y una rutina predecible.",
        visual: "Dificultad visual: usa texto grande, buen contraste, imágenes claras y recursos que no dependan de elementos pequeños; apóyate en audio.",
        auditiva: "Dificultad auditiva: usa subtítulos, instrucciones escritas, imágenes y apoyos visuales; no dependas solo del audio.",
        tdah: "TDAH: divide la actividad en pasos cortos, da instrucciones concretas, reduce distracciones y alterna actividades para mantener la atención.",
        neurotipico: "No tiene una necesidad educativa específica registrada: mantén instrucciones claras y verifica la comprensión con ejercicios cortos."
    };

    const IDIOMAS = {
        mayangna: { nombre: "Mayangna", extra: "Prioriza vocabulario cotidiano (familia, comunidad, naturaleza) con imágenes y práctica oral repetida." },
        miskito: { nombre: "Miskito", extra: "Parte de palabras y frases de uso diario asociadas a imágenes, y practícalas en voz alta." },
        ingles: { nombre: "Inglés", extra: "Usa audio con pronunciación guiada y asocia cada palabra con una imagen antes de pasar a frases." },
        chino: { nombre: "Chino", extra: "Trabaja por partes: primero sonido e imagen, luego el carácter y por último frases cortas." },
        espanol: { nombre: "Español", extra: "Refuerza con lectura en voz alta, imágenes y frases cortas." }
    };

    function respDatos(e) {
        const edad = calcularEdad(e.fechaNacimiento);
        return [
            `Datos de ${nombreCompleto(e)}:`,
            `• Código MINED: ${val(e.codigoMined)}`,
            `• Correo: ${val(e.correo)}`,
            `• Edad: ${edad === null ? "No registrada" : edad + " años"}`,
            `• Sexo: ${val(e.sexo)}`,
            `• Grado y aula: ${val(e.grado)} - ${val(e.aula)}`,
            `• Turno: ${val(e.turno)}`,
            `• Idioma que aprende: ${val(e.idioma)}`,
            `• Condición: ${condicionDe(e)}`,
            `• Estado: ${val(e.estado)}`,
            `• Escuela: ${val(e.escuela)} (${val(e.municipio)}, ${val(e.departamento)})`,
            `• Acceso a Internet: ${val(e.accesoInternet)}`,
            `• Dispositivo: ${val(e.tipoDispositivo)}`,
            `• Responsable: ${val(e.responsable)} (${val(e.parentesco)}) - Tel. ${val(e.telefono)}`,
            `• Progreso: ${Number(e.avance) || 0}%`,
            `• Ejercicios realizados: ${Number(e.ejercicios) || 0}`
        ].join("\n");
    }

    function respProgreso(e) {
        const av = Number(e.avance) || 0;
        const ej = Number(e.ejercicios) || 0;
        let nota;

        if (av === 0 && ej === 0) {
            nota = "Aún no registra actividad en la plataforma. Puedes invitarlo a comenzar con una actividad corta.";
        } else if (av < 40) {
            nota = "Va en una etapa inicial. Conviene reforzar con actividades cortas y felicitar cada logro.";
        } else if (av < 70) {
            nota = "Lleva un avance intermedio. Puedes aumentar poco a poco la dificultad.";
        } else if (av < 100) {
            nota = "Tiene un buen avance. Mantén el ritmo y refuerza los puntos débiles.";
        } else {
            nota = "Completó el avance del idioma. ¡Excelente trabajo!";
        }

        return [
            `Progreso de ${nombreCompleto(e)}:`,
            `• Avance: ${barra(av)} ${av}%`,
            `• Idioma que aprende: ${val(e.idioma)}`,
            `• Ejercicios realizados: ${ej}`,
            `• Condición: ${condicionDe(e)}`,
            nota
        ].join("\n");
    }

    function respApoyoEstudiante(e) {
        const ci = claveIdioma(e.idioma);
        const cc = claveCondicion(e.condicion || e.discapacidad);
        const l = [
            `Recomendaciones para ${nombreCompleto(e)} (aprende ${val(e.idioma)}, condición: ${condicionDe(e)}):`,
            "• Repite la explicación con imágenes, ejemplos concretos y demostraciones.",
            "• Divide la actividad en pasos pequeños y comprueba cada paso con un ejercicio corto.",
            "• Si no hablas su idioma, apóyate en los audios y recursos multimedia de AISANKA y en un compañero, familiar o docente que lo hable."
        ];
        if (ci) l.push("• " + IDIOMAS[ci].extra);
        l.push("• " + APOYO_CONDICION[cc]);
        if (e.responsable) {
            l.push(`• Puedes coordinar con su responsable, ${e.responsable} (${val(e.parentesco)}), tel. ${val(e.telefono)}.`);
        }
        return l.join("\n");
    }

    function respEstudiante(e, t) {
        const pide = {
            barrera: tiene(t, "no (entiende|entienden|comprende|comprenden|logra|sigue|puede|atiende|participa|responde)", "dificultad", "le cuesta", "problema", "se distrae", "confundid", "no habla"),
            apoyo: tiene(t, "ayuda", "ayudar", "apoyo", "apoyar", "recomend", "estrategia", "adaptar", "que (puedo )?hago", "que hacer", "como (le )?enseno", "como trabajo", "como trabajar"),
            datos: tiene(t, "dato", "informacion", "info( |$)", "ficha", "perfil", "quien es", "dime sobre", "todo sobre"),
            progreso: tiene(t, "progres", "avance", "rendimiento", "como va", "como esta", "desempeno"),
            ejercicios: tiene(t, "ejercicio", "actividad", "tarea"),
            responsable: tiene(t, "responsable", "padre", "madre", "tutor", "telefono", "contacto", "cedula", "parentesco"),
            conectividad: tiene(t, "internet", "dispositivo", "conexion", "computadora", "tablet"),
            correo: tiene(t, "correo", "email"),
            edad: tiene(t, "edad", "cuantos anos", "nacimiento", "cumple"),
            idioma: tiene(t, "idioma", "lengua", "que aprende", "que estudia", "aprende", "estudia"),
            condicion: tiene(t, "condicion", "discapacidad", "necesidad", "diagnostico"),
            escuela: tiene(t, "escuela", "aula", "grado", "seccion", "turno", "municipio", "departamento", "comunidad", "donde")
        };

        const n = nombreCompleto(e);

        if (pide.barrera || pide.apoyo) return respApoyoEstudiante(e);
        if (pide.datos && pide.progreso) return respDatos(e);
        if (pide.progreso) return respProgreso(e);
        if (pide.ejercicios) {
            const ej = Number(e.ejercicios) || 0;
            return `${n} ha realizado ${ej} ejercicio${plural(ej, "", "s")}.`;
        }
        if (pide.responsable) {
            return `Responsable de ${n}: ${val(e.responsable)} (${val(e.parentesco)}). Teléfono: ${val(e.telefono)}.`;
        }
        if (pide.conectividad) {
            return `${n} tiene acceso a Internet: ${val(e.accesoInternet)}. Dispositivo: ${val(e.tipoDispositivo)}.`;
        }
        if (pide.correo) return `El correo de ${n} es ${val(e.correo)}.`;
        if (pide.edad) {
            const edad = calcularEdad(e.fechaNacimiento);
            return edad === null
                ? `No tengo registrada la fecha de nacimiento de ${n}.`
                : `${n} tiene ${edad} años.`;
        }
        if (pide.idioma) return `${n} está aprendiendo ${val(e.idioma, "un idioma no registrado")}.`;
        if (pide.condicion) return `${n} tiene registrada la condición: ${condicionDe(e)}.`;
        if (pide.escuela) {
            return `${n}: grado ${val(e.grado)}, aula ${val(e.aula)}, turno ${val(e.turno)}, escuela ${val(e.escuela)} (${val(e.municipio)}, ${val(e.departamento)}).`;
        }
        return respDatos(e);
    }


    function consejosBarrera(clave) {
        const id = IDIOMAS[clave];
        const l = [
            id
                ? `Si no hablas ${id.nombre} y tu estudiante no entiende la clase, esto puede ayudarte:`
                : "Si no hablas el idioma de tu estudiante y no logra entender la clase, esto puede ayudarte:",
            "• Apóyate en imágenes, objetos reales, gestos y demostraciones en lugar de explicaciones solo habladas.",
            "• Usa los audios y recursos multimedia de AISANKA para que escuche el idioma con la pronunciación correcta.",
            "• Pide apoyo puntual a un compañero que hable el idioma, al responsable del estudiante o a un docente o líder comunitario que pueda traducir lo esencial.",
            "• Si el estudiante entiende Español, úsalo como idioma puente para las instrucciones.",
            "• Habla con frases cortas, una idea a la vez, y repite con ejemplos distintos.",
            "• Comprueba la comprensión con actividades sencillas (señalar, unir, ordenar) en lugar de pedir respuestas largas.",
            "• Da más tiempo y felicita los intentos para que no se sienta presionado."
        ];
        if (id) l.push("• " + id.extra);
        l.push(`Si me dices el nombre del estudiante (por ejemplo: "ayuda para ${ejemploNombre()}") te doy recomendaciones según su idioma y condición.`);
        return l.join("\n");
    }

    function respBarrera(t) {
        const noHablo = tiene(t, "no hablo", "no domino", "no manejo", "no conozco", "no se hablar", "no se el idioma", "no entiendo", "no comprendo", "no hablamos", "no hablan");
        const noEntiende = tiene(t, "no (entiende|entienden|comprende|comprenden|logra|sigue)", "dificultad para (entender|comprender)", "no le entiendo", "no me entiende", "barrera");
        if (!noHablo && !noEntiende) return null;

        const clave = claveIdioma(t);
        const contexto = tiene(t, "estudiante", "alumno", "clase", "idioma", "nino", "nina", "explicar", "explicacion", "ensenar");
        if (!clave && !contexto) return null;

        return consejosBarrera(clave);
    }


    function textoLista(lista) {
        return lista.map(e => `• ${nombreCompleto(e)}`).join("\n");
    }

    function resumenGeneral() {
        const l = listaEstudiantes();
        if (!l.length) return "No hay estudiantes registrados actualmente.";
        const prom = Math.round(l.reduce((s, e) => s + (Number(e.avance) || 0), 0) / l.length);
        const ej = l.reduce((s, e) => s + (Number(e.ejercicios) || 0), 0);
        return [
            `Resumen del grupo (${l.length} ${plural(l.length, "estudiante", "estudiantes")}):`,
            `• Avance promedio: ${prom}%`,
            `• Ejercicios realizados en total: ${ej}`,
            ...l.map(e => `• ${nombreCorto(e)}: ${Number(e.avance) || 0}% (${val(e.idioma)})`),
            `Para ver el detalle escribe, por ejemplo: "progreso de ${ejemploNombre()}".`
        ].join("\n");
    }

    function respListaEstudiantes() {
        const l = listaEstudiantes();
        if (!l.length) return "No hay estudiantes registrados actualmente.";
        return `Tienes ${l.length} ${plural(l.length, "estudiante registrado", "estudiantes registrados")}:\n${textoLista(l)}`;
    }

    function respTotalEjercicios() {
        const l = listaEstudiantes();
        const total = l.reduce((s, e) => s + (Number(e.ejercicios) || 0), 0);
        return `Entre todos tus estudiantes se han realizado ${total} ejercicio${plural(total, "", "s")}. Pregúntame por uno en concreto: "ejercicios de ${ejemploNombre()}".`;
    }

    function respGrupo(t) {
        const l = listaEstudiantes();
        if (!l.length && tiene(t, "estudiante", "alumno")) {
            return "No hay estudiantes registrados actualmente.";
        }

        const pideGrupo = tiene(t, "quien", "quienes", "cuales", "cuantos", "que estudiantes", "que alumnos", "estudiantes (de|con|que)", "alumnos (de|con|que)", "lista");

        // Por idioma
        const ci = claveIdioma(t);
        if (ci && pideGrupo) {
            const r = l.filter(e => claveIdioma(e.idioma) === ci);
            const nombre = IDIOMAS[ci].nombre;
            if (!r.length) return `No hay estudiantes registrados actualmente con ${nombre}.`;
            return `Estudiantes que aprenden ${nombre} (${r.length}):\n${textoLista(r)}`;
        }

        // Por condición
        const cond = [
            ["autismo", "Autismo"], ["visual", "Dificultad visual"],
            ["auditiv", "Dificultad auditiva"], ["tdah", "TDAH"],
            ["neurotipico", "Neurotípico"]
        ].find(([k]) => t.includes(k));
        if (cond && pideGrupo) {
            const clave = claveCondicion(cond[0]);
            const r = l.filter(e => claveCondicion(e.condicion || e.discapacidad) === clave);
            if (!r.length) return `No hay estudiantes registrados con la condición ${cond[1]}.`;
            return `Estudiantes con ${cond[1]} (${r.length}):\n${textoLista(r)}`;
        }

        // Mejor / menor avance
        if (tiene(t, "mejor avance", "mayor avance", "mayor progreso", "mejor progreso", "mas avanzado", "va mejor", "destaca", "lidera")) {
            const o = [...l].sort((a, b) => (Number(b.avance) || 0) - (Number(a.avance) || 0));
            if (!o.length) return "No hay estudiantes registrados actualmente.";
            return `El estudiante con mayor avance es ${nombreCompleto(o[0])}, con ${Number(o[0].avance) || 0}%.`;
        }
        if (tiene(t, "menor avance", "menor progreso", "menos avance", "mas atrasado", "necesita (apoyo|refuerzo)", "va peor", "mas bajo")) {
            const o = [...l].sort((a, b) => (Number(a.avance) || 0) - (Number(b.avance) || 0));
            if (!o.length) return "No hay estudiantes registrados actualmente.";
            return `El estudiante con menor avance es ${nombreCompleto(o[0])}, con ${Number(o[0].avance) || 0}%. Puedes pedirme: "ayuda para ${o[0].primerNombre}".`;
        }

        // Internet
        if (tiene(t, "sin (acceso a )?internet", "quienes? no tienen? internet", "cuales? no tienen internet")) {
            const r = l.filter(e => norm(e.accesoInternet) === "no");
            return r.length
                ? `Estudiantes sin acceso a Internet (${r.length}):\n${textoLista(r)}`
                : "Todos tus estudiantes tienen acceso a Internet registrado.";
        }

        // Ejercicios totales
        if (tiene(t, "ejercicio") && tiene(t, "estudiantes", "total", "todos", "cuantos", "grupo")) {
            return respTotalEjercicios();
        }

        // Cantidad / lista
        if (tiene(t, "cuantos (estudiantes|alumnos)", "numero de (estudiantes|alumnos)", "cantidad de (estudiantes|alumnos)", "total de (estudiantes|alumnos)", "lista de (estudiantes|alumnos)", "nombres de (mis )?(estudiantes|alumnos)", "quienes son mis", "todos los (estudiantes|alumnos)")) {
            return respListaEstudiantes();
        }

        // Progreso general
        if (tiene(t, "progres", "avance", "rendimiento", "como (van|estan)", "resumen") &&
            tiene(t, "estudiantes", "alumnos", "grupo", "todos", "mis", "general", "resumen")) {
            return resumenGeneral();
        }

        return null;
    }


    const respuestas = [
        {
            max: 4,
            claves: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hey"],
            respuesta: () => `Hola. Soy el asistente local de AISANKA. Puedo consultar el progreso y los datos de tus estudiantes (por ejemplo: "progreso de ${ejemploNombre()}" o "datos de ${ejemploNombre()}") y orientarte cuando un estudiante no entiende una clase.`
        },
        {
            max: 5,
            claves: ["gracias", "muchas gracias", "te agradezco"],
            respuesta: "Con gusto. Si necesitas algo más, aquí estoy."
        },
        {
            max: 4,
            claves: ["adios", "hasta luego", "chao", "nos vemos"],
            respuesta: "Hasta pronto. Que tengas una excelente jornada."
        },
        {
            claves: ["que puedes hacer", "que haces", "para que sirves", "ayuda", "ayudame", "como funcionas", "que puedo preguntar", "comandos"],
            respuesta: () => {
                const n = ejemploNombre();
                return [
                    "Puedo ayudarte con:",
                    `• Progreso de un estudiante: "progreso de ${n}"`,
                    `• Datos de un estudiante: "datos de ${n}"`,
                    `• Ejercicios, idioma, condición o responsable: "condición de ${n}"`,
                    `• Recomendaciones para un estudiante: "ayuda para ${n}"`,
                    "• Consultas del grupo: \"quiénes aprenden Miskito\", \"resumen del grupo\"",
                    "• Situaciones de aula: \"¿qué hago si no hablo Mayangna y mi estudiante no entiende la clase?\""
                ].join("\n");
            }
        },
        {
            claves: ["que es aisanka", "aisanka", "para que sirve aisanka"],
            respuesta: "AISANKA es una plataforma educativa orientada al aprendizaje de idiomas y al seguimiento del progreso de los estudiantes."
        },
        {
            claves: ["progreso", "avance", "rendimiento"],
            respuesta: () => resumenGeneral()
        },
        {
            claves: ["estudiantes", "alumnos"],
            respuesta: () => respListaEstudiantes()
        },
        {
            claves: ["ejercicios", "actividades"],
            respuesta: () => respTotalEjercicios()
        },
        {
            claves: ["unidades", "cuantas unidades", "numero de unidades"],
            respuesta: "El panel muestra 4 unidades. Puedes revisarlas en la sección Unidades del menú."
        },
        {
            claves: ["idiomas", "que idiomas ensenamos", "idiomas disponibles", "idiomas de aisanka"],
            respuesta: "AISANKA trabaja con cinco idiomas: Español, Inglés, Chino, Miskito y Mayangna."
        },
        {
            claves: ["grafica", "graficas", "estadisticas", "estadistica"],
            respuesta: "Las gráficas muestran el avance de cada estudiante y la distribución de los idiomas. Para más detalle está la sección Estadísticas del menú."
        },
        {
            claves: ["buscar estudiante", "como busco", "buscador", "como buscar"],
            respuesta: "Usa el buscador de la sección Estudiantes: puedes escribir nombre, código MINED, idioma, condición o aula. También puedes preguntarme directamente por su nombre."
        },
        {
            claves: ["crear estudiante", "agregar estudiante", "registrar estudiante", "nuevo estudiante", "como registro"],
            respuesta: "Para registrar un estudiante entra a Crear estudiante en el menú lateral, completa el formulario y guarda. Aparecerá en la tabla de Inicio."
        },
        {
            claves: ["editar estudiante", "modificar estudiante", "cambiar datos", "actualizar datos"],
            respuesta: "En la tabla de estudiantes pulsa el botón del lápiz para editar sus datos, o entra a Editar estudiantes en el menú."
        },
        {
            claves: ["eliminar estudiante", "borrar estudiante", "quitar estudiante"],
            respuesta: "En la tabla de estudiantes pulsa el botón de la papelera y confirma. Esta acción lo quita del panel actual."
        },
        {
            claves: ["descargar pdf", "ficha del estudiante", "imprimir", "exportar", "pdf"],
            respuesta: "Pulsa el botón del ojo en la tabla para abrir la ficha del estudiante y ahí usa la opción de descargar PDF."
        },
        {
            claves: ["cerrar sesion", "salir del panel"],
            respuesta: "Usa el botón Cerrar sesión al final del menú lateral."
        },
        {
            claves: ["cerrar chat", "cerrar asistente"],
            respuesta: "Puedes cerrar esta ventana con el botón de cierre en la parte superior del asistente."
        },
        {
            claves: ["no quiere participar", "no participa", "desmotivado", "sin motivacion", "no quiere trabajar", "no tiene interes"],
            respuesta: [
                "Si un estudiante no quiere participar, prueba esto:",
                "• Empieza con actividades muy sencillas donde pueda acertar y sentirse capaz.",
                "• Relaciona el idioma con cosas de su vida diaria: familia, comunidad, juegos.",
                "• Reconoce cada intento, no solo los aciertos.",
                "• Permite que trabaje en parejas con un compañero de confianza.",
                "• Conversa con él o con su responsable para saber si hay otra causa (cansancio, timidez, falta de comprensión)."
            ].join("\n")
        },
        {
            claves: ["se distrae", "distraido", "no pone atencion", "no se concentra", "falta de atencion"],
            respuesta: [
                "Si un estudiante se distrae con facilidad:",
                "• Usa actividades de 5 a 10 minutos y alterna entre escuchar, mirar y hacer.",
                "• Da una sola instrucción a la vez.",
                "• Reduce elementos innecesarios en pantalla y en el aula.",
                "• Usa recordatorios visuales y refuerzos positivos frecuentes."
            ].join("\n")
        },
        {
            claves: ["no tiene internet", "sin internet", "no hay internet", "sin conexion", "falla el internet"],
            respuesta: [
                "Si el estudiante no tiene Internet:",
                "• Prepara actividades impresas o dibujadas con las mismas palabras de la unidad.",
                "• Usa la práctica oral, tarjetas con imágenes y juegos en clase.",
                "• Cuando haya conexión, deja que complete los ejercicios en la plataforma.",
                "Para ver quiénes no tienen Internet pregunta: \"quiénes no tienen internet\"."
            ].join("\n")
        },
        {
            claves: ["progreso bajo", "avanza poco", "no avanza", "esta atrasado", "avance bajo"],
            respuesta: [
                "Si un estudiante avanza poco:",
                "• Revisa si el contenido está siendo demasiado largo o difícil y divídelo en pasos.",
                "• Verifica su idioma, su condición y su acceso a Internet.",
                "• Agrega práctica breve pero frecuente en lugar de sesiones largas.",
                "Escribe \"ayuda para\" y su nombre para recibir recomendaciones específicas."
            ].join("\n")
        },
        {
            claves: ["como evaluo", "verificar comprension", "saber si entendio", "comprobar comprension", "evaluar comprension"],
            respuesta: "Para comprobar la comprensión sin depender solo de palabras: pide que señale, una, ordene o dramatice; usa preguntas de sí/no y ejercicios cortos; y pide que repita con sus propias palabras o con gestos."
        },
        {
            claves: ["varios idiomas", "grupo con diferentes idiomas", "clase multilingue", "clase con varios idiomas", "idiomas diferentes"],
            respuesta: [
                "Para un grupo con idiomas distintos:",
                "• Usa recursos visuales comunes para toda la clase.",
                "• Organiza estaciones o parejas según el idioma que aprende cada estudiante.",
                "• Aprovecha a los estudiantes que hablan el idioma como apoyo entre pares.",
                "• Usa Español como idioma puente cuando todos lo entiendan."
            ].join("\n")
        },
        {
            claves: ["estudiante con autismo", "autismo", "alumno con autismo"],
            respuesta: APOYO_CONDICION.autismo
        },
        {
            claves: ["estudiante con dificultad visual", "dificultad visual", "problema visual", "alumno con dificultad visual"],
            respuesta: APOYO_CONDICION.visual
        },
        {
            claves: ["estudiante con dificultad auditiva", "dificultad auditiva", "problema auditivo", "alumno con dificultad auditiva"],
            respuesta: APOYO_CONDICION.auditiva
        },
        {
            claves: ["estudiante con tdah", "tdah", "alumno con tdah"],
            respuesta: APOYO_CONDICION.tdah
        }
    ];

    const BASE = respuestas.map(r => ({ ...r, claves: r.claves.map(norm) }));

    function buscarBase(t) {
        const nPalabras = t.split(" ").length;
        let mejor = null;
        let punt = 0;

        for (const r of BASE) {
            if (r.max && nPalabras > r.max) continue;

            for (const c of r.claves) {
                let s = 0;

                if (new RegExp("(^| )" + c).test(t)) {
                    s = 2 + c.length / 100;
                } else {
                    const partes = c.split(" ");
                    if (partes.length > 1 && partes.every(p =>
                        new RegExp("(^| )" + p.slice(0, Math.max(4, p.length - 2))).test(t))) {
                        s = 1.5 + c.length / 100;
                    } else {
                        const sm = similitud(t, c);
                        if (sm >= 0.8) s = sm;
                    }
                }

                if (s > punt) { punt = s; mejor = r; }
            }
        }

        return punt >= 0.8 ? mejor : null;
    }

    function respFallback() {
        const n = ejemploNombre();
        const opciones = [
            `No encontré una respuesta exacta. Prueba con: "progreso de ${n}", "datos de ${n}" o "¿qué hago si mi estudiante no entiende la clase?".`,
            `Puedo consultar estudiantes, progreso, idiomas y ejercicios. Escribe el nombre de un estudiante junto con "progreso" o "datos".`,
            "No tengo una respuesta para esa consulta. Intenta escribirla de otra manera o escribe \"ayuda\" para ver lo que puedo hacer."
        ];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }


    function obtenerRespuesta(pregunta) {
        const original = norm(pregunta);
        if (!original) return "Escribe una pregunta para que pueda ayudarte.";
        const t = corregir(original);

        // 1. Consulta sobre un estudiante concreto
        let encontrados = buscarEstudiantes(original);

        if (!encontrados.length && ultimoEstudiante &&
            tiene(t, "(su|sus|del mismo|de el|de ella|el mismo)( |$)") &&
            tiene(t, "progres", "dato", "informacion", "ejercicio", "idioma", "condicion", "ayuda", "apoyo", "responsable", "correo", "edad", "avance")) {
            const sigue = listaEstudiantes().some(e => String(e.id) === String(ultimoEstudiante.id));
            if (sigue) encontrados = [ultimoEstudiante];
        }

        if (encontrados.length > 1) {
            return `Encontré varios estudiantes con ese nombre:\n${textoLista(encontrados)}\n¿A cuál te refieres? Escribe su nombre completo.`;
        }

        if (encontrados.length === 1) {
            ultimoEstudiante = encontrados[0];
            return respEstudiante(encontrados[0], t);
        }

        // 2. Situaciones de aula por barrera de idioma
        const barrera = respBarrera(t);
        if (barrera) return barrera;

        // 3. Consultas de grupo
        const grupo = respGrupo(t);
        if (grupo) return grupo;

        // 4. Se pidió un estudiante que no existe
        const noExiste = nombreNoEncontrado(t);
        if (noExiste) {
            const l = listaEstudiantes();
            return `No encontré ningún estudiante llamado "${capitalizar(noExiste)}".` +
                (l.length ? `\nEstudiantes registrados:\n${textoLista(l)}` : "");
        }

        // 5. Base de conocimiento
        const base = buscarBase(t);
        if (base) {
            return typeof base.respuesta === "function" ? base.respuesta() : base.respuesta;
        }

        return respFallback();
    }


    function inyectarEstilos() {
        if ($("estilosChatModal")) return;
        const estilo = document.createElement("style");
        estilo.id = "estilosChatModal";
        estilo.textContent = `
            .encabezado-chat:has(.acciones-chat) {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }
            .acciones-chat { display: flex; gap: 6px; }
            .boton-cabecera-chat {
                width: 32px; height: 32px; border: none; border-radius: 50%;
                background: rgba(255,255,255,.18); color: #fff; cursor: pointer;
            }
            .boton-cabecera-chat:hover { background: rgba(255,255,255,.3); }
            .punto-escribiendo {
                display: inline-block; width: 6px; height: 6px; margin: 0 2px;
                border-radius: 50%; background: currentColor; opacity: .35;
                animation: puntoChat 1s infinite ease-in-out;
            }
            .punto-escribiendo:nth-child(2) { animation-delay: .15s; }
            .punto-escribiendo:nth-child(3) { animation-delay: .3s; }
            @keyframes puntoChat { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
        `;
        document.head.appendChild(estilo);
    }

    const obtenerHora = () =>
        new Date().toLocaleTimeString("es-NI", { hour: "2-digit", minute: "2-digit" });

    function escaparHTML(texto) {
        const d = document.createElement("div");
        d.textContent = texto;
        return d.innerHTML;
    }

    function desplazarChat() {
        requestAnimationFrame(() => {
            mensajesChat.scrollTop = mensajesChat.scrollHeight;
        });
    }

    function agregarMensaje(texto, tipo = "sistema") {
        const m = document.createElement("div");
        m.className = tipo === "usuario"
            ? "mensaje mensaje-usuario"
            : "mensaje mensaje-sistema";
        const icono = tipo === "usuario" ? "fa-user" : ICONO_BOT;

        m.innerHTML = `
            <div class="avatar-mensaje"><i class="fa-solid ${icono}"></i></div>
            <div class="contenido-mensaje">
                <p>${escaparHTML(texto).replace(/\n/g, "<br>")}</p>
                <span>${obtenerHora()}</span>
            </div>
        `;
        mensajesChat.appendChild(m);
        desplazarChat();
    }

    function mostrarEscribiendo() {
        const i = document.createElement("div");
        i.id = "indicadorEscribiendo";
        i.className = "mensaje mensaje-sistema mensaje-escribiendo";
        i.innerHTML = `
            <div class="avatar-mensaje"><i class="fa-solid ${ICONO_BOT}"></i></div>
            <div class="contenido-mensaje">
                <p>
                    <span class="punto-escribiendo"></span>
                    <span class="punto-escribiendo"></span>
                    <span class="punto-escribiendo"></span>
                </p>
            </div>
        `;
        mensajesChat.appendChild(i);
        desplazarChat();
    }

    function quitarEscribiendo() {
        const i = $("indicadorEscribiendo");
        if (i) i.remove();
    }

    function enviarMensaje() {
        const pregunta = entradaChat.value.trim();
        if (!pregunta || ocupado) return;

        ocupado = true;
        agregarMensaje(pregunta, "usuario");
        entradaChat.value = "";
        if (enviarChat) enviarChat.disabled = true;
        mostrarEscribiendo();

        setTimeout(() => {
            quitarEscribiendo();
            let respuesta;
            try {
                respuesta = obtenerRespuesta(pregunta);
            } catch (error) {
                console.error("Error en el asistente:", error);
                respuesta = "Ocurrió un problema al procesar tu pregunta. Intenta escribirla de otra manera.";
            }
            agregarMensaje(respuesta, "sistema");
            ocupado = false;
            if (enviarChat) enviarChat.disabled = false;
            entradaChat.focus();
        }, 600);
    }


    inyectarEstilos();

    if (formularioChat) {
        formularioChat.addEventListener("submit", evento => {
            evento.preventDefault();
            enviarMensaje();
        });
    }

    if (botonChat) {
        botonChat.addEventListener("click", () => {
            ventanaChat.classList.toggle("activo");
            if (ventanaChat.classList.contains("activo")) entradaChat.focus();
        });
    }

    if (cerrarChat) {
        cerrarChat.addEventListener("click", () => {
            ventanaChat.classList.remove("activo");
        });
    }

    if (reiniciarChat) {
        reiniciarChat.addEventListener("click", () => {
            ultimoEstudiante = null;
            mensajesChat.innerHTML = "";
            agregarMensaje("Conversación reiniciada. ¿En qué puedo ayudarte?", "sistema");
            entradaChat.value = "";
            entradaChat.focus();
        });
    }

    if (sugerenciasChat) {
        sugerenciasChat.querySelectorAll("button").forEach(boton => {
            boton.addEventListener("click", () => {
                const pregunta = boton.dataset.pregunta;
                if (!pregunta) return;
                entradaChat.value = pregunta;
                enviarMensaje();
            });
        });
    }
});
}
