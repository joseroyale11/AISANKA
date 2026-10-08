import { Link } from "react-router-dom";
import { usePaginaLegacy } from "../../legacy/usePaginaLegacy.js";
import "../../legacy/cargarJsPDF.js";
import estilos from "./editar_estudiante.css?inline";
import iniciarEditarEstudiante from "./editar_estudiante.js";

function ocultarImagenRota(evento) {
  const img = evento.currentTarget;
  img.style.display = "none";
  if (img.nextElementSibling) img.nextElementSibling.style.display = "flex";
}

export default function EditarEstudiante() {
  usePaginaLegacy({
    titulo: "AISANKA",
    estilos,
    scripts: [iniciarEditarEstudiante],
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
          {" "}
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
            <Link to="/editar-estudiante" className="elemento-menu activo">
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
              <h1>Estudiantes</h1>
              <p>Consulte y administre los estudiantes registrados en AISANKA.</p>
            </div>
          </header>
          <section className="contenedor-estudiantes">
            <div className="cabecera-estudiantes">
              <div>
                <h2>Estudiantes registrados</h2>
                <p id="contadorEstudiantes">0 estudiantes registrados</p>
              </div>
              <Link to="/crear-estudiante" className="boton-nuevo">
                <i className="fa-solid fa-user-plus"></i>
                {" Nuevo estudiante"}
              </Link>
            </div>
            <div className="panel-filtros">
              <div className="buscador">
                <i className="fa-solid fa-magnifying-glass"></i>
                {" "}
                <input
                  type="search"
                  id="buscadorEstudiante"
                  placeholder="Buscar por nombre, apellido o código MINED..."
                  autoComplete="off"
                />
              </div>
              <select id="filtroGrado">
                <option value="">Todos los grados</option>
              </select>
              {" "}
              <select id="filtroSexo">
                <option value="">Todos los sexos</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
              {" "}
              <select id="filtroEstado">
                <option value="">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Código MINED</th>
                    <th>Grado</th>
                    <th>Sexo</th>
                    <th>Estado</th>
                    <th>Fecha de edición</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaEstudiantes"></tbody>
              </table>
              <div className="sin-estudiantes" id="sinEstudiantes">
                <div>
                  <i className="fa-solid fa-users"></i>
                </div>
                <h3>No hay estudiantes</h3>
                <p>No se encontraron estudiantes con los criterios seleccionados.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="modal-fondo" id="modalVerEstudiante">
        <div className="modal-estudiante">
          <button type="button" className="cerrar-modal" id="cerrarModalVer">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="cabecera-modal-estudiante">
            <div className="avatar-estudiante">
              <i className="fa-solid fa-user"></i>
            </div>
            <div>
              <h2 id="verNombreEstudiante">Estudiante</h2>
              <span id="verCodigoMined">MINED-0000</span>
            </div>
          </div>
          <div className="estado-modal">
            <span id="verEstado">Activo</span>
          </div>
          <div id="contenidoVerEstudiante"></div>
          <div className="informacion-edicion">
            <div>
              <i className="fa-solid fa-calendar-plus"></i>
              {" "}
              <span>Fecha de registro</span>
              {" "}
              <strong id="verFechaRegistro">—</strong>
            </div>
            <div>
              <i className="fa-solid fa-calendar-check"></i>
              {" "}
              <span>Última edición</span>
              {" "}
              <strong id="verFechaEdicion">Nunca editado</strong>
            </div>
          </div>
          <div className="acciones-modal-estudiante">
            <button type="button" className="boton-secundario" id="botonCerrarVer">Cerrar</button>
            {" "}
            <button type="button" className="boton-pdf" id="botonPDFVer">
              <i className="fa-solid fa-file-pdf"></i>
              {" Guardar PDF"}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-fondo" id="modalEditarEstudiante">
        <div className="modal-estudiante">
          <button type="button" className="cerrar-modal" id="cerrarModalEditar">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="cabecera-modal-estudiante">
            <div className="avatar-estudiante">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <div>
              <h2 id="editarNombreTitulo">Editar estudiante</h2>
              <span id="editarCodigoTitulo">MINED-0000</span>
            </div>
          </div>
          <form id="formularioEdicion">
            <input type="hidden" id="editarId" />
            {" "}
            <div className="seccion-modal">
              <h3>
                <i className="fa-solid fa-id-card"></i>
                {" Información del estudiante"}
              </h3>
              <div className="grid-modal">
                <div className="campo-modal">
                  <label>Código MINED</label>
                  {" "}
                  <input type="text" id="editarCodigo" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Primer nombre</label>
                  {" "}
                  <input type="text" id="editarPrimerNombre" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Segundo nombre</label>
                  {" "}
                  <input type="text" id="editarSegundoNombre" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Primer apellido</label>
                  {" "}
                  <input type="text" id="editarPrimerApellido" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Segundo apellido</label>
                  {" "}
                  <input type="text" id="editarSegundoApellido" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Correo electrónico</label>
                  {" "}
                  <input type="email" id="editarCorreo" required />
                </div>
                <div className="campo-modal">
                  <label>Fecha de nacimiento</label>
                  {" "}
                  <input type="date" id="editarFechaNacimiento" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Edad</label>
                  {" "}
                  <input type="text" id="editarEdad" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Sexo</label>
                  {" "}
                  <select id="editarSexo" disabled>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Idioma del estudiante</label>
                  {" "}
                  <select id="editarIdioma" required>
                    <option value="">Seleccione un idioma</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Miskito">Miskito</option>
                    <option value="Mayangna">Mayangna</option>
                    <option value="Chino">Chino</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Acceso a internet</label>
                  {" "}
                  <select id="editarAccesoInternet" required>
                    <option value="">Seleccione una opción</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Tipo de dispositivo</label>
                  {" "}
                  <select id="editarTipoDispositivo" required>
                    <option value="">Seleccione un dispositivo</option>
                    <option value="Celular">Celular</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Computadora">Computadora</option>
                    <option value="Ninguno">Ninguno</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Condición</label>
                  {" "}
                  <select id="editarCondicion" required>
                    <option value="">Seleccione una condición</option>
                    <option value="Autismo">Autismo</option>
                    <option value="Dificultad visual">Dificultad visual</option>
                    <option value="Dificultad auditiva">Dificultad auditiva</option>
                    <option value="TDAH">TDAH</option>
                    <option value="Neurotípico">Neurotípico</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Estado</label>
                  {" "}
                  <select id="editarEstado">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="seccion-modal">
              <h3>
                <i className="fa-solid fa-school"></i>
                {" Matrícula"}
              </h3>
              <div className="grid-modal">
                <div className="campo-modal">
                  <label>Escuela</label>
                  {" "}
                  <input type="text" id="editarEscuela" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Comunidad</label>
                  {" "}
                  <input type="text" id="editarComunidad" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Municipio</label>
                  {" "}
                  <input type="text" id="editarMunicipio" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Departamento</label>
                  {" "}
                  <input type="text" id="editarDepartamento" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Grado</label>
                  {" "}
                  <input type="text" id="editarGrado" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Aula / Sección</label>
                  {" "}
                  <input type="text" id="editarAulaSeccion" readOnly />
                </div>
                <div className="campo-modal">
                  <label>Modalidad</label>
                  {" "}
                  <select id="editarModalidad" disabled>
                    <option value="Diaria">Diaria</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Turno</label>
                  {" "}
                  <select id="editarTurno" disabled>
                    <option value="Matutino">Matutino</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Año lectivo</label>
                  {" "}
                  <input type="number" id="editarAnio" required />
                </div>
                <div className="campo-modal">
                  <label>Docente responsable</label>
                  {" "}
                  <input type="text" id="editarDocente" readOnly />
                </div>
              </div>
            </div>
            <div className="seccion-modal">
              <h3>
                <i className="fa-solid fa-people-roof"></i>
                {" Padre, madre o tutor"}
              </h3>
              <div className="grid-modal">
                <div className="campo-modal">
                  <label>Cédula</label>
                  {" "}
                  <input type="text" id="editarCedula" required />
                </div>
                <div className="campo-modal">
                  <label>Primer nombre</label>
                  {" "}
                  <input type="text" id="editarPrimerNombrePadre" required />
                </div>
                <div className="campo-modal">
                  <label>Segundo nombre</label>
                  {" "}
                  <input type="text" id="editarSegundoNombrePadre" />
                </div>
                <div className="campo-modal">
                  <label>Primer apellido</label>
                  {" "}
                  <input type="text" id="editarPrimerApellidoPadre" required />
                </div>
                <div className="campo-modal">
                  <label>Segundo apellido</label>
                  {" "}
                  <input type="text" id="editarSegundoApellidoPadre" />
                </div>
                <div className="campo-modal">
                  <label>Teléfono</label>
                  {" "}
                  <input type="tel" id="editarTelefono" />
                </div>
                <div className="campo-modal">
                  <label>Idioma del responsable</label>
                  {" "}
                  <select id="editarIdiomaResponsable" required>
                    <option value="">Seleccione un idioma</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Miskito">Miskito</option>
                    <option value="Mayangna">Mayangna</option>
                    <option value="Chino">Chino</option>
                  </select>
                </div>
                <div className="campo-modal">
                  <label>Parentesco</label>
                  {" "}
                  <select id="editarParentesco" required>
                    <option value="">Seleccione parentesco</option>
                    <option value="Padre">Padre</option>
                    <option value="Madre">Madre</option>
                    <option value="Tutor">Tutor</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="acciones-modal-estudiante">
              <button type="button" className="boton-secundario" id="botonCancelarEdicion">Cancelar</button>
              {" "}
              <button type="submit" className="boton-principal">
                <i className="fa-solid fa-floppy-disk"></i>
                {" Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-fondo modal-mensaje" id="modalCambiosGuardados">
        <div className="modal-confirmacion modal-exito">
          <div className="icono-exito">
            <i className="fa-solid fa-check"></i>
          </div>
          <h2>Cambios guardados correctamente</h2>
          <p>La información del estudiante fue actualizada exitosamente.</p>
          <div className="acciones-confirmacion">
            <button type="button" className="boton-secundario" id="cerrarCambiosGuardados">Cerrar</button>
            {" "}
            <button type="button" className="boton-pdf" id="botonPDFGuardado">
              <i className="fa-solid fa-file-pdf"></i>
              {" Guardar PDF"}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-fondo" id="modalEliminar">
        <div className="modal-confirmacion modal-eliminar">
          <div className="icono-confirmacion">
            <i className="fa-solid fa-trash"></i>
          </div>
          <h2>Eliminar estudiante</h2>
          <p>
            {"¿Seguro que deseas eliminar a "}
            <strong id="nombreEliminar"></strong>
            ?
          </p>
          <span className="advertencia-eliminar">Esta acción cambiará el estado del estudiante a inactivo.</span>
          <div className="acciones-confirmacion">
            <button type="button" className="boton-secundario" id="cancelarEliminar">Cancelar</button>
            {" "}
            <button type="button" className="boton-eliminar-confirmar" id="confirmarEliminar">Eliminar</button>
          </div>
        </div>
      </div>
      <div className="modal-fondo" id="modalPerfil">
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
    </>
  );
}
