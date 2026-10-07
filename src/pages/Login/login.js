export default function iniciarLogin() {
const docente = {
nombre: "Henrry Montes",
correo: "henrrymontes@gmail.com",
contrasena: "MINED2026*"
};


const formularioLogin = document.getElementById("formularioLogin");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const botonMostrar = document.getElementById("botonMostrar");
const iconoOjo = document.getElementById("iconoOjo");
const ventanaError = document.getElementById("ventanaError");
const botonCerrar = document.getElementById("botonCerrar");
const botonEntendido = document.getElementById("botonEntendido");
const tituloError = document.getElementById("tituloError");
const mensajeError = document.getElementById("mensajeError");


botonMostrar.addEventListener("click", function () {
if (campoContrasena.type === "password") {
    campoContrasena.type = "text";
    iconoOjo.classList.remove("fa-eye");
    iconoOjo.classList.add("fa-eye-slash");
    botonMostrar.setAttribute(
        "aria-label",
        "Ocultar contraseña"
    );

} 

else {
    campoContrasena.type = "password";
    iconoOjo.classList.remove("fa-eye-slash");
    iconoOjo.classList.add("fa-eye");
    botonMostrar.setAttribute(
        "aria-label",
        "Mostrar contraseña"
    );

}

});

formularioLogin.addEventListener("submit", function (evento) {
evento.preventDefault();
const correoIngresado = campoCorreo.value.trim();
const contrasenaIngresada = campoContrasena.value;
if (correoIngresado === "") {
    mostrarError(
        "Correo requerido",
        "Ingrese su correo electrónico para continuar."
    );
    campoCorreo.focus();
    return;
}

if (contrasenaIngresada === "") {
    mostrarError(
        "Contraseña requerida",
        "Ingrese su contraseña para continuar."
    );
    campoContrasena.focus();
    return;
}


const correoCorrecto =
    correoIngresado.toLowerCase() ===
    docente.correo.toLowerCase();

const contrasenaCorrecta =
    contrasenaIngresada ===
    docente.contrasena;


if (correoCorrecto && contrasenaCorrecta) {
    sessionStorage.setItem(
        "docenteSesion",
        JSON.stringify({
            nombre: docente.nombre,
            correo: docente.correo
        })
    );
    window.location.href = "/inicio";
    return;
}

if (!correoCorrecto && !contrasenaCorrecta) {
    mostrarError(
        "Datos incorrectos",
        "El correo electrónico o la contraseña no son correctos."
    );
    return;
}


if (!correoCorrecto) {
    mostrarError(
        "Correo o contraseña incorrecto",
        "El correo electrónico ingresado no corresponde al docente registrado."
    );
    campoCorreo.focus();
    return;
}


if (!contrasenaCorrecta) {
    mostrarError(
        "Contraseña o correo incorrecta",
        "El correo electrónico o la contraseña no son correctos."
    );
    campoContrasena.focus();

    return;
}

});

function mostrarError(titulo, mensaje) {
tituloError.textContent = titulo;
mensajeError.textContent = mensaje;
ventanaError.classList.add("activo");

}

function cerrarVentanaError() {

ventanaError.classList.remove("activo");

}


botonEntendido.addEventListener(
"click",
cerrarVentanaError
);


botonCerrar.addEventListener(
"click",
cerrarVentanaError
);

ventanaError.addEventListener("click", function (evento) {
if (evento.target === ventanaError) {
    cerrarVentanaError();

}

});


document.addEventListener("keydown", function (evento) {

if (
    evento.key === "Escape" &&
    ventanaError.classList.contains("activo")
) {

    cerrarVentanaError();

}

});
}
