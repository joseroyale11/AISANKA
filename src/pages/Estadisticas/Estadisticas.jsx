import { Link } from "react-router-dom";
import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import "../../legacy/cargarChart.js";
import "../../legacy/cargarJsPDF.js";
import estilos from "./estadisticas.css?inline";
import iniciarEstadisticas from "./estadisticas.js";

function ocultarImagenRota(evento) {
  const img = evento.currentTarget;
  img.style.display = "none";
  if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
}

export default function Estadisticas() {
  usePaginaLegacy({
    titulo: "AISANKA | Estadísticas",
    estilos,
    scripts: [iniciarEstadisticas],
  });

  return (
    <>
      <div className="aplicacion">
        <aside className="menu-lateral">
          <div className="decoracion-menu decoracion-uno"></div>
          <div className="decoracion-menu decoracion-dos"></div>
          <div className="encabezado-menu">
            <img src="/recursos/img/logo.png" alt="Logo AISANKA" />
            <div>
              <h1>AISANKA</h1>
              <span>Panel docente</span>
            </div>
          </div>
          <button
            type="button"
            className="perfil-docente"
            id="perfilDocente"
            aria-label="Abrir perfil docente"
          >
            <div className="foto-docente">
              <img
                src="/recursos/img/perfil_docente.jfif"
                alt="Perfil del docente"
                onError={ocultarImagenRota}
              />
              {" "}
              <span className="foto-predeterminada">
                <i className="fa-solid fa-user"></i>
              </span>
            </div>
            <div className="datos-docente">
              <strong data-docente-nombre="">Henrry Montes</strong>
              {" "}
              <span>Docente responsable</span>
            </div>
            <i className="fa-solid fa-chevron-right flecha-perfil"></i>
          </button>
          <nav className="navegacion-menu" aria-label="Navegación principal">
            <Link to="/inicio" className="item-menu">
              <i className="fa-solid fa-house"></i>
              {" "}
              <span>Inicio</span>
            </Link>
            {" "}
            <Link to="/crear-estudiante" className="item-menu">
              <i className="fa-solid fa-user-plus"></i>
              {" "}
              <span>Crear estudiante</span>
            </Link>
            {" "}
            <Link to="/editar-estudiante" className="item-menu">
              <i className="fa-solid fa-user-pen"></i>
              {" "}
              <span>Editar estudiantes</span>
            </Link>
            {" "}
            <Link to="/unidades" className="item-menu">
              <i className="fa-solid fa-book-open"></i>
              {" "}
              <span>Unidades</span>
            </Link>
            {" "}
            <Link to="/estadisticas" className="item-menu activo">
              <i className="fa-solid fa-chart-column"></i>
              {" "}
              <span>Estadísticas</span>
            </Link>
          </nav>
          <div className="separador-menu"></div>
          <button type="button" className="boton-cerrar-sesion" id="botonCerrarSesion">
            <i className="fa-solid fa-right-from-bracket"></i>
            {" "}
            <span>Cerrar sesión</span>
          </button>
        </aside>
        <main className="contenido-principal">
          <header className="barra-superior">
            <div className="titulo-superior">
              <div className="icono-titulo">
                <i className="fa-solid fa-chart-pie"></i>
              </div>
              <div>
                <h2>Estadísticas</h2>
                <p>Análisis del rendimiento y progreso de AISANKA</p>
              </div>
            </div>
            <div className="estado-panel">
              <span className="punto-activo"></span>
              {" "}
              <span>Panel docente</span>
            </div>
          </header>
          <section className="contenido-estadisticas">
            <div className="encabezado-estadisticas">
              <div>
                <span className="etiqueta-seccion">
                  <i className="fa-solid fa-chart-line"></i>
                  {" Rendimiento académico"}
                </span>
                <h1>Resumen general</h1>
                <p>Consulta el progreso, distribución de idiomas, estudiantes y principales indicadores de AISANKA.</p>
                <div className="aviso-datos" id="avisoDatos">
                  <i className="fa-solid fa-circle-info"></i>
                  {" "}
                  <span id="textoAvisoDatos"></span>
                </div>
              </div>
              <button type="button" className="boton-pdf" id="botonDescargarPDF">
                <i className="fa-solid fa-file-pdf"></i>
                {" "}
                <span>Descargar estadísticas</span>
              </button>
            </div>
            <section className="panel-filtros">
              <div className="encabezado-panel">
                <div>
                  <span className="mini-etiqueta">CONFIGURACIÓN</span>
                  <h3>Filtrar información</h3>
                </div>
                <i className="fa-solid fa-sliders"></i>
              </div>
              <div className="filtros-estadisticas">
                <label className="campo-filtro">
                  <span>Idioma</span>
                  <div className="select-contenedor">
                    <i className="fa-solid fa-language"></i>
                    {" "}
                    <select id="filtroIdioma">
                      <option value="todos">Todos los idiomas</option>
                      <option value="espanol">Español</option>
                      <option value="ingles">Inglés</option>
                      <option value="chino">Chino</option>
                      <option value="miskito">Miskito</option>
                      <option value="mayangna">Mayangna</option>
                    </select>
                  </div>
                </label>
                {" "}
                <label className="campo-filtro">
                  <span>Grado</span>
                  <div className="select-contenedor">
                    <i className="fa-solid fa-graduation-cap"></i>
                    {" "}
                    <select id="filtroGrado">
                      <option value="todos">Todos los grados</option>
                      <option value="1">1er grado</option>
                      <option value="2">2do grado</option>
                      <option value="3">3er grado</option>
                      <option value="4">4to grado</option>
                      <option value="5">5to grado</option>
                      <option value="6">6to grado</option>
                    </select>
                  </div>
                </label>
                {" "}
                <label className="campo-filtro">
                  <span>Periodo</span>
                  <div className="select-contenedor">
                    <i className="fa-solid fa-calendar-days"></i>
                    {" "}
                    <select id="filtroPeriodo">
                      <option value="actual">Registros actuales</option>
                      <option value="mes">Este mes</option>
                      <option value="trimestre">Este trimestre</option>
                      <option value="anio">Este año</option>
                    </select>
                  </div>
                </label>
                {" "}
                <button type="button" className="boton-aplicar" id="botonAplicarFiltros">
                  <i className="fa-solid fa-filter"></i>
                  {" Aplicar"}
                </button>
                {" "}
                <button type="button" className="boton-limpiar-filtros" id="botonLimpiarFiltros">
                  <i className="fa-solid fa-rotate-left"></i>
                  {" Limpiar"}
                </button>
              </div>
            </section>
            <div className="estado-sin-resultados" id="estadoSinResultados" hidden>
              <div className="icono-estado-vacio">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
              <div>
                <strong>No hay datos para estos filtros</strong>
                {" "}
                <span>Prueba seleccionando otro idioma, grado o periodo.</span>
              </div>
            </div>
            <section className="tarjetas-resumen">
              <article className="tarjeta-resumen tarjeta-estudiantes">
                <div className="icono-tarjeta">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="contenido-tarjeta">
                  <span>Total de estudiantes</span>
                  {" "}
                  <strong id="totalEstudiantes">0</strong>
                  {" "}
                  <small id="indicadorEstudiantes">Registros actuales</small>
                </div>
                <div className="decoracion-tarjeta"></div>
              </article>
              <article className="tarjeta-resumen tarjeta-mujeres">
                <div className="icono-tarjeta">
                  <i className="fa-solid fa-venus"></i>
                </div>
                <div className="contenido-tarjeta">
                  <span>Estudiantes mujeres</span>
                  {" "}
                  <strong id="totalMujeres">0</strong>
                  {" "}
                  <small id="porcentajeMujeres">0% del total</small>
                </div>
                <div className="decoracion-tarjeta"></div>
              </article>
              <article className="tarjeta-resumen tarjeta-varones">
                <div className="icono-tarjeta">
                  <i className="fa-solid fa-mars"></i>
                </div>
                <div className="contenido-tarjeta">
                  <span>Estudiantes varones</span>
                  {" "}
                  <strong id="totalVarones">0</strong>
                  {" "}
                  <small id="porcentajeVarones">0% del total</small>
                </div>
                <div className="decoracion-tarjeta"></div>
              </article>
              <article className="tarjeta-resumen tarjeta-progreso">
                <div className="icono-tarjeta">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div className="contenido-tarjeta">
                  <span>Progreso general</span>
                  {" "}
                  <strong id="progresoGeneral">0%</strong>
                  {" "}
                  <small>Promedio actual</small>
                </div>
                <div className="decoracion-tarjeta"></div>
              </article>
            </section>
            <section className="grid-graficas">
              <article className="tarjeta-grafica grafica-oscura">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">01</span>
                    <div>
                      <h3>Idiomas enseñados</h3>
                      <p>Distribución de estudiantes por idioma</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-language"></i>
                  </span>
                </div>
                <div className="contenedor-grafica contenedor-dona">
                  <canvas id="graficaIdiomas"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">02</span>
                    <div>
                      <h3>Distribución por sexo</h3>
                      <p>Composición del grupo estudiantil</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-venus-mars"></i>
                  </span>
                </div>
                <div className="contenedor-grafica contenedor-dona">
                  <canvas id="graficaSexo"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">03</span>
                    <div>
                      <h3>Estudiantes por grado</h3>
                      <p>Cantidad de estudiantes registrados</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-school"></i>
                  </span>
                </div>
                <div className="contenedor-grafica">
                  <canvas id="graficaGrados"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica grafica-grande">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">04</span>
                    <div>
                      <h3>Avance de estudiantes</h3>
                      <p>Porcentaje de progreso registrado para cada estudiante</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-chart-column"></i>
                  </span>
                </div>
                <div className="contenedor-grafica contenedor-avance-grafica">
                  <canvas id="graficaAvance"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">05</span>
                    <div>
                      <h3>Progreso por unidad</h3>
                      <p id="subtituloUnidades">Datos disponibles según los registros de unidades</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-book-open"></i>
                  </span>
                </div>
                <div className="contenedor-grafica contenedor-grafica-relativa">
                  <canvas id="graficaUnidades"></canvas>
                  <div className="estado-grafica" id="estadoUnidades" hidden>
                    <i className="fa-solid fa-book-open"></i>
                    {" "}
                    <strong>Sin datos de unidades</strong>
                    {" "}
                    <span>Registra avances por unidad para visualizar esta gráfica.</span>
                  </div>
                </div>
              </article>
              <article className="tarjeta-grafica">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">06</span>
                    <div>
                      <h3>Estado de estudiantes</h3>
                      <p>Estudiantes activos e inactivos</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-circle-check"></i>
                  </span>
                </div>
                <div className="contenedor-grafica contenedor-dona">
                  <canvas id="graficaEstado"></canvas>
                </div>
              </article>
              <article className="tarjeta-grafica grafica-grande">
                <div className="cabecera-grafica">
                  <div>
                    <span className="numero-grafica">07</span>
                    <div>
                      <h3>Distribución del progreso</h3>
                      <p>Estudiantes agrupados según su porcentaje de avance</p>
                    </div>
                  </div>
                  <span className="icono-grafica">
                    <i className="fa-solid fa-chart-area"></i>
                  </span>
                </div>
                <div className="contenedor-grafica">
                  <canvas id="graficaDistribucionProgreso"></canvas>
                </div>
              </article>
            </section>
            <section className="seccion-indicadores">
              <div className="titulo-seccion">
                <div>
                  <span className="mini-etiqueta">INDICADORES</span>
                  <h2>Rendimiento académico</h2>
                </div>
                <p>Resumen visual del desempeño registrado.</p>
              </div>
              <div className="grid-indicadores">
                <article className="indicador">
                  <div className="cabecera-indicador">
                    <span>Niveles</span>
                    {" "}
                    <strong id="indicadorNiveles">0%</strong>
                  </div>
                  <div className="barra-indicador">
                    <span id="barraNiveles"></span>
                  </div>
                  <small>Progreso general de niveles</small>
                </article>
                <article className="indicador">
                  <div className="cabecera-indicador">
                    <span>Unidades</span>
                    {" "}
                    <strong id="indicadorUnidades">0%</strong>
                  </div>
                  <div className="barra-indicador">
                    <span id="barraUnidades"></span>
                  </div>
                  <small>Avance promedio de unidades</small>
                </article>
                <article className="indicador">
                  <div className="cabecera-indicador">
                    <span>Ejercicios</span>
                    {" "}
                    <strong id="indicadorEjercicios">0%</strong>
                  </div>
                  <div className="barra-indicador">
                    <span id="barraEjercicios"></span>
                  </div>
                  <small>Desempeño estimado</small>
                </article>
                <article className="indicador">
                  <div className="cabecera-indicador">
                    <span>Actividad</span>
                    {" "}
                    <strong id="indicadorActividad">0%</strong>
                  </div>
                  <div className="barra-indicador">
                    <span id="barraActividad"></span>
                  </div>
                  <small>Participación registrada</small>
                </article>
              </div>
            </section>
            <section className="resumen-estadisticas">
              <article className="tarjeta-resumen-final">
                <div className="icono-resumen-final">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <span>Estudiantes registrados</span>
                  {" "}
                  <strong id="resumenNuevos">0</strong>
                  {" "}
                  <small>En los registros seleccionados</small>
                </div>
              </article>
              <article className="tarjeta-resumen-final">
                <div className="icono-resumen-final">
                  <i className="fa-solid fa-language"></i>
                </div>
                <div>
                  <span>Idioma con mayor presencia</span>
                  {" "}
                  <strong id="resumenMayorProgreso">Sin datos</strong>
                  {" "}
                  <small id="detalleMayorIdioma">Promedio según los registros actuales</small>
                </div>
              </article>
              <article className="tarjeta-resumen-final">
                <div className="icono-resumen-final">
                  <i className="fa-solid fa-book"></i>
                </div>
                <div>
                  <span>Unidad con mayor avance</span>
                  {" "}
                  <strong id="resumenUnidad">Sin datos</strong>
                  {" "}
                  <small id="detalleResumenUnidad">Requiere registros de progreso por unidad</small>
                </div>
              </article>
            </section>
          </section>
        </main>
      </div>
      <div className="modal" id="modalPerfilDocente" aria-hidden="true">
        <div className="modal-overlay" id="overlayPerfilDocente"></div>
        <div className="modal-contenido modal-perfil">
          <button
            type="button"
            className="boton-cerrar-modal"
            id="cerrarPerfilDocente"
            aria-label="Cerrar perfil"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="cabecera-modal-perfil">
            <div className="foto-modal-perfil">
              <img
                src="/recursos/img/perfil_docente.jfif"
                alt="Perfil del docente"
                onError={ocultarImagenRota}
              />
              {" "}
              <span>
                <i className="fa-solid fa-user"></i>
              </span>
            </div>
            <h2 data-docente-nombre="">Henrry Montes</h2>
            <p data-docente-rol="">Docente responsable</p>
          </div>
          <div className="datos-modal-perfil">
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <span>Correo electrónico</span>
                {" "}
                <strong data-docente-correo="">henrrymontes@gmail.com</strong>
              </div>
            </div>
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-school"></i>
              </div>
              <div>
                <span>Centro educativo</span>
                {" "}
                <strong data-docente-centro="">CPACS</strong>
              </div>
            </div>
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <span>Ubicación</span>
                {" "}
                <strong data-docente-ubicacion="">Jinotega, Jinotega</strong>
              </div>
            </div>
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div>
                <span>Grado atendido</span>
                {" "}
                <strong data-docente-grado="">6to</strong>
              </div>
            </div>
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-language"></i>
              </div>
              <div>
                <span>Idiomas</span>
                {" "}
                <strong data-docente-idiomas="">Chino, Miskito, Español, Mayangna, Inglés</strong>
              </div>
            </div>
            <div className="dato-perfil">
              <div className="icono-dato">
                <i className="fa-solid fa-users"></i>
              </div>
              <div>
                <span>Estudiantes asignados</span>
                {" "}
                <strong id="perfilTotalEstudiantes">5</strong>
              </div>
            </div>
          </div>
          <div className="estado-perfil">
            <span></span>
            {" Sesión docente activa"}
          </div>
        </div>
      </div>
    </>
  );
}
