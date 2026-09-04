
# AISANKA
### Tecnologia que da voz a Nicaragua 


[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-success)](#estado-del-proyecto)
[![Web](https://img.shields.io/badge/Web-React-61DAFB)](#web_docente)
[![App](https://img.shields.io/badge/App-React%20Native-61DAFB)](#aplicacion-estudiante)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933)](#backend)
[![Base de datos](https://img.shields.io/badge/BD-MySQL%20%7C%20SQLite-4479A1)](#persistencia-de-datos)
[![API](https://img.shields.io/badge/API-REST-orange)](#api-rest)

---

# 1. Descripción general

**AISANKA** es un ecosistema tecnológico educativo orientado al aprendizaje de idiomas y al acompañamiento docente, diseñado para funcionar en contextos donde la conectividad puede ser limitada o intermitente.

El sistema está compuesto por dos perfiles principales:

* **Docente:** accede mediante una aplicación web.
* **Estudiante:** accede mediante una aplicación móvil.

Ambos perfiles trabajan sobre una arquitectura centralizada mediante un backend que administra la comunicación entre los clientes y los servicios de datos.

AISANKA está diseñado para trabajar con los siguientes idiomas:

* Español
* Inglés
* Chino
* Miskito
* Mayangna

La arquitectura general es:

```text
                         ┌──────────────────────────┐
                         │      AISANKA BACKEND     │
                         │                          │
                         │ Node.js + Express        │
                         │ API REST                 │
                         │ Autenticación JWT        │
                         │ Lógica de negocio        │
                         │ Sincronización           │
                         └────────────┬─────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
        ┌─────────────────────┐             ┌─────────────────────┐
        │   WEB DOCENTE       │             │ APP ESTUDIANTE      │
        │                     │             │                     │
        │ React               │             │ React Native        │
        │ Dashboard           │             │ Offline First       │
        │ Gestión académica   │             │ SQLite local        │
        │ Reportes PDF        │             │ Juegos              │
        │ Estadísticas        │             │ Ejercicios          │
        └──────────┬──────────┘             └──────────┬──────────┘
                   │                                   │
                   ▼                                   ▼
        ┌─────────────────────┐             ┌─────────────────────┐
        │       MySQL         │             │       SQLite        │
        │                     │             │                     │
        │ Información central │             │ Datos locales       │
        │ Docentes            │             │ Progreso offline    │
        │ Estudiantes         │             │ Actividades         │
        │ Contenido           │             │ Cola de sincroniz.  │
        │ Progreso            │             │ Configuración       │
        └─────────────────────┘             └─────────────────────┘
```

La web docente utiliza información centralizada almacenada en MySQL.

La aplicación del estudiante utiliza SQLite como almacenamiento local para implementar una estrategia **Offline First**, permitiendo continuar con las actividades incluso cuando el dispositivo no dispone de conexión a Internet.

Cuando el dispositivo recupera conectividad, los datos pendientes se sincronizan automáticamente con el backend.

---

# 2. Objetivos técnicos

La arquitectura de AISANKA está diseñada para:

1. Separar las responsabilidades de cada componente.
2. Mantener centralizada la información administrativa.
3. Permitir el funcionamiento offline de la aplicación estudiante.
4. Sincronizar automáticamente los avances.
5. Garantizar autenticación y autorización.
6. Permitir diferentes perfiles de usuario.
7. Facilitar la escalabilidad del sistema.
8. Facilitar el mantenimiento y evolución del software.

---

El sistema no considera al estudiante como un usuario genérico.

Cada estudiante puede tener una configuración educativa particular y la aplicación adapta su experiencia según la información registrada en su expediente y diagnóstico.

Por ejemplo:

```text
                                ESTUDIANTE
                                    │
                                    ▼
                        ┌────────────────────┐
                        │ Perfil educativo   │
                        │ y diagnóstico      │
                        └─────────┬──────────┘
                                    │
                    ┌────────────────┼─────────────────┐
                    │                │                 │
                    ▼                ▼                 ▼
        Dificultad auditiva  Dificultad Visual      Autismo
                    │                │                 │
                    ▼                ▼                 ▼
            Interfaz visual   Audio/refuerzo    Navegación
            simplificada        visual           adaptada
```

Esto permite que la experiencia de aprendizaje sea personalizada.

---


# 3. Arquitectura del sistema


## 3.1. Capa de presentación

Está formada por:

### Web docente

Aplicación web desarrollada con React.

Responsabilidades:

* Inicio de sesión.
* Gestión de estudiantes.
* Consulta de expedientes.
* Consulta de progreso.
* Gestión de unidades.
* Habilitación de niveles.
* Visualización de estadísticas.

---

### Aplicación estudiante

Aplicación móvil desarrollada con React Native.

Responsabilidades:

* Inicio de sesión.
* Visualización del perfil.
* Acceso a unidades.
* Acceso a niveles.
* Realización de ejercicios.
* Juegos educativos.
* Registro de progreso.
* Almacenamiento offline.
* Sincronización automática.
* Adaptación de interfaz según las necesidades del estudiante.

---

### Backend

El backend funciona como núcleo de comunicación del ecosistema.

Está desarrollado utilizando:

* Node.js
* Express
* MySQL
* JWT
* bcrypt
* CORS
* dotenv

Su responsabilidad principal es proporcionar una API REST que permita a los clientes comunicarse con la base de datos y con la lógica de negocio.

```text
                            React Web
                                │
                                │ HTTP/HTTPS
                                ▼
                    ┌───────────────────────┐
                    │       Express API     │
                    ├───────────────────────┤
                    │ Autenticación         │
                    │ Autorización          │
                    │ Usuarios              │
                    │ Estudiantes           │
                    │ Docentes              │
                    │ Unidades              │
                    │ Niveles               │
                    │ Ejercicios            │
                    │ Progreso              │
                    │ Estadísticas          │
                    │ Sincronización        │
                    └───────────┬───────────┘
                                │
                                ▼
                              MySQL
```

---

## 3.2. Arquitectura Offline First

Una de las características principales de AISANKA es que la aplicación del estudiante no depende permanentemente de Internet.

La aplicación utiliza una arquitectura **Offline First**.

Esto significa que el estudiante puede:

* Entrar a contenidos previamente descargados.
* Realizar ejercicios.
* Participar en juegos.
* Registrar resultados.
* Avanzar en niveles.
* Consultar su progreso.

sin necesidad de mantener una conexión permanente.

```text
              ESTUDIANTE
                  │
                  ▼
          Aplicación móvil
                  │
                  ▼
              SQLite
                  │
                Lecion
                 │
                Juego
                 │
                Resultado
                  │
             Cola local
             de cambios
                  │
                  ▼
          ¿Hay conexión?
             /        \
           NO          SÍ
           │           │
           ▼           ▼
       Esperar      Sincronizar
                       │
                       ▼
                   Backend
                       │
                       ▼
                     MySQL
```

---

### 3.2.1. Sincronización de datos

Cuando la aplicación detecta conectividad, inicia automáticamente el proceso de sincronización.

La sincronización contempla:

* Avances.
* Resultados de ejercicios.
* Niveles completados.
* Unidades completadas.
* Puntuaciones.
* Actividades realizadas.
* Fecha y hora de las acciones.
* Estado de sincronización.

Cada operación local puede manejar un estado similar a:

```text
PENDING
SYNCING
SYNCED
ERROR
```

Ejemplo conceptual:

```json
{
  "id": 105,
  "estudianteId": 25,
  "nivelId": 8,
  "resultado": 90,
  "fecha": "2026-08-17T10:30:00",
  "estadoSync": "PENDING"
}
```

Al recuperar conexión:

```text
PENDING
   ↓
SYNCING
   ↓
Backend
   ↓
MySQL
   ↓
SYNCED
```

Si ocurre un error:

```text
SYNCING
   ↓
ERROR
   ↓
Reintento automático
```

La sincronización debe ser idempotente para evitar duplicar registros cuando una operación se envía más de una vez.

---

## 3.3. Bases de datos

AISANKA utiliza dos sistemas de almacenamiento con responsabilidades diferentes.

### 3.3.1. MySQL

MySQL funciona como la base de datos central del ecosistema.

Almacena principalmente:

* Usuarios.
* Docentes.
* Estudiantes.
* Padres o tutores.
* Escuelas.
* Grados.
* Comunidades.
* Municipios.
* Departamentos.
* Idiomas.
* Unidades.
* Niveles.
* Contenidos.
* Ejercicios.
* Recursos multimedia.
* Diagnósticos.
* Adaptaciones.
* Progreso sincronizado.
* Información administrativa.

MySQL es la fuente central de información.

### 3.3.2. SQLite

SQLite funciona como almacenamiento local de la aplicación estudiante.

Su finalidad principal es permitir:

* Operación offline.
* Persistencia local.
* Registro de avances.
* Almacenamiento temporal de operaciones.
* Consulta rápida de contenidos.
* Cola de sincronización.

SQLite no reemplaza a MySQL.

Su función es proporcionar autonomía temporal al dispositivo.

---


```text
MYSQL
Base central
│
├── Estudiantes
├── Docentes
├── Escuelas
├── Unidades
├── Niveles
├── Contenidos
├── Ejercicios
├── Adaptaciones
├── Progreso sincronizado
└── Estadísticas

          ▲
          │
       API REST
          │
          ▼

SQLITE
Base local
│
├── Perfil local
├── Contenido disponible
├── Ejercicios
├── Progreso local
├── Resultados
└── Cola de sincronización
```

---

## 3.4. Adaptaciones educativas

AISANKA contempla que no todos los estudiantes interactúan con la aplicación de la misma manera.

El sistema puede aplicar adaptaciones específicas según el diagnóstico o las necesidades educativas registradas para cada estudiante.

Por ejemplo:

```text
                 ESTUDIANTE
                     │
                     ▼
                Diagnóstico
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       Autismo    Auditiva    Visual
          │          │          │
          ▼          ▼          ▼
      Interfaz    Recursos    Interfaz
      adaptada    visuales    adaptada
```


# 4. Dependencias principales

## 4.1. Backend

Dependencias principales:

```text
express
mysql2
dotenv
cors
bcrypt
jsonwebtoken
```

Responsabilidad:

| Dependencia  | Función                     |
| ------------ | --------------------------- |
| Express      | Servidor y API REST         |
| mysql2       | Conexión con MySQL          |
| dotenv       | Variables de entorno        |
| cors         | Comunicación entre clientes |
| bcrypt       | Hash de contraseñas         |
| jsonwebtoken | Autenticación mediante JWT  |

---

## 4.2. Dependencias de la web docente

La aplicación web está planteada con React.

Dependencias principales:

```text
react
react-dom
react-router-dom
axios
```

Responsabilidades:

| Tecnología       | Función                                         |
| ---------------- | ----------------------------------------------- |
| React            | construcción de la interfaz.                    |
| React DOM        | renderizado web.                                |
| React Router     | Navegación                                      |
| Axios            | Comunicación conla API.                         |


La interfaz puede organizarse mediante componentes reutilizables.

---

## 4.3. Dependencias de la aplicación estudiante

La aplicación móvil utiliza React Native.

Componentes principales:

```text
React Native
React Navigation
SQLite
Axios
AsyncStorage
```

Responsabilidades:

| Tecnología       | Función                                         |
| ---------------- | ----------------------------------------------- |
| React Native     | Aplicación móvil                                |
| React Navigation | Navegación                                      |
| SQLite           | Base de datos local                             |
| Axios            | Comunicación con backend                        |
| AsyncStorage     | Persistencia de configuraciones y datos simples |

---

# 5. Variables de entorno

Ejemplo de `.env` del backend:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=aisanka
DB_USER=root
DB_PASSWORD=

JWT_SECRET=clave_secreta_de_produccion

CORS_ORIGIN=http://localhost:5173
```
---


# 6. Estrucctura Modular 

## 6.1. Estructura del proyecto

La estructura general del ecosistema puede organizarse de la siguiente manera:

```text
AISANKA/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── web_AISANKA/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── package.json
│
├── app_AISANKA/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── database/
│   │   ├── services/
│   │   ├── sync/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   │
│   ├── package.json
│   └── app.json
│
├── database/
│   ├── schema/
│   ├── migrations/
│   └── seeds/
│
└── README.md
```

---

## 6.2. Backend modular

El backend se divide por responsabilidades.

```text
src/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── estudianteController.js
│   ├── docenteController.js
│   ├── unidadController.js
│   ├── nivelController.js
│   ├── ejercicioController.js
│   ├── progresoController.js
│   └── estadisticaController.js
│
├── models/
│   ├── Usuario.js
│   ├── Estudiante.js
│   ├── Docente.js
│   ├── Unidad.js
│   ├── Nivel.js
│   └── Progreso.js
│
├── routes/
│   ├── authRoutes.js
│   ├── estudianteRoutes.js
│   ├── docenteRoutes.js
│   ├── unidadRoutes.js
│   ├── nivelRoutes.js
│   ├── progresoRoutes.js
│   └── estadisticaRoutes.js
│
├── services/
│   ├── authService.js
│   ├── syncService.js
│   ├── pdfService.js
│   └── estadisticaService.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
└── app.js
```

---

## 6.3. Arquitectura de componentes React

La web docente:

```text
src/
│
├── components/
│   ├── Navbar/
│   ├── Sidebar/
│   ├── Card/
│   ├── Modal/
│   ├── Table/
│   ├── Chart/
│   └── Button/
│
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Estudiantes/
│   ├── Unidades/
│   ├── Progreso/
│   └── Estadisticas/
│
├── layouts/
│   ├── AuthLayout/
│   └── DashboardLayout/
│
└── services/
    └── api.js
```

---


# 7. Scripts del proyecto

## Backend

Ejemplo de `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Ejecutar desarrollo:

```bash
npm run dev
```

Ejecutar producción:

```bash
npm start
```

---

## 7.1. Instalación del ecosistema

## Backend

```bash
cd backend
npm install
```

Configurar:

```text
.env
```

Después:

```bash
npm run dev
```

## Web docente

```bash
cd web_AISANKA
npm install
npm run dev
```

## Aplicación estudiante

```bash
cd app_AISANKA
npm install
```

La ejecución dependerá del entorno móvil utilizado.

---

# 8. Endponts

## 8.1. Autenticación

AISANKA utiliza autenticación basada en JWT.

Flujo:

```text
Usuario
  │
  ▼
Login
  │
  ▼
POST /api/auth/login
  │
  ▼
Backend
  │
  ├── Verifica usuario
  ├── Verifica contraseña
  └── Identifica rol
  │
  ▼
JWT
  │
  ▼
Cliente
```

El token se utiliza posteriormente para acceder a endpoints protegidos.

Ejemplo de encabezado:

```http
Authorization: Bearer <TOKEN>
```

---

## 8.2. Autorización por roles

El backend debe comprobar que el usuario tenga permisos para ejecutar determinada operación.

Ejemplo:

```text
DOCENTE
│
├── Crear estudiante
├── Editar estudiante
├── Consultar estudiante
├── Eliminar estudiante
├── Habilitar unidades
├── Consultar progreso
└── Generar estadísticas

ESTUDIANTE
│
├── Consultar contenido
├── Realizar ejercicios
├── Registrar progreso
└── Sincronizar avances
```

Un estudiante no debe poder acceder directamente a operaciones administrativas del docente.

---

## 8.3. API REST

La API se organiza bajo el prefijo:

```text
/api
```

Ejemplos:

```text
/api/auth
/api/estudiantes
/api/docentes
/api/unidades
/api/niveles
/api/ejercicios
/api/progreso
/api/estadisticas
/api/sincronizacion
```

---

## 8.4. Endpoints de autenticación

### Iniciar sesión

```http
POST /api/auth/login
Content-Type: application/json
```

Request:

```json
{
  "usuario": "docente01",
  "password": "********"
}
```

Response:

```json
{
  "success": true,
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "rol": "DOCENTE"
  }
}
```

---

## 8.5. Endpoints de estudiantes


### Obtener estudiante

```http
GET /api/estudiantes/:id
Authorization: Bearer <TOKEN>
```

### Crear estudiante

```http
POST /api/estudiantes
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Ejemplo:

```json
{
  "nombre": "Carlos",
  "apellido": "López",
  "fechaNacimiento": "2015-03-20",
  "idEscuela": 1,
  "idGrado": 3,
  "idDocente": 2
}
```

### Editar estudiante

```http
PUT /api/estudiantes/:id
Authorization: Bearer <TOKEN>
```

### Eliminar estudiante

```http
DELETE /api/estudiantes/:id
Authorization: Bearer <TOKEN>
```

---

## 8.6. Endpoints de unidades


### Consultar unidad

```http
GET /api/unidades/:id
Authorization: Bearer <TOKEN>
```

### Habilitar unidad

```http
PUT /api/unidades/:id/habilitar
Authorization: Bearer <TOKEN>
```

El docente puede controlar qué unidades se encuentran disponibles para los estudiantes.

---


## 8.7. Sincronización

Endpoint principal:

```http
POST /api/sincronizacion
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Ejemplo:

```json
{
  "dispositivoId": "DEVICE-001",
  "operaciones": [
    {
      "idLocal": 1001,
      "tipo": "PROGRESO",
      "idEstudiante": 25,
      "idNivel": 8,
      "resultado": 90,
      "fecha": "2026-08-17T10:30:00"
    }
  ]
}
```

Respuesta:

```json
{
  "success": true,
  "sincronizadas": 1,
  "errores": 0
}
```

## 8.8. Comunicación frontend-backend

La comunicación se realiza mediante HTTP/HTTPS.

Ejemplo:

```javascript
const response = await axios.get(
  "/api/estudiantes",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
```

El frontend no debe conectarse directamente a MySQL.

La comunicación correcta es:

```text
React
  ↓
API REST
  ↓
Backend
  ↓
MySQL
```
## 8.9. Manejo de errores


Ejemplo:

```json
{
  "success": false,
  "message": "Estudiante no encontrado"
}
```

Códigos principales:

```text
200 OK
201 CREATED
400 BAD REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT FOUND
409 CONFLICT
500 INTERNAL SERVER ERROR
```

---
---

# 9. Flujo de AISANKA
## 9.1. Flujo completo del docente

```text
Docente
   │
   ▼
Inicio de sesión
   │
   ▼
Dashboard
   │
   ├───────────────┐
   │               │
   ▼               ▼
Estudiantes      Unidades
   │               │
   ├── Crear       ├── Ver
   ├── Editar      ├── Habilitar
   ├── Consultar   └── Progreso
   └── Eliminar
   │
   ▼
Estadísticas
   │
   ├── Gráficas
   ├── Progreso
   └── PDF
```

---

## 9.2. Flujo completo del estudiante

```text
Estudiante
    │
    ▼
Inicio de sesión
    │
    ▼
Perfil personalizado
    │
    ▼
SQLite
    │
    ▼
Unidades disponibles
    │
    ▼
Niveles
    │
    ▼
Ejercicios / Juegos
    │
    ▼
Resultado
    │
    ▼
Guardar localmente
    │
    ▼
¿Hay Internet?
   /       \
 NO         SÍ
 │           │
 ▼           ▼
SQLite    Sincronización
             │
             ▼
           Backend
             │
             ▼
           MySQL
             │
             ▼
       Docente visualiza
       el progreso
```


## 9.3. Ejemplo de ciclo completo

Un ciclo completo del sistema puede ser:

```text
1. Docente crea estudiante
        ↓
2. Estudiante queda registrado en MySQL
        ↓
3. Estudiante inicia sesión
        ↓
4. Aplicación obtiene su información
        ↓
5. Se descargan contenidos necesarios
        ↓
6. Información relevante se almacena en SQLite
        ↓
7. Estudiante trabaja offline
        ↓
8. SQLite almacena resultados
        ↓
9. El dispositivo recupera conexión
        ↓
10. Se inicia sincronización automática
        ↓
11. Backend valida operaciones
        ↓
12. MySQL actualiza el progreso
        ↓
13. Docente consulta el progreso
        ↓
14. Dashboard actualiza estadísticas
        ↓
15. Docente puede generar PDF
```


---



# Conclusion

AISANKA está diseñado como un ecosistema educativo distribuido y no únicamente como una aplicación web o móvil.

La plataforma integra:

* Una aplicación web para docentes.
* Una aplicación móvil para estudiantes.
* Un backend centralizado.
* MySQL como base de datos principal.
* SQLite como almacenamiento local.
* API REST para comunicación.
* Autenticación y autorización.
* Sincronización automática.
* Arquitectura Offline First.
* Gestión de unidades y niveles.
* Adaptaciones educativas individualizadas.

La combinación de almacenamiento central y local permite que AISANKA pueda funcionar en escenarios donde la conectividad no sea constante, manteniendo la continuidad del aprendizaje y sincronizando posteriormente la información con el sistema central.

En consecuencia, AISANKA se establece técnicamente como un **ecosistema tecnológico educativo interoperable, modular, escalable, accesible y orientado a entornos con conectividad limitada**, donde los perfiles docente y estudiante están integrados mediante una infraestructura central y mecanismos de sincronización offline-first.
