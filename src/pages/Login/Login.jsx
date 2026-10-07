import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import estilos from "./login.css?inline";
import iniciarLogin from "./login.js";

export default function Login() {
  usePaginaLegacy({
    titulo: "AISANKA",
    estilos,
    scripts: [iniciarLogin],
  });

  return (
    <>
      <main className="contenedor-login">
        <section className="tarjeta-login">
          <div className="contenedor-logo">
            <img src="/recursos/img/logo.png" alt="Logo de AISANKA" className="logo" />
          </div>
          <div className="encabezado-login">
            <h1>Panel docente</h1>
          </div>
          <form id="formularioLogin">
            <div className="grupo-campo">
              <label htmlFor="correo">Correo electrónico</label>
              <div className="contenedor-campo">
                <i className="fa-solid fa-envelope icono-campo"></i>
                {" "}
                <input
                  type="email"
                  id="correo"
                  placeholder="Ingrese su correo"
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div className="grupo-campo">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="contenedor-campo">
                <i className="fa-solid fa-lock icono-campo"></i>
                {" "}
                <input
                  type="password"
                  id="contrasena"
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  required
                />
                {" "}
                <button
                  type="button"
                  className="boton-mostrar"
                  id="botonMostrar"
                  aria-label="Mostrar contraseña"
                >
                  <i className="fa-solid fa-eye" id="iconoOjo"></i>
                </button>
              </div>
            </div>
            <button type="submit" className="boton-iniciar">Iniciar sesión</button>
          </form>
          <div className="pie-login">
            <strong>AISANKA</strong>
            {" "}
            <span>El idioma que une a Nicaragua</span>
          </div>
        </section>
      </main>
      <div className="fondo-modal" id="ventanaError">
        <div className="modal-error">
          <button type="button" className="boton-cerrar" id="botonCerrar">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="icono-error">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 id="tituloError">Error</h2>
          <p id="mensajeError">Los datos ingresados no son correctos.</p>
          <button type="button" className="boton-entendido" id="botonEntendido">Entendido</button>
        </div>
      </div>
    </>
  );
}
