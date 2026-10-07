/*
  Puente entre los scripts originales (JS "clásico" que manipula el DOM)
  y React.

  - Los scripts originales esperan el evento DOMContentLoaded: en React el DOM
    ya existe cuando se montan, así que ese evento se ejecuta manualmente
    justo después de que el script se cargó.
  - Todo listener agregado a document/window y todo setInterval se registra
    para limpiarlo al salir de la página (navegación SPA sin recargar).
*/

const registro = {
  listeners: [],
  intervalos: [],
  ejecutando: false,
  pendientes: [],
};

if (!window.__aisankaRuntime) {
  window.__aisankaRuntime = true;

  const addOriginal = EventTarget.prototype.addEventListener;
  const setIntervalOriginal = window.setInterval.bind(window);

  const interceptar = (objetivo) => {
    objetivo.addEventListener = function (tipo, fn, opciones) {
      const esCarga =
        tipo === "DOMContentLoaded" || (objetivo === window && tipo === "load");

      if (esCarga) {
        if (registro.ejecutando) registro.pendientes.push(fn);
        else setTimeout(fn, 0);
        return;
      }

      registro.listeners.push({ objetivo, tipo, fn, opciones });
      return addOriginal.call(objetivo, tipo, fn, opciones);
    };
  };

  interceptar(document);
  interceptar(window);

  window.setInterval = function (...args) {
    const id = setIntervalOriginal(...args);
    registro.intervalos.push(id);
    return id;
  };
}

export function montarPagina(scripts) {
  const hijosBodyInicial = new Set(Array.from(document.body.children));

  registro.listeners = [];
  registro.intervalos = [];
  registro.pendientes = [];
  registro.ejecutando = true;

  try {
    scripts.forEach((iniciar) => {
      try {
        iniciar();
      } catch (error) {
        console.error("[AISANKA] Error al iniciar script de página:", error);
      }
    });

    while (registro.pendientes.length) {
      const fn = registro.pendientes.shift();
      try {
        fn.call(document, new Event("DOMContentLoaded"));
      } catch (error) {
        console.error("[AISANKA] Error en DOMContentLoaded:", error);
      }
    }
  } finally {
    registro.ejecutando = false;
  }

  return function limpiarPagina() {
    registro.listeners.forEach(({ objetivo, tipo, fn, opciones }) => {
      objetivo.removeEventListener(tipo, fn, opciones);
    });
    registro.intervalos.forEach((id) => clearInterval(id));
    registro.listeners = [];
    registro.intervalos = [];

    // Destruir gráficas de Chart.js creadas por la página
    if (window.Chart && window.Chart.instances) {
      Object.values(window.Chart.instances).forEach((grafica) => {
        try {
          grafica.destroy();
        } catch (e) {
          /* ya destruida */
        }
      });
    }

    // Quitar modales / avisos que el script agregó directo al <body>
    Array.from(document.body.children).forEach((nodo) => {
      if (!hijosBodyInicial.has(nodo)) nodo.remove();
    });

    document.body.style.overflow = "";
  };
}
