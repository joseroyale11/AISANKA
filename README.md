# AISANKA – Panel docente (React + Vite)

## Cómo correrlo
```bash
npm install
npm run dev
```
Se abre en http://localhost:5173

Para producción: `npm run build` y `npm run preview`.

## Imágenes (importante)
Copia tus imágenes a `public/recursos/img/` (logo.png, fondo_login.png, fondo_pdf.png,
perfil_docente.jfif) y `docente.jpg` a `public/assets/`. Ver `LEEME.txt` en esas carpetas.

## Credenciales de prueba (las de tu index.js)
- Correo: henrrymontes@gmail.com
- Contraseña: MINED2026*

## Estructura
```
src/
  main.jsx / App.jsx            Router y rutas
  legacy/                       Puente para ejecutar tus scripts originales en React
  pages/
    Login/             Login.jsx  login.css  login.js            (antes index)
    Inicio/            Inicio.jsx inicio.css inicio.js chat.js
    CrearEstudiante/   CrearEstudiante.jsx   crear_estudiante.css/js
    EditarEstudiante/  EditarEstudiante.jsx  editar_estudiante.css/js
    Unidades/          Unidades.jsx          unidades.css/js
    Estadisticas/      Estadisticas.jsx      estadisticas.css/js
public/
  datos_mined.json
```
Rutas: `/`, `/inicio`, `/crear-estudiante`, `/editar-estudiante`, `/unidades`, `/estadisticas`.

## Cómo funciona
Cada página es un componente `.jsx` con el HTML convertido a JSX. Su `.css` se inserta solo
mientras esa página está abierta (así los estilos de una no afectan a las otras) y su `.js`
(tu código original) se ejecuta al montarla. Chart.js y jsPDF ahora vienen de npm en vez del CDN.
