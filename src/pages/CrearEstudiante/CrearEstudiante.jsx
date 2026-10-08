import { Link } from "react-router-dom";
import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import "../../legacy/cargarJsPDF.js";
import estilos from "./crear_estudiante.css?inline";
import iniciarCrearEstudiante from "./crear_estudiante.js";

function ocultarImagenRota(evento) {
  const img = evento.currentTarget;
  img.style.display = "none";
  if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
}

export default function CrearEstudiante() {
  usePaginaLegacy({
    titulo: "AISANKA",
    estilos,
    scripts: [iniciarCrearEstudiante],
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
          <button type="button" className="perfil-docente" id="botonPerfilDocente">
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
              <strong>Henrry Montes</strong>
              {" "}
              <span>Docente</span>
            </div>
          </button>
          <nav className="navegacion">
            <Link to="/inicio" className="elemento-menu">
              <i className="fa-solid fa-house"></i>
              {" "}
              <span>Inicio</span>
            </Link>
            {" "}
            <Link to="/crear-estudiante" className="elemento-menu activo">
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
              <h1>Crear estudiante</h1>
              <p>Registre un nuevo estudiante en AISANKA</p>
            </div>
          </header>
          <section className="formulario-contenedor">
            <form id="formularioEstudiante" noValidate>
              <div className="seccion-formulario">
                <div className="titulo-seccion">
                  <div className="icono-seccion">
                    <i className="fa-solid fa-id-card"></i>
                  </div>
                  <div>
                    <h2>Información personal</h2>
                    <p>Ingrese el código MINED para cargar los datos oficiales.</p>
                  </div>
                </div>
                <div className="grupo-formulario codigo-mined">
                  <label htmlFor="codigoMined">
                    {"Código MINED "}
                    <span>*</span>
                  </label>
                  <div className="campo-icono">
                    <i className="fa-solid fa-barcode"></i>
                    {" "}
                    <input
                      type="text"
                      id="codigoMined"
                      placeholder="Ejemplo: MINED-0006"
                      autoComplete="off"
                      required
                    />
                    {" "}
                    <button type="button" id="buscarMined" title="Consultar código MINED">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                  <small>El código MINED consulta los datos registrados.</small>
                </div>
                <div className="grid-formulario">
                  <div className="grupo-formulario">
                    <label htmlFor="primerNombre">
                      {"Primer nombre "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="primerNombre" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="segundoNombre">Segundo nombre</label>
                    {" "}
                    <input type="text" id="segundoNombre" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="primerApellido">
                      {"Primer apellido "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="primerApellido" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="segundoApellido">Segundo apellido</label>
                    {" "}
                    <input type="text" id="segundoApellido" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="fechaNacimiento">
                      {"Fecha de nacimiento "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="date" id="fechaNacimiento" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="edad">Edad</label>
                    {" "}
                    <input type="text" id="edad" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="sexo">
                      {"Sexo "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="sexo" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="correo">
                      {"Correo electrónico "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="email" id="correo" placeholder="correo@ejemplo.com" required />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="estado">
                      {"Estado "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="estado" required>
                      <option value="">Seleccione</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="fechaRegistro">Fecha de registro</label>
                    {" "}
                    <input type="date" id="fechaRegistro" readOnly />
                  </div>
                </div>
              </div>
              <div className="seccion-formulario">
                <div className="titulo-seccion">
                  <div className="icono-seccion">
                    <i className="fa-solid fa-school"></i>
                  </div>
                  <div>
                    <h2>Procedencia y matrícula</h2>
                    <p>Información académica y de matrícula del estudiante.</p>
                  </div>
                </div>
                <div className="grid-formulario">
                  <div className="grupo-formulario">
                    <label htmlFor="escuela">
                      {"Escuela "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="escuela" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="comunidad">
                      {"Comunidad "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="comunidad" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="municipio">
                      {"Municipio "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="municipio" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="departamento">
                      {"Departamento "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="departamento" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="grado">
                      {"Grado "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="grado" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="aula">
                      {"Aula / Sección "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="aula" placeholder="Aula o sección" required />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="seccion">Sección</label>
                    {" "}
                    <input type="text" id="seccion" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="modalidad">
                      {"Modalidad "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="modalidad" required>
                      <option value="Diaria">Diaria</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="turno">
                      {"Turno "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="turno" required>
                      <option value="Matutino">Matutino</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="anioLectivo">
                      {"Año lectivo "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="anioLectivo" defaultValue="2026" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="docente">
                      {"Docente responsable "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="docente" defaultValue="Henrry Montes" readOnly />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="estadoMatricula">Estado de matrícula</label>
                    {" "}
                    <input type="text" id="estadoMatricula" defaultValue="Activa" readOnly />
                  </div>
                </div>
              </div>
              <div className="seccion-formulario">
                <div className="titulo-seccion">
                  <div className="icono-seccion">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div>
                    <h2>Acceso tecnológico</h2>
                    <p>Información necesaria para el funcionamiento de AISANKA.</p>
                  </div>
                </div>
                <div className="grid-formulario">
                  <div className="grupo-formulario">
                    <label htmlFor="idioma">
                      {"Idioma que aprenderá "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="idioma" required>
                      <option value="">Seleccione</option>
                      <option value="Español">Español</option>
                      <option value="Inglés">Inglés</option>
                      <option value="Miskito">Miskito</option>
                      <option value="Mayangna">Mayangna</option>
                      <option value="Chino">Chino</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="accesoInternet">
                      {"Acceso a internet "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="accesoInternet" required>
                      <option value="">Seleccione</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="tipoDispositivo">
                      {"Tipo de dispositivo "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="tipoDispositivo" required>
                      <option value="">Seleccione</option>
                      <option value="Celular">Celular</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Computadora">Computadora</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="seccion-formulario">
                <div className="titulo-seccion">
                  <div className="icono-seccion">
                    <i className="fa-solid fa-universal-access"></i>
                  </div>
                  <div>
                    <h2>Condición del estudiante</h2>
                    <p>Seleccione la condición correspondiente para adaptar el aprendizaje.</p>
                  </div>
                </div>
                <div className="grid-formulario">
                  <div className="grupo-formulario campo-completo">
                    <label htmlFor="condicion">
                      {"Condición "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="condicion" required>
                      <option value="">Seleccione una condición</option>
                      <option value="Neurotípico">Neurotípico</option>
                      <option value="Autismo">Autismo</option>
                      <option value="Dificultad visual">Dificultad visual</option>
                      <option value="Dificultad auditiva">Dificultad auditiva</option>
                      <option value="TDAH">TDAH</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="seccion-formulario">
                <div className="titulo-seccion">
                  <div className="icono-seccion">
                    <i className="fa-solid fa-people-roof"></i>
                  </div>
                  <div>
                    <h2>Padre, madre o tutor</h2>
                    <p>Información del responsable del estudiante.</p>
                  </div>
                </div>
                <div className="grid-formulario">
                  <div className="grupo-formulario">
                    <label htmlFor="primerNombreResponsable">
                      {"Primer nombre "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input
                      type="text"
                      id="primerNombreResponsable"
                      placeholder="Primer nombre"
                      required
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="segundoNombreResponsable">Segundo nombre</label>
                    {" "}
                    <input type="text" id="segundoNombreResponsable" placeholder="Segundo nombre" />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="primerApellidoResponsable">
                      {"Primer apellido "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input
                      type="text"
                      id="primerApellidoResponsable"
                      placeholder="Primer apellido"
                      required
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="segundoApellidoResponsable">Segundo apellido</label>
                    {" "}
                    <input
                      type="text"
                      id="segundoApellidoResponsable"
                      placeholder="Segundo apellido"
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="cedula">
                      {"Cédula "}
                      <span>*</span>
                    </label>
                    {" "}
                    <input type="text" id="cedula" placeholder="000-000000-0000A" required />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="telefono">Teléfono</label>
                    {" "}
                    <input type="tel" id="telefono" placeholder="8888-0000" />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="parentesco">
                      {"Parentesco "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="parentesco" required>
                      <option value="">Seleccione</option>
                      <option value="Padre">Padre</option>
                      <option value="Madre">Madre</option>
                      <option value="Tutor">Tutor</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="idiomaResponsable">
                      {"Idioma "}
                      <span>*</span>
                    </label>
                    {" "}
                    <select id="idiomaResponsable" required>
                      <option value="">Seleccione</option>
                      <option value="Español">Español</option>
                      <option value="Miskito">Miskito</option>
                      <option value="Mayangna">Mayangna</option>
                      <option value="Inglés">Inglés</option>
                      <option value="Chino">Chino</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="acciones-formulario">
                <button type="submit" className="boton-principal">
                  <i className="fa-solid fa-user-plus"></i>
                  {" Registrar estudiante"}
                </button>
              </div>
            </form>
          </section>
        </main>
        ```
      </div>
      <div className="modal-fondo" id="modalAlerta">
        ```
        <div className="modal alerta-modal">
          <div className="icono-alerta" id="iconoAlerta">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 id="tituloAlerta">Aviso</h2>
          <p id="mensajeAlerta">Mensaje</p>
          <button type="button" className="boton-modal" id="cerrarAlerta">Cerrar</button>
        </div>
        ```
      </div>
      <div className="modal-fondo" id="modalExito">
        ```
        <div className="modal exito-modal">
          <div className="icono-exito">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2>Estudiante registrado</h2>
          <p id="mensajeExito">El estudiante fue registrado correctamente.</p>
          <div className="acciones-modal">
            <button type="button" className="boton-secundario" id="cerrarExito">Cerrar</button>
            {" "}
            <button type="button" className="boton-principal" id="descargarPdf">
              <i className="fa-solid fa-file-pdf"></i>
              {" Descargar PDF"}
            </button>
          </div>
        </div>
        ```
      </div>
      <div className="modal-fondo" id="modalPerfil">
        ```
        <div className="modal perfil-modal">
          <button type="button" className="cerrar-modal" id="cerrarPerfil">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="perfil-modal-foto">
            <img src="/recursos/img/perfil_docente.jfif" alt="Henrry Montes" />
          </div>
          <h2>Henrry Montes</h2>
          <span className="etiqueta-docente">Docente responsable</span>
          <div className="informacion-perfil">
            <div>
              <i className="fa-solid fa-envelope"></i>
              {" "}
              <span>
                <strong>Correo electrónico</strong>
                {" henrrymontes@gmail.com"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-school"></i>
              {" "}
              <span>
                <strong>Centro educativo</strong>
                {" CPACS"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-location-dot"></i>
              {" "}
              <span>
                <strong>Ubicación</strong>
                {" Jinotega, Jinotega"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-graduation-cap"></i>
              {" "}
              <span>
                <strong>Grado atendido</strong>
                {" 6to"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-language"></i>
              {" "}
              <span>
                <strong>Idioma actualmente enseñado</strong>
                {" Chino"}
              </span>
            </div>
            <div>
              <i className="fa-solid fa-users"></i>
              {" "}
              <span>
                <strong>Estudiantes asignados</strong>
                {" "}
                <span id="cantidadEstudiantesPerfil">0</span>
              </span>
            </div>
          </div>
          <div className="sesion-activa">
            <i className="fa-solid fa-circle"></i>
            {" Sesión activa"}
          </div>
        </div>
      </div>
      <div className="ventana-chat" id="ventanaChat">
        ```
        <div className="encabezado-chat">
          <div>
            <strong>Chat</strong>
            {" "}
            <span>Comunicación docente</span>
          </div>
          <button type="button" id="cerrarChat">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="contenido-chat">
          <div className="chat-vacio">
            <i className="fa-solid fa-comments"></i>
            {" "}
            <strong>Chat AISANKA</strong>
            <p>La comunicación entre docentes estará disponible próximamente.</p>
          </div>
        </div>
        <div className="entrada-chat">
          <input type="text" placeholder="Escriba un mensaje..." disabled />
          {" "}
          <button type="button" disabled>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        ```
      </div>
    </>
  );
}
