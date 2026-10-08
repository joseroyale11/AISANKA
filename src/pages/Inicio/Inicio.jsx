import { Link } from "react-router-dom";
import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import "../../legacy/cargarChart.js";
import "../../legacy/cargarJsPDF.js";
import estilos from "./inicio.css?inline";
import iniciarInicio from "./inicio.js";
import iniciarChat from "./chat.js";

// Si la imagen no existe, se muestra el icono predeterminado (igual que el onerror original).
function ocultarImagenRota(evento) {
  const img = evento.currentTarget;
  img.style.display = "none";
  if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
}

export default function Inicio() {
  usePaginaLegacy({
    titulo: "AISANKA - Panel de Inicio",
    estilos,
    scripts: [iniciarInicio, iniciarChat],
  });

  return (
    <>
      <div className="aplicacion">
        <aside className="menu-lateral">
          <div className="encabezado-menu">
            <img src="/recursos/img/logo.png" alt="AISANKA" className="logo-menu" />
            <div className="nombre-proyecto">
              <strong>AISANKA</strong>
              {" "}
              <span>Panel docente</span>
            </div>
          </div>
          <div className="perfil-docente">
            <div className="contenedor-foto">
              <img
                src="/assets/docente.jpg"
                alt="Docente"
                className="foto-docente"
                onError={ocultarImagenRota}
              />
              <div className="foto-predeterminada">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            <div className="datos-docente">
              <strong>Henrry Montes</strong>
              {" "}
              <span>Docente</span>
            </div>
          </div>
          <nav className="navegacion">
            <Link to="/inicio" className="elemento-menu activo">
              <i className="fa-solid fa-house"></i>
              {" "}
              <span>Inicio</span>
            </Link>
            {" "}
            <Link to="/crear-estudiante" className="elemento-menu">
              <i className="fa-solid fa-user-plus"></i>
              {" "}
              <span>Crear estudiante</span>
            </Link>
            {" "}
            <Link to="/editar-estudiante" className="elemento-menu">
              <i className="fa-solid fa-user-pen"></i>
              {" "}
              <span>Editar estudiantes</span>
            </Link>
            {" "}
            <Link to="/unidades" className="elemento-menu">
              <i className="fa-solid fa-book-open"></i>
              {" "}
              <span>Unidades</span>
            </Link>
            {" "}
            <Link to="/estadisticas" className="elemento-menu">
              <i className="fa-solid fa-chart-column"></i>
              {" "}
              <span>Estadísticas</span>
            </Link>
          </nav>
          <div className="separador-menu"></div>
          <div className="cerrar-sesion">
            <button type="button" className="elemento-menu boton-menu" id="botonCerrarSesion">
              <i className="fa-solid fa-right-from-bracket"></i>
              {" "}
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>
        <main className="contenido-principal">
          <header className="barra-superior">
            <div>
              <h1>Inicio</h1>
              <p>Resumen general del progreso de tus estudiantes</p>
            </div>
            <div className="perfil-superior"></div>
          </header>
          <section className="tarjetas-resumen">
            <article className="tarjeta-resumen">
              <div className="icono-tarjeta estudiantes">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <span>Estudiantes</span>
                {" "}
                <strong id="totalEstudiantes">5</strong>
              </div>
            </article>
            <article className="tarjeta-resumen">
              <div className="icono-tarjeta unidades">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div>
                <span>Unidades</span>
                {" "}
                <strong>4</strong>
              </div>
            </article>
            <article className="tarjeta-resumen">
              <div className="icono-tarjeta avance">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <span>Avance promedio</span>
                {" "}
                <strong id="avancePromedio">0%</strong>
              </div>
            </article>
            <article className="tarjeta-resumen">
              <div className="icono-tarjeta ejercicios">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
              <div>
                <span>Ejercicios realizados</span>
                {" "}
                <strong id="ejerciciosRealizados">0</strong>
              </div>
            </article>
          </section>
          <section className="seccion-estudiantes" id="estudiantes">
            <div className="encabezado-seccion">
              <div>
                <h2>Estudiantes</h2>
                <p>Consulta el progreso de tus estudiantes</p>
              </div>
              <div className="buscador">
                <i className="fa-solid fa-magnifying-glass"></i>
                {" "}
                <input type="text" id="buscadorEstudiantes" placeholder="Buscar estudiante..." />
                {" "}
                <button type="button" className="boton-limpiar" id="botonLimpiarBusqueda">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="contenedor-tabla">
              <table className="tabla-estudiantes">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Grado</th>
                    <th>Condición</th>
                    <th>Idioma</th>
                    <th>Avance</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaEstudiantes"></tbody>
              </table>
              <div className="sin-resultados" id="sinResultados">
                <i className="fa-solid fa-user-slash"></i>
                {" "}
                <strong>No se encontraron estudiantes</strong>
                {" "}
                <span>Intenta realizar otra búsqueda.</span>
              </div>
            </div>
          </section>
          <section className="seccion-graficas" id="graficas">
            <div className="encabezado-seccion">
              <div>
                <h2>Progreso general</h2>
                <p>Visualización del progreso y los idiomas de tus estudiantes</p>
              </div>
            </div>
            <div className="contenedor-graficas">
              <article className="tarjeta-grafica grafica-avance">
                <div className="titulo-grafica">
                  <div>
                    <h3>Avance de estudiantes</h3>
                    <span>Progreso general</span>
                  </div>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div className="area-grafica">
                  <canvas id="graficaAvance"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica grafica-idiomas">
                <div className="titulo-grafica">
                  <div>
                    <h3>Idiomas enseñados</h3>
                    <span>Estudiantes por idioma</span>
                  </div>
                  <i className="fa-solid fa-language"></i>
                </div>
                <div className="area-grafica">
                  <canvas id="graficaIdiomas"></canvas>
                </div>
              </article>
              <canvas id="graficaDiscapacidad" style={{ display: "none" }}></canvas>
              {" "}
              <canvas id="graficaActividad" style={{ display: "none" }}></canvas>
              {" "}
              <canvas id="graficaRendimiento" style={{ display: "none" }}></canvas>
            </div>
          </section>
        </main>
        <aside className="ventana-chat activo" id="ventanaChat" aria-label="Asistente IA AISANKA">
          <div className="encabezado-chat">
            <div className="informacion-chat">
              <div className="icono-chat">
                <i className="fa-solid fa-sparkles"></i>
              </div>
              <div>
                <strong>Asistente AISANKA</strong>
                {" "}
                <span>Asistente local</span>
              </div>
            </div>
          </div>
          <div className="mensajes-chat" id="mensajesChat">
            <div className="mensaje mensaje-sistema">
              <div className="avatar-mensaje">
                <i className="fa-solid fa-sparkles"></i>
              </div>
              <div className="contenido-mensaje">
                <p>Hola, soy el asistente de AISANKA. ¿En qué puedo ayudarte?</p>
                <span>Ahora</span>
              </div>
            </div>
          </div>
          <div className="sugerencias-chat" id="sugerenciasChat">
            <button type="button" data-pregunta="¿Cómo está el progreso de mis estudiantes?">Progreso</button>
            {" "}
            <button type="button" data-pregunta="¿Cuántos estudiantes tengo?">Estudiantes</button>
            {" "}
            <button type="button" data-pregunta="¿Qué puedo hacer en este panel?">Ayuda</button>
          </div>
          <form className="entrada-chat" id="formularioChat" autoComplete="off">
            <input
              type="text"
              id="entradaChat"
              placeholder="Escribe tu pregunta..."
              maxLength="300"
              aria-label="Escribe tu pregunta"
            />
            {" "}
            <button type="submit" id="enviarChat" title="Enviar mensaje">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </aside>
      </div>
    </>
  );
}
