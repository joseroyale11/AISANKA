import { Link } from "react-router-dom";
import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import estilos from "./unidades.css?inline";
import iniciarUnidades from "./unidades.js";

function ocultarImagenRota(evento) {
  const img = evento.currentTarget;
  img.style.display = "none";
  if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
}

export default function Unidades() {
  usePaginaLegacy({
    titulo: "AISANKA | Unidades",
    estilos,
    scripts: [iniciarUnidades],
  });

  return (
    <>
      <div className="aplicacion">
        <aside className="menu-lateral">
          <div className="encabezado-menu">
            <img src="/recursos/img/logo.png" alt="Logo AISANKA" className="logo-menu" />
            <div className="nombre-proyecto">
              <strong>AISANKA</strong>
              {" "}
              <span>Panel docente</span>
            </div>
          </div>
          <button type="button" className="perfil-docente" id="botonPerfil">
            <div className="contenedor-foto">
              <img
                src="/recursos/img/perfil_docente.jfif"
                alt="Foto del docente"
                className="foto-docente"
                onError={ocultarImagenRota}
              />
              <div className="foto-predeterminada">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
            <div className="datos-docente">
              <strong id="nombreDocenteMenu">Henrry Montes</strong>
              {" "}
              <span>Docente</span>
            </div>
            <i className="fa-solid fa-chevron-right flecha-perfil"></i>
          </button>
          <nav className="navegacion">
            <Link to="/inicio" className="elemento-menu">
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
            <Link to="/unidades" className="elemento-menu activo">
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
            <div className="titulo-superior">
              <div className="icono-titulo">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <div>
                <span className="ruta">GESTIÓN ACADÉMICA</span>
                <h1>Unidades de aprendizaje</h1>
                <p>Organiza y supervisa el contenido educativo de tus estudiantes.</p>
              </div>
            </div>
          </header>
          <section className="contenido-unidades">
            <section className="hero-unidades">
              <div className="hero-texto">
                <span className="etiqueta-seccion">
                  <i className="fa-solid fa-graduation-cap"></i>
                  {" CONTENIDO ACADÉMICO"}
                </span>
                <h2>Aprendizaje organizado por idiomas</h2>
                <p>
                  Selecciona un idioma para consultar sus unidades, revisar el avance y controlar la habilitación de los niveles.
                </p>
              </div>
              <div className="resumen-hero">
                <div className="circulo-progreso">
                  <span id="avanceGeneral">0%</span>
                </div>
                <div className="resumen-hero-texto">
                  <strong>Avance general</strong>
                  {" "}
                  <span>Progreso del idioma seleccionado</span>
                </div>
              </div>
            </section>
            <section className="selector-idiomas">
              <div className="encabezado-bloque">
                <div>
                  <span className="mini-etiqueta">IDIOMAS</span>
                  <h3>Selecciona un idioma</h3>
                </div>
                <span className="contador-idiomas">
                  <i className="fa-solid fa-earth-americas"></i>
                  {" 5 idiomas disponibles"}
                </span>
              </div>
              <div className="idiomas">
                <button type="button" className="boton-idioma activo" data-idioma="espanol">
                  <span className="bandera">ES</span>
                  {" "}
                  <span className="nombre-boton">Español</span>
                  {" "}
                  <i className="fa-solid fa-check"></i>
                </button>
                {" "}
                <button type="button" className="boton-idioma" data-idioma="ingles">
                  <span className="bandera">EN</span>
                  {" "}
                  <span className="nombre-boton">Inglés</span>
                  {" "}
                  <i className="fa-solid fa-check"></i>
                </button>
                {" "}
                <button type="button" className="boton-idioma" data-idioma="chino">
                  <span className="bandera">中</span>
                  {" "}
                  <span className="nombre-boton">Chino</span>
                  {" "}
                  <i className="fa-solid fa-check"></i>
                </button>
                {" "}
                <button type="button" className="boton-idioma" data-idioma="miskito">
                  <span className="bandera">MI</span>
                  {" "}
                  <span className="nombre-boton">Miskito</span>
                  {" "}
                  <i className="fa-solid fa-check"></i>
                </button>
                {" "}
                <button type="button" className="boton-idioma" data-idioma="mayangna">
                  <span className="bandera">MA</span>
                  {" "}
                  <span className="nombre-boton">Mayangna</span>
                  {" "}
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </section>
            <section className="informacion-idioma">
              <div className="idioma-identidad">
                <div className="icono-idioma">
                  <i className="fa-solid fa-language"></i>
                </div>
                <div>
                  <span className="mini-etiqueta">IDIOMA SELECCIONADO</span>
                  <h2 id="nombreIdioma">Español</h2>
                  <p id="descripcionIdioma">Ruta de aprendizaje y contenidos principales.</p>
                </div>
              </div>
              <div className="estadisticas-idioma">
                <div className="dato-idioma">
                  <strong id="totalUnidades">0</strong>
                  {" "}
                  <span>Unidades</span>
                </div>
                <div className="linea-dato"></div>
                <div className="dato-idioma">
                  <strong id="totalNiveles">0</strong>
                  {" "}
                  <span>Niveles</span>
                </div>
                <div className="linea-dato"></div>
                <div className="dato-idioma">
                  <strong id="avanceIdioma">0%</strong>
                  {" "}
                  <span>Avance</span>
                </div>
              </div>
            </section>
            <section className="zona-unidades">
              <div className="encabezado-zona">
                <div>
                  <span className="mini-etiqueta">RUTA DE APRENDIZAJE</span>
                  <h2>Unidades disponibles</h2>
                </div>
                <div className="leyenda">
                  <span>
                    <i className="fa-solid fa-circle-check"></i>
                    {" Habilitada"}
                  </span>
                  {" "}
                  <span>
                    <i className="fa-solid fa-lock"></i>
                    {" Bloqueada"}
                  </span>
                </div>
              </div>
              <div className="contenedor-unidades" id="contenedorUnidades"></div>
            </section>
            <section className="panel-reglas">
              <div className="encabezado-reglas">
                <div className="icono-reglas">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <span className="mini-etiqueta">CONTROL ACADÉMICO</span>
                  <h2>Reglas de habilitación</h2>
                  <p>AISANKA utiliza estas condiciones para mantener una ruta de aprendizaje progresiva.</p>
                </div>
              </div>
              <div className="reglas-grid">
                <article className="regla">
                  <div className="numero-regla">
                    <span>70</span>
                    {" "}
                    <small>%</small>
                  </div>
                  <div className="contenido-regla">
                    <h3>Habilitación de niveles</h3>
                    <p>
                      El nivel siguiente puede habilitarse cuando más del 70 % de los estudiantes complete el nivel anterior.
                    </p>
                  </div>
                </article>
                <article className="regla">
                  <div className="numero-regla">
                    <span>90</span>
                    {" "}
                    <small>%</small>
                  </div>
                  <div className="contenido-regla">
                    <h3>Habilitación de unidades</h3>
                    <p>Una nueva unidad puede habilitarse cuando más del 90 % de los estudiantes complete la unidad anterior.</p>
                  </div>
                </article>
              </div>
            </section>
          </section>
        </main>
      </div>
      <div className="modal-fondo" id="modalCerrarSesion">
        <div className="modal">
          <div className="icono-alerta">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
          <h2>¿Cerrar sesión?</h2>
          <p>Se cerrará la sesión actual del panel docente.</p>
          <div className="acciones-modal">
            <button type="button" className="boton-secundario" id="cancelarCerrarSesion">Cancelar</button>
            {" "}
            <button type="button" className="boton-principal" id="confirmarCerrarSesion">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </>
  );
}
