const express = require('express');
const cors = require('cors');
const Route_aula =
require('./routes/Route_aula');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const Route_estudiante = require('./routes/Route_estudiante');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

app.use(
    '/api/estudiantes',
    Route_estudiante
);
app.use(
    '/api/aulas',
    Route_aula
);


app.use('/api/unidades',
require('./routes/unidadRoutes'));

app.use('/api/recursos',
require('./routes/recursoRoutes'));

app.use(
'/api/ejercicios',
require('./routes/ejercicioRoutes')
);


app.use(

'/api/resultados',

require('./routes/resultadoRoutes')

);

app.use(

'/api/progreso',

require('./routes/progresoRoutes')

);

app.use(

'/api/historial',

require('./routes/historialRoutes')

);


app.use(

'/api/docente',

require('./routes/docenteRoutes')

);

app.use(

'/api/estudiante',

require('./routes/estudiantePanelRoutes')

);

module.exports = app;