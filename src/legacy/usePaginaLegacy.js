import { useEffect, useLayoutEffect } from "react";
import { montarPagina } from "./runtime.js";

/*
  Hook que reproduce lo que hacía cada archivo .html original:
   1. Inserta el CSS de la página (y lo quita al salir, para que los estilos
      de una página no afecten a las demás).
   2. Cambia el <title>.
   3. Ejecuta el(los) script(s) JS de la página.
*/
export function usePaginaLegacy({ estilos, titulo, scripts }) {
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-pagina", titulo);
    style.textContent = estilos;
    document.head.appendChild(style);

    const tituloAnterior = document.title;
    document.title = titulo;

    return () => {
      style.remove();
      document.title = tituloAnterior;
    };
  }, []);

  useEffect(() => {
    const limpiar = montarPagina(scripts);
    return limpiar;
  }, []);
}
