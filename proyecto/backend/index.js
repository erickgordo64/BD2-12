// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const neo4j = require('neo4j-driver');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Configuración de MongoDB
mongoose.connect('mongodb://localhost:27017/tu_basedatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoDb = mongoose.connection;

mongoDb.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoDb.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Configuración de Neo4j
const neo4jDriver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'tu_contraseña'));

// Middleware para pasar la instancia de Neo4j a las rutas
app.use((req, res, next) => {
  req.neo4jDriver = neo4jDriver;
  next();
});

app.use(bodyParser.json());

// Rutas
//app.use('/api/auth', authRoutes);
// Otras rutas...

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
