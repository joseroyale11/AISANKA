import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Inicio = lazy(() => import("./pages/Inicio/Inicio.jsx"));
const CrearEstudiante = lazy(() => import("./pages/CrearEstudiante/CrearEstudiante.jsx"));
const EditarEstudiante = lazy(() => import("./pages/EditarEstudiante/EditarEstudiante.jsx"));
const Unidades = lazy(() => import("./pages/Unidades/Unidades.jsx"));
const Estadisticas = lazy(() => import("./pages/Estadisticas/Estadisticas.jsx"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crear-estudiante" element={<CrearEstudiante />} />
        <Route path="/editar-estudiante" element={<EditarEstudiante />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
